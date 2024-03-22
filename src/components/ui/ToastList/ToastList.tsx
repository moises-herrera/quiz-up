import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Toast } from '..';
import { closeToast } from '../../../redux/ui';
import { View } from 'react-native';
import { styles } from './styles';

export const ToastList = () => {
  const toastNotifications = useAppSelector(
    ({ ui: { toastNotifications } }) => toastNotifications
  );
  const dispatch = useAppDispatch();

  return (
    <View style={styles.list}>
      {toastNotifications.map((toast, index) => (
        <Toast
          key={index}
          {...toast}
          onClose={() => dispatch(closeToast(index))}
        />
      ))}
    </View>
  );
};
