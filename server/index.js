require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/', authRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
