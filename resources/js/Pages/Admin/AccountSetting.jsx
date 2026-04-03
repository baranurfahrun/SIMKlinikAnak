import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function AccountSetting({ auth, accounts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset, delete: destroyForm } = useForm({
        id: '',
        role: 'admin',
        new_username: '',
        new_password: '',
        nama: '',
        hak_akses: [],
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

    const handleCreate = () => {
        setIsCreateMode(true);
        setSelectedUser(null);
        reset();
        setData({
            id: '',
            role: 'admin',
            new_username: '',
            new_password: '',
            nama: '',
            hak_akses: [],
        });
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setIsCreateMode(false);
        setSelectedUser(user);
        setData({
            id: user.id,
            role: user.role,
            new_username: user.username,
            new_password: '',
            nama: user.nama,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isCreateMode ? route('akun.store') : route('akun.update');
        post(action, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: isCreateMode ? 'Akun baru telah ditambahkan.' : 'Kredensial akun telah diperbarui.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    };

    const handleSaveAccess = (e) => {
        e.preventDefault();
        post(route('akun.update_access', selectedAccessUser.id), {
            onSuccess: () => {
                setIsAccessModalOpen(false);
                Swal.fire({ icon: 'success', title: 'Hak Akses Disimpan!', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Hapus Akun?',
            text: `Akun ${user.nama} akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus!',
        }).then((result) => {
            if (result.isConfirmed) {
                destroyForm(route('akun.destroy', user.id), {
                    onSuccess: () => Swal.fire({ title: 'Terhapus!', icon: 'success', timer: 1500, showConfirmButton: false })
                });
            }
        });
    };

    const filteredAccounts = accounts.filter(acc => {
        // HANYA Super Admin asli (username: admin) yang boleh melihat dirinya sendiri di daftar.
        // Admin asisten lainnya tidak boleh melihat akun 'admin'.
        if (acc.username === 'admin' && auth.user.username !== 'admin') return false;

        return acc.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
               acc.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <AppLayout auth={auth} header="Manajemen Akun">
            <Head title="Manajemen Akun" />
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-2xl p-6 rounded-[32px] border border-white/60 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                            <i className="fas fa-users-gear text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 tracking-tight">Daftar Akun Sistem</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kelola Akses Pegawai</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user.role === 'admin' && (
                            <button onClick={handleCreate} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-sky-100 flex items-center gap-2">
                                <i className="fas fa-plus"></i> Tambah Akun
                            </button>
                        )}
                        <div className="relative group md:w-64">
                            <input type="text" placeholder="Cari..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none" />
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400">Informasi Pengguna</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400">Username</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black uppercase text-slate-400">Role</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-slate-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAccounts.map((acc, idx) => (
                                <tr key={idx} className="hover:bg-sky-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <img src={`https://ui-avatars.com/api/?name=${acc.nama}&background=${acc.role === 'admin' ? '0ea5e9' : '94a3b8'}&color=fff`} className="w-10 h-10 rounded-xl" />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-700">{acc.nama}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">{acc.jabatan}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-bold text-slate-600 font-mono">{acc.username}</td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${acc.role === 'admin' ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-500'}`}>
                                            {acc.username === 'admin' ? 'Super Admin' : (acc.role === 'admin' ? 'Sistem Admin' : (acc.jabatan === 'Dokter' ? 'Dokter' : 'Staff'))}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {auth.user.role === 'admin' && (
                                                <button onClick={() => handleOpenAccess(acc)} className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                                                    <i className="fas fa-user-lock text-[10px]"></i>
                                                </button>
                                            )}
                                            <button onClick={() => handleEdit(acc)} className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                                                <i className="fas fa-key text-[10px]"></i>
                                            </button>
                                            {auth.user.role === 'admin' && acc.username !== 'admin' && (
                                                <button onClick={() => handleDelete(acc)} className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
                                                    <i className="fas fa-trash text-[10px]"></i>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md relative overflow-hidden">
                        <div className={`p-8 text-white ${isCreateMode ? 'bg-sky-500' : 'bg-blue-600'}`}>
                            <h3 className="text-xl font-black italic">{isCreateMode ? 'Tambah Akun Baru' : 'Update Akun'}</h3>
                            <p className="text-[10px] uppercase font-bold opacity-80 mt-1">{isCreateMode ? 'Pilih Role & User' : `Edit: ${selectedUser?.nama}`}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            {isCreateMode && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Nama Lengkap</label>
                                    <input type="text" required value={data.nama} onChange={e => setData('nama', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold" />
                                </div>
                            )}
                            {isCreateMode && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Pilih Role</label>
                                    <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold">
                                        <option value="admin">Admin Baru</option>
                                        <option value="dokter">Dokter Baru</option>
                                        <option value="pegawai">Staff Baru</option>
                                    </select>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Username</label>
                                <input type="text" required value={data.new_username} onChange={e => setData('new_username', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold" />
                                {errors.new_username && <p className="text-rose-500 text-[10px] font-bold">{errors.new_username}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Password</label>
                                <input type="password" required={isCreateMode} value={data.new_password} onChange={e => setData('new_password', e.target.value)} placeholder={isCreateMode ? "Password..." : "Kosongkan jika tidak ganti..."} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-xs font-bold" />
                            </div>
                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-50 text-slate-500 font-black py-4 rounded-2xl text-[10px] uppercase">Batal</button>
                                <button type="submit" disabled={processing} className="flex-[2] bg-sky-500 text-white font-black py-4 rounded-2xl text-[10px] uppercase shadow-lg shadow-sky-100">
                                    {processing ? '...' : (isCreateMode ? 'Buat Akun' : 'Simpan Perubahan')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAccessModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="p-8 bg-emerald-500 text-white">
                            <h3 className="text-xl font-black italic">Kelola Hak Akses</h3>
                            <p className="text-[10px] uppercase font-bold opacity-80 mt-1">{selectedAccessUser?.nama}</p>
                        </div>
                        <div className="p-8 space-y-3">
                            {menuFeatures.map((f) => (
                                <label key={f.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100 cursor-pointer">
                                    <span className="text-xs font-bold text-slate-600">{f.label}</span>
                                    <input type="checkbox" checked={data.hak_akses.includes(f.id)} onChange={() => {
                                        const current = [...data.hak_akses];
                                        setData('hak_akses', current.includes(f.id) ? current.filter(id => id !== f.id) : [...current, f.id]);
                                    }} className="w-5 h-5 rounded accent-emerald-500" />
                                </label>
                            ))}
                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={() => setIsAccessModalOpen(false)} className="flex-1 bg-slate-50 text-slate-500 font-black py-4 rounded-2xl text-[10px] uppercase">Batal</button>
                                <button onClick={handleSaveAccess} className="flex-[2] bg-emerald-500 text-white font-black py-4 rounded-2xl text-[10px] uppercase shadow-lg">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
