import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/models';

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
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input [(ngModel)]="client.email" name="email" id="email" type="email" placeholder="votre@email.com" required #email="ngModel" [class.error]="email.invalid && email.touched">
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Téléphone (Optionnel)</label>
            <input [(ngModel)]="client.phone" name="phone" id="phone" placeholder="06 00 00 00 00">
          </div>

          <div class="form-group">
            <label for="message">Votre message</label>
            <textarea [(ngModel)]="client.message" name="message" id="message" rows="5" placeholder="Comment pouvons-nous vous aider ?" required #msg="ngModel" [class.error]="msg.invalid && msg.touched"></textarea>
          </div>

          <button type="submit" [disabled]="contactForm.invalid" class="btn-submit">
            <span>Envoyer le message</span>
            <i class="icon-send"></i>
          </button>

        </form>

        <div *ngIf="successMessage" class="feedback success">
          <p>{{ successMessage }}</p>
        </div>
        <div *ngIf="errorMessage" class="feedback error">
          <p>{{ errorMessage }}</p>
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
    .feedback.success { background: #f6ffed; border: 1px solid #b7eb8f; color: #389e0d; }
    .feedback.error { background: #fff2f0; border: 1px solid #ffccc7; color: #cf1322; }
  `]
})
export class ContactComponent {
  client: Client = { name: '', email: '', phone: '', message: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private clientService: ClientService) {}

  onSubmit(): void {
    this.clientService.createClient(this.client).subscribe({
      next: () => {
        this.successMessage = 'Merci ! Votre message a bien été envoyé.';
        this.errorMessage = '';
        this.client = { name: '', email: '', phone: '', message: '' };
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: () => {
        this.errorMessage = 'Une erreur est survenue lors de l\\envoi.';
        this.successMessage = '';
      }
    });
  }
}
