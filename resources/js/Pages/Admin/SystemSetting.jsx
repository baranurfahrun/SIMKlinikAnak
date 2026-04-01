import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function SystemSetting({ auth, settings, integrity, errors: authErrors }) {
    // Membaca tab dari query parameter
    const [activeTab, setActiveTab] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return new URLSearchParams(window.location.search).get('tab') || 'general';
        }
        return 'general';
    });

    const { data, setData, post, processing, errors } = useForm({
        nama_klinik: settings.nama_klinik || '',
        alamat_klinik: settings.alamat_klinik || '',
        kontak_klinik: settings.kontak_klinik || '',
        email_klinik: settings.email_klinik || '',
        running_text: settings.running_text || '',
        rt_speed: settings.rt_speed || '15',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pengaturan.sistem.save'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Konfigurasi sistem berhasil diperbarui!',
                    confirmButtonColor: '#0ea5e9',
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Terjadi kesalahan saat menyimpan data.',
                    confirmButtonColor: '#f43f5e',
                });
            }
        });
    };

    return (
        <AppLayout auth={auth} header="Konfigurasi Sistem">
            <Head title="Konfigurasi Sistem" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-2xl p-8 overflow-hidden relative">
                    {/* Header decorative bg */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400 to-sky-200 opacity-20 blur-3xl rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-cyan-400 to-sky-100 opacity-30 blur-2xl rounded-full"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-300 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-100">
                                <i className={`fas ${activeTab === 'general' ? 'fa-sliders' : 'fa-shield-halved'} text-2xl`}></i>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    {activeTab === 'general' ? 'Pengaturan Utama' : 'Performance Guard'}
                                </h1>
                                <p className="text-xs text-slate-500 font-medium">
                                    {activeTab === 'general'
                                        ? 'Konfigurasi dasar klinik, running text, dan tarif dasar.'
                                        : 'Sistem perlindungan integritas file inti dan validasi aset digital SIMKlinik.'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                {activeTab === 'general' && (
                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Nama Klinik</label>
                                                <input
                                                    type="text"
                                                    value={data.nama_klinik}
                                                    onChange={e => setData('nama_klinik', e.target.value)}
                                                    className="w-full px-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                    placeholder="Masukkan nama klinik..."
                                                    required
                                                />
                                                {errors.nama_klinik && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.nama_klinik}</span>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Kontak / No. Telepon</label>
                                                <input
                                                    type="text"
                                                    value={data.kontak_klinik}
                                                    onChange={e => setData('kontak_klinik', e.target.value)}
                                                    className="w-full px-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                    placeholder="0812xxxxxx"
                                                />
                                                {errors.kontak_klinik && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.kontak_klinik}</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Alamat Lengkap</label>
                                            <textarea
                                                value={data.alamat_klinik}
                                                onChange={e => setData('alamat_klinik', e.target.value)}
                                                className="w-full px-4 py-3 top-0 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                placeholder="Masukkan alamat klinik..."
                                                rows="3"
                                            />
                                            {errors.alamat_klinik && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.alamat_klinik}</span>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Email Klinik</label>
                                                <input
                                                    type="email"
                                                    value={data.email_klinik}
                                                    onChange={e => setData('email_klinik', e.target.value)}
                                                    className="w-full px-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                    placeholder="klinik@example.com"
                                                />
                                                {errors.email_klinik && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.email_klinik}</span>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Kecepatan Running Text (1 - 50)</label>
                                                <input
                                                    type="number"
                                                    value={data.rt_speed}
                                                    onChange={e => setData('rt_speed', e.target.value)}
                                                    className="w-full px-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                    placeholder="15"
                                                    min="1"
                                                    max="50"
                                                />
                                                {errors.rt_speed && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.rt_speed}</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Running Text pada Layar</label>
                                            <textarea
                                                value={data.running_text}
                                                onChange={e => setData('running_text', e.target.value)}
                                                className="w-full px-4 py-3 top-0 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                                                placeholder="Masukkan teks yang akan berjalan di layar..."
                                                rows="2"
                                            />
                                            {errors.running_text && <span className="text-rose-500 text-xs mt-1 block px-1">{errors.running_text}</span>}
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-3.5 bg-gradient-to-r from-sky-600 to-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {processing ? (
                                                    <i className="fas fa-circle-notch fa-spin"></i>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-save"></i>
                                                        <span>Simpan Perubahan</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {activeTab === 'security' && (
                                    <div className="space-y-6">
                                        <div className="mb-4">
                                            <h4 className="font-bold text-slate-800 text-lg mb-1">Performance Guard</h4>
                                            <p className="text-xs text-slate-500 font-medium tracking-tight">Sistem perlindungan integritas file inti dan validasi aset digital SIMKlinik.</p>
                                        </div>

                                        <div className="bg-slate-50/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 text-center flex flex-col items-center justify-center min-h-[280px]">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 text-sky-500 border border-sky-100/30">
                                                <i className="fas fa-shield-check text-2xl"></i>
                                            </div>
                                            <h5 className="font-bold text-slate-800 mb-2">Security Manifest Console</h5>
                                            <p className="text-xs text-slate-400 max-w-md mb-6 px-4">Jika Anda melakukan perubahan sah pada file vital, gunakan konsol ini untuk mensinkronkan ulang sidik jari keamanan agar sistem tidak terblokir.</p>

                                            <a
                                                href="/generate_hash.php"
                                                target="_blank"
                                                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-100/50 hover:shadow-sky-200/50 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 text-sm"
                                            >
                                                <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                                                <span>Buka Integrity Console</span>
                                            </a>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white border border-slate-100/80 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
                                                <div>
                                                    <span className="font-bold text-sm text-slate-800 d-block">AppLayout.jsx</span>
                                                    <small className="text-xs text-slate-400">Core Layout Framework</small>
                                                </div>
                                                <span className={`px-3 py-1 font-bold rounded-lg text-xs ${(integrity && integrity['AppLayout.jsx'] === 'Tampered') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {(integrity && integrity['AppLayout.jsx'] === 'Tampered') ? 'Tampered' : 'Protected'}
                                                </span>
                                            </div>

                                            <div className="bg-white border border-slate-100/80 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
                                                <div>
                                                    <span className="font-bold text-sm text-slate-800 d-block">HandleInertiaRequests.php</span>
                                                    <small className="text-xs text-slate-400">Global State Controller</small>
                                                </div>
                                                <span className={`px-3 py-1 font-bold rounded-lg text-xs ${(integrity && integrity['HandleInertiaRequests.php'] === 'Tampered') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {(integrity && integrity['HandleInertiaRequests.php'] === 'Tampered') ? 'Tampered' : 'Protected'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
