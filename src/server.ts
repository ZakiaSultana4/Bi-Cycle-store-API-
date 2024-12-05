import connectDB from "./db";
import app from "./app";
import config from "./config";

connectDB()
  .then(() => {
    app.listen(config.port || 3000, () => {
      console.log(`Example app listening on port ${config.port || 3000}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed ", error);
  });
