import dotenv from "dotenv";

dotenv.config();


interface EnvConfig{
    PORT: string;
    NODE_ENV: string;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    APP_URL: string;
    AUTH_URL: string;
    JWT_SECRET: string
}

const loadEnvVars = (): EnvConfig => {
    const requireEnvVariable = [
        "PORT",
        "NODE_ENV",
        "DATABASE_URL",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "APP_URL",
        "AUTH_URL",
        "JWT_SECRET"
    ];

    requireEnvVariable.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        APP_URL: process.env.APP_URL as string,
        AUTH_URL: process.env.AUTH_URL as string,
        JWT_SECRET: process.env.JWT_SECRET as string
    };
};

export const envVars = loadEnvVars();