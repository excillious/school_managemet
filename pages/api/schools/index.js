import multer from 'multer';
import pool from '../../../utils/db';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: '/tmp' }); // Temporary storage location

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const { name, address, city, state, contact, email_id } = req.body;
        const image = req.file;

        if (!image) {
          return res.status(400).json({ error: 'Image is required' });
        }

        // Ensure the directory exists
        const targetDir = path.join(process.cwd(), 'public/schoolImages');
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        // Move the image file to the desired folder
        const targetPath = path.join(targetDir, image.originalname);
        await fs.promises.rename(image.path, targetPath);

        // Insert data into the database
        const [result] = await pool.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, address, city, state, contact, `/schoolImages/${image.originalname}`, email_id]
        );
        res.status(200).json({ id: result.insertId });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute('SELECT * FROM schools');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;



