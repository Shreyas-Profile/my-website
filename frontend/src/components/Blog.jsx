import { useState, useEffect } from 'react';
import { activitiesAPI } from '../services/api';

const Blog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'coding',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await activitiesAPI.getAll();
      setActivities(data);
    } catch (error) {
      console.error('Failed to load activities:', error);
      // Fallback to sample data if API fails
      setActivities([
        {
          id: 1,
          title: 'Built my personal website',
          description:
            'Created a complete personal website with HTML, CSS, and JavaScript. Added sections for about me, achievements, travel, and a blog for daily activities.',
          category: 'coding',
          files: [{ name: 'website.html', type: 'text/html', size: 1024 }],
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('text/') || fileType.includes('javascript') || fileType.includes('python'))
      return 'fas fa-file-code';
    return 'fas fa-file';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('category', formData.category);

      // Append files
      selectedFiles.forEach((file) => {
        submitFormData.append('files', file);
      });

      await activitiesAPI.create(submitFormData);
      showNotification('Activity posted successfully!');

      // Reset form
      setFormData({ title: '', description: '', category: 'coding' });
      setSelectedFiles([]);
      document.getElementById('fileUpload').value = '';

      // Reload activities
      await loadActivities();
    } catch (error) {
      console.error('Failed to create activity:', error);
      alert('Failed to post activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    try {
      await activitiesAPI.delete(id);
      showNotification('Activity deleted successfully!');
      await loadActivities();
    } catch (error) {
      console.error('Failed to delete activity:', error);
      alert('Failed to delete activity. Please try again.');
    }
  };

  const openImageModal = (imageUrl, imageName) => {
    setImageModal({ url: imageUrl, name: imageName });
  };

  const closeImageModal = () => {
    setImageModal(null);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const getFileUrl = (file) => {
    if (file.url) {
      // If URL is relative, prepend API base URL
      if (file.url.startsWith('/')) {
        return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${file.url}`;
      }
      return file.url;
    }
    return null;
  };

  return (
    <section id="blog" className="blog">
      <div className="container">
        <h2 className="section-title">Daily Activities</h2>
        <div className="blog-content">
          <p className="blog-intro">Sharing my daily activities, projects, and what I'm working on.</p>

          {/* Post Creation Form */}
          <div className="post-form-container">
            <form className="activity-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Share Your Activity</h3>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="activityTitle"
                  name="title"
                  placeholder="What did you do today?"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="activityDescription"
                  name="description"
                  placeholder="Describe your activity..."
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <select
                  id="activityCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="coding">Coding</option>
                  <option value="learning">Learning</option>
                  <option value="project">Project</option>
                  <option value="school">School</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fileUpload" className="file-upload-label">
                  <i className="fas fa-paperclip"></i>
                  <span>Attach Files (Optional)</span>
                  <input
                    type="file"
                    id="fileUpload"
                    name="files"
                    multiple
                    accept="image/*,.pdf,.txt,.py,.js,.html,.css"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedFiles.length > 0 && (
                  <div className="file-preview">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-preview-item">
                        <i className={getFileIcon(file.type)}></i>
                        <span>{file.name}</span>
                        <button
                          type="button"
                          className="remove-file"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Activity'}
              </button>
            </form>
          </div>

          {/* Activities Feed */}
          <div className="activities-feed">
            <h3>Recent Activities</h3>
            {loading ? (
              <p>Loading activities...</p>
            ) : activities.length === 0 ? (
              <p>No activities yet. Be the first to post!</p>
            ) : (
              <div className="activities-list">
                {activities.map((activity) => {
                  const imageFiles = activity.files?.filter((f) => f.type?.startsWith('image/')) || [];
                  const otherFiles = activity.files?.filter((f) => !f.type?.startsWith('image/')) || [];

                  return (
                    <div key={activity.id} className="activity-post">
                      <div className="activity-header">
                        <div className="activity-meta">
                          <span className="activity-date">{formatDate(activity.created_at)}</span>
                          <span className={`activity-category ${activity.category}`}>
                            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                          </span>
                        </div>
                        <button
                          className="delete-activity"
                          onClick={() => handleDelete(activity.id)}
                          title="Delete activity"
                        >
                          ×
                        </button>
                      </div>
                      <h4 className="activity-title">{activity.title}</h4>
                      <p className="activity-description">{activity.description}</p>
                      {imageFiles.length > 0 && (
                        <div className="activity-images">
                          {imageFiles.map((file, idx) => {
                            const imageUrl = getFileUrl(file);
                            return imageUrl ? (
                              <div key={idx} className="image-container">
                                <img
                                  src={imageUrl}
                                  alt={file.name}
                                  className="activity-image"
                                  onClick={() => openImageModal(imageUrl, file.name)}
                                />
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                      {otherFiles.length > 0 && (
                        <div className="activity-files">
                          {otherFiles.map((file, idx) => (
                            <span key={idx} className="file-attachment">
                              <i className={getFileIcon(file.type)}></i>
                              <span>{file.name}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageModal && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="image-modal-close" onClick={closeImageModal}>
              &times;
            </span>
            <img src={imageModal.url} alt={imageModal.name} className="modal-image" />
            <p className="modal-image-name">{imageModal.name}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;

