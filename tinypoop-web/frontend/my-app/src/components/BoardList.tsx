import React, { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import CreatePlaceModal from "./CreatePlaceModal";
import axios from "axios";

interface Place {
  id: string;
  place_id: string;
  name: string;
  address: string;
  description: string;
  create_by: string;
  manager?: {
    username: string;
    email: string;
  };
}

const BoardList: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/places");
      setPlaces(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:8080/places/${id}`);
      if (res.status === 200) {
        setPlaces(places.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete place");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting place");
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {places.map((place) => (
          <BoardCard
            key={place.id}
            id={place.id}
            title={place.name}
            address={place.address}
            managerName={place.manager?.username}
            notes={0}
            members={1}
            onDelete={handleDelete}
          />
        ))}
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 shadow-2xl border border-gray-800 shadow-gray-900/80 rounded-lg p-6 text-white hover:text-white hover:border-blue-400 hover:bg-gray-900 transition-all flex flex-col items-center justify-center min-h-[120px]"
        >
          <span className="text-3xl mb-2">+</span>
          <span className="font-medium">Create New Place</span>
        </button>
      </div>

      {isModalOpen && (
        <CreatePlaceModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchPlaces();
          }}
        />
      )}

      {places.length === 0 && !loading && (
        <div className="text-center py-10 rounded-xl bg-gray-800 border border-gray-800 mt-16">
          <p className="text-gray-500">No places found. Click the button above to create one.</p>
        </div>
      )}
    </div>
  );
};

export default BoardList;