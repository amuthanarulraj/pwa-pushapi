
navigator.serviceWorker.ready
    .then((registration) => registration.pushManager.getSubscription())
    .then(async (subscription) => {
        if (subscription) {
            return subscription;
        }
        const response = await fetch('./vapidPublicKey');
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
        return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        });
    })
    .then((subscription) => {
        if (subscription) {
            fetch('/pushregistrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            });
        }
    });