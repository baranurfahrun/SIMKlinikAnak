import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

/**
 * SIMULASI JAVA SWING (GAYA KHANZA) 🏥
 * Menu Pendaftaran Pasien SIMKlinik
 */
public class DlgPendaftaranPasien extends JDialog {
    private JTextField txtNoRM, txtNama, txtAlamat, txtTelp;
    private JButton btnSimpan, btnBaru, btnHapus, btnKeluar;
    private JTable tabPasien;
    private Connection koneksi;

    public DlgPendaftaranPasien(Frame parent, boolean modal) {
        super(parent, modal);
        setTitle("Pendaftaran Pasien Baru - SIMKlinik Java");
        setSize(800, 600);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // --- PANEL INPUT (BAGIAN ATAS) ---
        JPanel pnlInput = new JPanel(new GridLayout(4, 2, 10, 10));
        pnlInput.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        pnlInput.setBackground(new Color(240, 245, 255)); // Warna biru muda ala Khanza

        pnlInput.add(new JLabel("No. Rekam Medis:"));
        txtNoRM = new JTextField();
        pnlInput.add(txtNoRM);

        pnlInput.add(new JLabel("Nama Pasien:"));
        txtNama = new JTextField();
        pnlInput.add(txtNama);

        pnlInput.add(new JLabel("Alamat:"));
        txtAlamat = new JTextField();
        pnlInput.add(txtAlamat);

        pnlInput.add(new JLabel("No. Telepon:"));
        txtTelp = new JTextField();
        pnlInput.add(txtTelp);

        add(pnlInput, BorderLayout.NORTH);

        // --- PANEL TABEL (TENGAH) ---
        tabPasien = new JTable(); // Nanti diisi data dari MySQL
        JScrollPane scroll = new JScrollPane(tabPasien);
        add(scroll, BorderLayout.CENTER);

        // --- PANEL TOMBOL (BAWAH) ---
        JPanel pnlTombol = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        btnBaru = new JButton("Baru");
        btnSimpan = new JButton("Simpan");
        btnHapus = new JButton("Hapus");
        btnKeluar = new JButton("Keluar");

        // Styling Tombol ala Java Desktop
        btnSimpan.setIcon(new ImageIcon(getClass().getResource("/picture/save-16x16.png"))); // Contoh Path di Khanza

        pnlTombol.add(btnBaru);
        pnlTombol.add(btnSimpan);
        pnlTombol.add(btnHapus);
        pnlTombol.add(btnKeluar);
        add(pnlTombol, BorderLayout.SOUTH);

        // --- LOGIKA SIMPAN (DATABASE) ---
        btnSimpan.addActionListener(e -> {
            simpanDarah();
        });
    }

    private void simpanDarah() {
        // Logika SQL di Java (Pakai PrepareStatement)
        String sql = "INSERT INTO pasien (no_rm, nm_pasien, alamat, no_telp) VALUES (?,?,?,?)";
        try {
            PreparedStatement ps = koneksi.prepareStatement(sql);
            ps.setString(1, txtNoRM.getText());
            ps.setString(2, txtNama.getText());
            ps.setString(3, txtAlamat.getText());
            ps.setString(4, txtTelp.getText());
            ps.executeUpdate();
            JOptionPane.showMessageDialog(null, "Data Pasien Berhasil Disimpan Bro! 🤜💥🤛");
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Gagal simpan: " + ex.getMessage());
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new DlgPendaftaranPasien(null, true).setVisible(true);
        });
    }
}
