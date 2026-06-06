import dotenv from "dotenv";

dotenv.config();


interface EnvConfig{
    PORT: string;
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    AUTH_URL: string
}

const loadEnvVars = (): EnvConfig => {
    const requireEnvVariable = [
        "PORT",
        "DATABASE_URL",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "AUTH_URL"
    ];

    requireEnvVariable.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        AUTH_URL: process.env.AUTH_URL as string
    };
};

export const envVars = loadEnvVars();