import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text-wrap">
            <span class="eyebrow">Artiste Peintre Abstrait</span>
            <h1 class="hero-title">L'Art de <br><span class="text-primary">l'Abstraction</span></h1>
            <p class="hero-lead">Une immersion sensorielle au cœur des couleurs et des formes en mouvement.</p>
            <div class="hero-actions">
              <a routerLink="/gallery" class="btn btn-primary">Explorer la collection</a>
              <a routerLink="/contact" class="btn btn-outline">Commande spéciale</a>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-inner">
            <div class="carousel-slide active" style="background-image: url('/tab_abs_1.png')">
              <div class="slide-label">
              </div>
            </div>
          </div>
          <div class="visual-bg-text">ROY ART</div>
        </div>
      </section>

      <!-- Philosophy Section -->
      <section class="philosophy section-padding">
        <div class="container">
          <div class="philosophy-grid">
            <div class="philosophy-image">
              <div class="image-stack">
                <div class="image-main">
                  <img src="/tab_1.png" alt="L'artiste au travail">
                </div>
                <div class="image-accent"></div>
              </div>
            </div>

            <div class="philosophy-text">
              <span class="eyebrow">Ma Vision</span>
              <h2 class="section-title">Au-delà du <span class="text-primary">visible</span></h2>
              <div class="text-content">
                <p>
                  Pour moi, l'art abstrait n'est pas une simple juxtaposition de pigments sur une toile.
                  C'est une libération de l'inconscient, une quête d'équilibre entre le chaos et la sérénité.
                </p>
                <p>
                  Chaque œuvre est une fenêtre ouverte sur une émotion pure, dépouillée des contraintes du figuratif.
                  Je travaille principalement à l'acrylique, explorant les textures pour donner une dimension tactile à mes créations.
                </p>
              </div>

              <div class="philosophy-stats">
                <div class="stat-item">
                  <span class="stat-num">10+</span>
                  <span class="stat-label">Années de passion</span>
                </div>
                <div class="stat-item">
                  <span class="stat-num">50+</span>
                  <span class="stat-label">Œuvres originales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured categories / Quick links -->
      <section class="categories-preview section-padding">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Collections <span class="text-primary">Thématiques</span></h2>
          </div>
          <div class="category-cards">
            <div class="cat-card" routerLink="/gallery">
              <div class="cat-img" style="background-image: url('https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"></div>
              <div class="cat-content">
                <h3>Abstrait Pur</h3>
                <p>Émotions brutes et formes géométriques.</p>
              </div>
            </div>
            <div class="cat-card" routerLink="/gallery">
              <div class="cat-img" style="background-image: url('https://images.unsplash.com/photo-1515405299443-f71bb40409f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"></div>
              <div class="cat-content">
                <h3>Explosion Chromatique</h3>
                <p>Le pouvoir libérateur de la couleur.</p>
              </div>
            </div>
            <div class="cat-card" routerLink="/contact">
              <div class="cat-img" style="background-image: url('https://images.unsplash.com/photo-1460661419201-fd4cecea8f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"></div>
              <div class="cat-content">
                <h3>Sur Mesure</h3>
                <p>Une œuvre unique pour votre espace.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="home-cta">
        <div class="cta-inner">
          <h2 class="cta-title">Donnez Vie à Vos Murs</h2>
          <p>Trouvez la pièce qui résonne avec votre histoire ou créez-la ensemble.</p>
          <a routerLink="/gallery" class="btn btn-primary">Voir la Galerie</a>
        </div>
      </section>
    </div>
  `,
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredArtworks: Artwork[] = [];
  currentSlide = 0;
  private intervalId: any;

  constructor(private artworkService: ArtworkService) {}

  ngOnInit() {
    this.artworkService.getArtworks().subscribe(artworks => {
      this.featuredArtworks = artworks.filter(a => a.featured);
      if (this.featuredArtworks.length === 0 && artworks.length > 0) {
        this.featuredArtworks = artworks.slice(0, 3); // Fallback to first 3
      }
      this.startCarousel();
    });
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.stopCarousel();
    if (this.featuredArtworks.length > 1) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 6000);
    }
  }

  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.featuredArtworks.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.featuredArtworks.length) % this.featuredArtworks.length;
    this.startCarousel();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.startCarousel();
  }
}
