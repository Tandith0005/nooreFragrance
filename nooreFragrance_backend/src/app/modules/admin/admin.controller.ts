import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import { cleanupExpiredTokensFully } from "../../jobs/token-cleanup.job";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const triggerTokenCleanup = catchAsync(async (req: Request, res: Response) => {
  logger.log("Manual token cleanup triggered by admin");

  await cleanupExpiredTokensFully();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token cleanup completed successfully",
    data: {
      timestamp: new Date().toISOString()
    }
  });
});

export const AdminController = {
  triggerTokenCleanup,
};