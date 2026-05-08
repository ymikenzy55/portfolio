import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an article title'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide article content']
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: String,
    default: '5 min'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
articleSchema.index({ published: 1, featured: 1 });
articleSchema.index({ tags: 1 });

export default mongoose.model('Article', articleSchema);
