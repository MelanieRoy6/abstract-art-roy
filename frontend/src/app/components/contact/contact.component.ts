import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <div class="contact-card">
        <header class="contact-header">
          <h1>Contactez-moi</h1>
          <p>Une question ? Un projet de commande personnalisée ? Écrivez-moi.</p>
        </header>

        <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="styled-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input [(ngModel)]="client.name" name="name" id="name" placeholder="Votre nom" required #name="ngModel" [class.error]="name.invalid && name.touched">
              <span class="error-text" *ngIf="name.invalid && name.touched">Le nom est requis</span>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input [(ngModel)]="client.email" name="email" id="email" type="email"
                     placeholder="votre@email.com" required
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                     #email="ngModel" [class.error]="email.invalid && email.touched">
              <span class="error-text" *ngIf="email.invalid && email.touched">
                {{ email.errors?.['required'] ? 'L\\'email est requis' : 'Format email invalide (doit contenir @)' }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input [(ngModel)]="client.phone" name="phone" id="phone"
                   placeholder="0600000000" required
                   pattern="^[0-9]{10}$"
                   #phone="ngModel" [class.error]="phone.invalid && phone.touched">
            <span class="error-text" *ngIf="phone.invalid && phone.touched">
              {{ phone.errors?.['required'] ? 'Le téléphone est requis' : 'Doit contenir exactement 10 chiffres' }}
            </span>
          </div>

          <div class="form-group">
            <label for="message">Votre message</label>
            <textarea [(ngModel)]="client.message" name="message" id="message" rows="5" placeholder="Comment pouvons-nous vous aider ?" required #msg="ngModel" [class.error]="msg.invalid && msg.touched"></textarea>
            <span class="error-text" *ngIf="msg.invalid && msg.touched">Le message est requis</span>
          </div>

          <button type="submit" [disabled]="contactForm.invalid || isSending" class="btn-submit">
            <span *ngIf="!isSending">Envoyer le message</span>
            <span *ngIf="isSending">Envoi en cours...</span>
            <i class="icon-send" *ngIf="!isSending"></i>
            <span class="spinner" *ngIf="isSending"></span>
          </button>

        </form>

        <div *ngIf="errorMessage" class="feedback error">
          <p>{{ errorMessage }}</p>
        </div>
      </div>

      <!-- Modal de Remerciement -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeModal()">&times;</button>
          <div class="modal-header">
            <div class="success-icon">✓</div>
            <h2>Message Envoyé !</h2>
          </div>
          <div class="modal-body">
            <p>Merci pour votre message ! Il sera pris en compte dans les plus brefs délais.</p>
            <p>L'artiste reviendra vers vous pour une première prise de contact très prochainement.</p>
          </div>
          <div class="modal-footer">
            <button class="btn-confirm" (click)="closeModal()">D'accord</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 4rem 5%;
      min-height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fdfdfd;
    }
    .contact-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.05);
      max-width: 700px;
      width: 100%;
    }
    .contact-header { text-align: center; margin-bottom: 3rem; }
    .contact-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .contact-header p { color: #666; }

    .styled-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-weight: 600; font-size: 0.9rem; color: #333; }

    input, textarea {
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 12px;
      background: #f9f9f9;
      transition: all 0.3s;
      font-family: inherit;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #333;
      background: white;
      box-shadow: 0 0 0 4px rgba(0,0,0,0.02);
    }
    input.error, textarea.error { border-color: #ff4d4f; }

    .btn-submit {
      margin-top: 1rem;
      background: #000;
      color: white;
      border: none;
      padding: 1.2rem;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .btn-submit:disabled { background: #ccc; cursor: not-allowed; }

    .feedback { margin-top: 2rem; padding: 1rem; border-radius: 12px; text-align: center; font-weight: 500; }
    .feedback.error { background: #fff2f0; border: 1px solid #ffccc7; color: #cf1322; }

    .error-text {
      color: #ff4d4f;
      font-size: 0.75rem;
      margin-top: 0.2rem;
      font-weight: 500;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      backdrop-filter: blur(8px);
    }
    .modal-content {
      background: white;
      padding: 3rem;
      border-radius: 24px;
      max-width: 500px;
      width: 90%;
      position: relative;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalSlideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .close-btn {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #ccc;
      transition: color 0.3s;
    }
    .close-btn:hover { color: #333; }

    .success-icon {
      width: 80px;
      height: 80px;
      background: #f6ffed;
      color: #52c41a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      margin: 0 auto 1.5rem;
      border: 2px solid #b7eb8f;
    }

    .modal-header h2 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.2rem;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
    .modal-body { color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
    .modal-body p { margin-bottom: 0.5rem; }

    .btn-confirm {
      background: #000;
      color: white;
      border: none;
      padding: 1rem 3rem;
      border-radius: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-confirm:hover { background: var(--color-primary, #FF4444); transform: translateY(-2px); }

    /* Spinner */
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ContactComponent {
  client: Client = { name: '', email: '', phone: '', message: '' };
  errorMessage: string = '';
  showModal: boolean = false;
  isSending: boolean = false;

  constructor(private clientService: ClientService) {}

  onSubmit(): void {
    if (this.isSending) return;

    this.isSending = true;
    this.errorMessage = '';

    this.clientService.createClient(this.client)
      .pipe(finalize(() => this.isSending = false))
      .subscribe({
        next: () => {
          this.showModal = true;
          this.client = { name: '', email: '', phone: '', message: '' };
        },
        error: (err) => {
          console.error('Submission error:', err);
          this.errorMessage = 'Une erreur est survenue lors de l\\envoi. Veuillez réessayer.';
        }
      });
  }

  closeModal(): void {
    this.showModal = false;
  }
}
