export const registerPush = () => {
    const base = 'http://localhost:3002';
    console.log('Registering push');
    navigator.serviceWorker.ready
        .then((registration) => {
            const subscription = registration.pushManager.getSubscription();
            console.log('Service Worker ready and push manager obtained');
            return subscription;
        })
        .then(async (subscription) => {
            if (subscription) {
                return subscription;
            }
            let response;
            try {
                response = await fetch(`${base}/vapidPublicKey`, { method: 'GET' });
                const vapidPublicKey = await response.text();
                const urlBase64ToUint8Array = (base64String: string) => {
                    const padding = '='.repeat((4 - base64String.length % 4) % 4);
                    const base64 = (base64String + padding)
                        .replace(/\-/g, '+')
                        .replace(/_/g, '/');
                    const rawData = window.atob(base64);
                    const outputArray = new Uint8Array(rawData.length);
                    for (let i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                    }
                    return outputArray;
                }
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                console.log('Vapid key obtained');
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            } catch (e) {
                console.error('Error subscribing to push service:', e);
                return null;
            }
        })
        .then(async (subscription) => {
            if (subscription) {
                await fetch(`${base}/pushregistrations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                });
                console.log('Subscription sent to server');
            }
        });
}