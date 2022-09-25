import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import parcelRoute from "./routes/parcel.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import dotenv from "dotenv";
dotenv.config();
import stripeRoute from "./routes/stripe.js";
import cors from "cors";

// import { v4 as uuidv4 } from 'uuid';
// const pass_word = uuidv4();
const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(process.env.PORT || 5000, () => console.log(`Running`))
  )
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/parcel", parcelRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/checkout", stripeRoute);

app.get("/", (req, res) => res.send("You be mumu, from Homepage."));
