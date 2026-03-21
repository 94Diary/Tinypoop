import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-1 ml-1">{label}</Text>}
      <TextInput
        className="bg-gray-100 p-4 rounded-xl text-gray-800 border border-gray-200"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
};
