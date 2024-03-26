import mongoose from "mongoose";
export const connDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "ToDo_list" })
    .then(() => console.log("dataBaseConnected!"))
    .catch((e) => {
      console.log(e);
    });
};
