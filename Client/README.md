# Blog App (React + Appwrite)

A blogging web app built with React and Vite, using [Appwrite](https://appwrite.io) as the backend for authentication, database and file storage. Users can sign up, log in, and create, edit and delete posts with a rich-text editor and featured images. Everyone can read published posts; only logged-in users can browse the full list and write.

> **Status:** Core features complete. Remaining work is polish (branding, footer content, tests). See the [Roadmap](#roadmap).

## Tech Stack

- **React 19** with **Vite 8**
- **Redux Toolkit** and **React Redux** for state (auth slice)
- **React Router DOM 7** (`createBrowserRouter`) for routing
- **Appwrite 26** for auth, database (`TablesDB`) and storage
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Hook Form** for forms
- **TinyMCE** (`@tinymce/tinymce-react`) as the rich-text editor
- **html-react-parser** to render post HTML content
- **Oxlint** for linting

## Features

- Email/password sign-up, login and logout via Appwrite
- Session check on app load, with auth state kept in Redux
- Protected routes: `AuthLayout` redirects logged-out users to `/login` and logged-in users away from `/login` and `/signup`
- Landing page with a hero, latest posts, feature highlights and a call to action that adapts to login state
- Post CRUD: title, auto-generated slug (used as the document ID, max 36 chars), rich-text content, featured image, status (`active` / `inactive`), owner
- Pages for all posts, your own posts (with a "Draft" badge on inactive ones), single post view, add post and edit post
- Author-only Edit and Delete controls on the post page, with a confirmation modal before deleting
- Deleting a post also removes its featured image from storage; replacing an image on edit deletes the old one
- Featured image upload and preview through Appwrite Storage
- Responsive layout, including a slide-in mobile navigation drawer (closes on route change, Escape, backdrop tap or resize to desktop)
- Header navigation that changes with login state

## Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/login` | Login | Logged-out only |
| `/signup` | Sign up | Logged-out only |
| `/all-posts` | All posts | Logged-in |
| `/my-posts` | My posts | Logged-in |
| `/add-post` | Add post | Logged-in |
| `/edit-post/:slug` | Edit post | Logged-in |
| `/post/:slug` | Post detail | Public |

## Project Structure

```
Client/
├── public/                    # favicon and static icons
├── src/
│   ├── appwrite/
│   │   ├── auth.js            # AuthService: create account, login, logout, current user
│   │   └── configeration.js   # Service: posts CRUD and file upload/delete/preview
│   ├── components/
│   │   ├── container/         # Layout wrapper
│   │   ├── Header/            # Header (desktop + mobile drawer) and LogoutBtn
│   │   ├── Footer/
│   │   ├── post-form/         # PostForm (create/edit)
│   │   ├── AuthLayout.jsx     # Route guard
│   │   ├── ConfirmModal.jsx   # Delete confirmation dialog
│   │   ├── PostCard.jsx
│   │   ├── RTE.jsx            # TinyMCE editor wired to React Hook Form
│   │   ├── Login.jsx, SignUp.jsx
│   │   ├── Button.jsx, Input.jsx, Select.jsx, Logo.jsx
│   │   └── index.js           # Barrel exports
│   ├── config/config.js       # Reads Appwrite and TinyMCE settings from env vars
│   ├── pages/                 # Home, Login, Signup, AllPost, MyPosts, AddPost, EditPost, Post
│   ├── store/
│   │   ├── authSlice.js       # login / logout reducers
│   │   └── store.js           # Redux store (auth reducer registered)
│   ├── App.jsx                # Session check + Header / Outlet / Footer
│   ├── main.jsx               # Router and providers
│   └── index.css              # Tailwind import
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- A [TinyMCE](https://www.tiny.cloud) API key
- An Appwrite project (Cloud or self-hosted) with:
  - Auth enabled (email/password)
  - A database with a posts table containing the columns: `title`, `content`, `featuredImage`, `status`, `userId`
  - A storage bucket for featured images
  - Permissions that allow public read on posts and images, and create/update/delete for authenticated users (ideally restricted to the owner)

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
VITE_APPWRITE_COLLECTION_ID=your_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### Run

```bash
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run Oxlint
```

## Roadmap

- [x] Set up routes and `<Outlet />` in `App.jsx`
- [x] Register `authSlice` in the Redux store
- [x] Login and Signup pages
- [x] All Posts, Post detail, Add/Edit Post pages
- [x] My Posts page
- [x] Protected routes (auth guard)
- [x] Reusable `Select` component
- [x] Delete confirmation modal
- [x] Responsive layout and mobile nav drawer
- [ ] Replace the text placeholder `Logo` with a real logo, and fix the favicon reference in `index.html`
- [ ] Replace placeholder footer links and copyright text
- [ ] Remove unused Vite starter files (`App.css`, default assets)
- [ ] Show validation errors on forms and a user-facing error when saving a post fails
- [ ] Sanitize post HTML before rendering
- [ ] Search, pagination and tags for posts
- [ ] Automated tests

## License

Add a license of your choice.