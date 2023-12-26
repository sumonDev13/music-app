import express from "express";
import { getSongs } from "../controllers/songController.js";

const songRouter = express.Router();

// Get all songs
songRouter.get("/getSongs", getSongs);

export default songRouter;
