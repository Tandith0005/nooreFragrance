import app from "./app";
import { connectDB } from "./app/config/db";

const port = 5000;

async function main() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();