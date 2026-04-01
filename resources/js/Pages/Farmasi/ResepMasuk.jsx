import React, { useState } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ResepMasuk({ auth, resep, filters, title, type }) {
    const [selectedResep, setSelectedResep] = useState(null);
    const [dateFilter, setDateFilter] = useState({
        tgl_awal: filters?.tgl_awal || new Date().toISOString().split('T')[0],
        tgl_akhir: filters?.tgl_akhir || new Date().toISOString().split('T')[0]
    });

    // === Fitur Ganti Obat / Substitusi ===
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // { type: 'reguler' | 'racik_detail', item, racik }
    const [searchSubstitusi, setSearchSubstitusi] = useState('');
    const [filteredSubstitusi, setFilteredSubstitusi] = useState([]);
    const [selectedPengganti, setSelectedPengganti] = useState(null);
    const [isSearchingSubstitusi, setIsSearchingSubstitusi] = useState(false);
    const [newAturan, setNewAturan] = useState('');
    const [newJml, setNewJml] = useState('');

    // Debounce Search Obat Pengganti
    React.useEffect(() => {
        if (isEditItemModalOpen && searchSubstitusi.trim().length > 0) {
            setIsSearchingSubstitusi(true);
            const delayDebounceFn = setTimeout(() => {
                axios.get(route('api.farmasi.obat'), { params: { search: searchSubstitusi } })
                    .then(res => {
                        setFilteredSubstitusi(res.data);
                        setIsSearchingSubstitusi(false);
                    });
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setFilteredSubstitusi([]);
        }
    }, [searchSubstitusi, isEditItemModalOpen]);

    const handleSubmitSubstitusi = () => {
        if (!editingItem) return;

        const payload = {
            id: editingItem.item.id,
            no_resep: editingItem.item.no_resep || editingItem.racik?.no_resep,
            kode_brng: editingItem.item.kode_brng,
            new_kode_brng: selectedPengganti ? selectedPengganti.kode_brng : null,
            jml: newJml,
        };

        if (editingItem.type === 'reguler') {
            payload.aturan_pakai = newAturan;
            Inertia.put(route('farmasi.resep.item.update'), payload, {
                onSuccess: () => {
                    setIsEditItemModalOpen(false);
                    setSelectedResep(null);
                    Swal.fire('Berhasil', 'Item resep telah diperbarui.', 'success');
                },
                onError: (errors) => {
                    Swal.fire('Gagal Memperbarui', errors.message || 'Terjadi kesalahan sistem.', 'error');
                }
            });
        } else if (editingItem.type === 'racik_detail') {
            payload.nama_racik = editingItem.racik.nama_racik;
            Inertia.put(route('farmasi.resep.racikan_detail.update'), payload, {
                onSuccess: () => {
                    setIsEditItemModalOpen(false);
                    setSelectedResep(null);
                    Swal.fire('Berhasil', 'Bahan racikan telah diperbarui.', 'success');
                },
                onError: (errors) => {
                    Swal.fire('Gagal Memperbarui', errors.message || 'Terjadi kesalahan sistem.', 'error');
                }
            });
        }
    };

    const openEditModal = (type, item, racik = null) => {
        // Diagnostik Klik
        console.log("openEditModal Clicked:", type, item);
        
        try {
            setEditingItem({ type, item, racik });
            setNewJml(item.jml);
            setNewAturan(item.aturan_pakai || '');
            setSelectedPengganti(null);
            setSearchSubstitusi('');
            setIsEditItemModalOpen(true);
        } catch (error) {
            alert("State Setter Crash: " + error.message);
        }
    };

    const handleConfirm = () => {
        if (!selectedResep) return;

        Swal.fire({
            title: 'Selesaikan Resep?',
            text: "Pastikan semua obat telah disiapkan sesuai resep.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Ya, Selesaikan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('farmasi.resep.confirm'), {
                    no_rawat: selectedResep.no_rawat
                }, {
                    onSuccess: () => {
                        setSelectedResep(null);
                        Swal.fire('Berhasil', 'Semua resep pasien ini telah diselesaikan.', 'success');
                    }
                });
            }
        });
    };

    const handleEditItem = (item) => {
        Swal.fire({
            title: 'Edit Item Obat',
            html: `
                <div class="space-y-4 pt-4 text-left">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Jumlah Obat</label>
                        <input id="swal-jml" type="number" class="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl text-sm font-bold" value="${item.jml}">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Aturan Pakai</label>
                        <input id="swal-aturan" type="text" class="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl text-sm font-bold" value="${item.aturan_pakai}">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan Perubahan',
            confirmButtonColor: '#10b981',
            cancelButtonText: 'Batal',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    jml: document.getElementById('swal-jml').value,
                    aturan: document.getElementById('swal-aturan').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.put(route('farmasi.resep.item.update'), {
                    no_resep: item.no_resep,
                    kode_brng: item.kode_brng,
                    jml: result.value.jml,
                    aturan_pakai: result.value.aturan
                }, {
                    onSuccess: () => {
                        setSelectedResep(null); // Tutup modal dulu biar refresh data group
                        Swal.fire('Berhasil', 'Item resep telah diperbarui.', 'success');
                    }
                });
            }
        });
    };

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'Hapus Item?',
            text: `Yakin ingin menghapus ${item.barang?.nama_brng} dari resep?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('farmasi.resep.item.destroy'), {
                    data: {
                        no_resep: item.no_resep,
                        kode_brng: item.kode_brng
                    },
                    onSuccess: () => {
                        setSelectedResep(null); // Tutup modal dulu biar refresh data group
                        Swal.fire('Berhasil', 'Item resep telah dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleEditRacikan = (racik) => {
        Swal.fire({
            title: 'Edit Resep Racikan',
            html: `
                <div class="space-y-4 pt-4 text-left">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Jumlah Bungkus</label>
                        <input id="swal-jml" type="number" class="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl text-sm font-bold" value="${racik.jml_dr}">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Aturan Pakai</label>
                        <input id="swal-aturan" type="text" class="w-full px-5 py-4 bg-slate-50 border-slate-100 rounded-2xl text-sm font-bold" value="${racik.aturan_pakai}">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan Perubahan',
            confirmButtonColor: '#10b981',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                return {
                    jml_dr: document.getElementById('swal-jml').value,
                    aturan: document.getElementById('swal-aturan').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.put(route('farmasi.resep.racikan.update'), {
                    no_resep: racik.no_resep,
                    nama_racik: racik.nama_racik,
                    jml_dr: result.value.jml_dr,
                    aturan_pakai: result.value.aturan
                }, {
                    onSuccess: () => {
                        setSelectedResep(null);
                        Swal.fire('Berhasil', 'Resep racikan telah diperbarui.', 'success');
                    }
                });
            }
        });
    };

    const handleDeleteRacikan = (racik) => {
        Swal.fire({
            title: 'Hapus Racikan?',
            text: `Yakin ingin menghapus grup racikan "${racik.nama_racik}"? Semua bahan di dalamnya akan ikut dihapus.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('farmasi.resep.racikan.destroy'), {
                    data: {
                        no_resep: racik.no_resep,
                        nama_racik: racik.nama_racik
                    },
                    onSuccess: () => {
                        setSelectedResep(null);
                        Swal.fire('Berhasil', 'Resep racikan telah dihapus.', 'success');
                    }
                });
            }
        });
    };
 
    const handleDeleteResep = (resep) => {
        const namaPasien = resep.pasien?.nm_pasien || 'Pasien';
        Swal.fire({
            title: 'Hapus Seluruh Resep?',
            text: `Apakah Anda yakin ingin menghapus seluruh resep untuk "${namaPasien}"? Tindakan ini akan menghapus semua item di dalamnya dan tidak dapat dibatalkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Hapus Semua',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('farmasi.resep.destroy'), {
                    data: { no_rawat: resep.no_rawat },
                    onSuccess: () => {
                        Swal.fire('Berhasil', 'Resep berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const handleDateFilter = () => {
        const currentRoute = type === 'masuk' ? 'farmasi.resep.masuk' : 'farmasi.resep.keluar';
        Inertia.get(route(currentRoute), dateFilter, { preserveState: true });
    };

    return (
        <AppLayout auth={auth} header={title}>
            <Head title={`Farmasi - ${title}`} />

            <div className="space-y-6 -mt-5">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-3xl p-3 rounded-[32px] border border-white/50 shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 ${type === 'masuk' ? 'bg-emerald-500' : 'bg-sky-500'} text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100`}>
                            <i className={`fas ${type === 'masuk' ? 'fa-file-prescription' : 'fa-history'} text-lg`}></i>
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                {type === 'masuk' ? 'Daftar resep dari dokter yang perlu disiapkan' : 'Data riwayat penyerahan obat kepada pasien'}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-100 shadow-sm">
                                <input
                                    type="date"
                                    value={dateFilter.tgl_awal}
                                    onChange={e => setDateFilter({ ...dateFilter, tgl_awal: e.target.value })}
                                    className="border-none bg-transparent p-0 text-[10px] font-black text-slate-600 focus:ring-0"
                                />
                                <span className="text-slate-300">/</span>
                                <input
                                    type="date"
                                    value={dateFilter.tgl_akhir}
                                    onChange={e => setDateFilter({ ...dateFilter, tgl_akhir: e.target.value })}
                                    className="border-none bg-transparent p-0 text-[10px] font-black text-slate-600 focus:ring-0"
                                />
                                <button onClick={handleDateFilter} className="ml-2 text-emerald-500 hover:text-emerald-700">
                                    <i className="fas fa-filter text-xs"></i>
                                </button>
                            </div>
                        <div className={`${type === 'masuk' ? 'bg-emerald-50 border-emerald-100' : 'bg-sky-50 border-sky-100'} px-2 py-1 rounded-xl border flex flex-col items-center justify-center min-w-[70px]`}>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{type === 'masuk' ? 'Total Antrian' : 'Total History'}</span>
                            <span className={`text-xl font-black ${type === 'masuk' ? 'text-emerald-700' : 'text-sky-700'} leading-none mt-0.5`}>{resep.length}</span>
                        </div>
                    </div>
                </div>

                {/* Resep Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {resep.length > 0 ? resep.map((r) => (
                        <div
                            key={r.no_rawat}
                            className="bg-white/60 backdrop-blur-xl rounded-[40px] border border-white p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden"
                            onClick={() => setSelectedResep(r)}
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-sky-100">
                                    {r.jam_perawatan}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xs uppercase group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        {r.pasien?.nm_pasien?.substring(0, 2)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-slate-800 truncate uppercase tracking-tight text-base group-hover:text-emerald-600 transition-colors">
                                            {r.pasien?.nm_pasien}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">No. Rawat: {r.no_rawat}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Dokter Pengirim</span>
                                            <span className="text-xs font-bold text-slate-600 truncate">{r.dokter?.nm_dokter}</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{type === 'masuk' ? 'Visit ID' : 'Proses Selesai'}</span>
                                            <span className={`text-[10px] font-black tracking-tighter ${type === 'masuk' ? 'text-emerald-500' : 'text-slate-500'}`}>
                                                {type === 'masuk' ? `#${r.no_rawat.split('/').pop()}` : `${r.tgl_penyerahan} ${r.jam_penyerahan}`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 rounded-2xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ringkasan Obat</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{r.all_items?.length} Items</span>
                                        </div>
                                        <div className="space-y-1">
                                            {r.all_items?.slice(0, 3).map((d, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-[10px]">
                                                    <span className="font-bold text-slate-600 truncate mr-2 italic tracking-tight opacity-70">
                                                        - {d.barang?.nama_brng}
                                                    </span>
                                                    <span className="font-black text-slate-400">x{d.jml}</span>
                                                </div>
                                            ))}
                                            {r.all_items?.length > 3 && (
                                                <p className="text-[8px] font-black text-emerald-500 uppercase mt-2 text-center tracking-widest">+ {r.all_items.length - 3} Obat Lainnya</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <button className={`flex-1 py-4 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 ${type === 'masuk' ? 'bg-slate-900 shadow-slate-100 group-hover:bg-emerald-600 group-hover:shadow-emerald-100' : 'bg-sky-500 hover:bg-sky-600 shadow-sky-100'}`}>
                                        <i className={`fas ${type === 'masuk' ? 'fa-hand-holding-medical' : 'fa-eye'}`}></i>
                                        {type === 'masuk' ? 'Proses Resep' : 'Lihat Detail'}
                                    </button>
                                    {type === 'masuk' && (
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteResep(r); }} className="w-12 h-12 bg-rose-50 hover:bg-rose-500 rounded-2xl flex items-center justify-center text-rose-500 hover:text-white transition-all shadow-sm flex-shrink-0" title="Hapus Resep">
                                            <i className="fas fa-trash-alt text-xs"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-4 opacity-30 italic">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-4xl mb-2">
                                <i className="fas fa-inbox"></i>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Belum ada resep masuk</p>
                            <p className="text-[10px] font-bold uppercase tracking-tight text-slate-300">Resep dari dokter akan otomatis tampil di sini</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail Resep */}
            {selectedResep && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedResep(null)}></div>
 
                    {/* 🔴 MODAL SUBSTITUSI / GANTI OBAT (Pindahkan ke sini agar nempel di context DOM yang sama) 🔴 */}
                    {isEditItemModalOpen && editingItem && (
                        <div className="absolute inset-0 bg-black/80 z-[1000] flex items-center justify-center p-5 rounded-[48px]">
                            <div className="bg-white rounded-[40px] shadow-2xl max-w-md w-full p-8 border border-white space-y-6 animate-in zoom-in duration-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Ganti / Substitusi Obat</h3>
                                    <button onClick={() => { setIsEditItemModalOpen(false); setSelectedPengganti(null); }} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
                                </div>
                                <div className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Obat Asal</label>
                                        <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100/50 text-xs font-bold text-slate-500">
                                            {editingItem.type === 'reguler' 
                                                ? (editingItem.item?.barang?.nama_brng || 'Obat') 
                                                : (editingItem.item?.nama_brng || 'Bahan')}
                                        </div>
                                    </div>
 
                                    <div className="relative">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cari Obat Pengganti</label>
                                        <div className="relative">
                                            <i className={`fas ${isSearchingSubstitusi ? 'fa-spinner fa-spin' : 'fa-search'} absolute left-4 top-1/2 -translate-y-1/2 text-slate-400`}></i>
                                            <input 
                                                type="text" 
                                                placeholder="Ketik nama obat..." 
                                                value={searchSubstitusi} 
                                                onChange={e => setSearchSubstitusi(e.target.value)} 
                                                className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
                                            />
                                        </div>
 
                                        {filteredSubstitusi.length > 0 && (
                                            <div className="absolute z-[2000] top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-48 overflow-auto py-2">
                                                {filteredSubstitusi.map((o) => (
                                                    <button 
                                                        key={o.kode_brng} 
                                                        onClick={() => { setSelectedPengganti(o); setFilteredSubstitusi([]); setSearchSubstitusi(''); }} 
                                                        className="w-full px-5 py-2 hover:bg-slate-50 text-left text-xs font-bold text-slate-700 flex justify-between"
                                                    >
                                                        <span>{o.nama_brng}</span>
                                                        <span className="text-[10px] text-emerald-500">Stok: {o.stok}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
 
                                    {selectedPengganti && (
                                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase">Substitusi Terpilih:</span>
                                            <p className="text-xs font-black text-slate-800 mt-1">{selectedPengganti.nama_brng}</p>
                                        </div>
                                    )}
 
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jumlah</label>
                                            <input 
                                                type="number" 
                                                value={newJml || ''} 
                                                onChange={e => setNewJml(e.target.value)} 
                                                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-emerald-500 shadow-inner"
                                            />
                                        </div>
                                        {editingItem.type === 'reguler' && (
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aturan Pakai</label>
                                                <input 
                                                    type="text" 
                                                    value={newAturan || ''} 
                                                    onChange={e => setNewAturan(e.target.value)} 
                                                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-emerald-500 shadow-inner"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setIsEditItemModalOpen(false)} className="flex-1 py-3 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-2xl">Batal</button>
                                    <button onClick={handleSubmitSubstitusi} className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-tight shadow-xl shadow-emerald-100 hover:bg-emerald-600 active:scale-95 transition-all">Simpan</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="relative bg-white/95 backdrop-blur-3xl w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-white">
                        <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-500 text-white rounded-[22px] flex items-center justify-center shadow-xl shadow-emerald-100 bg-gradient-to-br from-emerald-400 to-emerald-600">
                                    <i className="fas fa-file-medical text-2xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Detail Resep Rawat</h3>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">PROSES PENYIAPAN OBAT & LABELLING</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedResep(null)} className="w-12 h-12 bg-slate-50 hover:bg-rose-50 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all">
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>

                        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                            {/* Pasien Info */}
                            <div className="grid grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-[32px]">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Informasi Pasien</label>
                                    <p className="text-sm font-black text-slate-700 tracking-tight leading-tight uppercase">{selectedResep.pasien?.nm_pasien}</p>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-tight uppercase">{selectedResep.no_rawat}</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{type === 'masuk' ? 'Dokter Pengirim' : 'Waktu Penyerahan'}</label>
                                    <p className="text-sm font-black text-slate-700 tracking-tight leading-tight uppercase">
                                        {type === 'masuk' ? selectedResep.dokter?.nm_dokter : `${selectedResep.tgl_penyerahan} ${selectedResep.jam_penyerahan}`}
                                    </p>
                                    <p className={`text-[10px] font-bold ${type === 'masuk' ? 'text-emerald-500' : 'text-sky-500'} tracking-tight uppercase`}>
                                        STATUS: {type === 'masuk' ? 'ANTRIAN KOLEKTIF' : 'TELAH DISERAHKAN'}
                                    </p>
                                </div>
                            </div>

                            {/* Daftar Obat */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detail Daftar Obat / Barang</label>
                                <div className="space-y-3">
                                    {((selectedResep.all_items && selectedResep.all_items.length > 0) || (selectedResep.all_racikan && selectedResep.all_racikan.length > 0)) ? (
                                        <div className="space-y-6">
                                            {/* 1. Obat Reguler */}
                                            {selectedResep.all_items && selectedResep.all_items.length > 0 && (
                                                <div className="space-y-3">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Non-Racik / Reguler</span>
                                                    {selectedResep.all_items.map((d, idx) => (
                                                        <div key={`reg-${idx}`} className="flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-3xl group shadow-sm hover:border-emerald-200 transition-all">
                                                            <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 text-[10px] font-black ${type === 'masuk' ? 'group-hover:bg-emerald-500' : 'group-hover:bg-sky-500'} group-hover:text-white transition-all`}>
                                                                {idx + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">{d.barang?.nama_brng}</h4>
                                                                <p className={`text-[10px] font-bold ${type === 'masuk' ? 'text-emerald-500' : 'text-sky-500'} tracking-tight mt-0.5`}>{d.aturan_pakai}</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="text-right">
                                                                    <div className={`px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 ${type === 'masuk' ? 'group-hover:border-emerald-100 group-hover:bg-emerald-50 transition-all' : 'group-hover:border-sky-100 group-hover:bg-sky-50 transition-all'}`}>
                                                                        <span className={`text-xs font-black text-slate-600 ${type === 'masuk' ? 'group-hover:text-emerald-700' : 'group-hover:text-sky-700'} transition-all`}>{d.jml}</span>
                                                                        <span className="text-[9px] font-bold text-slate-400 ml-1 uppercase">{d.barang?.kode_sat}</span>
                                                                    </div>
                                                                </div>
                                                                {type === 'masuk' && (
                                                                    <div className="flex gap-1">
                                                                        <button onClick={(e) => { e.stopPropagation(); openEditModal('reguler', d); }} title="Ganti/Edit Obat" className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all">
                                                                            <i className="fas fa-edit text-[10px]"></i>
                                                                        </button>
                                                                        <button onClick={() => handleDeleteItem(d)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white flex items-center justify-center"><i className="fas fa-trash text-[10px]"></i></button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* 2. Obat Racikan */}
                                            {selectedResep.all_racikan && selectedResep.all_racikan.length > 0 && (
                                                <div className="space-y-4">
                                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Resep Racikan</span>
                                                    {selectedResep.all_racikan.map((racik, idx) => (
                                                        <div key={`rc-${idx}`} className="p-6 bg-white border border-emerald-100 rounded-[32px] space-y-4 shadow-sm relative overflow-hidden">
                                                            <div className="absolute top-0 right-0 p-5 flex items-center gap-2">
                                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                                    {racik.metode_racik}
                                                                </span>
                                                                {type === 'masuk' && (
                                                                    <div className="flex gap-1">
                                                                        <button onClick={() => handleEditRacikan(racik)} title="Edit Jumlah / Aturan" className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center">
                                                                            <i className="fas fa-edit text-[10px]"></i>
                                                                        </button>
                                                                        <button onClick={() => handleDeleteRacikan(racik)} title="Hapus Racikan" className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center">
                                                                            <i className="fas fa-trash text-[10px]"></i>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{racik.nama_racik}</h4>
                                                                <p className="text-[10px] font-bold text-emerald-500 tracking-tight mt-0.5">Aturan: {racik.aturan_pakai} | Total: {racik.jml_dr} Bungkus</p>
                                                            </div>

                                                            <div className="space-y-2 bg-slate-50/80 p-4 rounded-2xl">
                                                                {racik.items && racik.items.map((b, bIdx) => (
                                                                     <div key={bIdx} className="flex justify-between items-center text-[11px] border-b border-slate-100/50 last:border-0 pb-2 pt-1 last:pb-0">
                                                                         <div className="flex items-center gap-1">
                                                                             <span className="font-bold text-slate-600">{b.nama_brng || 'Bahan Obat'}</span>
                                                                             <span className="text-[9px] text-slate-400 font-bold">({b.jml} {b.barang?.kode_sat || 'Sat'})</span>
                                                                         </div>
                                                                         {type === 'masuk' && (
                                                                             <button onClick={() => openEditModal('racik_detail', b, racik)} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-[9px] hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-1" title="Ganti/Edit Bahan">
                                                                                 <i className="fas fa-sync-alt text-[8px]"></i>
                                                                                 Ganti
                                                                             </button>
                                                                         )}
                                                                     </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Belum ada detail obat untuk resep ini</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {type === 'masuk' && (
                            <div className="p-10 bg-slate-50/50 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={handleConfirm}
                                    className="flex-1 py-5 bg-emerald-500 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 active:scale-95"
                                >
                                    <i className="fas fa-check-double text-base"></i>
                                    Konfirmasi & Selesaikan Resep
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
