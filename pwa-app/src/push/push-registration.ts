export const registerPush = () => {
    const base = 'https://localhost:3002';
    console.log('Registering push');
    navigator.serviceWorker.ready
        .then((registration) => {
            const subscription = registration.pushManager.getSubscription();
            console.log('Service Worker ready and push manager obtained');
            return Promise.all([registration, subscription]);
        })
        .then(async ([registration, subscription]) => {
            if (subscription) {
                return subscription;
            }
            let response;
            try {
                response = await fetch(`${base}/vapidPublicKey`, { method: 'GET' });
                const vapidPublicKey = await response.text();
                const urlBase64ToUint8Array = (base64String: string) => {
                    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
                    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
                    const rawData = atob(base64);
                    const outputArray = new Uint8Array(rawData.length);
                    for (let i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                    }
                    return outputArray;
                }
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                await Notification.requestPermission();
                if (Notification.permission !== "granted") {
                    throw new Error('Permission not granted for Notification');
                }
                console.log('Notification permission granted');
                return await registration.pushManager.subscribe({
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