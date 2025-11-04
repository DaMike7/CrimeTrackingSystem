import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './src/lib/db.js';
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from './src/routes/user.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import crimeRoutes from './src/routes/crimes.routes.js'
import caseRoutes from './src/routes/cases.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());
app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials:true
  }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/', userRoutes);
app.use('/api/crime', crimeRoutes);
app.use('/api/case',caseRoutes)
// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}).catch((err) => {
  console.error("DB connection failed:", err);
});