import { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.locale('pt-br');
dayjs.extend(duration);
dayjs.extend(relativeTime);

// components
import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
// types
import { Schedule } from 'types/schedule';
// constants
import { schedulesMock } from 'constants/schedules';

export default function SchedulesListScreen() {
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const yesterday = dayjs().subtract(1, 'day');

  const [schedules, _] = useState<Array<Schedule>>(schedulesMock);

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
          <Feather name="book-open" size={28} color="#ECEDEE"  />
          <ThemedText style={{ textTransform: 'capitalize', fontSize: 18, color: '#ECEDEE' }} type='defaultSemiBold'>{today.format('MMMM, DD')}</ThemedText>
          <TouchableOpacity>
            <Feather name="filter" size={28} color="#ECEDEE" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <ThemedText type='title' style={{ color: '#ECEDEE' }}>{handleDate()}</ThemedText>
            <ThemedText style={{ opacity: 0.7, color: '#ECEDEE' }}>{schedules.length} agendados</ThemedText>
          </View>
          <Link href='/(schedules)/createSchedule'>
            <ThemedView style={{ borderRadius: 16, width: 120, alignItems: 'center', justifyContent: 'center', height: 60}}>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>Adicionar</ThemedText>
            </ThemedView>
          </Link>
        </View>
      </View>
      <ThemedView style={{
        flex: 1,
        paddingTop: 36,
        paddingHorizontal: 36,
        borderTopLeftRadius: 48,
      }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={schedules}
          renderItem={({ item }) => <ScheduleItem item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </ThemedView>
    </ThemedView>
  );
}

interface ScheduleItemProps {
  item: Schedule;
}

function ScheduleItem({ item}: ScheduleItemProps) {
  return (
    <Link 
      key={item.id}
      href={`/(schedules)/schedule/${item.id}`}
    >
      <ThemedView 
        style={{ 
          width: '100%',
          borderRadius: 24, 
          paddingVertical: 16, 
          paddingHorizontal: 24,
          justifyContent: 'space-between', 
          flexDirection: 'row',
        }}
        lightColor='#EFEFEF'
        darkColor='#262626'
      >
        <View>
          <ThemedText style={{ fontSize: 24 }}>{item.client.fullname}</ThemedText>
          <ThemedText style={{ fontSize: 18, fontStyle: 'italic', opacity: 0.7 }}>{item.procedure.name}</ThemedText>
        </View>
        <ThemedText style={{ fontSize: 18, textAlign: 'right', opacity: 0.7 }}>{dayjs(item.datetime).format('HH:mm')}</ThemedText>
      </ThemedView>
    </Link>
  );
}
