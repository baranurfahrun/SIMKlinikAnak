package com.simklinik.anak.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

/**
 * SIMULASI JAVA WEB (SPRING BOOT + HTML) 🛰️
 * Mesin Pengganti Laravel Controller
 */
@Controller
@RequestMapping("/pendaftaran")
public class PendaftaranController {

    @Autowired
    private PasienRepository pasienRepository; // Repository Java (Mirip Model di Laravel)

    // 1. Tampilkan Halaman Pendaftaran (Ini penggantinya Inertia::render)
    @GetMapping
    public String index(Model model) {
        // Tarik data pasien dari database MySQL
        List<Pasien> dataPasien = pasienRepository.findAll();
        
        // Kirim data ke file HTML (Thymeleaf/React)
        model.addAttribute("accounts", dataPasien);
        model.addAttribute("auth_user", "admin"); // Simulasi user login
        
        return "pendaftaran/index"; // Akan buka file pendaftaran/index.html
    }

    // 2. Simpan Data Pasien Baru (Ini penggantinya public function store di PHP)
    @PostMapping("/store")
    public String store(@ModelAttribute Pasien request, Model model) {
        try {
            // Validasi di Java (Gaya Spring Boot)
            if (request.getNama().length() < 3) {
                return "redirect:/pendaftaran?error=nama_terlalu_pendek";
            }

            // Simpan ke Database
            pasienRepository.save(request);

            // Redirect balik ke daftar dengan pesan sukses
            return "redirect:/pendaftaran?success=Data Pasien Berhasil Disimpan Bro! 🤜💥🤛";
        } catch (Exception e) {
            return "redirect:/pendaftaran?error=" + e.getMessage();
        }
    }

    // 3. Update Data Pasien (Ini penggantinya public function update di PHP)
    @PostMapping("/update/{id}")
    @ResponseBody // Jika mau respon JSON buat AJAX/Inertia
    public String update(@PathVariable String id, @RequestBody Pasien request) {
        // Logika update di Java
        // ... (Update data di MySQL)
        return "{\"status\": \"success\", \"message\": \"Profil diperbarui!\"}";
    }
}
