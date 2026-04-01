import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function StokInventori({ auth, stok }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        kode_brng: '',
        nama_brng: '',
        kode_sat: 'TAB',
        hargajual: 0,
        status: '1'
    });

    const handleAddNew = () => {
        setIsEditMode(false);
        reset();
        setIsModalOpen(true);
    };

    const handleEdit = (obat) => {
        setIsEditMode(true);
        setData({
            kode_brng: obat.kode_brng,
            nama_brng: obat.nama_brng,
            kode_sat: obat.kode_sat,
            hargajual: obat.hargajual,
            status: String(obat.status)
        });
        setIsModalOpen(true);
    };

    const handleDelete = (obat) => {
        Swal.fire({
            title: 'Hapus Obat?',
            text: `Data ${obat.nama_brng} akan dihapus dari master data.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            customClass: {
                popup: 'rounded-[24px] font-["Outfit"]',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('farmasi.stok.destroy', obat.kode_brng), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Terhapus',
                            text: 'Data obat berhasil dihapus',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: { popup: 'rounded-[24px]' }
                        });
                    }
                });
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            put(route('farmasi.stok.update', data.kode_brng), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data obat telah diperbarui',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: { popup: 'rounded-[24px] font-["Outfit"]' }
                    });
                },
            });
        } else {
            post(route('farmasi.stok.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data obat baru telah disimpan',
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: { popup: 'rounded-[24px] font-["Outfit"]' }
                    });
                },
            });
        }
    };

    return (
        <AppLayout auth={auth} header="Stok & Inventori Obat">
            <Head title="Farmasi - Stok & Inventori" />

            <div className="space-y-4 -mt-8">
                {/* Header Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Master Data Obat</h2>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1 opacity-60">Kelola stok dan harga jual obat klinik</p>
                    </div>

                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all flex items-center gap-3 text-xs uppercase tracking-widest active:scale-95"
                    >
                        <i className="fas fa-plus"></i>
                        Tambah Obat Baru
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-sm overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Kode</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Nama Obat / Barang</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Satuan</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Stok Realtime</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Harga Jual</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">E-Resep?</th>
                                    <th className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {stok.length > 0 ? stok.map((o) => (
                                    <tr key={o.kode_brng} className="hover:bg-emerald-50/20 transition-all group">
                                        <td className="px-4 py-1.5">
                                            <span className="text-xs font-black text-slate-400 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">{o.kode_brng}</span>
                                        </td>
                                        <td className="px-4 py-1.5">
                                            <span className="text-sm font-black text-slate-700 tracking-tight">{o.nama_brng}</span>
                                        </td>
                                        <td className="px-4 py-1.5">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">{o.kode_sat || '-'}</span>
                                        </td>
                                        <td className="px-4 py-1.5 text-center">
                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl ${o.stok > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                                <i className={`fas ${o.stok > 0 ? 'fa-boxes-stacked' : 'fa-box-open'} text-xs`}></i>
                                                <span className="text-sm font-black">{o.stok || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.5 text-right">
                                            <span className="text-sm font-black text-slate-700 tracking-tighter">Rp {o.hargajual?.toLocaleString('id-ID')}</span>
                                        </td>
                                        <td className="px-4 py-1.5 text-center">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${o.stok > 0 && o.status === '1' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                                                {o.stok > 0 && o.status === '1' ? 'READY' : 'OFF'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-1.5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(o)}
                                                    className="w-9 h-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 hover:shadow-lg transition-all active:scale-95"
                                                >
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(o)}
                                                    className="w-9 h-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-lg transition-all active:scale-95"
                                                >
                                                    <i className="fas fa-trash text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-40 animate-pulse">
                                                <i className="fas fa-boxes-stacked text-4xl text-emerald-200"></i>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada data obat</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Tambah/Edit Obat */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white/95 backdrop-blur-3xl w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-white">
                        {/* Modal Header */}
                        <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${isEditMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                                    <i className={`fas ${isEditMode ? 'fa-edit' : 'fa-capsules'} text-xl font-black`}></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                                        {isEditMode ? 'Update Data Obat' : 'Master Obat Baru'}
                                    </h3>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                        {isEditMode ? 'Perbarui informasi obat terpilih' : 'Registrasi data obat ke inventori sistem'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-slate-100 hover:bg-rose-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={submit} className="p-10 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kode Barang / SKU</label>
                                    <input
                                        type="text"
                                        disabled={isEditMode}
                                        placeholder="Contoh: BRG001"
                                        className={`w-full px-5 py-3 bg-slate-100/50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-300 transition-all outline-none ${errors.kode_brng ? 'ring-2 ring-rose-500' : ''} ${isEditMode && 'opacity-50 cursor-not-allowed'}`}
                                        value={data.kode_brng}
                                        onChange={e => setData('kode_brng', e.target.value.toUpperCase())}
                                        required
                                    />
                                    {errors.kode_brng && <p className="text-[9px] text-rose-500 font-bold uppercase ml-1 tracking-tighter">{errors.kode_brng}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Satuan</label>
                                    <select
                                        className="w-full px-5 py-3 bg-slate-100/50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none"
                                        value={data.kode_sat}
                                        onChange={e => setData('kode_sat', e.target.value)}
                                    >
                                        <option value="TAB">TABLET</option>
                                        <option value="SYR">SIRUP / ML</option>
                                        <option value="BTL">BOTOL</option>
                                        <option value="PCS">PCS</option>
                                        <option value="BOX">BOX</option>
                                        <option value="STRIP">STRIP</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Obat / Barang</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap obat..."
                                    className={`w-full px-5 py-3 bg-slate-100/50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-300 transition-all outline-none ${errors.nama_brng ? 'ring-2 ring-rose-500' : ''}`}
                                    value={data.nama_brng}
                                    onChange={e => setData('nama_brng', e.target.value)}
                                    required
                                />
                                {errors.nama_brng && <p className="text-[9px] text-rose-500 font-bold uppercase ml-1 tracking-tighter">{errors.nama_brng}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Harga Jual (Rp)</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300">Rp</span>
                                        <input
                                            type="number"
                                            className="w-full pl-12 pr-5 py-3 bg-slate-100/50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-300 transition-all outline-none"
                                            value={data.hargajual}
                                            onChange={e => setData('hargajual', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status Keaktifan</label>
                                    <div className="flex bg-slate-100/50 p-1 rounded-2xl">
                                        <button
                                            type="button"
                                            onClick={() => setData('status', '1')}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${data.status === '1' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                                        >
                                            Aktif
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('status', '0')}
                                            className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${data.status === '0' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
                                        >
                                            Non-Aktif
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full py-4 ${isEditMode ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'} text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50`}
                                >
                                    {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save shadow-sm"></i>}
                                    {isEditMode ? 'Update Data Obat' : 'Simpan Data Obat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
