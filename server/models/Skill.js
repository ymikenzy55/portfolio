import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    trim: true
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  category: {
    type: String,
    enum: ['UI/UX', 'Frontend', 'Backend', 'Database', 'AI', 'Tools', 'Other'],
    required: [true, 'Please provide a category']
  },
  order: {
    type: Number,
    default: 0
  },
  audience: {
    type: String,
    enum: ['all', 'client', 'recruiter'],
    default: 'all'
  }
}, {
  timestamps: true
});

// Index for ordering and category
skillSchema.index({ category: 1, order: 1 });

export default mongoose.model('Skill', skillSchema);
