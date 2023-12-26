import Song from "../models/songModel.js";

export const getSongs = async (req,res) => {
    try {
        const songs = await Song.find({});
        res.json(songs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};