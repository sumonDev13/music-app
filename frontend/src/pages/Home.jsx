import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    // Function to fetch music data from an API
    const fetchMusicData = async () => {
      try {
        // Replace 'API_ENDPOINT' with your actual API endpoint
        const response = await axios.get("http://localhost:8000/api/songs/getSongs");
        setMusicList(response.data); // Assuming the response contains an array of music objects
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData(); // Fetch data when the component mounts
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Add logic here to fetch music based on the search term
    // For now, it filters the mock musicList
    const filteredMusic = musicList.filter(
      (music) =>
        music.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        music.artist.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // Update the music list based on search term
    setMusicList(filteredMusic);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Music Player</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for music..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {musicList.map((music) => (
            <div
              key={music.id}
              className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{music.title}</h3>
                <p className="text-gray-600">{music.artist}</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
