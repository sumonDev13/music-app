import Song from "../models/songModel.js";

export const getSongs = async (req,res) => {
    try {
        const songs = await Song.find({});
        res.json(songs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const searchSongs = async (req, res) => {
  const { query } = req.query; 

  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
      ],
    });

    if (songs.length === 0) {
      return res.status(404).json({ message: 'No songs found.' });
    }

    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: 'Error searching for songs.', error: error.message });
  }
};