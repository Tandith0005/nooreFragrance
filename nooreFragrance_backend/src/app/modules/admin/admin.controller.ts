import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import { cleanupExpiredTokensFully } from "../../jobs/token-cleanup.job";

export const triggerTokenCleanup = async (req: Request, res: Response) => {
  try {
    logger.log("Manual token cleanup triggered by admin");
    await cleanupExpiredTokensFully();
    
    res.json({
      success: true,
      message: "Token cleanup completed successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error("Manual cleanup failed:", error);
    res.status(500).json({
      success: false,
      message: "Token cleanup failed",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const AdminController = {
  triggerTokenCleanup,
};