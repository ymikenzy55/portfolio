# Portfolio Routing Structure

## Overview
The portfolio has a clear routing structure with audience-specific content filtering.

## Routes

### Public Routes

#### 1. `/` - Landing Page (HomePage)
- **Purpose**: First page users see with audience choice
- **Content**: Hero section with two CTA buttons
  - "For Clients" → Routes to `/clients`
  - "For Recruiters" → Routes to `/recruiters`
- **API Calls**: None (static content only)
- **Layout**: No MainLayout (full-screen hero)

#### 2. `/clients` - Client Portfolio View
- **Purpose**: Show projects and business outcomes to potential clients
- **Content**: 
  - Featured projects
  - Project case studies (problem, solution, outcome)
  - Business-focused messaging
- **API Calls**: 
  - `GET /api/projects?audience=client` - Only shows projects marked for clients or all
- **Layout**: MainLayout (with navigation)

#### 3. `/recruiters` - Recruiter Technical View
- **Purpose**: Show technical skills and experience to recruiters
- **Content**:
  - Technical skills by category
  - Team member profiles
  - Development philosophy
  - Resume download
- **API Calls**:
  - `GET /api/team?audience=recruiter` - Only shows team members marked for recruiters or all
  - `GET /api/skills?audience=recruiter` - Only shows skills marked for recruiters or all
- **Layout**: MainLayout (with navigation)

#### 4. `/process` - Process/Workflow Page
- **Purpose**: Explain development process
- **API Calls**: `GET /api/site-content` (for process content)
- **Layout**: MainLayout

#### 5. `/articles` - Blog/Articles Page
- **Purpose**: Technical articles and blog posts
- **API Calls**: `GET /api/articles`
- **Layout**: MainLayout

#### 6. `/contact` - Contact Form
- **Purpose**: Allow visitors to send messages
- **API Calls**: `POST /api/contacts`
- **Layout**: MainLayout

### Protected Routes

#### 7. `/login` - Admin Login
- **Purpose**: Authentication for admin access
- **API Calls**: `POST /api/auth/login`
- **Layout**: No layout (full-screen login form)

#### 8. `/padmin` - Admin Dashboard
- **Purpose**: Manage all content (projects, skills, team, etc.)
- **Requires**: Authentication (JWT token)
- **API Calls**: All CRUD operations for content management
- **Layout**: Custom admin layout

## API Endpoint Structure

### Content Endpoints with Audience Filtering

All content endpoints support optional `?audience=client|recruiter` query parameter:

```
GET /api/projects?audience=client
GET /api/projects?audience=recruiter
GET /api/skills?audience=client
GET /api/skills?audience=recruiter
GET /api/team?audience=client
GET /api/team?audience=recruiter
```

**Filtering Logic**: Returns items where `audience` field is either:
- `'all'` (visible to everyone)
- Matches the requested audience (`'client'` or `'recruiter'`)

### Other Endpoints

```
GET /api/articles - All published articles
GET /api/gallery - Gallery images
GET /api/site-content - Hero, process, about content
POST /api/contacts - Submit contact form
GET /api/contacts - Admin: View messages
POST /api/auth/login - Admin login
GET /api/auth/me - Check auth status
```

## User Flow

### First-Time Visitor
1. Lands on `/` (HomePage with preloader)
2. Sees hero section with two choices
3. Clicks either:
   - "View Projects" → `/clients`
   - "View Skills" → `/recruiters`
4. Can navigate to other pages via MainLayout navigation

### Returning Visitor
1. Can directly visit any public route
2. No forced choice or session tracking
3. Can switch between `/clients` and `/recruiters` anytime

### Admin
1. Visits `/login`
2. Authenticates with credentials
3. Redirected to `/padmin`
4. Manages content with audience targeting

## Content Targeting in Admin

When creating/editing content in admin dashboard:

### Projects
- Set `audience` field:
  - "All" - Visible on both `/clients` and `/recruiters`
  - "Clients Only" - Only visible on `/clients`
  - "Recruiters Only" - Only visible on `/recruiters`

### Skills
- Set `audience` field:
  - "All" - Shown to everyone
  - "Clients Only" - Business-focused skills
  - "Recruiters Only" - Technical skills

### Team Members
- Set `audience` field:
  - "All" - Shown to everyone
  - "Clients Only" - Client-facing team members
  - "Recruiters Only" - Technical team members

## Benefits of This Structure

1. **Clear Separation**: Clients see business value, recruiters see technical depth
2. **Flexible Content**: Same content can be shown to both or targeted to one audience
3. **Simple Navigation**: Users choose their path, no complex routing logic
4. **SEO Friendly**: Each route has distinct content and purpose
5. **Easy to Extend**: Add new audience types or routes as needed

## Example Scenarios

### Scenario 1: Technical Project
- Create project in admin
- Set audience to "Recruiters Only"
- Result: Shows on `/recruiters`, hidden on `/clients`

### Scenario 2: Business Case Study
- Create project in admin
- Set audience to "Clients Only"
- Result: Shows on `/clients`, hidden on `/recruiters`

### Scenario 3: Universal Project
- Create project in admin
- Set audience to "All"
- Result: Shows on both `/clients` and `/recruiters`
