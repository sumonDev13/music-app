import mongoose from 'mongoose';
import Song from '../models/songModel.js';


// Predefined list of tracks
const predefinedTracks = [
    {
      title: 'Track 1',
      artist: 'Artist 1',
      url: 'https://example.com/track1.mp3',
    },
    {
      title: 'Track 2',
      artist: 'Artist 2',
      url: 'https://drive.google.com/file/d/1PXdE1US0tf_pM0JDmh6e7Rc5_s2kyF2q/view?usp=sharing',
    },
  ];
  

export const populateTracks = async () => {
    try {
      await Song.deleteMany(); 
  
      const insertedTracks = await Song.insertMany(predefinedTracks);
      console.log('Predefined tracks inserted:', insertedTracks);
    //   mongoose.connection.close();
    } catch (error) {
      console.error('Error populating tracks:', error);
    //   mongoose.connection.close();
    }
  };
  