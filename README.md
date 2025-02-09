# pwa-pushapi
A sample implementation to demo [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) with HTTPS.

## Getting Started

1. Create `certs/localhost.conf` file with below content. This conf file will be used to generate the certificates for HTTPS.
    ```
    [req]
    distinguished_name = req_distinguished_name
    req_extensions = v3_req
    x509_extensions = v3_req
    prompt = no

    [req_distinguished_name]
    C = US
    ST = <STATE>
    L = <CITY>
    O = LocalDev
    OU = WebDev
    CN = localhost

    [v3_req]
    subjectAltName = @alt_names

    [alt_names]
    DNS.1 = localhost
    ```
2. Run `cd certs` and generate certificate using below command for Mac using `openssl`. Please use OS specific tools to generate self signed certificates.
    ```
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout localhost.key -out localhost.crt \
        -config localhost.conf
    ```
3. Trust the certificate using `sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localhost.crt` for Mac. Please use OS specific documentation for trusting the certificates.
4. Run `cd ./../api`
5. Run `npm install`
6. Run `npm run vapid` to generate VAPID keys and set it to `.env` file. This key will be used for the Push subscription.
7. Run `npm start` to start the API service at `https://localhost:3002`.
8. Run `cd pwa-app` in a separate terminal.
9. Run `npm install`.
10. Run `npm run dev` to lauch the app at `https://localhost:3000`.
11. The certs generated under `certs` directory must be added to the HTTP clients like [Bruno](https://www.usebruno.com/) to access the APIs.
12. A [Bruno](https://www.usebruno.com/) collection is added to `api/docs` directory.
13. Use `/messages` API to send Push notifications and browser console should print the notification message.
14. This app can also be installed as a standalone app.
