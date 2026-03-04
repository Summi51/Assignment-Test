require("dotenv").config();
const app = require("./src/app");
const { connection } = require("./src/config/db");


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected with DB");
  } catch (error) {
    console.log({ msg: error.message });
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
