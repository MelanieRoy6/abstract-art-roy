package com.abstractart.controller;

import com.abstractart.model.Artwork;
import com.abstractart.repository.ArtworkRepository;
import com.abstractart.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ArtworkRepository artworkRepository;
    private final FileStorageService fileStorageService;

    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("artworks", artworkRepository.findAll());
        return "admin/dashboard";
    }

    @GetMapping("/artwork/new")
    public String newArtwork(Model model) {
        model.addAttribute("artwork", new Artwork());
        return "admin/artwork-form";
    }

    @GetMapping("/artwork/edit/{id}")
    public String editArtwork(@PathVariable Long id, Model model) {
        Artwork artwork = artworkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid artwork Id:" + id));
        model.addAttribute("artwork", artwork);
        return "admin/artwork-form";
    }

    @PostMapping("/artwork/save")
    public String saveArtwork(@ModelAttribute Artwork artwork, 
                              @RequestParam(value = "file", required = false) MultipartFile file,
                              RedirectAttributes redirectAttributes) {
        try {
            if (file != null && !file.isEmpty()) {
                String filename = fileStorageService.save(file);
                artwork.setImageUrl("/api/uploads/" + filename);
            } else if (artwork.getId() != null) {
                // Keep existing image if no new one uploaded during edit
                Artwork existing = artworkRepository.findById(artwork.getId())
                        .orElseThrow(() -> new RuntimeException("Artwork not found"));
                artwork.setImageUrl(existing.getImageUrl());
            }

            artworkRepository.save(artwork);
            redirectAttributes.addFlashAttribute("message", "Œuvre enregistrée avec succès !");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Erreur lors de l'enregistrement : " + e.getMessage());
        }
        return "redirect:/admin";
    }

    @GetMapping("/artwork/delete/{id}")
    public String deleteArtwork(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        artworkRepository.deleteById(id);
        redirectAttributes.addFlashAttribute("message", "Œuvre supprimée !");
        return "redirect:/admin";
    }

    @PostMapping("/artwork/toggle-featured/{id}")
    @ResponseBody
    public void toggleFeatured(@PathVariable Long id) {
        artworkRepository.findById(id).ifPresent(artwork -> {
            artwork.setFeatured(!artwork.isFeatured());
            artworkRepository.save(artwork);
        });
    }

    @PostMapping("/artwork/toggle-sold/{id}")
    @ResponseBody
    public void toggleSold(@PathVariable Long id) {
        artworkRepository.findById(id).ifPresent(artwork -> {
            artwork.setSold(!artwork.isSold());
            artworkRepository.save(artwork);
        });
    }
}
