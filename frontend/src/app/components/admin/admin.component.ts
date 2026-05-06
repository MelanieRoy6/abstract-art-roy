import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { ClientService } from '../../services/client.service';
import { Artwork, Client } from '../../models/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Login Modal -->
    <div *ngIf="!isLoggedIn" class="login-overlay">
      <div class="login-modal">
        <button class="close-modal" (click)="goToHome()">×</button>
        <div class="login-header">
          <h2>Accès Administrateur</h2>
          <p>Veuillez vous identifier pour accéder au studio</p>
        </div>
        <form (submit)="login()" class="login-form">
          <div class="form-group">
            <label>Identifiant</label>
            <input type="text" [(ngModel)]="loginData.username" name="username" required placeholder="Votre identifiant">
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" [(ngModel)]="loginData.password" name="password" required placeholder="Votre mot de passe">
          </div>
          <div *ngIf="loginError" class="error-message">
            Identifiants incorrects. Veuillez réessayer.
          </div>
          <button type="submit" class="btn-login">Se connecter</button>
        </form>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <div *ngIf="isLoggedIn" class="admin-dashboard">
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <h2>Studio Admin</h2>
        </div>
        <nav class="sidebar-nav">
          <button [class.active]="activeTab === 'artworks'" (click)="activeTab = 'artworks'">
            <span class="icon">🖼️</span> Œuvres
          </button>
          <button [class.active]="activeTab === 'messages'" (click)="activeTab = 'messages'">
            <span class="icon">✉️</span> Messagerie
          </button>
          <button (click)="logout()" class="logout-btn">
            <span class="icon">🚪</span> Déconnexion
          </button>
        </nav>
      </aside>

      <main class="admin-main">
        <!-- Gestion des Œuvres -->
        <div *ngIf="activeTab === 'artworks'" class="tab-content">
          <header class="content-header">
            <h1>Gestion des Œuvres</h1>
            <button class="btn-primary" (click)="showForm = !showForm">
              {{ showForm ? 'Fermer' : 'Nouvelle Œuvre' }}
            </button>
          </header>

          <section *ngIf="showForm" class="form-card">
            <h2>{{ editingArtwork ? 'Modifier' : 'Ajouter' }} une œuvre</h2>
            <form (submit)="saveArtwork()" class="admin-form">
              <div class="form-grid">
                <div class="form-group">
                  <label>Titre</label>
                  <input type="text" [(ngModel)]="currentArtwork.title" name="title" required placeholder="Titre de l'œuvre">
                </div>
                <div class="form-group">
                  <label>Prix (€)</label>
                  <input type="number" [(ngModel)]="currentArtwork.price" name="price" required>
                </div>
                <div class="form-group">
                  <label>Catégorie</label>
                  <select [(ngModel)]="currentArtwork.category" name="category" required>
                    <option value="CUSTOM">Personnalisée</option>
                    <option value="ABSTRACT">Abstraite</option>
                  </select>
                </div>
                <div class="form-group checkbox-group">
                   <label class="switch">
                    <input type="checkbox" [(ngModel)]="currentArtwork.isFeatured" name="isFeatured">
                    <span class="slider round"></span>
                  </label>
                  <span>Mettre en avant</span>
                </div>
                <div class="form-group checkbox-group">
                   <label class="switch">
                    <input type="checkbox" [(ngModel)]="currentArtwork.isSold" name="isSold">
                    <span class="slider round"></span>
                  </label>
                  <span>Marquer comme Vendu</span>
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea [(ngModel)]="currentArtwork.description" name="description" rows="3" placeholder="Description de l'œuvre"></textarea>
              </div>
              <div class="form-group">
                <label>Image</label>
                <div class="upload-area">
                  <input type="file" (change)="onFileSelected($event)" accept="image/*" id="fileInput" class="hidden-input">
                  <label for="fileInput" class="btn-upload">Choisir une image</label>
                  <div *ngIf="currentArtwork.imageUrl" class="image-preview">
                    <img [src]="currentArtwork.imageUrl" alt="Preview">
                  </div>
                </div>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-save">Enregistrer</button>
                <button type="button" (click)="resetForm()" class="btn-cancel">Annuler</button>
              </div>
            </form>
          </section>

          <section class="list-section">
            <div class="artwork-table-container">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Aperçu</th>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let artwork of artworks">
                    <td><img [src]="artwork.imageUrl" class="table-img"></td>
                    <td><strong>{{ artwork.title }}</strong></td>
                    <td><span class="badge">{{ artwork.category }}</span></td>
                    <td>{{ artwork.price }} €</td>
                    <td>
                      <span class="badge" [style.background]="artwork.isSold ? '#ffe7e6' : '#e6fffa'" [style.color]="artwork.isSold ? '#f5222d' : '#389e0d'">
                        {{ artwork.isSold ? 'Vendu' : 'Disponible' }}
                      </span>
                      <span *ngIf="artwork.isFeatured" class="badge" style="margin-left: 5px; background: #fff7e6; color: #d46b08;">Featured</span>
                    </td>
                    <td>
                      <div class="table-actions">
                        <button (click)="editArtwork(artwork)" class="btn-icon">✏️</button>
                        <button (click)="deleteArtwork(artwork.id!)" class="btn-icon delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Messagerie -->
        <div *ngIf="activeTab === 'messages'" class="tab-content">
          <header class="content-header">
            <h1>Messagerie & Contacts</h1>
          </header>

          <div class="messages-container">
            <div *ngIf="clients.length === 0" class="empty-state">
              <p>Aucun message pour le moment.</p>
            </div>
            
            <div *ngFor="let client of clients" class="message-card">
              <div class="message-header">
                <div class="client-info">
                  <h3>{{ client.name }}</h3>
                  <span class="date">{{ client.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                </div>
                <div class="contact-badges">
                  <a [href]="'mailto:' + client.email" class="badge-link">📧 {{ client.email }}</a>
                  <span *ngIf="client.phone" class="badge-link">📞 {{ client.phone }}</span>
                </div>
              </div>
              <div class="message-body">
                <p>{{ client.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      display: grid;
      grid-template-columns: 250px 1fr;
      min-height: 100vh;
      background: #f4f7f6;
    }

    /* Login Styles */
    .login-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
    }
    .login-modal {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      position: relative;
    }
    .close-modal {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #ccc;
      transition: color 0.3s;
      line-height: 1;
    }
    .close-modal:hover { color: #000; }
    .login-header { text-align: center; margin-bottom: 2.5rem; }
    .login-header h2 { margin-bottom: 0.5rem; font-size: 1.8rem; }
    .login-header p { color: #666; font-size: 0.95rem; }
    .login-form .form-group { margin-bottom: 1.5rem; }
    .btn-login {
      width: 100%;
      background: #000;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 1rem;
      transition: background 0.3s;
    }
    .btn-login:hover { background: #333; }
    .error-message {
      color: #f5222d;
      background: #fff1f0;
      border: 1px solid #ffa39e;
      padding: 0.8rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      text-align: center;
    }

    /* Sidebar */
    .admin-sidebar {
      background: #1a1a1a;
      color: white;
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
    }
    .sidebar-header { padding: 0 2rem; margin-bottom: 3rem; }
    .sidebar-nav { display: flex; flex-direction: column; flex-grow: 1; }
    .sidebar-nav button {
      background: transparent;
      border: none;
      color: #888;
      padding: 1rem 2rem;
      text-align: left;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .sidebar-nav button:hover { background: #333; color: white; }
    .sidebar-nav button.active { background: #333; color: white; border-left: 4px solid #fff; }
    .logout-btn { margin-top: auto; border-top: 1px solid #333 !important; }

    /* Main Content */
    .admin-main { padding: 2rem 3rem; }
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .tab-content { animation: fadeIn 0.4s ease-out; }

    /* Form */
    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      margin-bottom: 2rem;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
    .form-group label { font-weight: bold; font-size: 0.9rem; }
    input, textarea, select {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: inherit;
    }
    .checkbox-group { flex-direction: row; align-items: center; gap: 1rem; }

    /* Table */
    .artwork-table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .admin-table th { background: #fafafa; padding: 1.2rem; font-size: 0.9rem; color: #666; }
    .admin-table td { padding: 1.2rem; border-top: 1px solid #eee; }
    .table-img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; }
    .badge { background: #eee; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.8rem; }
    .table-actions { display: flex; gap: 0.5rem; }

    /* Messages */
    .messages-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .message-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    .client-info h3 { margin: 0; }
    .date { font-size: 0.8rem; color: #999; }
    .contact-badges { display: flex; gap: 1rem; }
    .badge-link { text-decoration: none; color: #333; font-size: 0.9rem; background: #f0f0f0; padding: 0.4rem 0.8rem; border-radius: 20px; }
    .message-body { color: #444; line-height: 1.6; }

    /* Buttons */
    .btn-primary { background: #000; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; }
    .btn-save { background: #000; color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; cursor: pointer; }
    .btn-cancel { background: #eee; border: none; padding: 0.8rem 2rem; border-radius: 8px; cursor: pointer; margin-left: 1rem; }
    .btn-icon { background: #f4f4f4; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; }
    .btn-icon.delete { background: #fff1f0; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Switch toggle */
    .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .4s; }
    input:checked + .slider { background-color: #000; }
    input:checked + .slider:before { transform: translateX(20px); }
    .slider.round { border-radius: 34px; }
    .slider.round:before { border-radius: 50%; }

    .hidden-input { display: none; }
    .btn-upload { display: inline-block; padding: 0.8rem 1.5rem; background: #f0f0f0; border-radius: 8px; cursor: pointer; margin-bottom: 1rem; }
    .image-preview img { max-width: 150px; border-radius: 8px; display: block; margin-top: 1rem; }
  `]
})
export class AdminComponent implements OnInit {
  artworks: Artwork[] = [];
  clients: Client[] = [];
  currentArtwork: Artwork = this.emptyArtwork();
  editingArtwork = false;
  activeTab: 'artworks' | 'messages' = 'artworks';
  showForm = false;

  // Login Logic
  isLoggedIn = false;
  loginData = { username: '', password: '' };
  loginError = false;

  constructor(
    private artworkService: ArtworkService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadInitialData();
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  checkLoginStatus() {
    const status = sessionStorage.getItem('admin_logged_in');
    this.isLoggedIn = status === 'true';
  }

  login() {
    if (this.loginData.username === 'EricAbstract2026' && this.loginData.password === '2026art-') {
      this.isLoggedIn = true;
      this.loginError = false;
      sessionStorage.setItem('admin_logged_in', 'true');
      this.loadInitialData();
    } else {
      this.loginError = true;
    }
  }

  logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    this.loginData = { username: '', password: '' };
  }

  loadInitialData() {
    this.loadArtworks();
    this.loadClients();
  }

  loadArtworks() {
    this.artworkService.getArtworks().subscribe(data => this.artworks = data);
  }

  loadClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data.sort((a, b) => 
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
  }

  emptyArtwork(): Artwork {
    return { title: '', description: '', price: 0, imageUrl: '', category: 'ABSTRACT', isFeatured: false };
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.artworkService.uploadImage(file).subscribe(res => {
        this.currentArtwork.imageUrl = res.url;
      });
    }
  }

  saveArtwork() {
    if (this.editingArtwork && this.currentArtwork.id) {
      this.artworkService.updateArtwork(this.currentArtwork.id, this.currentArtwork).subscribe(() => {
        this.resetForm();
        this.loadArtworks();
      });
    } else {
      this.artworkService.createArtwork(this.currentArtwork).subscribe(() => {
        this.resetForm();
        this.loadArtworks();
      });
    }
  }

  editArtwork(artwork: Artwork) {
    this.currentArtwork = { ...artwork };
    this.editingArtwork = true;
    this.showForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteArtwork(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette œuvre ?')) {
      this.artworkService.deleteArtwork(id).subscribe(() => this.loadArtworks());
    }
  }

  resetForm() {
    this.currentArtwork = this.emptyArtwork();
    this.editingArtwork = false;
    this.showForm = false;
  }
}
