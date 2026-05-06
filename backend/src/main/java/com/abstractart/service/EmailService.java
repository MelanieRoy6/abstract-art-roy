package com.abstractart.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendContactCopy(String to, String clientName, String clientEmail, String clientPhone, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("✨ Nouveau contact : " + clientName);
            
            String htmlContent = String.format(
                "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f9f9f9; }" +
                "  .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #eeeeee; }" +
                "  .header { background: #1a1a1a; color: #ffffff; padding: 40px 20px; text-align: center; }" +
                "  .header h1 { margin: 0; font-size: 24px; letter-spacing: 3px; text-transform: uppercase; font-weight: 300; }" +
                "  .content { padding: 40px; }" +
                "  .intro { margin-bottom: 30px; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; }" +
                "  .intro p { margin: 5px 0; color: #666666; font-size: 14px; }" +
                "  .details { margin-bottom: 30px; }" +
                "  .detail-item { margin-bottom: 15px; }" +
                "  .label { font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999999; display: block; margin-bottom: 5px; }" +
                "  .value { font-size: 16px; color: #1a1a1a; }" +
                "  .message-box { background: #fdfdfd; border-left: 3px solid #1a1a1a; padding: 25px; margin-top: 20px; border-radius: 0 8px 8px 0; font-style: italic; color: #444444; }" +
                "  .footer { text-align: center; padding: 30px; font-size: 12px; color: #aaaaaa; background: #fafafa; border-top: 1px solid #eeeeee; }" +
                "  .btn { display: inline-block; padding: 12px 25px; background: #1a1a1a; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; font-size: 13px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>Studio Abstract Art</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <div class='intro'>" +
                "        <p>Un nouveau collectionneur souhaite vous contacter.</p>" +
                "      </div>" +
                "      <div class='details'>" +
                "        <div class='detail-item'>" +
                "          <span class='label'>Nom complet</span>" +
                "          <span class='value'>%s</span>" +
                "        </div>" +
                "        <div class='detail-item'>" +
                "          <span class='label'>Adresse Email</span>" +
                "          <span class='value'>%s</span>" +
                "        </div>" +
                "        <div class='detail-item'>" +
                "          <span class='label'>Téléphone</span>" +
                "          <span class='value'>%s</span>" +
                "        </div>" +
                "      </div>" +
                "      <span class='label'>Message</span>" +
                "      <div class='message-box'>\"%s\"</div>" +
                "      <div style='text-align: center;'>" +
                "        <a href='http://localhost:4200/admin' class='btn'>Accéder au Tableau de Bord</a>" +
                "      </div>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      <p>&copy; 2026 Abstract Art Roy. Tous droits réservés.</p>" +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>",
                clientName, clientEmail, (clientPhone != null && !clientPhone.isEmpty() ? clientPhone : "Non renseigné"), message
            );

            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
            
        } catch (MessagingException e) {
            throw new RuntimeException("Erreur lors de la création de l'email HTML", e);
        }
    }
}
