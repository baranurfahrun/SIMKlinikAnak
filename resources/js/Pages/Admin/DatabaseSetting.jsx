import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function DatabaseSetting({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        db_host: settings.db_host || 'localhost',
        db_port: settings.db_port || '3306',
        db_name: settings.db_name || '',
        db_user: settings.db_user || '',
        db_pass: settings.db_pass || '',
    });

    const [isTesting, setIsTesting] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleTest = async () => {
        setIsTesting(true);
        try {
            const response = await axios.post(route('pengaturan.database.test'), data);
            setStatus('success');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                background: 'rgba(255, 255, 255, 0.9)',
                customClass: {
                    popup: 'rounded-[24px] border border-white/50 backdrop-blur-xl shadow-2xl font-["Outfit"]',
                }
            });
        } catch (error) {
            setStatus('error');
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan sistem',
                background: 'rgba(255, 255, 255, 0.9)',
                customClass: {
                    popup: 'rounded-[24px] border border-white/50 backdrop-blur-xl shadow-2xl font-["Outfit"]',
                }
            });
        } finally {
            setIsTesting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pengaturan.database.save'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tersimpan!',
                    text: 'Konfigurasi database berhasil diperbarui.',
                    timer: 2000,
                    showConfirmButton: false,
                    background: 'rgba(255, 255, 255, 0.9)',
                    customClass: {
                        popup: 'rounded-[24px] border border-white/50 backdrop-blur-xl shadow-2xl font-["Outfit"]',
                    }
                });
            }
        });
    };

    return (
        <AppLayout
            auth={auth}
            header="Koneksi Database SIMRS"
        >
            <Head title="Koneksi Database" />

            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Info Section */}
                        <div className="md:w-1/3 space-y-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                                <i className="fas fa-database text-2xl"></i>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Koneksi Database</h1>
                                    {status === 'success' && (
                                        <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 animate-in fade-in zoom-in duration-300">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Connected</span>
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded-full border border-rose-100 animate-in fade-in zoom-in duration-300">
                                            <span className="relative flex h-2 w-2">
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                            </span>
                                            <span className="text-[8px] font-black text-rose-600 uppercase tracking-tighter">Disconnected</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Konfigurasi ini digunakan untuk menghubungkan SIMKlinik dengan database utama SIMRS Khanza Anda.
                                </p>
                            </div>

                            <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100/50">
                                <div className="flex gap-3">
                                    <i className="fas fa-shield-alt text-amber-500 mt-1"></i>
                                    <div>
                                        <p className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-1">Peringatan Keamanan</p>
                                        <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                                            Pastikan parameter yang dimasukkan sudah benar. Kesalahan konfigurasi dapat mengakibatkan aplikasi tidak dapat menarik data pasien atau riwayat medis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Database Host</label>
                                        <div className="relative group">
                                            <i className="fas fa-server absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                            <input
                                                type="text"
                                                value={data.db_host}
                                                onChange={e => setData('db_host', e.target.value)}
                                                placeholder="localhost atau IP Server"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Port</label>
                                        <input
                                            type="text"
                                            value={data.db_port}
                                            onChange={e => setData('db_port', e.target.value)}
                                            placeholder="3306"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-center"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Database</label>
                                    <div className="relative group">
                                        <i className="fas fa-folder absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                        <input
                                            type="text"
                                            value={data.db_name}
                                            onChange={e => setData('db_name', e.target.value)}
                                            placeholder="sik atau simrs"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Username Database</label>
                                        <div className="relative group">
                                            <i className="fas fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                            <input
                                                type="text"
                                                value={data.db_user}
                                                onChange={e => setData('db_user', e.target.value)}
                                                placeholder="root atau khanza"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password Database</label>
                                        <div className="relative group">
                                            <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                            <input
                                                type="password"
                                                value={data.db_pass}
                                                onChange={e => setData('db_pass', e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-col md:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={handleTest}
                                        disabled={isTesting}
                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        {isTesting ? (
                                            <i className="fas fa-circle-notch fa-spin"></i>
                                        ) : (
                                            <i className="fas fa-vial group-hover:scale-110 transition-transform"></i>
                                        )}
                                        <span>Test Koneksi</span>
                                        {status === 'success' && <i className="fas fa-check-circle text-emerald-500 text-[10px] animate-bounce"></i>}
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-[2] bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-sky-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        {processing ? (
                                            <i className="fas fa-circle-notch fa-spin"></i>
                                        ) : (
                                            <i className="fas fa-save group-hover:scale-110 transition-transform"></i>
                                        )}
                                        <span>Simpan Konfigurasi</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[4px]">SIMKlinik Anak &copy; 2026</p>
                </div>
            </div>
        </AppLayout>
    );
}
