import mongoose from 'mongoose';
import Song from '../models/songModel.js';


// Predefined list of tracks
const predefinedTracks = [
    {
      title: 'Tum hi ho',
      artist: 'Arijit Sing ',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    },
    {
      title: 'Valobasha ',
      artist: 'Nancy',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    },
    {
      title: 'Prem',
      artist: 'James',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    },
    {
      title: 'Ek Mutho Rod',
      artist: 'Balam',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    },
    {
      title: 'Ek Mutho Rod',
      artist: 'Shera Ghoshal',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    },
    {
      title: 'Dil ibadat',
      artist: 'KK',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
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
  