import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname equivalents
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
