package com.abstractart.service;

import com.abstractart.model.Client;
import com.abstractart.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final EmailService emailService;
    
    private static final String ADMIN_EMAIL = "mel4620@gmail.com";

    @Transactional
    public Client saveClientAndNotify(Client client) {
        // 1. Sauvegarde en base de données pour l'historique admin
        Client savedClient = clientRepository.save(client);
        
        // 2. Envoi de la copie par email
        try {
            emailService.sendContactCopy(
                ADMIN_EMAIL,
                client.getName(),
                client.getEmail(),
                client.getPhone(),
                client.getMessage()
            );
        } catch (Exception e) {
            // On log l'erreur mais on ne bloque pas la réponse car le client est déjà sauvegardé en base
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }
        
        return savedClient;
    }
}
