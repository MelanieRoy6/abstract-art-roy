import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <img src="logo_website.svg" alt="ROY ART Logo" class="footer-logo">
            </div>
            <p>L'émotion brute capturée dans l'abstraction. Des œuvres uniques pour des intérieurs d'exception.</p>
          </div>
          
          <div class="footer-nav">
            <h4>Menu</h4>
            <ul>
              <li><a routerLink="/">Accueil</a></li>
              <li><a routerLink="/gallery">Galerie</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-social">
            <h4>Suivez-moi</h4>
            <div class="social-icons">
              <a href="https://www.instagram.com/roy.abstractart/?hl=fr" target="_blank">Instagram</a>
              <a href="https://www.facebook.com/roy.abstractart" target="_blank">Facebook</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2026 Roy Art. Tous droits réservés.</p>
          <div class="footer-legal">
            <a href="#">Mentions Légales</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-black);
      color: var(--color-white);
      padding: 6rem 0 3rem;
      margin-top: 0;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }

    .logo {
      margin-bottom: 1.5rem;
    }

    .footer-logo {
      height: 60px;
      width: auto;
      filter: brightness(0) invert(1); /* Makes the logo white for the dark footer */
    }

    .text-primary {
      color: var(--color-primary);
    }

    .footer-brand p {
      color: rgba(255,255,255,0.6);
      max-width: 350px;
      font-size: 1rem;
    }

    h4 {
      color: var(--color-white);
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    ul li {
      margin-bottom: 1rem;
    }

    ul a {
      color: rgba(255,255,255,0.6);
      font-family: var(--font-accent);
      font-size: 0.9rem;
      transition: var(--transition-fast);
    }

    ul a:hover {
      color: var(--color-white);
      padding-left: 5px;
    }

    .social-icons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .social-icons a {
      color: rgba(255,255,255,0.6);
      font-family: var(--font-accent);
      font-size: 0.9rem;
    }

    .social-icons a:hover {
      color: var(--color-primary);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgba(255,255,255,0.4);
      font-size: 0.8rem;
    }

    .footer-legal {
      display: flex;
      gap: 2rem;
    }

    .footer-legal a:hover {
      color: var(--color-white);
    }

    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
      .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
    }
  `]
})
export class FooterComponent {}
