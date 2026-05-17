# Portfolio Backend API

Node.js + Express + MongoDB backend for the portfolio website.

## Features

- RESTful API architecture
- JWT authentication with cookies
- MongoDB database with Mongoose ODM
- Role-based access control (Admin/User)
- Input validation and sanitization
- Rate limiting and security headers
- Error handling middleware
- CORS enabled

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio`

### Option 2: MongoDB Atlas

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Seeding Database

Populate the database with initial data:

```bash
npm run seed
```

This will create:
- Admin user
- Sample projects
- Sample articles
- Team members
- Skills
- Site content

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Articles
- `GET /api/articles` - Get published articles
- `GET /api/articles/all` - Get all articles (Admin)
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (Admin)
- `PUT /api/articles/:id` - Update article (Admin)
- `DELETE /api/articles/:id` - Delete article (Admin)

### Contacts
- `GET /api/contacts` - Get all contacts (Admin)
- `POST /api/contacts` - Submit contact form
- `PUT /api/contacts/:id` - Update contact status (Admin)
- `DELETE /api/contacts/:id` - Delete contact (Admin)

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get single team member
- `POST /api/team` - Create team member (Admin)
- `PUT /api/team/:id` - Update team member (Admin)
- `DELETE /api/team/:id` - Delete team member (Admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (Admin)
- `PUT /api/skills/:id` - Update skill (Admin)
- `DELETE /api/skills/:id` - Delete skill (Admin)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Create gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

### Site Content
- `GET /api/site-content` - Get all site content
- `GET /api/site-content/:key` - Get content by key
- `PUT /api/site-content` - Update site content (Admin)
- `PUT /api/site-content/:key` - Update content by key (Admin)

### Health Check
- `GET /api/health` - Server health check

## Authentication

The API uses JWT tokens for authentication. Tokens are sent in two ways:
1. HTTP-only cookies (primary)
2. Authorization header: `Bearer <token>` (fallback)

### Login Example:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'admin@portfolio.com',
    password: 'admin123'
  })
});

const data = await response.json();
// Token is automatically stored in HTTP-only cookie
// Also returned in response for localStorage backup
```

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 10 minutes)
- CORS configuration
- HTTP-only cookies for JWT
- Password hashing with bcrypt
- Input validation
- MongoDB injection prevention

## Error Handling

All errors return JSON in this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── projectController.js
│   ├── articleController.js
│   ├── contactController.js
│   ├── teamController.js
│   ├── skillController.js
│   ├── galleryController.js
│   └── contentController.js
├── middleware/            # Custom middleware
│   ├── auth.js           # Authentication & authorization
│   └── errorHandler.js   # Error handling
├── models/               # Mongoose models
│   ├── User.js
│   ├── Project.js
│   ├── Article.js
│   ├── Contact.js
│   ├── TeamMember.js
│   ├── Skill.js
│   ├── Gallery.js
│   └── SiteContent.js
├── routes/               # API routes
│   ├── auth.js
│   ├── projects.js
│   ├── articles.js
│   ├── contacts.js
│   ├── team.js
│   ├── skills.js
│   ├── gallery.js
│   └── content.js
├── scripts/
│   └── seed.js          # Database seeding
├── utils/
│   └── generateToken.js # JWT token generation
├── .env.example         # Environment variables template
├── package.json
├── README.md
└── server.js           # Main application file
```

## Default Admin Credentials

After seeding:
- Email: `admin@portfolio.com`
- Password: `admin123`

⚠️ **Change these credentials in production!**

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Port Already in Use
- Change PORT in `.env`
- Kill process using port 5000: `lsof -ti:5000 | xargs kill`

### CORS Errors
- Verify CLIENT_URL in `.env` matches frontend URL
- Ensure credentials: 'include' in frontend fetch calls

## License

MIT
