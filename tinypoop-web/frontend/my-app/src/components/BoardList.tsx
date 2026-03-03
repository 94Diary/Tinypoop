// components/BoardList.tsx
import React, { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import CreatePlaceModal from "./CreatePlaceModal";

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
      const res = await fetch("http://localhost:8080/places");
      const data = await res.json();
      setPlaces(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/places/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
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
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center min-h-[160px]"
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
        <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mt-4">
          <p className="text-gray-500">No places found. Click the button above to create one.</p>
        </div>
      )}
    </div>
  );
};

export default BoardList;