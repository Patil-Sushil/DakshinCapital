// Gallery Service - Handle gallery CRUD operations
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

/**
 * Upload gallery image to Firebase Storage
 */
export const uploadGalleryImage = async (file) => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `gallery/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete gallery image from Firebase Storage
 */
export const deleteGalleryImage = async (imageUrl) => {
  try {
    // Extract the path from the full URL
    // URL format: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?token=[token]
    const decodedUrl = decodeURIComponent(imageUrl);
    const pathMatch = decodedUrl.match(/\/o\/(.+?)\?/);

    if (pathMatch && pathMatch[1]) {
      const imagePath = pathMatch[1];
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    } else {
      // Fallback: try using the URL directly
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error if image doesn't exist in storage
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
};

/**
 * Add image to gallery
 */
export const addGalleryImage = async (file, metadata = {}) => {
  try {
    const imageUrl = await uploadGalleryImage(file);

    const docRef = await addDoc(collection(db, 'gallery'), {
      imageUrl,
      title: metadata.title || file.name,
      description: metadata.description || '',
      category: metadata.category || 'uncategorized',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

/**
 * Get all gallery images
 */
export const fetchGalleryImages = async () => {
  try {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
};

/**
 * Update gallery image metadata
 */
export const updateGalleryImage = async (id, metadata) => {
  try {
    await updateDoc(doc(db, 'gallery', id), {
      ...metadata,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    throw error;
  }
};

/**
 * Delete gallery image
 */
export const deleteGalleryImageById = async (id, imageUrl) => {
  try {
    await deleteGalleryImage(imageUrl);
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};

/**
 * Bulk delete images
 */
export const bulkDeleteImages = async (images) => {
  try {
    const batch = writeBatch(db);

    images.forEach((image) => {
      const docRef = doc(db, 'gallery', image.id);
      batch.delete(docRef);
      deleteGalleryImage(image.imageUrl).catch(() => {});
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk deleting images:', error);
    throw error;
  }
};

/**
 * Bulk update category
 */
export const bulkUpdateCategory = async (imageIds, category) => {
  try {
    const batch = writeBatch(db);

    imageIds.forEach((id) => {
      const docRef = doc(db, 'gallery', id);
      batch.update(docRef, { category, updatedAt: serverTimestamp() });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error bulk updating category:', error);
    throw error;
  }
};

export default {
  uploadGalleryImage,
  deleteGalleryImage,
  addGalleryImage,
  fetchGalleryImages,
  updateGalleryImage,
  deleteGalleryImageById,
  bulkDeleteImages,
  bulkUpdateCategory,
};
