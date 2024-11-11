import { useEffect, useState } from "react";
import { TextInputProps, TouchableOpacity, View } from "react-native"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import ptBR from 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(duration);
dayjs.extend(relativeTime);

// hooks
import { useThemeColor } from "hooks/useThemeColor";
// components
import { ThemedText } from "./ThemedText"
import { BottomModal } from "./BottomModal";
import { ThemedView } from "./ThemedView";
import { Divider } from "./Divider";

interface InputProps<T extends FieldValues> extends TextInputProps {
  label: string;
  error?: string;
  value: Path<T>;
  setValue: UseFormSetValue<T>;
  inputValue: string | null | undefined;
}

export function DateInput<T extends FieldValues>({ label, value, inputValue, error, setValue, style, ...props }: InputProps<T>) {
  const background = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const minDate = dayjs().subtract(1, 'day');

  const openModal = () => !props.readOnly && setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <View style={{ gap: 8 }}>
        <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</ThemedText>
        <TouchableOpacity onPress={openModal}>
          <View
            style={[{
              borderWidth: 1,
              borderColor: color,
              paddingVertical: 16,
              paddingHorizontal: 12,
              borderRadius: 12,
              position: "relative"
            }]}
          >
            <ThemedText style={{ fontSize: 18, color: tint }}>{dayjs(inputValue).format("DD/MM/YYYY HH:mm")}</ThemedText>
          </View>
        </TouchableOpacity>
        { !!error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText> }
      </View>
      <BottomModal
        isVisible={modalIsOpen}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
      >
        <ThemedView
          style={{
            paddingBottom: 20,
            height: 400,
            maxHeight: 400,
            justifyContent: 'space-between',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
          lightColor='#EFEFEF'
          darkColor='#262626'
        >
          <Divider />
          <View
            style={{
              padding: 16,
              gap: 10,
              height: 400,
              maxHeight: 400,
              alignItems: 'flex-start',
            }}
          >
            <DateTimePicker
              mode="single"
              date={inputValue}
              onChange={({ date }) => setValue(value, dayjs(date) as PathValue<T, Path<T>>)}
              displayFullDays
              minDate={minDate}
              timePicker
              calendarTextStyle={{
                color: tint,
              }}
              selectedTextStyle={{
                color: "#FAFAFA",
              }}
              selectedItemColor={"#003f10"}
              todayTextStyle={{
                color: tint,
              }}
              dayContainerStyle={{
                borderRadius: 8,
              }}
              headerButtonColor={tint}
              headerButtonStyle={{
                borderRadius: 4,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              headerContainerStyle={{
                backgroundColor: background,
                borderRadius: 8,
                paddingHorizontal: 4,
              }}
              headerTextStyle={{
                color: tint,
                fontSize: 18,
              }}
              weekDaysTextStyle={{
                color: tint,
              }}
              locale={{
                ...ptBR,
                weekdaysMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                months: [
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ],
                monthsShort: [
                  'Jan',
                  'Fev',
                  'Mar',
                  'Abr',
                  'Mai',
                  'Jun',
                  'Jul',
                  'Ago',
                  'Set',
                  'Out',
                  'Nov',
                  'Dez',
                ],
              }}
            />
          </View>
        </ThemedView>
      </BottomModal>
    </>
  )
}