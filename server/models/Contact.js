import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  reply: {
    message: String,
    sentAt: Date,
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
contactSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
