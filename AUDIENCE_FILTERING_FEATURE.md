# Audience-Specific Content Filtering

## Overview
Added audience-based filtering so content can be targeted to specific viewers (clients vs recruiters).

## Changes Made

### Backend Changes

#### 1. Models Updated
Added `audience` field to three models:
- `server/models/Project.js` - Projects can be shown to specific audiences
- `server/models/Skill.js` - Skills can be targeted to clients or recruiters
- `server/models/TeamMember.js` - Team members can be displayed based on audience

Field options:
- `'all'` - Visible to everyone (default)
- `'client'` - Only visible on client pages
- `'recruiter'` - Only visible on recruiter pages

#### 2. Controllers Updated
Updated GET endpoints to support audience filtering via query parameter:
- `server/controllers/projectController.js` - `GET /api/projects?audience=client`
- `server/controllers/skillController.js` - `GET /api/skills?audience=recruiter`
- `server/controllers/teamController.js` - `GET /api/team?audience=client`

Query logic: `audience: { $in: ['all', audience] }` - Returns items marked as 'all' OR the specific audience.

### Frontend Changes

#### 1. Page-Specific API Calls
- `src/pages/ClientSection.tsx` - Fetches projects with `?audience=client`
- `src/pages/RecruiterSection.tsx` - Fetches team members with `?audience=recruiter`

#### 2. Admin Dashboard Updates
Added audience dropdown to admin forms:
- Project form - Select which audience sees each project
- Skill form - Target skills to specific audiences
- Team member form - Control team member visibility

Updated TypeScript interfaces and form states to include `audience` field.

## How It Works

### For Admins
1. When creating/editing content in the admin dashboard, select the audience:
   - "All" - Everyone sees it
   - "Clients Only" - Only visible on /clients page
   - "Recruiters Only" - Only visible on /recruiters page

2. The audience field is saved to the database with the content.

### For Users
1. When visiting `/clients` page:
   - Only sees projects marked as "all" or "client"
   
2. When visiting `/recruiters` page:
   - Only sees team members marked as "all" or "recruiter"
   - Only sees skills marked as "all" or "recruiter"

3. HomePage shows all content (no filtering) since it's the landing page.

## Benefits
- Tailor content to different audiences
- Show technical skills to recruiters, business outcomes to clients
- Highlight different team members based on context
- More relevant, focused user experience

## Example Use Cases
- Show detailed technical projects to recruiters
- Show business-focused case studies to clients
- Display backend skills only to recruiters
- Show design-focused team members to clients

## Testing
1. Create a project and set audience to "Clients Only"
2. Visit `/clients` - project should appear
3. Visit `/recruiters` - project should NOT appear
4. Set audience to "All" - project appears on both pages
