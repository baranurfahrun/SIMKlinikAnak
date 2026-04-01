import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Create({ auth, registrasi, obat, riwayatResep }) {
    const [searchObat, setSearchObat] = useState('');
    const [filteredObat, setFilteredObat] = useState(obat);
    const [items, setItems] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        no_rawat: registrasi.no_rawat,
        kd_dokter: registrasi.kd_dokter,
        items: []
    });

    useEffect(() => {
        setData('items', items);
    }, [items]);

    useEffect(() => {
        if (searchObat.length > 1) {
            setIsSearching(true);
            const delayDebounceFn = setTimeout(() => {
                axios.get(route('api.farmasi.obat'), { params: { search: searchObat } })
                    .then(res => {
                        setFilteredObat(res.data);
                        setIsSearching(false);
                    });
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setFilteredObat(obat);
        }
    }, [searchObat]);

    const addItem = (o) => {
        const exist = items.find(i => i.kode_brng === o.kode_brng);
        if (exist) {
            Swal.fire('Info', 'Obat sudah ada dalam daftar.', 'info');
            return;
        }
        setItems([...items, { ...o, jml: 1, aturan_pakai: '3 x 1' }]);
    };

    const removeItem = (kode) => {
        setItems(items.filter(i => i.kode_brng !== kode));
    };

    const updateItem = (kode, field, value) => {
        setItems(items.map(i => i.kode_brng === kode ? { ...i, [field]: value } : i));
    };

    const submit = (e) => {
        e.preventDefault();
        if (items.length === 0) {
            Swal.fire('Peringatan', 'Silakan masukkan obat terlebih dahulu.', 'warning');
            return;
        }

        // Frontend Stock Validation
        const insufficientItems = items.filter(i => parseFloat(i.jml) > i.stok);
        if (insufficientItems.length > 0) {
            const list = insufficientItems.map(i => `- ${i.nama_brng} (Tersedia: ${i.stok})`).join('<br/>');
            Swal.fire({
                title: 'Stok Tidak Mencukupi',
                html: `<div className="text-left text-sm mt-4">Obat berikut melebihi stok sistem:<br/><br/>${list}</div>`,
                icon: 'error',
                customClass: { popup: 'rounded-[24px]' }
            });
            return;
        }

        // Logic for store resep will be added in controller later
        Swal.fire({
            title: 'Simpan Resep?',
            text: "Daftar obat akan dikirim ke unit farmasi.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Ya, Kirim Resep'
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('farmasi.store'), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Resep telah terkirim ke Farmasi',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        setItems([]);
                    },
                    onError: (err) => {
                        Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan resep.', 'error');
                    }
                });
            }
        });
    };

    return (
        <AppLayout auth={auth} header="Input Obat / Resep">
            <Head title="Farmasi - Input Obat" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Input Resep */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-8 border border-white/50 shadow-sm overflow-hidden relative">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                                    <i className="fas fa-prescription text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">E-Prescribing</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Input resep untuk Dokter: <span className="text-emerald-600 italic">{registrasi.dokter?.nm_dokter}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Search Obat Section */}
                            <div className="relative group">
                                <i className={`fas ${isSearching ? 'fa-spinner fa-spin' : 'fa-search'} absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors`}></i>
                                <input
                                    type="text"
                                    placeholder="Cari nama obat (Ketik min. 2 huruf)..."
                                    className="w-full pl-12 pr-6 py-4 bg-white/60 border-none rounded-2xl text-sm font-bold text-slate-700 shadow-inner focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-300 transition-all outline-none"
                                    value={searchObat}
                                    onChange={e => setSearchObat(e.target.value)}
                                />

                                {searchObat.length >= 1 && (
                                    <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-3xl border border-white rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 max-h-[400px] overflow-y-auto">
                                        {filteredObat.length > 0 ? filteredObat.map((o) => (
                                            <button
                                                key={o.kode_brng}
                                                onClick={() => { addItem(o); setSearchObat(''); }}
                                                className="w-full text-left px-6 py-4 hover:bg-emerald-500 hover:text-white transition-all border-b border-slate-50 last:border-none flex items-center justify-between group/item"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-tight">{o.nama_brng}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 group-hover:text-emerald-100 uppercase tracking-widest mt-0.5">{o.kode_brng} | Rp {o.hargajual.toLocaleString()} | Stok: {o.stok}</span>
                                                </div>
                                                <i className="fas fa-plus-circle text-emerald-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100"></i>
                                            </button>
                                        )) : (
                                            <div className="p-10 text-center">
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic opacity-50">Obat tidak ditemukan</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Items Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Nama Obat</th>
                                            <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center w-24">Jumlah</th>
                                            <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left">Aturan Pakai</th>
                                            <th className="py-4 text-center w-12"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {items.length > 0 ? items.map((i) => (
                                            <tr key={i.kode_brng} className="group hover:bg-emerald-50/30 transition-all duration-300">
                                                <td className="py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-slate-700 tracking-tight">{i.nama_brng}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{i.kode_brng} | Sisa Stok: {i.stok}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <input
                                                        type="number"
                                                        className="w-full bg-white/60 border border-slate-100 rounded-xl py-1.5 px-3 text-xs font-black text-center text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                        value={i.jml}
                                                        onChange={e => updateItem(i.kode_brng, 'jml', e.target.value)}
                                                    />
                                                </td>
                                                <td className="py-4">
                                                    <input
                                                        type="text"
                                                        className="w-full bg-white/60 border border-slate-100 rounded-xl py-1.5 px-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                        value={i.aturan_pakai}
                                                        onChange={e => updateItem(i.kode_brng, 'aturan_pakai', e.target.value)}
                                                        placeholder="Contoh: 3 x 1 Sesudah Makan"
                                                    />
                                                </td>
                                                <td className="py-4 text-center">
                                                    <button
                                                        onClick={() => removeItem(i.kode_brng)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <i className="fas fa-trash-can text-[10px]"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="py-20 text-center">
                                                    <div className="flex flex-col items-center gap-3 opacity-30">
                                                        <i className="fas fa-pills text-3xl text-slate-300"></i>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Belum ada obat dalam resep</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={submit}
                                disabled={items.length === 0}
                                className="px-10 py-4 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest rounded-[20px] shadow-xl shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-4 disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                <i className="fas fa-paper-plane"></i>
                                Kirim ke Farmasi
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Riwayat Resep */}
                <div className="lg:col-span-4">
                    <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-sm overflow-hidden sticky top-24">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Riwayat E-Resep</h3>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Pasien: {registrasi.pasien?.nm_pasien}</p>
                        </div>
                        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {riwayatResep?.length > 0 ? riwayatResep.map((r, idx) => (
                                <div key={idx} className="mb-6 last:mb-0 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{r.no_resep}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{r.tgl_perawatan}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <i className="fas fa-history text-[10px]"></i>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {r.detail?.map((dt, dIdx) => (
                                            <div key={dIdx} className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                                                <span>{dt.barang?.nama_brng} ({dt.jml})</span>
                                                <span className="text-[9px] text-slate-400 italic">[{dt.aturan_pakai}]</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )) : (
                                <div className="py-10 text-center">
                                    <i className="fas fa-clock-rotate-left text-2xl text-slate-100 mb-3 block"></i>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic leading-relaxed">Belum ada riwayat resep elektronik untuk pasien ini.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
