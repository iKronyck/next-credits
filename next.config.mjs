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
  env: {
    API_URL: process.env.API_URL,
    FACE_URL: process.env.FACE_URL,
    FACE_PUBLIC_KEY: process.env.FACE_PUBLIC_KEY,
    FACE_SECRET_KEY: process.env.FACE_SECRET_KEY,
  },
};

export default nextConfig;
