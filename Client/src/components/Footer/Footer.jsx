import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const headingClass = "tracking-px mb-4 md:mb-9 text-xs font-semibold uppercase text-gray-500"
  const linkClass = "text-sm md:text-base font-medium text-gray-400 hover:text-gray-100 transition-colors"
  const itemClass = "mb-3 md:mb-4"

  return (
    <section className="relative overflow-hidden py-8 md:py-10 bg-gray-800 border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-4 md:-m-6 flex flex-wrap">
          <div className="w-full p-4 md:p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center text-gray-400 font-bold">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 p-4 md:p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className={headingClass}>Company</h3>
              <ul>
                <li className={itemClass}><Link className={linkClass} to="/">Features</Link></li>
                <li className={itemClass}><Link className={linkClass} to="/">Pricing</Link></li>
                <li className={itemClass}><Link className={linkClass} to="/">Affiliate Program</Link></li>
                <li><Link className={linkClass} to="/">Press Kit</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 p-4 md:p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className={headingClass}>Support</h3>
              <ul>
                <li className={itemClass}><Link className={linkClass} to="/">Account</Link></li>
                <li className={itemClass}><Link className={linkClass} to="/">Help</Link></li>
                <li className={itemClass}><Link className={linkClass} to="/">Contact Us</Link></li>
                <li><Link className={linkClass} to="/">Customer Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-full p-4 md:p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className={headingClass}>Legals</h3>
              <ul>
                <li className={itemClass}><Link className={linkClass} to="/">Terms &amp; Conditions</Link></li>
                <li className={itemClass}><Link className={linkClass} to="/">Privacy Policy</Link></li>
                <li><Link className={linkClass} to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer