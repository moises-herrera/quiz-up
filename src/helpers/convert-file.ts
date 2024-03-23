import * as FileSystem from 'expo-file-system';

/**
 * Convert a file to base64.
 * 
 * @param uri The file uri.
 * @param mimeType The file mime type. 
 * @returns The file in base64. 
 */
export const convertFileToBase64 = async (
  uri: string,
  mimeType: string
): Promise<string> => {
  const buffer = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const fileBase64 = `data:${mimeType};base64,${buffer}`;

  return fileBase64;
};
