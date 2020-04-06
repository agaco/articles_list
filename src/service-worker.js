'use strict';

export const start = async () => {

  if ('serviceWorker' in navigator) {
    const workerUrl = `${window.location.origin}/custom-worker.js`;
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(workerUrl)
        .then((registration) => {
          console.log('ServiceWorker registration successful');
          registration.onupdatefound = () => {

            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
          };
        })
        .catch(err => {
          console.log('ServiceWorker registration failed', err);
        });
    });
  }

};
