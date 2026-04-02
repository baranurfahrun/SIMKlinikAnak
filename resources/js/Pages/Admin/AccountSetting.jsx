import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function AccountSetting({ auth, accounts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset, delete: destroyForm } = useForm({
        id: '',
        role: '',
        new_username: '',
        new_password: '',
        hak_akses: [], // Untuk menyimpan daftar fitur yang dicentang
    });

    const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
    const [selectedAccessUser, setSelectedAccessUser] = useState(null);

    const menuFeatures = [
        { id: 'pendaftaran', label: 'Pendaftaran Pasien', icon: 'fa-user-plus' },
        { id: 'registrasi', label: 'Registrasi Poli', icon: 'fa-clipboard-check' },
        { id: 'rme', label: 'Rekam Medis (RME)', icon: 'fa-file-medical' },
        { id: 'farmasi', label: 'Farmasi', icon: 'fa-pills' },
        { id: 'kepegawaian', label: 'Kepegawaian', icon: 'fa-user-tie' },
        { id: 'kasir', label: 'Kasir & Billing', icon: 'fa-file-invoice-dollar' },
        { id: 'pengaturan', label: 'Pengaturan Akun', icon: 'fa-user-shield' },
    ];

    const handleOpenAccess = (user) => {
        setSelectedAccessUser(user);
        // Load data hak akses jika ada (parsing JSON)
        const initialAccess = user.hak_akses ? JSON.parse(user.hak_akses) : [];
        setData('hak_akses', initialAccess);
        setIsAccessModalOpen(true);
    };

    const handleTogglePermission = (featureId) => {
        const current = [...data.hak_akses];
        if (current.includes(featureId)) {
            setData('hak_akses', current.filter(id => id !== featureId));
        } else {
            setData('hak_akses', [...current, featureId]);
        }
    };

    const handleSaveAccess = (e) => {
        e.preventDefault();
        post(route('akun.update_access', selectedAccessUser.id), {
            onSuccess: () => {
                setIsAccessModalOpen(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Hak Akses Disimpan!',
                    text: `Izin akses untuk ${selectedAccessUser.nama} telah diperbarui.`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setData({
            id: user.id,
            role: user.role,
            new_username: user.username,
            new_password: '',
        });
        setIsModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        post(route('akun.update'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Kredensial akun telah diperbarui.',
                    timer: 2000,
                    showConfirmButton: false,
                    background: 'rgba(255, 255, 255, 0.9)',
                    customClass: {
                        popup: 'rounded-[32px] border border-white/50 backdrop-blur-xl font-["Outfit"]',
                    }
                });
            }
        });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Hapus Akun?',
            text: `Akun ${user.nama} akan dihapus permanen dari sistem.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            background: 'rgba(255, 255, 255, 0.9)',
            customClass: {
                popup: 'rounded-[32px] border border-white/50 backdrop-blur-xl font-["Outfit"]',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Menggunakan manual delete via Inertia jika route delete tidak didefinisikan secara resource
                // Tapi kita sudah buat destroy di controller, pastikan route-nya ada
                destroyForm(route('akun.destroy', user.id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Terhapus!',
                            text: 'Akun telah dikeluarkan dari sistem.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    };

    const filteredAccounts = accounts.filter(acc => {
        // Logika Sembunyikan Super Admin: 
        // Jika akun yang dicek adalah 'admin', tapi yang sedang login bukan 'admin', maka sembunyikan (return false).
        if (acc.role === 'admin' && auth.user.role !== 'admin') {
            return false;
        }

        return acc.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
               acc.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <AppLayout
            auth={auth}
            header="Manajemen Akun Pengguna"
        >
            <Head title="Manajemen Akun" />

            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-2xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                            <i className="fas fa-users-gear text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 tracking-tight">Daftar Akun Sistem</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kelola Username & Password Pegawai</p>
                        </div>
                    </div>

                    <div className="relative group md:w-80">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Cari nama atau username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Account Table */}
                <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Informasi Pengguna</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Username Akses</th>
                                    <th className="px-8 py-5 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">Role / Hak Akses</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredAccounts.map((acc, idx) => (
                                    <tr key={idx} className="hover:bg-sky-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${acc.nama}&background=${acc.role === 'admin' ? '0ea5e9' : '94a3b8'}&color=fff`}
                                                    className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm"
                                                    alt="Avatar"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-700 tracking-tight">{acc.nama}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">{acc.jabatan}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-at text-[10px] text-sky-400"></i>
                                                <span className="text-xs font-bold text-slate-600 font-mono">{acc.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${acc.role === 'admin'
                                                    ? 'bg-sky-50 text-sky-600 border border-sky-100'
                                                    : 'bg-slate-50 text-slate-500 border border-slate-100'
                                                    }`}>
                                                    {acc.role === 'admin' ? 'Super Admin' : (acc.jabatan === 'Dokter' ? 'Dokter Sp.' : 'Pegawai Staff')}
                                                </span>
                                                <span className={`text-[8px] font-bold uppercase ${acc.status === 'Aktif' ? 'text-emerald-500' : 'text-sky-500 animate-pulse'}`}>
                                                    {acc.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenAccess(acc)}
                                                    className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
                                                    title="Kelola Hak Akses"
                                                >
                                                    <i className="fas fa-user-lock text-[10px]"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(acc)}
                                                    className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
                                                    title="Edit Akun"
                                                >
                                                    <i className="fas fa-key text-[10px]"></i>
                                                </button>
                                                {acc.username !== 'admin' && (
                                                    <button
                                                        onClick={() => handleDelete(acc)}
                                                        className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
                                                        title="Hapus Akun"
                                                    >
                                                        <i className="fas fa-trash text-[10px]"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAccounts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-30">
                                                <i className="fas fa-user-slash text-5xl"></i>
                                                <p className="text-sm font-bold">Akun tidak ditemukan Bro!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Edit Account */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md relative z-[110] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className={`p-8 text-white relative ${selectedUser?.id.startsWith('NEW_DOKTER_') ? 'bg-gradient-to-r from-cyan-400 to-sky-400' : 'bg-gradient-to-r from-sky-500 to-blue-600'}`}>
                            <i className="fas fa-user-shield text-6xl absolute top-4 right-4 opacity-20 rotate-12"></i>
                            <h3 className="text-xl font-black tracking-tight italic">
                                {selectedUser?.id.startsWith('NEW_DOKTER_') ? 'Aktivasi Akun Dokter' : 'Update Akun'}
                            </h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">
                                Kelola Kredensial: {selectedUser?.nama}
                            </p>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleUpdate} className="p-8 space-y-6">
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Username Baru</label>
                                <div className="relative">
                                    <i className="fas fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                    <input
                                        type="text"
                                        required
                                        value={data.new_username}
                                        onChange={e => setData('new_username', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                                    />
                                </div>
                                {errors.new_username && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.new_username}</p>}
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Atur Password Baru</label>
                                <div className="relative">
                                    <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs group-focus-within:text-sky-500 transition-colors"></i>
                                    <input
                                        type="password"
                                        required={selectedUser?.id.startsWith('NEW_DOKTER_')}
                                        value={data.new_password}
                                        onChange={e => setData('new_password', e.target.value)}
                                        placeholder={selectedUser?.id.startsWith('NEW_DOKTER_') ? "Wajib diisi..." : "Kosongkan jika tidak ganti..."}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                                    />
                                </div>
                                {errors.new_password && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.new_password}</p>}
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`flex-[2] text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 ${selectedUser?.id.startsWith('NEW_DOKTER_')
                                        ? 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-500 hover:to-sky-500 shadow-cyan-200'
                                        : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sky-200'
                                        }`}
                                >
                                    {processing ? <i className="fas fa-spinner fa-spin"></i> : <i className={`${selectedUser?.id.startsWith('NEW_DOKTER_') ? 'fas fa-rocket' : 'fas fa-save'} shadow-sm`}></i>}
                                    {selectedUser?.id.startsWith('NEW_DOKTER_') ? 'Aktifkan Akun' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Manage Access Rights */}
            {isAccessModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsAccessModalOpen(false)}></div>
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm relative z-[110] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative">
                            <i className="fas fa-shield-halved text-6xl absolute top-4 right-4 opacity-20 rotate-12"></i>
                            <h3 className="text-xl font-black tracking-tight italic">Kelola Hak Akses</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">
                                {selectedAccessUser?.nama}
                            </p>
                        </div>
                        <form onSubmit={handleSaveAccess} className="p-8">
                            <div className="space-y-3 mb-8">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 inline-block mb-2">Daftar Fitur Aplikasi</label>
                                {menuFeatures.map((feature) => (
                                    <label key={feature.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 cursor-pointer hover:bg-emerald-50/50 transition-all group">
                                        <div className="relative flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="hidden peer"
                                                checked={data.hak_akses.includes(feature.id)}
                                                onChange={() => handleTogglePermission(feature.id)}
                                            />
                                            <div className="w-5 h-5 rounded-lg border-2 border-slate-200 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                                                <i className="fas fa-check text-[10px] text-white opacity-0 peer-checked:opacity-100"></i>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-all ${data.hak_akses.includes(feature.id) ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                                <i className={`fas ${feature.icon}`}></i>
                                            </div>
                                            <span className={`text-xs font-bold transition-all ${data.hak_akses.includes(feature.id) ? 'text-emerald-700' : 'text-slate-500'}`}>
                                                {feature.label}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setIsAccessModalOpen(false)} className="flex-1 bg-slate-50 text-slate-500 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest">Batal</button>
                                <button type="submit" disabled={processing} className="flex-[2] bg-emerald-500 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all">
                                    Simpan Hak Akses
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-8 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[4px]">SIMKlinik Anak &copy; 2026 • Encrypted Data</p>
            </div>
        </AppLayout>
    );
}
