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

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {places.map((place) => (
        <BoardCard
          key={place.id}
          title={place.name}
          notes={0}
          members={1}
        />
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-gray-600 hover:bg-gray-100"
      >
        + Create New Board
      </button>

      {isModalOpen && (
        <CreatePlaceModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchPlaces();
            alert("Place created successfully!");
          }}
        />
      )}
    </div>
  );
};

export default BoardList;