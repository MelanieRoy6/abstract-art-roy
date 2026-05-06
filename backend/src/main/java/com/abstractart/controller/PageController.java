package com.abstractart.controller;

import com.abstractart.repository.ArtworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class PageController {

    private final ArtworkRepository artworkRepository;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("featuredArtworks", artworkRepository.findAll().stream().filter(a -> a.isFeatured()).toList());
        return "index";
    }

    @GetMapping("/gallery")
    public String gallery(Model model) {
        model.addAttribute("artworks", artworkRepository.findAll());
        return "gallery";
    }
}
