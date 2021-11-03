const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/productRoute");
const CartRoute = require("./routes/cartRoute");
const OrderRoute = require("./routes/orderRoute");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection to Mongo DB is success"))
  .catch(err => console.log(err));

app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/cart", CartRoute);
app.use("/api/v1/order", OrderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
