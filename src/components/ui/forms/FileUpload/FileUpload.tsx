import { FC, useState } from 'react';
import { View, Alert, Image, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { convertFileToBase64 } from '../../../../helpers';

interface FileUploadProps {
  id: string;
  file?: string;
  setFile: (id: string, value: any) => void;
}

export const FileUpload: FC<FileUploadProps> = ({ id, file, setFile }) => {
  const [imageUrl, setImageUrl] = useState<string>(file ?? '');

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.assets?.length) return;

      const document = result.assets[0];
      const fileSize = document.size || 0;
      const maxSize = 5 * 1024 * 1024;

      if (fileSize > maxSize) {
        Alert.alert('Error', 'El archivo es muy grande');
        return;
      }
      const fileBase64 = await convertFileToBase64(
        document.uri,
        document.mimeType || ''
      );

      setImageUrl(fileBase64);
      setFile(id, fileBase64);
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
