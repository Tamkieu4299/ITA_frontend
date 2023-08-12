export {};

declare global {
    interface Window {
        __RUNTIME_CONFIG__: {
            API_URL: string;
            BUCKET_S3: string;
            NODE_ENV: string;
            PORT: string;
        };
    }
}
