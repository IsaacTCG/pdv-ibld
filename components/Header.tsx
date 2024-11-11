import { TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

// components
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title: string;
  goBack?: () => void;
}

export function Header({ title, goBack }: HeaderProps) {
  return (
    <View style={{
      backgroundColor: '#003f10',
      flexDirection: 'row',
      justifyContent: goBack ? 'space-between' : 'center',
      alignItems: 'flex-end',
      paddingBottom: 24,
      paddingHorizontal: 48,
      paddingTop: 28,
      height: 120,
      borderBottomLeftRadius: 48,
      borderBottomRightRadius: 48,
    }}>
      {goBack && (
        <TouchableOpacity onPress={goBack}>
          <Feather name='arrow-left' size={36} color='#ECEDEE' />
        </TouchableOpacity>
      )}
      <ThemedText type='title' style={{ color: '#ECEDEE' }}>{title}</ThemedText>
      <View style={{ width: 24 }} />
    </View>
  );
}