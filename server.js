import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product-routes.js";

const PORT = process.env.PORT || "3000";
const app = express();

//connect to db
const db_connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongodB Atlas...")
    } catch (err) {
        console.error(err.message);
        console.log("Error in connecting to MongodB Atlas!!!")
    }
}
db_connect();


//request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRoutes);


app.listen(PORT, () => console.log(`Serving on port ${PORT}...`))
