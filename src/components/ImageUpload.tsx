import React, { useState } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage,
  label = "Upload Image"
}) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onImageUpload(base64String);
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read file');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onImageUpload('');
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      {preview ? (
        <div className="image-preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <div className="image-actions">
            <label className="btn-change">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            <button className="btn-remove" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <label className="image-upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-placeholder">
            {uploading ? (
              <div className="upload-spinner">Uploading...</div>
            ) : (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p>Click to upload image</p>
                <span>PNG, JPG up to 5MB</span>
              </>
            )}
          </div>
        </label>
      )}
    </div>
  );
};
