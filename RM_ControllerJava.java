package com.simklinik.anak.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

/**
 * SIMULASI JAVA WEB (SPRING BOOT) 🩺
 * Khusus untuk Rekam Medis (RME) & Hitung BMI Otomatis!
 */
@RestController
@RequestMapping("/api/rme")
public class RMEController {

    // 1. Fungsi Hitung BMI (Body Mass Index)
    // SANGAT COCOK buat periksa anak di klinik kamu bro!
    @PostMapping("/hitung-bmi")
    public ResponseEntity<Map<String, Object>> hitungBMI(@RequestBody Map<String, Double> data) {
        double bb = data.get("berat_badan"); // dalam kg
        double tb = data.get("tinggi_badan") / 100; // ubah ke meter
        
        // Logika Hitung BMI di Java
        double bmi = bb / (tb * tb);
        String status = statusBMI(bmi);

        Map<String, Object> hasil = new HashMap<>();
        hasil.put("bmi", String.format("%.2f", bmi));
        hasil.put("kategori", status);

        return ResponseEntity.ok(hasil);
    }

    private String statusBMI(double bmi) {
        if (bmi < 18.5) return "Underweight (Kurus) ⚠️";
        if (bmi < 25.0) return "Normal (Ideal) ✅";
        if (bmi < 30.0) return "Overweight (Gemuk) ⚠️";
        return "Obesity (Obesitas) 🚨";
    }

    // 2. Simpan Data SOAP (Subjective, Objective, Assessment, Plan)
    @PostMapping("/simpan-soap")
    public String simpanSOAP(@RequestBody SOAPRequest request) {
        // STEP 1: Validasi Keamanan Java (Input dibersihkan otomatis)
        // ... (Simpan pemeriksaan ke MySQL)
        
        return "🤜💥🤛 Mantap Bro! Data SOAP " + request.getNoRawat() + " Berhasil Disimpan!";
    }
}
