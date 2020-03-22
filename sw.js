"use scrict";

self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return new Response(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <p>No internet connection.</p>
            </body>
            </html>`, { headers: { "Content-Type": "text/html "}});
        }
        )
    );
})