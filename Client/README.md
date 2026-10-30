# Blog App (React + Appwrite)

A blogging web app built with React and Vite, using [Appwrite](https://appwrite.io) as the backend for authentication, database and file storage. Users can sign up, log in, and create, edit and delete posts with a rich-text editor and featured images.

> **Status:** Production Ready (Iterating)

## Tech Stack

- **React 19** with **Vite 8**
- **Redux Toolkit** and **React Redux** for state (auth slice)
- **React Router DOM 7** for routing
- **Appwrite 26** for auth, database (`TablesDB`) and storage
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Hook Form** for forms
- **TinyMCE** (`@tinymce/tinymce-react`) as the rich-text editor
- **html-react-parser** to render post HTML content
- **Oxlint** for linting

## Features

- Email/password sign-up, login and logout via Appwrite
- Session check on app load, with auth state kept in Redux
- Post CRUD: title, slug, content, featured image, status (`active` / inactive), owner
- Featured image upload, delete and preview through Appwrite Storage
- Header navigation that changes with login state

## Project Structure

```
Client/
├── public/                  # favicon and static icons
├── src/
│   ├── appwrite/
│   │   ├── auth.js          # AuthService: create account, login, logout, current user
│   │   └── configeration.js # Service: posts CRUD and file upload/delete/preview
│   ├── components/
│   │   ├── container/       # Layout wrapper
│   │   ├── Header/          # Header and LogoutBtn
│   │   ├── Footer/
│   │   ├── Button.jsx, Input.jsx, Select.jsx, Logo.jsx
│   │   └── index.js         # Barrel exports
│   ├── config/config.js     # Reads Appwrite settings from env vars
│   ├── store/
│   │   ├── authSlice.js     # login / logout reducers
│   │   └── store.js         # Redux store
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Tailwind import
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- An Appwrite project (Cloud or self-hosted) with:
  - Auth enabled (email/password)
  - A database with a posts collection containing the attributes: `title`, `content`, `featuredImage`, `status`, `userId`
  - A storage bucket for featured images

### Installation

```bash
cd Client
npm install
```

### Environment Variables

Create a `.env` file in `Client/` (it is git-ignored):

```env
VITE_APPWRITE_URL=https://<REGION>.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

### Run

```bash
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run Oxlint
```

## Roadmap

- [ ] Set up routes and `<Outlet />` in `App.jsx`
- [ ] Register `authSlice` in the Redux store
- [ ] Login and Signup pages
- [ ] All Posts, Post detail, Add/Edit Post pages
- [ ] Finish reusable `Select` component and real `Logo`
- [ ] Protected routes (auth guard)

## License

Add a license of your choice.