# URL Shortener

A modern URL shortening service built with the MERN stack (MongoDB, Express.js, React, and Node.js).

## Features

- Convert long URLs into short, shareable links
- Track click analytics for shortened URLs
- Modern and responsive user interface
- Real-time URL validation
- Copy to clipboard functionality
- QR code generation for shortened URLs

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express.js
- Database: MongoDB
- Styling: Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   BASE_URL=http://localhost:5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm start
   ```

5. Open http://localhost:3000 in your browser

## API Endpoints

- POST /api/url/shorten - Create a new short URL
- GET /api/url/:shortCode - Redirect to original URL
- GET /api/url/stats/:shortCode - Get URL statistics
- GET /api/urls - Get all URLs (with pagination)
