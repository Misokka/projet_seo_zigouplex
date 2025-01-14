"use client";

import React, { useState } from 'react'

import "./navbar.css"

function navbar() {
    const [isActive, setIsActive] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <nav className="px-4 py-4 relative flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-brown"><a href="/">Zigouplex</a></h1>

                <div onClick={() => setIsActive(!isActive)} className={isActive ? "burger-menu w-8 h-4 relative sm:hidden active" : "burger-menu w-8 h-4 relative sm:hidden"}>
                    <span className="w-full h-[2px] bg-amber-800 absolute top-0 transition-all"></span>
                    <span className="w-full h-[2px] bg-amber-800 absolute top-1/2 transition-all"></span>
                    <span className="w-full h-[2px] bg-amber-800 absolute top-full transition-all"></span>
                </div>
                {/*hidden in large screens */}
                <ul className={isActive ? "flex flex-col space-y-4 px-4 py-4 absolute top-full left-0 w-full shadow-md bg-white transition-all sm:hidden" : "hidden"}>
                    <li>
                        <a
                        href="/#home"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Accueil
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#about"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        À propos
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#products"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Produits
                        </a>
                    </li>
                    <li>
                        <a
                        href="/pages/blog"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Blog
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#contact"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Contact
                        </a>
                    </li>
                </ul>
                <ul className="hidden sm:flex sm:space-x-6">
                    <li>
                        <a
                        href="/#home"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Accueil
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#about"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        À propos
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#products"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Produits
                        </a>
                    </li>
                    <li>
                        <a
                        href="/pages/blog"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Blog
                        </a>
                    </li>
                    <li>
                        <a
                        href="/#contact"
                        className="text-gray-700 hover:text-brown font-medium transition"
                        >
                        Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
  )
}

export default navbar