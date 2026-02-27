import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

type Place = {
  id: string;
  place_id: string;
  name: string;
  address: string;
  description: string;
  create_by: string;
  create_date: string;
};

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.33:8080/places")
      .then((res) => res.json())
      .then((data: Place[]) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-blue-500 mb-4">
        Places
      </Text>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 mb-3 bg-gray-100 rounded-xl">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text>{item.address}</Text>
            <Text className="text-gray-500">{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}