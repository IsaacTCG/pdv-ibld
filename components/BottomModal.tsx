import { useWindowDimensions } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

export type CustomModalProps = Partial<ModalProps> &
  Pick<ModalProps, 'children'>;

export function BottomModal({ children, ...rest }: CustomModalProps) {
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      // swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        justifyContent: 'flex-end', 
        margin: 0
      }}
      deviceWidth={width}
      deviceHeight={height}
      {...rest}
    >
      {children}
    </Modal>
  );
}
