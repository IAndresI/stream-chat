const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {connect} = require('getstream');
const StreamChat = require('stream-chat').StreamChat;

const {STREAM_API_KEY, STREAM_API_SECRET_KEY, STREAM_APP_ID} = process.env

class AuthController {
  async signUp(req, res) {
    try {
      const { fullName, lastName, phoneNumber, avatar, password} = req.body;
      const userId = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(password, 10);

      const serverClient = connect(STREAM_API_KEY, STREAM_API_SECRET_KEY, STREAM_APP_ID);
      const token = serverClient.createUserToken(userId)

      res.status(200).json({token, fullName, lastName, phoneNumber, avatar, hashedPassword, userId})
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  }

  async login(req, res) {
    try {
      const {userName, password} = req.body;

      const serverClient = connect(STREAM_API_KEY, STREAM_API_SECRET_KEY, STREAM_APP_ID);
      const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET_KEY);

      const {users} = await client.queryUsers({name: userName})

      if(!users.length) {
        return res.status(400).json({message: "User not found"})
      }

      const success = await bcrypt.compare(password, users[0].hashedPassword);
      const token = serverClient.createUserToken(users[0].id)

      if(success) {
        const {id, fullName} = users[0]
        return res.status(200).json({token, fullName, userId: id})
      }
      else {
        return res.status(500).json({message: "Incorrect Password"})
      } 
    }
    catch(err) {
      res.status(500).json({message: err.message});
    }
  }
}

module.exports = new AuthController();