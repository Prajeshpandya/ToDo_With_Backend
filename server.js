import { app } from "./app.js";
import { connDB } from "./data/database.js";

app.listen(process.env.PORT, () => {
  console.log(`server is working! on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});


connDB();

app.get("/", (req, res) => {
  res.send("Nice");
});

//IMP NOTE : we can set the dev & production with env in package.jsom directly 

// "scripts": {
//   "start": "set NODE_ENV=Production && node server.js",       
//   "dev": "set NODE_ENV=Development && nodemon server.js"
// }, 
