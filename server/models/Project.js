import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  client: {
    type: String,
    trim: true,
    default: 'Confidential Client'
  },
  industry: {
    type: String,
    trim: true,
    default: 'Technology'
  },
  problem: {
    type: String,
    trim: true
  },
  solution: {
    type: String,
    trim: true
  },
  outcome: {
    type: String,
    trim: true
  },
  results: {
    type: String,
    trim: true,
    default: 'Delivered on time and within budget with excellent client satisfaction.'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'ai', 'design', 'other'],
    default: 'web'
  },
  projectType: {
    type: String,
    enum: ['web', 'mobile', 'ai', 'design', 'other'],
    default: 'web'
  },
  audience: {
    type: String,
    enum: ['all', 'client', 'recruiter'],
    default: 'all'
  },
  completedDate: {
    type: Date,
    default: Date.now
  },
  aiWorkflow: {
    type: String,
    trim: true
  },
  previewImage: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  liveLink: {
    type: String,
    trim: true
  },
  repoLink: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ featured: 1, status: 1 });
projectSchema.index({ category: 1 });

export default mongoose.model('Project', projectSchema);
