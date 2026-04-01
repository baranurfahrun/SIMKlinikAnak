import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function StokOpname({ auth, stok }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState(
        // Default kosong biar Bro gak capek hapus angka 0
        stok.map(s => ({ ...s, penyesuaian: "" }))
    );

    const { data, setData, processing } = useForm({
        tgl_opname: new Date().toISOString().split('T')[0]
    });

    const handlePenyesuaianChange = (kode, value) => {
        // Izinkan angka dan simbol minus saja
        setItems(items.map(i => i.kode_brng === kode ? { ...i, penyesuaian: value } : i));
    };

    const filteredItems = items.filter(i =>
        i.nama_brng.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.kode_brng.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const submit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Penyesuaian?',
            text: "Pastikan 'Hasil Akhir' sudah sesuai dengan hitungan Anda.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9',
            confirmButtonText: 'Ya, Simpan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Konversi string ke angka pas mau kirim ke backend
                const itemsToSubmit = items
                    .filter(i => i.penyesuaian !== "" && i.penyesuaian !== "0")
                    .map(i => ({
                        kode_brng: i.kode_brng,
                        stok_sistem: i.stok,
                        penyesuaian: parseFloat(i.penyesuaian) || 0
                    }));

                if (itemsToSubmit.length === 0) {
                    return Swal.fire('Info', 'Tidak ada perubahan stok yang diisi.', 'info');
                }

                Inertia.post(route('farmasi.opname.store'), {
                    tgl_opname: data.tgl_opname,
                    items: itemsToSubmit
                }, {
                    onSuccess: () => {
                        Swal.fire('Berhasil', 'Matematika Berhasil! Stok telah sinkron.', 'success');
                    }
                });
            }
        });
    };

    return (
        <AppLayout auth={auth} header="Stok Opname Farmasi">
            <Head title="Farmasi - Stok Opname" />

            <div className="space-y-4 -mt-8">
                {/* Header Card */}
                <div className="bg-gradient-to-br from-white/80 to-sky-50/50 backdrop-blur-3xl rounded-3xl p-4 border border-white shadow-xl shadow-sky-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
                            <i className="fas fa-calculator text-lg"></i>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Audit & Penyesuaian Stok</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                <span className="text-rose-500 font-black">Penting:</span> Gunakan <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded">-</span> untuk mengurangi (Contoh: -3)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Tanggal</label>
                            <input
                                type="date"
                                className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 shadow-sm focus:ring-4 focus:ring-sky-500/10 transition-all outline-none"
                                value={data.tgl_opname}
                                onChange={e => setData('tgl_opname', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cari Obat</label>
                            <div className="relative">
                                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
                                <input
                                    type="text"
                                    placeholder="Nama obat..."
                                    className="pl-8 pr-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-600 shadow-sm focus:ring-4 focus:ring-sky-500/10 transition-all outline-none md:w-64"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Data Obat</th>
                                    <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center w-32">Stok Lama</th>
                                    <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center w-40">Penyesuaian (+/-)</th>
                                    <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center w-32 bg-sky-50/50">Stok Baru</th>
                                    <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredItems.length > 0 ? filteredItems.map((i) => {
                                    const stokSistem = parseFloat(i.stok) || 0;
                                    const val = i.penyesuaian;
                                    const adj = parseFloat(val) || 0;
                                    const hasilAkhir = stokSistem + adj;

                                    return (
                                        <tr key={`row-${i.kode_brng}`} className="group hover:bg-sky-50/20 transition-all">
                                            <td className="px-2 py-0.5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-700 tracking-tight">{i.nama_brng}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">{i.kode_brng}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 py-0.5 text-center">
                                                <div className="bg-slate-100/50 rounded-lg py-1 px-2 inline-block">
                                                    <span className="text-xs font-black text-slate-400">{stokSistem}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 py-0.5 text-center">
                                                <div className="relative inline-block overflow-hidden rounded-xl border border-slate-200 shadow-inner">
                                                    <input
                                                        key={`input-${i.kode_brng}`}
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="0"
                                                        className="w-32 text-center bg-white py-0.5 px-2 text-sm font-black text-sky-600 focus:bg-sky-50 focus:text-sky-700 transition-all outline-none border-none"
                                                        value={val}
                                                        onFocus={(e) => e.target.select()}
                                                        onChange={e => handlePenyesuaianChange(i.kode_brng, e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-[8px] font-bold text-slate-300 mt-1 uppercase tracking-tighter">Ketik -3 untuk kurangi</div>
                                            </td>
                                            <td className="px-2 py-0.5 text-center bg-sky-50/20">
                                                <span className={`text-sm font-black ${hasilAkhir < 0 ? 'text-rose-500 underline decoration-wavy' : hasilAkhir === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                                                    {hasilAkhir}
                                                </span>
                                            </td>
                                            <td className="px-2 py-0.5">
                                                <div className="flex items-center gap-2">
                                                    {val !== "" && adj !== 0 ? (
                                                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border ${adj > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                            {adj > 0 ? `+${adj}` : `-${Math.abs(adj)}`}
                                                        </div>
                                                    ) : (
                                                        <div className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-slate-50 text-slate-300 tracking-widest border border-slate-100">
                                                            Tetap
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center opacity-30 italic font-bold text-slate-400">
                                            Obat tidak ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-400 italic">
                            <i className="fas fa-info-circle text-xs"></i>
                            <span className="text-[10px] font-bold uppercase tracking-tight">Mengupdate stok fisik akan langsung memperbarui saldo stok berjalan</span>
                        </div>
                        <button
                            onClick={submit}
                            disabled={processing}
                            className="px-5 py-2.5 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                        >
                            {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                            Simpan Perubahan & Update Stok
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
