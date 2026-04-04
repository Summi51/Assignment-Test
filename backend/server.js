require("dotenv").config();
const app = require("./src/app");
const { connection } = require("./src/config/db");

const startServer = async () => {
  try {
    await connection;
    console.log("Connected with DB");
  } catch (error) {
    console.log({ msg: error.message });
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
};

// If running on Vercel (serverless), export a handler instead of listening.
// Vercel's @vercel/node will invoke the exported function for each request.
if (process.env.VERCEL) {
  module.exports = async (req, res) => {
    try {
      await connection;
    } catch (error) {
      console.error("DB connection error:", error.message);
    }
    return app(req, res);
  };
} else {
  startServer();
}
