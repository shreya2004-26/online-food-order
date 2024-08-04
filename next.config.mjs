/** @type {import('next').NextConfig} */
const nextConfig = {
    // domains: ['us-east-1-shared-usea1-02.graphassets.com']
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'us-east-1-shared-usea1-02.graphassets.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'image.vietnam.travel',
                port: '',
                pathname: '/**'
            },
        ]
    }

};

export default nextConfig;
