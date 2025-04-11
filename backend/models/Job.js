const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected']
  },
  appliedDate: { type: Date, required: true },
  link: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
