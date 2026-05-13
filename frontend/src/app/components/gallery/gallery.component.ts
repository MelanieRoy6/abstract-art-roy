import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-container">
      <header class="gallery-header section-padding">
        <div class="container">
          <span class="eyebrow">Le Catalogue</span>
          <h1 class="gallery-title">Exploration <span class="text-primary">Artistique</span></h1>
          <p class="gallery-intro">Découvrez l'intégralité des collections, des pièces d'étude aux œuvres magistrales.</p>
        </div>
      </header>

      <!-- Carousel 1: Custom Artworks -->
      <section class="featured-section section-padding" *ngIf="featuredCustom.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-subtitle">Série <span class="text-primary">Personnalisée</span></h2>
            <p class="section-desc">Œuvres créées sur mesure pour des espaces uniques.</p>
          </div>
        </div>
        
        <div class="horizontal-scroll">
          <div class="scroll-track">
            <div *ngFor="let artwork of featuredCustom" class="scroll-item">
              <div class="artwork-preview">
                <img [src]="artwork.imageUrl" [alt]="artwork.title">
                <div class="artwork-overlay">
                  <h3>{{ artwork.title }}</h3>
                  <span class="price">{{ artwork.price }} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Carousel 2: Abstract Artworks -->
      <section class="featured-section section-padding" *ngIf="featuredAbstract.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-subtitle">L'Art <span class="text-primary">Abstrait</span></h2>
            <p class="section-desc">Une exploration des formes et des couleurs.</p>
          </div>
        </div>
        
        <div class="horizontal-scroll">
          <div class="scroll-track">
            <div *ngFor="let artwork of featuredAbstract" class="scroll-item">
              <div class="artwork-preview">
                <img [src]="artwork.imageUrl" [alt]="artwork.title">
                <div class="artwork-overlay">
                  <h3>{{ artwork.title }}</h3>
                  <span class="price">{{ artwork.price }} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Available Artworks Grid -->
      <section class="catalog-section section-padding" *ngIf="availableArtworks.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-subtitle">Œuvres <span class="text-primary">Disponibles</span></h2>
          </div>
          
          <div class="art-grid">
            <div *ngFor="let artwork of availableArtworks" class="art-card">
              <div class="art-img-wrap">
                <img [src]="artwork.imageUrl" [alt]="artwork.title">
                <div class="art-badge">{{ artwork.category }}</div>
                <div class="art-hover-info">
                   <button class="btn-quickview">Voir Détails</button>
                </div>
              </div>
              <div class="art-info">
                <h3>{{ artwork.title }}</h3>
                <p>{{ artwork.description }}</p>
                <div class="art-footer">
                  <span class="price">{{ artwork.price }} €</span>
                  <button class="btn-action">Acheter</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sold Artworks Grid -->
      <section class="catalog-section section-padding sold-section" *ngIf="soldArtworks.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-subtitle">Œuvres <span class="text-primary">Vendues</span></h2>
            <p class="section-desc">Ces pièces ont déjà trouvé leur foyer.</p>
          </div>
          
          <div class="art-grid">
            <div *ngFor="let artwork of soldArtworks" class="art-card sold">
              <div class="art-img-wrap">
                <img [src]="artwork.imageUrl" [alt]="artwork.title">
                <div class="sold-overlay">VENDU</div>
              </div>
              <div class="art-info">
                <h3>{{ artwork.title }}</h3>
                <p>{{ artwork.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit {
  featuredCustom: Artwork[] = [];
  featuredAbstract: Artwork[] = [];
  availableArtworks: Artwork[] = [];
  soldArtworks: Artwork[] = [];

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.artworkService.getArtworks().subscribe(data => {
      this.featuredCustom = data.filter(a => a.category === 'CUSTOM' && a.featured).slice(0, 3);
      this.featuredAbstract = data.filter(a => a.category === 'ABSTRACT' && a.featured).slice(0, 3);
      this.availableArtworks = data.filter(a => !a.sold);
      this.soldArtworks = data.filter(a => a.sold);
    });
  }
}
