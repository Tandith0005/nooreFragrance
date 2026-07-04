import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { envVars } from "../config/envVars";
import { ZodError } from "zod";
import { MongooseError } from "mongoose";
import { logger } from "../utils/logger";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails = undefined;

  //   handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    return res.status(statusCode).json({
      success: false,
      message,
      stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Zod errors
  else if (err instanceof ZodError || err.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed";

    errorDetails = err.issues.map((e: any) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(statusCode).json({
      success: false,
      message,
      errors: errorDetails,
      stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  // Handle Mongoose/MongoDB errors
  else if (err instanceof MongooseError) {
    // CastError - Invalid ObjectId
    if (err.name === "CastError") {
      const castError = err as any;

      statusCode = 400;
      message = `Invalid ${castError.path}: ${castError.value}`;
    }
    // ValidationError
    else if (err.name === "ValidationError") {
      statusCode = 400;
      message = "Database validation failed";
      errorDetails = Object.values((err as any).errors).map((e: any) => ({
        field: e.path,
        message: e.message,
      }));
    }
    // Other Mongoose errors
    else {
      statusCode = 400;
      message = err.message;
    }
  }

  // Handle MongoDB duplicate key error (code 11000)
  else if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyPattern)[0];
    message = `Duplicate value for ${field}. This ${field} already exists.`;
    errorDetails = {
      field,
      value: (err as any).keyValue[field],
    };
  }

  // JWT errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Handle booking conflict errors
  else if (err.name === "BookingConflictError") {
    statusCode = 409;
    message = err.message;
    errorDetails = {
      conflictingBooking: err.conflictingBooking,
      requestedTimeSlot: err.requestedTimeSlot,
    };
  }

  //   Default error for any other cases
  if (!statusCode || statusCode === 500) {
    logger.error("Unhandled error:", err);
    message =
      envVars.NODE_ENV === "development"
        ? err.message
        : "Internal server error";

    return res.status(500).json({
      success: false,
      message,
      ...(errorDetails && { details: errorDetails }),
      stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
