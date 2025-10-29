import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/Db.js";
import routes from "./Routes/index.js";
import cors from 'cors';
import morgan from 'morgan'
import { notFound, errorHandler } from "./Middlewares/errorHanlerMiddleware.js";




dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/api', routes)
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Mini Mart API is running...");
});const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${process.env.PORT}`));

