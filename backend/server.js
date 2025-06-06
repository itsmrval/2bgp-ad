require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

const User = require('./src/models/User');
const { retrieveWireguard, retrieveVM } = require('./src/utils/deployment');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/auth', require('./src/routes/auth'));
app.use('/users', require('./src/routes/users'));
app.use('/levels', require('./src/routes/levels'));
app.use('/points', require('./src/routes/points'));

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

async function backgroundLoop() {
  try {
      const users = await User.find();
      
      for (const user of users) {
          const ovpnData = await retrieveWireguard(user.client_id);
          const vmData = await retrieveVM(user.client_id);

          if (user.ovpn_state !== ovpnData.online) {
              console.log(`User ${user.username} OVPN state ${user.ovpn_state} changed: ${ovpnData.online}`);
              user.ovpn_state = ovpnData.online;
              user.save();
          }

          if (user.vms_state !== vmData.online) {
              console.log(`User ${user.username} VM state ${user.vms_state} changed: ${vmData.online}`);
              user.vms_state = vmData.online;
              user.save();
          }

      }
  } catch (err) {
      console.error('Error in background loop:', err);
  } finally {
      setTimeout(backgroundLoop, 5000);
  }
}

backgroundLoop();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
