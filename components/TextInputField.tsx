import { TextInput, TextInputProps, View } from "react-native"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

// hooks
import { useThemeColor } from "hooks/useThemeColor";
// components
import { ThemedText } from "./ThemedText"

interface InputProps<T extends FieldValues> extends TextInputProps {
  label: string;
  error?: string;
  value: Path<T>;
  setValue: UseFormSetValue<T>;
  inputValue: string | null | undefined;
}

export function TextInputField<T extends FieldValues>({ label, value, inputValue, setValue, error, style, ...props }: InputProps<T>) {
  const color = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={{ gap: 8 }}>
      <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>{label}</ThemedText>
      <TextInput
        {...props}
        style={[style, {
          borderWidth: 1,
          borderColor: color,
          paddingVertical: 16,
          paddingHorizontal: 12,
          fontSize: 18,
          borderRadius: 12,
          color: tint,
        }]}
        multiline={false}
        numberOfLines={1}
        scrollEnabled={true}
        textAlign="left"
        placeholderTextColor={color}
        value={inputValue as string}
        defaultValue={inputValue as string}
        onChangeText={text => setValue(value, text as PathValue<T, Path<T>>)}
      />
      { !!error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText> }
    </View>
  )
}