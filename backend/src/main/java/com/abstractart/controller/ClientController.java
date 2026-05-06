package com.abstractart.controller;

import com.abstractart.model.Client;
import com.abstractart.repository.ClientRepository;
import com.abstractart.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    private final ClientRepository clientRepository;
    private final ClientService clientService;

    @GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @PostMapping
    public Client createClient(@Valid @RequestBody Client client) {
        return clientService.saveClientAndNotify(client);
    }
}
