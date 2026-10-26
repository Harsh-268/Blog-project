import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../container/Container.jsx'
import Logo from '../Logo.jsx'
import LogoutBtn from './LougoutBtn.jsx'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: pathname !== '/' },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'My Posts', slug: '/my-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-gray-100' : 'text-gray-400 hover:text-gray-100'
    }`

  const close = () => setOpen(false)

  // Close after any navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While open: lock page scroll, close on Escape, close if resized to desktop
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link to="/" onClick={close} className="flex items-center text-gray-400 font-bold">
            <Logo width="70px" />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink to={item.slug} end={item.slug === '/'} className={linkClass}>
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {!authStatus && (
              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Sign up
                </Link>
              </li>
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </Container>

      {/* Mobile backdrop: dims the page and closes the menu when tapped */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Mobile drawer: slides in from the right and overlaps the page */}
      <aside
        aria-hidden={!open}
        className={`md:hidden fixed inset-y-0 right-0 z-50 flex w-72 max-w-[80%] flex-col border-l border-gray-700 bg-gray-800/90 shadow-2xl backdrop-blur-md transition-[transform,visibility] duration-800 ease-out ${
          open ? 'translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="p-2 -mr-2 text-gray-400 hover:text-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    end={item.slug === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-white/10 text-gray-100'
                          : 'text-gray-400 hover:bg-white/10 hover:text-gray-100'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}
        </ul>

        <div className="border-t border-gray-700 p-4">
          {!authStatus && (
            <Link
              to="/signup"
              onClick={close}
              className="block rounded-lg bg-white px-3 py-3 text-center text-base font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
              Sign up
            </Link>
          )}
          {authStatus && (
            <div onClick={close} className="px-3">
              <LogoutBtn />
            </div>
          )}
        </div>
      </aside>
    </header>
  )
}

export default Header
