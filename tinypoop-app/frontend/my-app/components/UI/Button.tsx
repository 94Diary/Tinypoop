import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-blue-600 p-4 rounded-xl items-center active:opacity-70"
      {...props}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};
