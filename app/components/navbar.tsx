"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { FaInstagram, FaFacebookF, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  // Fermer le menu quand on clique sur un lien
  const closeMenu = () => setIsActive(false);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

  return (
    <header className="bg-light text-dark shadow-md sticky top-0 z-50 font-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Left - Logo + Brand */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Logo Salon Patricia Osores" 
            className="h-10 sm:h-12 w-auto"
          />
          <div className="flex flex-col">
            <a href="/" className="text-xl sm:text-2xl font-brand font-bold tracking-wide">
              Patricia Osores
            </a>
            <span className="text-xs sm:text-sm text-accent">Salon de coiffure</span>
          </div>
        </div>

        {/* Burger (mobile + tablet - passe en burger dès 1024px) */}
        <button
          onClick={() => setIsActive(!isActive)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors touch-manipulation"
          aria-label={isActive ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isActive}
        >
          {isActive ? (
            <FaTimes className="text-2xl text-dark" />
          ) : (
            <FaBars className="text-2xl text-dark" />
          )}
        </button>

        {/* Center - Nav links (desktop only - 1024px+) */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-[15px] font-medium">
          <a href="/#home" className="hover:text-primary transition">Accueil</a>
          <a href="/#about" className="hover:text-primary transition">À propos</a>
          <a href="/#services" className="hover:text-primary transition">Services</a>
          <a href="/#gallery" className="hover:text-primary transition">Galerie</a>
          <a href="/#contact" className="hover:text-primary transition">Contact</a>
        </nav>

        {/* Right - Button + Socials (desktop only - 1024px+) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button text="Prendre rendez-vous" href="/rendezvous" />
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark hover:text-primary transition p-2"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark hover:text-primary transition p-2"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>

      {/* Mobile/Tablet Menu - Full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-light z-40 transition-transform duration-300 ease-in-out ${
          isActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="h-full flex flex-col px-6 py-8 space-y-2 overflow-y-auto">
          {/* Navigation principale */}
          <a 
            href="/#home" 
            onClick={closeMenu}
            className="block py-4 text-lg font-medium hover:text-primary transition border-b border-gray-200 touch-manipulation"
          >
            Accueil
          </a>
          <a 
            href="/#about" 
            onClick={closeMenu}
            className="block py-4 text-lg font-medium hover:text-primary transition border-b border-gray-200 touch-manipulation"
          >
            À propos
          </a>
          <a 
            href="/#services" 
            onClick={closeMenu}
            className="block py-4 text-lg font-medium hover:text-primary transition border-b border-gray-200 touch-manipulation"
          >
            Services
          </a>
          <a 
            href="/#gallery" 
            onClick={closeMenu}
            className="block py-4 text-lg font-medium hover:text-primary transition border-b border-gray-200 touch-manipulation"
          >
            Galerie
          </a>
          <a 
            href="/#contact" 
            onClick={closeMenu}
            className="block py-4 text-lg font-medium hover:text-primary transition border-b border-gray-200 touch-manipulation"
          >
            Contact
          </a>
          
          {/* CTA Button */}
          <div className="pt-6">
            <a 
              href="/rendezvous"
              onClick={closeMenu}
              className="block w-full bg-primary text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition shadow-md touch-manipulation"
            >
              Prendre rendez-vous
            </a>
          </div>
          
          {/* Réseaux sociaux */}
          <div className="pt-6 flex justify-center space-x-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-dark hover:text-primary hover:shadow-lg transition touch-manipulation"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-dark hover:text-primary hover:shadow-lg transition touch-manipulation"
              aria-label="Facebook"
            >
              <FaFacebookF size={24} />
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay background (pour fermer au clic) */}
      {isActive && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30 top-[72px]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
