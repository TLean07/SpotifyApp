import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
