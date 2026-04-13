// Admin Gallery Management Page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Edit, Check, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PageLoader } from '../../components/common/Loader';
import {
  fetchGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImageById,
  bulkDeleteImages,
  bulkUpdateCategory,
} from '../../services/gallery.service';
import { showSuccess, showError, toastActions } from '../../utils/toast.jsx';
import { confirmDelete } from '../../utils/confirm';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [uploadMetadata, setUploadMetadata] = useState({
    title: '',
    description: '',
    category: 'team',
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await fetchGalleryImages();
      setImages(data);
    } catch (error) {
      showError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    setUploadFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      showError('Please select images to upload');
      return;
    }

    try {
      await Promise.all(uploadFiles.map((file) => addGalleryImage(file, uploadMetadata)));
      toastActions.imagesUploaded(uploadFiles.length);
      setUploadFiles([]);
      setUploadMetadata({ title: '', description: '', category: 'team' });
      setShowUploadModal(false);
      loadImages();
    } catch (error) {
      showError('Failed to upload images');
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setUploadMetadata({
      title: image.title,
      description: image.description || '',
      category: image.category,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await updateGalleryImage(editingImage.id, uploadMetadata);
      toastActions.updated();
      setShowEditModal(false);
      setEditingImage(null);
      loadImages();
    } catch (error) {
      showError('Failed to update image');
    }
  };

  const handleDelete = async (image) => {
    const confirmed = await confirmDelete('this image');
    if (!confirmed) return;

    try {
      await deleteGalleryImageById(image.id, image.imageUrl);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      toastActions.imageDeleted();
    } catch (error) {
      showError('Failed to delete image');
    }
  };

  const toggleImageSelection = (imageId) => {
    setSelectedImages((prev) =>
      prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;

    const confirmed = await confirmDelete(`${selectedImages.length} selected image(s)`);
    if (!confirmed) return;

    try {
      const imagesToDelete = images.filter((img) => selectedImages.includes(img.id));
      await bulkDeleteImages(imagesToDelete);
      setImages((prev) => prev.filter((img) => !selectedImages.includes(img.id)));
      setSelectedImages([]);
      toastActions.deleted();
    } catch (error) {
      showError('Failed to delete images');
    }
  };

  const handleBulkCategoryUpdate = async (category) => {
    if (selectedImages.length === 0) return;

    try {
      await bulkUpdateCategory(selectedImages, category);
      toastActions.updated();
      setSelectedImages([]);
      loadImages();
    } catch (error) {
      showError('Failed to update category');
    }
  };

  const filteredImages =
    categoryFilter === 'all' ? images : images.filter((img) => img.category === categoryFilter);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text">
            Gallery Management
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
            Manage your image gallery
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Filters and Bulk Actions */}
      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="team">Team</option>
            <option value="office">Office & Team</option>
            <option value="client-success">Client Success</option>
            <option value="events">Events</option>
            <option value="awards">Awards</option>
            <option value="uncategorized">Uncategorized</option>
          </select>

          {selectedImages.length > 0 && (
            <>
              <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                {selectedImages.length} selected
              </span>
              <Button size="sm" variant="outline" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </Button>
              <select
                onChange={(e) => {
                  if (e.target.value) handleBulkCategoryUpdate(e.target.value);
                  e.target.value = '';
                }}
                className="px-3 py-1 text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
              >
                <option value="">Change Category</option>
                <option value="team">Team</option>
                <option value="office">Office & Team</option>
                <option value="client-success">Client Success</option>
                <option value="events">Events</option>
                <option value="awards">Awards</option>
              </select>
            </>
          )}
        </div>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div
              className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                selectedImages.includes(image.id)
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-light-border dark:hover:border-dark-border'
              }`}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => toggleImageSelection(image.id)}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" onClick={() => handleEdit(image)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(image)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
              {selectedImages.includes(image.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-light-text dark:text-dark-text mt-2 truncate">
              {image.title}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
              {image.category}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Images"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            />
            {uploadFiles.length > 0 && (
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-2">
                {uploadFiles.length} file(s) selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={uploadMetadata.title}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, title: e.target.value })}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={uploadMetadata.description}
              onChange={(e) =>
                setUploadMetadata({ ...uploadMetadata, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={uploadMetadata.category}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, category: e.target.value })}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            >
              <option value="team">Team</option>
              <option value="office">Office & Team</option>
              <option value="client-success">Client Success</option>
              <option value="events">Events</option>
              <option value="awards">Awards</option>
              <option value="uncategorized">Uncategorized</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleUpload} className="flex-1">
              Upload
            </Button>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Image">
        <div className="space-y-4">
          {editingImage && (
            <img
              src={editingImage.imageUrl}
              alt={editingImage.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={uploadMetadata.title}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, title: e.target.value })}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={uploadMetadata.description}
              onChange={(e) =>
                setUploadMetadata({ ...uploadMetadata, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={uploadMetadata.category}
              onChange={(e) => setUploadMetadata({ ...uploadMetadata, category: e.target.value })}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg"
            >
              <option value="team">Team</option>
              <option value="office">Office & Team</option>
              <option value="client-success">Client Success</option>
              <option value="events">Events</option>
              <option value="awards">Awards</option>
              <option value="uncategorized">Uncategorized</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleUpdate} className="flex-1">
              Update
            </Button>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
