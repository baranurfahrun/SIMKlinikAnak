package com.simklinik.anak.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

/**
 * SIMULASI "MESIN" JAVA WEB (SPRING BOOT) 🛰️
 * Khusus untuk Form "Registrasi Poli" yang estetik itu!
 */
@Controller
@RequestMapping("/registrasi")
public class RegistrasiPoliController {

    // 1. Fungsi Tampilkan Form (Menuju ke file .html)
    @GetMapping
    public String viewRegistrasi(Model model) {
        // Logika Java buat ambil data dokter, poli, dan pasien dari MySQL
        // ... (Query ke Database)
        
        return "registrasi_poli"; // Ini akan membuka file RegistrasiPoli_ViewJava.html
    }

    // 2. Fungsi Tombol "SIMPAN & CEK TTV" (Post Data)
    @PostMapping("/simpan")
    @ResponseBody // Kirim respon balik ke Browser (misal lewat AJAX atau Inertia style)
    public String simpanRegistrasi(@RequestBody RegistrasiRequest request) {
        try {
            // STEP 1: Validasi Keamanan Java (Input dibersihkan otomatis)
            if (request.getDokterId() == null) {
                return "{\"status\": \"error\", \"message\": \"Pilih Dokter dulu bro!\"}";
            }

            // STEP 2: Logika Simpan ke Database MySQL (Auto-threading Java)
            // ... (Insert ke tabel registrasi)
            
            // STEP 3: Berikan Respon Sukses ke Tampilan Cantik di Browser
            return "{\"status\": \"success\", \"message\": \"Data Registrasi " + request.getNoRawat() + " Berhasil Disimpan! 🤜💥🤛\"}";
        } catch (Exception e) {
            return "{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}";
        }
    }
}
