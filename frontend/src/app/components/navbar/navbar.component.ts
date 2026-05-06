import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <a routerLink="/">
            <img src="logo_website.svg" alt="ROY ART Logo" class="logo-img">
          </a>
        </div>
        
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
          <li><a routerLink="/gallery" routerLinkActive="active">Galerie</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          <li><a routerLink="/admin" class="btn-admin">Espace Admin</a></li>
        </ul>

        <div class="nav-mobile-toggle">
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      transition: var(--transition-smooth);
    }
    
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 5%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo a {
      display: flex;
      align-items: center;
    }

    .logo-img {
      height: 50px;
      width: auto;
      transition: var(--transition-smooth);
    }

    .logo-img:hover {
      transform: scale(1.05);
    }

    .text-primary {
      color: var(--color-primary);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 3rem;
    }

    .nav-links a {
      font-family: var(--font-accent);
      font-size: 0.85rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: var(--transition-smooth);
    }

    .nav-links a:hover, .nav-links a.active {
      color: var(--color-black);
    }

    .nav-links a.active::after {
      width: 100%;
    }

    .btn-admin {
      background: var(--color-black);
      color: var(--color-white) !important;
      padding: 0.6rem 1.2rem;
      font-size: 0.75rem !important;
    }

    .btn-admin::after { display: none !important; }

    .btn-admin:hover {
      background: var(--color-primary);
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavbarComponent {}
