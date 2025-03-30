import express from 'express';
import {
  createShortUrl,
  getUrlStats,
  getAllUrls
} from '../controllers/urlController';

const router = express.Router();

// Create short URL
router.post('/shorten', createShortUrl);


// Get URL statistics
router.get('/stats/:shortCode', getUrlStats);

// Get all URLs with pagination
router.get('/', getAllUrls);

export default router; 