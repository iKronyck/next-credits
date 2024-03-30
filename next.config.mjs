/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aws-nodejs-bucket-ikronyck.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
