import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "react-native";

export default function BackButton() {
  return (
    <Link href={"/"} asChild>
      <Text className="p-4 hover:bg-secondary/35 rounded-lg">
        <ChevronLeft color={"#fff"} size={24} />
      </Text>
    </Link>
  );
}
