# LINKA

A modern, responsive social media application built with TypeScript, Vite, Tailwind CSS v4, and the Noroff Social API v2.

## Live Project & Repository

**Production Deploy:** [https://linka.netlify.app/](https://linka-css-frameworks-ca.netlify.app/)  
**GitHub Repository:** [https://github.com/R3N8/social_platform.git](https://github.com/R3N8/linka_cssframework)  
**API Base URL:** [https://v2.api.noroff.dev/social/posts](https://v2.api.noroff.dev/social/posts)

## Login Details (Demo)

Email: h-s-r@stud.noroff.no
Password: Noroff@123

## Features

### Authentication

- User registration requiring a `@stud.noroff.no` email address
- JWT-based login and secure local storage
- Client-side validation and helpful error messages
- Auto-redirects based on login status

### Feed & Posts

- Interactive post cards with click-to-view details
- Real-time search (users, posts, hashtags)
- Pagination with next/previous navigation
- Responsive grid layout
- Sample demo posts for guests

### Post Management

- Create, edit, delete posts
- View posts of other users
- Full single post display with author details

### Post Interactions

- Emoji reactions with hover modal
- Comment system (view and create comments)
- Reply to comments
- Share functionality (native + clipboard fallback)
- Media support (responsive images)
- Hashtags with styling indicators

### Navigation & UX

- Custom client-side routing
- Responsive navbar with search
- Custom animated 404 page
- Loading states and error handling

## Tech Stack

- **Frontend:** TypeScript (Vite)
- **CSS Framework:** Tailwind CSS v4 (via npm, @tailwindcss/vite)
- **Fonts:** @fontsource (Bebas Neue, Open Sans)
- **Icons:** Font Awesome Free (via npm)
- **3D Graphics:** Three.js + GSAP
- **API:** Noroff Social API v2
- **Authentication:** JWT + Local Storage
- **Routing:** Custom client-side router
- **Testing:** Vitest
- **Code Formatting:** Prettier
- **Deployment:** Netlify
- **3D Graphics:** Three.js + GSAP

## Quick Start

### Prerequisites

- Node.js v16+
- npm or yarn
- Noroff @stud.noroff.no account

### Installation

```bash
git clone https://github.com/R3N8/linka_cssframework
cd social_platform
npm install
cp .env.example .env
```

### Environment Variables

```bash
VITE_APP_NAME=""
VITE_BASE_URL=""
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Acknowledgments

- **Noroff API v2** for backend services
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast dev environment
- **Three.js & GSAP** for interactive 3D graphics
- **Font Awesome** for iconography
- **Netlify** for deployment and hosting
- **Monde Sineke** ([S3ak](https://github.com/S3ak)) – instructor guidance and starter template
