import { FC } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SelectOption } from '../../../../interfaces';
import { styles } from './styles';

interface SelectProps {
  id: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange: (id: string, value: string) => void;
}

export const Select: FC<SelectProps> = ({
  id,
  options,
  placeholder = 'Seleccionar',
  value = '',
  onChange,
}) => {
  const onSelectValue = (value: string) => {
    onChange(id, value);
  };

  return (
    <View id={id} style={styles.selectContainer}>
      <RNPickerSelect
        placeholder={{ label: placeholder, value: '' }}
        items={options}
        onValueChange={onSelectValue}
        value={value}
      />
    </View>
  );
};
