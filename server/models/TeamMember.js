import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  photoUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    default: 'core'
  },
  audience: {
    type: String,
    enum: ['all', 'client', 'recruiter'],
    default: 'all'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for ordering
teamMemberSchema.index({ order: 1 });

export default mongoose.model('TeamMember', teamMemberSchema);
