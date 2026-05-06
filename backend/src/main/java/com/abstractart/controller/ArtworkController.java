package com.abstractart.controller;

import com.abstractart.model.Artwork;
import com.abstractart.repository.ArtworkRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artworks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ArtworkController {

    private final ArtworkRepository artworkRepository;

    @GetMapping
    public List<Artwork> getAllArtworks() {
        return artworkRepository.findAll();
    }

    @PostMapping
    public Artwork createArtwork(@Valid @RequestBody Artwork artwork) {
        return artworkRepository.save(artwork);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artwork> updateArtwork(@PathVariable Long id, @Valid @RequestBody Artwork artworkDetails) {
        return artworkRepository.findById(id)
                .map(artwork -> {
                    artwork.setTitle(artworkDetails.getTitle());
                    artwork.setDescription(artworkDetails.getDescription());
                    artwork.setPrice(artworkDetails.getPrice());
                    artwork.setImageUrl(artworkDetails.getImageUrl());
                    artwork.setCategory(artworkDetails.getCategory());
                    artwork.setFeatured(artworkDetails.isFeatured());
                    return ResponseEntity.ok(artworkRepository.save(artwork));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable Long id) {
        return artworkRepository.findById(id)
                .map(artwork -> {
                    artworkRepository.delete(artwork);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
