import mongoose from "mongoose";
export const connDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "ToDo_list" })
    .then((c) => console.log(`dataBaseConnected! ${c.connection.host}`))
    .catch((e) => {
      console.log(e);
    });
};
