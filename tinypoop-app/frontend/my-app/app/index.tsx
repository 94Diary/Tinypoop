import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">
        Welcome to TinyPoop!
      </Text>
      <Text className="text-base text-gray-600 mt-2">
        This is the frontend of the TinyPoop application.
      </Text>
    </View>
  );
}