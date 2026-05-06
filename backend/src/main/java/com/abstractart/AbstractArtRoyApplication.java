package com.abstractart;

import com.abstractart.model.Artwork;
import com.abstractart.repository.ArtworkRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class AbstractArtRoyApplication {

    public static void main(String[] args) {
        SpringApplication.run(AbstractArtRoyApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(ArtworkRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Artwork> initialArtworks = List.of(
                    new Artwork(null, "Harmonie Abstraite I", "Peinture abstraite aux couleurs vives, technique mixte sur toile", new BigDecimal("450.00"), "/assets/images/artworks/Oeuvre-1.png", "ABSTRACT", true, false),
                    new Artwork(null, "Mouvement Chromatique II", "Art abstrait expressionniste, jeu de textures et couleurs", new BigDecimal("550.00"), "/assets/images/artworks/Oeuvre-2.png", "ABSTRACT", true, false),
                    new Artwork(null, "Fusion Géométrique III", "Composition abstraite géométrique, acrylique sur toile", new BigDecimal("380.00"), "/assets/images/artworks/Oeuvre-3.png", "ABSTRACT", true, false),
                    new Artwork(null, "Énergie Fluide IV", "Art abstrait dynamique, exploration des formes organiques", new BigDecimal("420.00"), "/assets/images/artworks/Oeuvre-4.png", "ABSTRACT", false, false),
                    new Artwork(null, "Résonance Colorée V", "Peinture abstraite lyrique, technique de superposition", new BigDecimal("600.00"), "/assets/images/artworks/Oeuvre-5.png", "ABSTRACT", false, true),
                    new Artwork(null, "Symphonie Visuelle VI", "Art abstrait musical, harmonie des tons chauds et froids", new BigDecimal("480.00"), "/assets/images/artworks/Oeuvre-6.png", "ABSTRACT", false, false)
                );
                repository.saveAll(initialArtworks);
            }
        };
    }
}

