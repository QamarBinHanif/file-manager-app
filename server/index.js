const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes'); 
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());

connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
