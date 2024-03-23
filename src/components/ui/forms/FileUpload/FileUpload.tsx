import { FC, useState } from 'react';
import { View, Alert, Image, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface FileUploadProps {
  id: string;
  setFile: (id: string, value: any) => void;
}

export const FileUpload: FC<FileUploadProps> = ({ id, setFile }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.assets?.length || !result.output?.item(0)) return;

      const file = result.output?.item(0);
      const fileSize = file?.size || 0;
      const maxSize = 5 * 1024 * 1024;

      if (fileSize > maxSize) {
        Alert.alert('Error', 'El archivo es muy grande');
        return;
      }

      const fileUri = result.assets[0].uri;

      setImageUrl(fileUri);
      setFile(id, file);
    } catch (error) {
      throw error;
    }
  };

  const removeFile = () => {
    setImageUrl('');
    setFile(id, '');
  };

  return (
    <View id={id} style={{ gap: 4 }}>
      <Pressable onPress={pickFile}>
        {imageUrl && (
          <Ionicons
            style={styles.closeIcon}
            name="close-circle-outline"
            size={24}
            color="black"
            onPress={removeFile}
          />
        )}
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../../../assets/upload-image.png')
          }
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};
