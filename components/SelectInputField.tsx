import { useEffect, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

// hooks
import { useThemeColor } from "hooks/useThemeColor";
// components
import { ThemedText } from "./ThemedText"
import { BottomModal } from "./BottomModal";
import { Divider } from "./Divider";
import { ThemedView } from "./ThemedView";
// types
import { Option } from "types/option";

interface SelectInputProps<T extends FieldValues> extends TextInputProps {
  options: Option[];
  value: Path<T>;
  setValue: UseFormSetValue<T>;
  selectedValue?: string | number | null | undefined;
  label: string;
  error?: string;
}

export function SelectInputField<T extends FieldValues>({ label, options, value, setValue, selectedValue, error, style, ...props }: SelectInputProps<T>) {
  const color = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [filteredOptions, setFilteredOptions] = 
  useState<Option[]>(options);
  
  const [optionLabel, setOptionLabel] = useState('');

  function setDefaultArray() {
    setFilteredOptions(options);
  }
  
  function filterValues(text: string) {
    if (text === '') { 
      setDefaultArray();
      return;
    }

    const textWithoutSpecialCharacters = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredOptions = options.filter(option => {
      const optionLabelWithoutSpecialCharacters = option.label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return optionLabelWithoutSpecialCharacters.toLowerCase().includes(textWithoutSpecialCharacters);
    });

    setFilteredOptions(filteredOptions);
  }

  function handleSetValue(option: Option) {
    setValue(value, option.value as PathValue<T, Path<T>>);
    setOptionLabel(option.label);
    setModalIsOpen(false);
    setDefaultArray();
  }

  const valueIsEmpty = optionLabel === '';

  const openModal = () => !props.readOnly && setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (selectedValue) {
      const option = options.find(option => option.value === selectedValue);
      if (option) {
        setOptionLabel(option.label);
      }
    }
  }, [selectedValue]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
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
            <ThemedText style={{ fontSize: 18, color: valueIsEmpty ? '#B1B1B1' : tint }}>{optionLabel || 'Selecione uma opção'}</ThemedText>
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
            height: 600,
            maxHeight: 600,
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
              height: 600,
              maxHeight: 600,
              alignItems: 'flex-start',
              paddingBottom: 20,
            }}
          >
            <TextInput
              {...props}
              style={[{
                borderWidth: 1,
                borderColor: color,
                paddingVertical: 16,
                paddingHorizontal: 12,
                fontSize: 18,
                borderRadius: 12,
                color: tint,
                position: "relative",
                width: '100%',
              }]}
              placeholderTextColor={color}
              onChangeText={(text) => [setOptionLabel(text), filterValues(text)]}
              value={optionLabel}
              defaultValue={optionLabel}
              placeholder={`Selecione um(a) ${label.toLowerCase()}`}
            />
            <FlatList 
              data={filteredOptions}
              keyExtractor={(item) => String(item.value)}
              maxToRenderPerBatch={20}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSetValue(item)} 
                  style={{ flexDirection: "row"}}
                >
                  <ThemedText style={{ fontSize: 16 }}>{item.label}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ gap: 16, marginVertical: 16 }}
              ListEmptyComponent={<ThemedText>Nenhum resultado encontrado</ThemedText>}
            />
          </View>
        </ThemedView>
      </BottomModal>
    </KeyboardAvoidingView>
  )
}