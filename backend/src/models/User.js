const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  achieved: [
    {
      level_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
      points: { type: Number, default: 0 }
    }
  ],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  client_id: { type: Number, unique: true, required: true },
  ovpn_state: { type: Boolean, default: false },
  vms_state: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
