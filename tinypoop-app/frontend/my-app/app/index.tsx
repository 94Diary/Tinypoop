import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "../components/Auth";

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
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);

  const fetchPlaces = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch("http://192.168.253.130:8080/places");
      const data = await response.json();
      setPlaces(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Polling: ดึงข้อมูลอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    if (user) {
      fetchPlaces(true); // ดึงครั้งแรกตอน Login เสร็จ

      const interval = setInterval(() => {
        fetchPlaces(false); // ดึงเงียบๆ ในพื้นหลัง
      }, 5000); // 5000ms = 5 วินาที

      return () => clearInterval(interval); // ล้าง interval เมื่อปิดหน้าหรือ Logout
    }
  }, [user, fetchPlaces]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPlaces(false);
  }, [fetchPlaces]);

  if (!user) {
    return <Auth onLoginSuccess={(userData) => setUser(userData)} />;
  }

  if (loading && places.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-gray-100">
        <View>
          <Text className="text-3xl font-black text-blue-600">TinyPoop</Text>
          <Text className="text-gray-500 font-medium">Hello, {user.username}</Text>
        </View>
        <TouchableOpacity 
          className="bg-red-50 px-4 py-2 rounded-lg"
          onPress={() => setUser(null)}
        >
          <Text className="text-red-500 font-bold">Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2563eb"]} />
        }
        ListHeaderComponent={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Discover Places
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-600 text-xs font-bold">LIVE</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className="p-5 mb-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
            <Text className="text-gray-600 mt-1">{item.address}</Text>
            <View className="mt-3 pt-3 border-t border-gray-200">
              <Text className="text-gray-500 italic">"{item.description}"</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
