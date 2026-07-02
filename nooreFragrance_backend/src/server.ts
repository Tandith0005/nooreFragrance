import app from "./app";
import { connectDB } from "./app/config/db";
import { runCleanupOnStartup, startTokenCleanupSchedule } from "./app/jobs/token-cleanup.job";

const port = 5000;

async function main() {
  try {
    await connectDB();

    // Run refresh token from DB cleanup on startup [configured in token-cleanup.job.ts]
    await runCleanupOnStartup();

    // Start token cleanup schedule [configured in token-cleanup.job.ts]
    startTokenCleanupSchedule();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();