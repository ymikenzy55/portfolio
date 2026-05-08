# Portfolio Website

A modern, professional portfolio website built with React, TypeScript, and Node.js.

## Features

- 🎨 Modern UI with liquid glass morphism design
- 📱 Fully responsive mobile-first design
- 🎯 Dual audience targeting (Clients & Recruiters)
- 🖼️ Dynamic project showcase
- 📧 Contact form with backend integration
- 🔐 Secure admin dashboard
- 🌐 RESTful API backend
- 💾 MongoDB database integration

## Tech Stack

### Frontend
- React 19
- TypeScript
- React Router
- Vite
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ymikenzy55/portfolio.git
cd portfolio
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Configure environment variables
```bash
# Create .env file in server directory
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

5. Start the development servers

Frontend:
```bash
npm run dev
```

Backend (in separate terminal):
```bash
cd server
npm start
```

## Project Structure

```
portfolio/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── server/                # Backend source code
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── middleware/       # Express middleware
└── public/               # Static assets
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start backend server
- `npm run dev` - Start with nodemon (auto-reload)

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Deployment

### Frontend
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Backend
The backend can be deployed to:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please reach out through the contact form on the website.
