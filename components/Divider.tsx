import { View } from 'react-native';

export function Divider() {
  return (
    <View
      style={{
        height: 5,
        width: 100,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 20,
        backgroundColor: "#003f10",
      }}
    />
  );
}
