import { registerAs } from "@nestjs/config";


console.log("DB_PASSWORD: ", process.env.DB_PASSWORD);

export default registerAs('app', () => ({
    
    port: parseInt(process.env.PORT ?? '3000', 10),
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    jwt: {
        access: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',   
        },
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        },
    },
    aws: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        s3Bucket: process.env.AWS_S3_BUCKET,
    },
}));