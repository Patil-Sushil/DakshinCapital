// Project Service - Handle project CRUD operations
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
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

/**
 * Upload project image to Firebase Storage
 */
export const uploadProjectImage = async (file, projectId) => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `projects/${projectId}/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete project image from Firebase Storage
 */
export const deleteProjectImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Create new project
 */
export const createProject = async (projectData, images = []) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      galleryImages: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    if (images.length > 0) {
      const imageUrls = await Promise.all(images.map((img) => uploadProjectImage(img, docRef.id)));
      await updateDoc(docRef, { galleryImages: imageUrls });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Get all projects
 */
export const fetchProjects = async () => {
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Update project
 */
export const updateProject = async (id, projectData, newImages = []) => {
  try {
    const updateData = {
      ...projectData,
      updatedAt: serverTimestamp(),
    };

    if (newImages.length > 0) {
      const imageUrls = await Promise.all(newImages.map((img) => uploadProjectImage(img, id)));
      updateData.galleryImages = [...(projectData.galleryImages || []), ...imageUrls];
    }

    await updateDoc(doc(db, 'projects', id), updateData);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * Delete project
 */
export const deleteProject = async (id, imageUrls = []) => {
  try {
    // Delete all images
    await Promise.all(imageUrls.map((url) => deleteProjectImage(url).catch(() => {})));

    // Delete document
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export default {
  uploadProjectImage,
  deleteProjectImage,
  createProject,
  fetchProjects,
  updateProject,
  deleteProject,
};
