import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: Number, required: true, unique: true },
  interests: { type: String, required: true },
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
