import { Feather } from "@expo/vector-icons";
import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";


export default function SettingsScreen() {
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const yesterday = dayjs().subtract(1, 'day');

  function handleDate() {
    const currentDate = dayjs();

    if (currentDate.isSame(today, 'day')) {
      return 'Hoje';
    }

    if (currentDate.isSame(tomorrow, 'day')) {
      return 'Amanhã';
    }

    if (currentDate.isSame(yesterday, 'day')) {
      return 'Ontem';
    }

    return currentDate.format('DD/MM');
  }

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#003f10' }}>
      <View style={{
        height: 200,
        paddingTop: 28,
        paddingRight: 24, 
        paddingLeft: 36,
        paddingBottom: 20,
      }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ThemedText type="defaultSemiBold" style={{ color: '#ECEDEE' }}>XXX.XXX.XXX-XX</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: '#ECEDEE' }}>(XX) X XXXX-XXXX</ThemedText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <ThemedText type='title' style={{ color: '#ECEDEE' }}>Isabelle Barreto</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: '#ECEDEE' }}>CEO & Lash Designer</ThemedText>
          </View>
        </View>
      </View>
      <ThemedView style={{
        flex: 1,
        paddingTop: 36,
        paddingHorizontal: 36,
        borderTopLeftRadius: 48,
        gap: 8
      }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <TouchableOpacity 
            style={{
              borderRadius: 12,
              flex: 1,
              height: 140,
              backgroundColor: '#cccccc'
            }}
          >
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              borderRadius: 12,
              flex: 1,
              height: 140,
              backgroundColor: '#cccccc'
            }}
          >
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <TouchableOpacity 
            style={{
              borderRadius: 12,
              flex: 1,
              height: 140,
              backgroundColor: '#cccccc'
            }}
          >
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              borderRadius: 12,
              flex: 1,
              height: 140,
              backgroundColor: '#cccccc'
            }}
          >
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
