import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from 'node-cron';
import path from "path";

import { connectDB } from "./db/connectDB.js";
import { User } from './models/user.model.js';

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const allowedOrigins = [
	'http://localhost:5173', 
	'https://4a32-103-181-227-30.ngrok-free.app'
];
  
  const corsOptions = {
	origin: function (origin, callback) {
	  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	credentials: true,
  };

app.use(cors(corsOptions));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


const startServer = async () => {
	try {
	  await connectDB();
	  console.log("Connected to the database");
  
	  // Schedule a task to run every minute
	  cron.schedule('* * * * *', async () => {
		const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);
  
		try {
		  const result = await User.deleteMany({
			isVerified: false,
			createdAt: { $lt: oneMinuteAgo },
		  });
  
		  if (result.deletedCount > 0) {
			console.log(`Deleted ${result.deletedCount} unverified user(s)`);
		  }
		} catch (error) {
		  console.error('Error deleting unverified users:', error);
		}
	  });
  
	  app.listen(PORT, () => {
		console.log("Server is running on port:", PORT);
	  });
	} catch (error) {
	  console.error("Error connecting to the database", error);
	  process.exit(1);
	}
};
  
startServer();