import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url';

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate short code
    const shortCode = nanoid(8);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    // Create new URL document
    const url = new Url({
      originalUrl,
      shortCode:shortCode,
      shortUrl:shortUrl,
    });

    await url.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      originalUrl
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectToUrl = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Update click count and last clicked time
    url.clicks += 1;
    url.lastClicked = new Date();
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting to URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUrlStats = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastClicked: url.lastClicked
    });
  } catch (error) {
    console.error('Error getting URL stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const urls = await Url.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Url.countDocuments();

    res.json({
      urls,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('Error getting all URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 