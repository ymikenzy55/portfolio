import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
    trim: true
  },
  caption: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for ordering
gallerySchema.index({ order: 1 });

export default mongoose.model('Gallery', gallerySchema);
