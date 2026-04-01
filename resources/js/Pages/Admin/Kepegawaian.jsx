import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Kepegawaian({ auth, dokter, pegawai }) {
    const [activeTab, setActiveTab] = useState('dokter');

    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        // Data Dokter
        kd_dokter: '',
        nm_dokter: '',
        jk: 'L',
        tmp_lahir: '',
        tgl_lahir: '',
        gol_darah: '-',
        agama: 'Islam',
        alamat: '',
        no_telp: '',
        stts_nikah: 'Menikah',
        alumni: '',
        no_sip: '',
        // Data Staf
        id_user: '',
        password: '',
        nik: '',
        nama_pegawai: '',
        jabatan: '',
        // Note: jk, tmp_lahir, etc are shared with Dokter section above
    });

    const handleTambah = () => {
        reset();
        setIsEditMode(false);
        setIsViewMode(false);
        setSelectedId(null);
        setIsModalOpen(true);
    };

    const handleView = (item, type) => {
        reset();
        setIsEditMode(false);
        setIsViewMode(true);
        setActiveTab(type);

        if (type === 'dokter') {
            setData({
                kd_dokter: item.kd_dokter || '',
                nm_dokter: item.nm_dokter || '',
                jk: item.jk || 'L',
                tmp_lahir: item.tmp_lahir || '',
                tgl_lahir: item.tgl_lahir || '',
                gol_darah: item.gol_darah || '-',
                agama: item.agama || 'Islam',
                alamat: item.alamat || '',
                no_telp: item.no_telp || '',
                stts_nikah: item.stts_nikah || 'Menikah',
                alumni: item.alumni || '',
                no_sip: item.no_sip || '',
            });
        } else {
            setData({
                id_user: item.username || '',
                nik: item.nik || '',
                nama_pegawai: item.nama_pegawai || '',
                jk: item.jk || 'L',
                tmp_lahir: item.tmp_lahir || '',
                tgl_lahir: item.tgl_lahir || '',
                alamat: item.alamat || '',
                no_telp: item.no_telp || '',
                jabatan: item.jabatan || '',
                gol_darah: item.gol_darah || '-',
                agama: item.agama || 'Islam',
                stts_nikah: item.stts_nikah || 'Menikah',
                alumni: item.alumni || '',
            });
        }
        setIsModalOpen(true);
    };

    const handleEdit = (item, type) => {
        reset();
        setIsEditMode(true);
        setIsViewMode(false);
        setActiveTab(type);

        if (type === 'dokter') {
            setSelectedId(item.kd_dokter);
            setData({
                kd_dokter: item.kd_dokter || '',
                nm_dokter: item.nm_dokter || '',
                jk: item.jk || 'L',
                tmp_lahir: item.tmp_lahir || '',
                tgl_lahir: item.tgl_lahir || '',
                gol_darah: item.gol_darah || '-',
                agama: item.agama || 'Islam',
                alamat: item.alamat || '',
                no_telp: item.no_telp || '',
                stts_nikah: item.stts_nikah || 'Menikah',
                alumni: item.alumni || '',
                no_sip: item.no_sip || '',
                // Clear staf specific data
                id_user: '',
                password: '',
                nik: ''
            });
        } else {
            setSelectedId(item.id_user);
            setData({
                // Clear dokter specific data
                kd_dokter: '',
                nm_dokter: '',
                jk: 'L',
                tmp_lahir: '',
                tgl_lahir: '',
                gol_darah: '-',
                agama: 'Islam',
                alamat: '',
                no_telp: '',
                stts_nikah: 'Menikah',
                alumni: '',
                no_sip: '',
                // Set staf specific data
                id_user: item.username || '',
                password: '', // Password dikosongkan saat edit kecuali mau diubah
                nik: item.nik || '',
                nama_pegawai: item.nama_pegawai || '',
                jk: item.jk || 'L',
                tmp_lahir: item.tmp_lahir || '',
                tgl_lahir: item.tgl_lahir || '',
                alamat: item.alamat || '',
                no_telp: item.no_telp || '',
                jabatan: item.jabatan || '',
                gol_darah: item.gol_darah || '-',
                agama: item.agama || 'Islam',
                stts_nikah: item.stts_nikah || 'Menikah',
                alumni: item.alumni || '',
            });
        }

        setIsModalOpen(true);
    };

    const handleDelete = (id, type) => {
        Swal.fire({
            title: 'Yakin mau hapus?',
            text: "Data yang dihapus tidak bisa dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, Hapus Saja!',
            cancelButtonText: 'Batal',
            background: 'rgba(255, 255, 255, 0.9)',
            customClass: {
                popup: 'rounded-[24px] shadow-xl border border-white'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const url = type === 'dokter' ? route('kepegawaian.dokter.destroy', id) : route('kepegawaian.staf.destroy', id);

                Inertia.delete(url, {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Terhapus!',
                            text: 'Data pegawai telah dilenyapkan dari sistem.',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    },
                    onError: (errors) => {
                        const firstError = Object.values(errors)[0];
                        Swal.fire({
                            icon: 'error',
                            title: 'Terjadi Kesalahan',
                            text: firstError || 'Terjadi kesalahan saat menghapus data.',
                            confirmButtonColor: '#0ea5e9'
                        });
                    }
                });
            }
        });
    };

    const handleSave = (e) => {
        if (e) e.preventDefault();

        Swal.fire({
            title: isEditMode ? 'Memperbarui Data...' : 'Sedang Menyimpan...',
            text: 'Harap tunggu, data sedang diproses.',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const method = isEditMode ? 'put' : 'post';
        const url = activeTab === 'dokter'
            ? (isEditMode ? route('kepegawaian.dokter.update', selectedId) : route('kepegawaian.dokter.store'))
            : (isEditMode ? route('kepegawaian.staf.update', selectedId) : route('kepegawaian.staf.store'));

        const options = {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: `Data ${activeTab === 'dokter' ? 'Dokter' : 'Petugas'} berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}.`,
                    timer: 2000,
                    showConfirmButton: false,
                    background: 'rgba(255, 255, 255, 0.9)',
                    customClass: {
                        popup: 'rounded-[24px] shadow-xl border border-white'
                    }
                });
                setIsModalOpen(false);
                setIsEditMode(false);
                setSelectedId(null);
                reset();
            },
            onError: (errors) => {
                Swal.close();
                const firstError = Object.values(errors)[0];
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: firstError || 'Terjadi kesalahan saat memproses data.',
                    confirmButtonColor: '#0ea5e9'
                });
            },
            onFinish: () => {
                // Pastikan loading spinner tertutup jika tidak kena onSuccess/onError
                if (Swal.isVisible() && !isProcessing) {
                    // Swal.close(); // Jangan tutup kalau sudah sukses muncul
                }
            }
        };

        if (method === 'post') {
            post(url, options);
        } else {
            put(url, options);
        }
    };

    return (
        <AppLayout auth={auth} header="Manajemen Kepegawaian">
            <Head title="Sistem & Admin - Kepegawaian" />

            <div className="space-y-4 relative z-10 -mt-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-30">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-100 ring-4 ring-sky-50">
                            <i className="fas fa-users-cog text-2xl"></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">SDM & Tenaga Medis</h2>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Kelola data dokter, perawat, dan staf administratif</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-40">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                            <i className="fas fa-file-export text-sky-500"></i>
                            Export Data
                        </button>
                        <button
                            type="button"
                            onClick={handleTambah}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 cursor-pointer pointer-events-auto relative z-50 ${isProcessing ? 'bg-rose-500 text-white animate-pulse' : 'bg-sky-500 text-white shadow-sky-100 hover:bg-sky-600 active:scale-95'}`}
                        >
                            <i className={`fas ${isProcessing ? 'fa-spinner fa-spin' : 'fa-plus'} text-[10px]`}></i>
                            {isProcessing ? 'Memproses...' : 'Tambah Dokter / Petugas'}
                        </button>
                    </div>
                </div>

                {/* Simple Multi-Tab System */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-2xl w-fit relative z-50">
                    <button
                        type="button"
                        onClick={() => setActiveTab('dokter')}
                        className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer pointer-events-auto ${activeTab === 'dokter' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <i className="fas fa-user-md mr-2"></i>
                        Dokter
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('pegawai')}
                        className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer pointer-events-auto ${activeTab === 'pegawai' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <i className="fas fa-user-tie mr-2"></i>
                        Staf / Admin
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{activeTab === 'dokter' ? 'Identitas Dokter' : 'Identitas Staf'}</th>
                                    <th className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{activeTab === 'dokter' ? 'Kode Dokter' : 'ID User / NIK'}</th>
                                    <th className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Spesialisasi / Jabatan</th>
                                    <th className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Status</th>
                                    <th className="px-4 py-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activeTab === 'dokter' ? (
                                    dokter.length > 0 ? dokter.map((d) => (
                                        <tr key={d.kd_dokter} className="group hover:bg-sky-50/20 transition-all">
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                                                        <img src={`https://ui-avatars.com/api/?name=${d.nm_dokter}&background=fffbeb&color=d97706`} alt={d.nm_dokter} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-slate-700 tracking-tight">{d.nm_dokter}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Medis / Dokter Praktik</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{d.kd_dokter}</span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-xs font-bold text-slate-600 truncate max-w-[150px] inline-block">{d.alumni || 'Umum'}</span>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Aktif
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(d, 'dokter')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm cursor-pointer"
                                                        title="Lihat Detail"
                                                    >
                                                        <i className="fas fa-eye text-[10px]"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(d, 'dokter')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm cursor-pointer"
                                                        title="Edit Data"
                                                    >
                                                        <i className="fas fa-pen-to-square text-[10px]"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(d.kd_dokter, 'dokter')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm cursor-pointer"
                                                        title="Hapus Data"
                                                    >
                                                        <i className="fas fa-trash-can text-[10px]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 opacity-30">
                                                    <i className="fas fa-user-md text-4xl text-slate-300"></i>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Belum ada data dokter terdaftar</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    pegawai.length > 0 ? pegawai.map((p) => (
                                        <tr key={p.id_user} className="group hover:bg-sky-50/20 transition-all">
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                                                        <img src={`https://ui-avatars.com/api/?name=${p.nama}&background=f8fafc&color=475569`} alt={p.nama} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-slate-700 tracking-tight">{p.nama}</span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{p.jabatan || 'Pegawai Klinik'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-mono font-bold text-slate-500 italic lowercase">{p.username}</span>
                                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">NIK: {p.nik}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-xs font-bold text-slate-600">{p.jabatan || '-'}</span>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    Aktif
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(p, 'pegawai')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm cursor-pointer"
                                                        title="Lihat Detail"
                                                    >
                                                        <i className="fas fa-eye text-[10px]"></i>
                                                    </button>
                                                    <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm cursor-pointer">
                                                        <i className="fas fa-key text-[10px]"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(p, 'pegawai')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm cursor-pointer"
                                                        title="Edit Data"
                                                    >
                                                        <i className="fas fa-pen-to-square text-[10px]"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id_user, 'pegawai')}
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm cursor-pointer"
                                                        title="Hapus Data"
                                                    >
                                                        <i className="fas fa-trash-can text-[10px]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 opacity-30">
                                                    <i className="fas fa-user-tie text-4xl text-slate-300"></i>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Belum ada data staf terdaftar</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl relative z-[110] overflow-hidden border border-white animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="bg-sky-500 p-8 text-white relative">
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <i className={`fas ${activeTab === 'dokter' ? 'fa-user-md' : 'fa-user-tie'} text-6xl rotate-12`}></i>
                            </div>
                            <h3 className="text-xl font-black tracking-tight">
                                {isViewMode ? 'Detail' : (isEditMode ? 'Update Data' : 'Tambah')} {activeTab === 'dokter' ? 'Dokter' : 'Petugas / Staf'}
                            </h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">
                                {isViewMode ? 'Informasi lengkap data profil pegawai' : (isEditMode ? 'Sesuaikan informasi profil pegawai di bawah ini' : 'Lengkapi data profil pegawai secara detail')}
                            </p>
                        </div>

                        {/* Modal Body */}
                        <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={handleSave}>
                            {activeTab === 'dokter' ? (
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isViewMode ? 'pointer-events-none opacity-90' : ''}`}>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap Dokter</label>
                                        <div className="relative">
                                            <i className="fas fa-user-doctor absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                            <input
                                                type="text"
                                                value={data.nm_dokter}
                                                onChange={e => setData('nm_dokter', e.target.value)}
                                                placeholder="Masukkan nama lengkap beserta gelar..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Kode Dokter (SIP/NIP)</label>
                                        <div className="relative">
                                            <i className="fas fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                            <input
                                                type="text"
                                                value={data.kd_dokter}
                                                onChange={e => setData('kd_dokter', e.target.value)}
                                                placeholder="Contoh: DKT-001"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jenis Kelamin</label>
                                        <div className="relative">
                                            <i className="fas fa-venus-mars absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                            <select
                                                value={data.jk}
                                                onChange={e => setData('jk', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none appearance-none"
                                            >
                                                <option value="L">Laki-Laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tempat Lahir</label>
                                        <input
                                            type="text"
                                            value={data.tmp_lahir}
                                            onChange={e => setData('tmp_lahir', e.target.value)}
                                            placeholder="Kota Kelahiran"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            value={data.tgl_lahir}
                                            onChange={e => setData('tgl_lahir', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Agama</label>
                                        <select
                                            value={data.agama}
                                            onChange={e => setData('agama', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        >
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">Kristen</option>
                                            <option value="Katolik">Katolik</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Budha">Budha</option>
                                            <option value="Konghucu">Konghucu</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Golongan Darah</label>
                                        <select
                                            value={data.gol_darah}
                                            onChange={e => setData('gol_darah', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        >
                                            <option value="-">-</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="AB">AB</option>
                                            <option value="O">O</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">No. Telp / HP</label>
                                        <input
                                            type="text"
                                            value={data.no_telp}
                                            onChange={e => setData('no_telp', e.target.value)}
                                            placeholder="08xxxx"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alamat Tinggal</label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={e => setData('alamat', e.target.value)}
                                            placeholder="Masukkan alamat lengkap..."
                                            rows="2"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Nikah</label>
                                        <select
                                            value={data.stts_nikah}
                                            onChange={e => setData('stts_nikah', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        >
                                            <option value="Menikah">Menikah</option>
                                            <option value="Belum Menikah">Belum Menikah</option>
                                            <option value="Janda">Janda</option>
                                            <option value="Duda">Duda</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">No. Izin Praktek</label>
                                        <input
                                            type="text"
                                            value={data.no_sip}
                                            onChange={e => setData('no_sip', e.target.value)}
                                            placeholder="No. SIP"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alumni / Lulusan</label>
                                        <input
                                            type="text"
                                            value={data.alumni}
                                            onChange={e => setData('alumni', e.target.value)}
                                            placeholder="Contoh: Universitas Indonesia"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={`space-y-6 ${isViewMode ? 'pointer-events-none opacity-90' : ''}`}>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nama Lengkap Pegawai</label>
                                        <div className="relative">
                                            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                            <input
                                                type="text"
                                                value={data.nama_pegawai}
                                                onChange={e => setData('nama_pegawai', e.target.value)}
                                                placeholder="Nama lengkap tanpa gelar..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nomor Induk (NIK)</label>
                                            <input
                                                type="text"
                                                value={data.nik}
                                                onChange={e => setData('nik', e.target.value)}
                                                placeholder="NIK KTP..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jabatan</label>
                                            <input
                                                type="text"
                                                value={data.jabatan}
                                                onChange={e => setData('jabatan', e.target.value)}
                                                placeholder="Contoh: Kasir, Perawat, dll"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jenis Kelamin</label>
                                            <select
                                                value={data.jk}
                                                onChange={e => setData('jk', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none appearance-none"
                                            >
                                                <option value="L">Laki-Laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tempat Lahir</label>
                                            <input
                                                type="text"
                                                value={data.tmp_lahir}
                                                onChange={e => setData('tmp_lahir', e.target.value)}
                                                placeholder="Kota..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2 text-right">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-1">Tgl Lahir</label>
                                            <input
                                                type="date"
                                                value={data.tgl_lahir}
                                                onChange={e => setData('tgl_lahir', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Agama</label>
                                            <select
                                                value={data.agama}
                                                onChange={e => setData('agama', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none appearance-none"
                                            >
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen">Kristen</option>
                                                <option value="Katolik">Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Budha">Budha</option>
                                                <option value="Konghucu">Konghucu</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Golongan Darah</label>
                                            <select
                                                value={data.gol_darah}
                                                onChange={e => setData('gol_darah', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none appearance-none"
                                            >
                                                <option value="-">-</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="AB">AB</option>
                                                <option value="O">O</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">No. Telp / HP</label>
                                            <input
                                                type="text"
                                                value={data.no_telp}
                                                onChange={e => setData('no_telp', e.target.value)}
                                                placeholder="08xxxx"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Status Nikah</label>
                                            <select
                                                value={data.stts_nikah}
                                                onChange={e => setData('stts_nikah', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none appearance-none"
                                            >
                                                <option value="Menikah">Menikah</option>
                                                <option value="Belum Menikah">Belum Menikah</option>
                                                <option value="Janda">Janda</option>
                                                <option value="Duda">Duda</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alamat Lengkap</label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={e => setData('alamat', e.target.value)}
                                            placeholder="Nama jalan, RT/RW, Desa, Kec..."
                                            rows="2"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Alumni / Pendidikan</label>
                                        <input
                                            type="text"
                                            value={data.alumni}
                                            onChange={e => setData('alumni', e.target.value)}
                                            placeholder="Nama instansi pendidikan..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Fixed Modal Footer */}
                        <div className="flex items-center gap-3 p-8 bg-slate-50/50 border-t border-slate-100 relative z-[120]">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer pointer-events-auto shadow-sm"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                disabled={processing}
                                onClick={(e) => {
                                    if (isViewMode) {
                                        setIsModalOpen(false);
                                        setIsViewMode(false);
                                    } else {
                                        handleSave(e);
                                    }
                                }}
                                className={`flex-[2] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer pointer-events-auto relative z-[130] ${processing ? 'bg-slate-300' : (isViewMode ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-xl shadow-sky-100')}`}
                            >
                                {isViewMode ? (
                                    <>
                                        <i className="fas fa-times-circle mr-2 text-xs"></i>
                                        Tutup Detail
                                    </>
                                ) : (
                                    <>
                                        <i className={`fas ${processing ? 'fa-spinner fa-spin' : 'fa-check-circle'} mr-2 text-xs`}></i>
                                        {processing ? 'Memproses...' : `${isEditMode ? 'Perbarui' : 'Simpan'} Data ${activeTab === 'dokter' ? 'Dokter' : 'Petugas'}`}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
