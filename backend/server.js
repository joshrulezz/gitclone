import express from 'express';
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());

app.get("/" , (req , res) => {
    res.send("Server is now ready !!");
})

app.use("/api/users",userRoutes);

app.listen(5000 , () => {
    console.log("I am now alive !!");
})