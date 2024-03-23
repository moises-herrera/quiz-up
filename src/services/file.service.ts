import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { firebaseStorage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload file to firebase storage.
 *
 * @param file The file to upload.
 * @returns The file url.
 */
export const uploadFile = async (
  folder: string,
  file: Blob
): Promise<string> => {
  try {
    const fileId = uuidv4();
    const storageRef = ref(firebaseStorage, `${folder}/${fileId}`);
    const result = await uploadBytes(storageRef, file);
    const fileUrl = getDownloadURL(result.ref);

    return fileUrl;
  } catch (error) {
    throw new Error('Ha ocurrido un error al cargar el archivo.');
  }
};

/**
 * Update file from firebase storage.
 *
 * @param folder The folder name.
 * @param newFile The new file.
 * @param oldFileUrl The old file url.
 * @returns
 */
export const updateFile = async (
  folder: string,
  newFile: Blob,
  oldFileUrl: string
): Promise<string> => {
  await deleteFile(oldFileUrl);
  return uploadFile(folder, newFile);
};

/**
 * Delete file from firebase storage.
 *
 * @param fileUrl The file url.
 */
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    const fileRef = ref(firebaseStorage, fileUrl);

    await deleteObject(fileRef);
  } catch (error) {
    throw new Error('Ha ocurrido un error.');
  }
};
