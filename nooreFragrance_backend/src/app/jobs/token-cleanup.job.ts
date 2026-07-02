import { TokenService } from "../services/token.service";
import { logger } from "../utils/logger";
import cron from "node-cron";

export const cleanupExpiredTokensFully = async () => {
    try{
        const startTime = new Date();
        logger.log(`Started token cleanup at ${startTime.toISOString()}`);

        await TokenService.cleanupExpiredTokens();

        const endTime = new Date();

        const duration = endTime.getTime() - startTime.getTime();
        logger.log(`Token cleanup completed in ${duration}ms at ${endTime.toISOString()}`);
    } catch (error) {
        logger.error(error);
    }
};


export const startTokenCleanupSchedule = () => {
    const job = cron.schedule("0 2 * * *",  async () => {
    logger.log("Running scheduled token cleanup...");

    await cleanupExpiredTokensFully();
  });
  
  logger.log("Token cleanup 2:00 AM scheduler initialized");
  
  return job;
};


export const runCleanupOnStartup = async () => {
  logger.log("Running initial token cleanup on startup...");
  await cleanupExpiredTokensFully();
};
