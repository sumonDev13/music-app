import  { useState, useEffect } from 'react';

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch tracks from the API
    const fetchTracks = async () => {
      try {
        // Fetch tracks from the API
        const response = await fetch('http://localhost:8000/api/songs/getSongs');
        const data = await response.json();
        setTracks(data); // Set tracks data from the API response
        setFilteredTracks(data); // Initialize filtered tracks with all tracks
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    const audio = new Audio();
    setAudioPlayer(audio);

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, []);

  const playTrack = (track) => {
    if (audioPlayer && track.url !== currentTrack?.url) {
      audioPlayer.src = track.url;
      setCurrentTrack(track);
      audioPlayer.play();
      setIsPlaying(true);
    } else if (audioPlayer && isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
    } else if (audioPlayer && !isPlaying) {
      audioPlayer.play();
      setIsPlaying(true);
    }
  };

  const handleSearch = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      try {
        const response = await fetch(`http://localhost:8000/api/songs/searchSong?query=${searchTerm}`);
        const data = await response.json();
        setFilteredTracks(data.songs);
      } catch (error) {
        console.error('Error searching for tracks:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Music Tracks</h1>
      <input
        type="text"
        placeholder="Search by title or artist"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredTracks.map((track) => (
          <div key={track._id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-xl font-semibold">{track.title}</h2>
            <p className="text-gray-600">{track.artist}</p>
            <div className="mt-2">
              <button
                onClick={() => playTrack(track)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
              >
                {currentTrack?.url === track.url && isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
