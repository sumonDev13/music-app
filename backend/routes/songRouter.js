import express from "express";
import { getSongs, searchSongs } from "../controllers/songController.js";

const songRouter = express.Router();

// Get all songs
songRouter.get("/getSongs", getSongs);
songRouter.get("/searchSong", searchSongs);

export default songRouter;
