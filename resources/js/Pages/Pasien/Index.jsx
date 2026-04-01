import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Index({ auth, pasiens, filters }) {
    const { post } = useForm();
    const [search, setSearch] = React.useState(filters?.search || '');
    const isFirstRun = React.useRef(true);

    React.useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            Inertia.get(route('pasien.index'), { search: search }, {
                preserveState: true,
                replace: true
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleRegisterToPoli = (pasien) => {
        Swal.fire({
            title: 'Daftar Poli Anak?',
            text: `Daftarkan ${pasien.nm_pasien} ke antrian Poli Anak hari ini?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Daftarkan',
            cancelButtonText: 'Batal',
            background: 'rgba(255, 255, 255, 0.9)',
            backdrop: `rgba(15, 23, 42, 0.1)`,
            customClass: {
                popup: 'rounded-[24px] border border-white/50 backdrop-blur-xl shadow-2xl font-["Outfit"]',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('pasien.register', pasien.no_rkm_medis), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil Antri!',
                            text: 'Pasien telah masuk antrian.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: { popup: 'rounded-[24px]' }
                        });
                    }
                });
            }
        });
    };

    const handleDeletePasien = (pasien) => {
        Swal.fire({
            title: 'Hapus Pasien?',
            text: `Data ${pasien.nm_pasien} akan dihapus permanen!`,
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
                Inertia.delete(route('pasien.destroy', pasien.no_rkm_medis), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Terhapus!',
                            text: 'Data pasien telah dihapus.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            customClass: { popup: 'rounded-[24px]' }
                        });
                    },
                    onError: (errors) => {
                        const firstError = Object.values(errors)[0];
                        Swal.fire({
                            icon: 'error',
                            title: 'Terjadi Kesalahan',
                            text: firstError || 'Gagal menghapus data pasien.',
                            confirmButtonColor: '#0ea5e9',
                            customClass: { popup: 'rounded-[24px]' }
                        });
                    }
                });
            }
        });
    };

    return (
        <AppLayout
            auth={auth}
            header="Data Pasien"
        >
            <Head title="Data Pasien" />

            <div className="space-y-4 -mt-3 md:-mt-6">
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Daftar Pasien</h2>
                        <p className="text-sm text-slate-500">Total: {pasiens.total} Pasien terdaftar</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input
                                type="text"
                                placeholder="Cari nama / no RM / tlp..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-200/40 rounded-2xl w-60 outline-none text-xs font-bold shadow-sm transition-all text-slate-700"
                            />
                        </div>
                        <Link
                            href={route('pasien.create')}
                            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-500 text-white text-xs font-bold rounded-2xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                            <i className="fas fa-plus"></i>
                            <span>PASIEN BARU</span>
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white/70 backdrop-blur-xl rounded-[32px] shadow-sm border border-white overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">No. RM</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">Nama Pasien</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">Tgl Lahir</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">Ibu Kandung</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">WhatsApp</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-100">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pasiens.data.length > 0 ? pasiens.data.map((pasien) => (
                                <tr key={pasien.no_rkm_medis} className="hover:bg-sky-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                                            {pasien.no_rkm_medis}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${pasien.jk === 'L' ? 'bg-sky-400' : 'bg-rose-400'}`}>
                                                {pasien.jk}
                                            </div>
                                            <span className="font-bold text-slate-700">{pasien.nm_pasien}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                        {pasien.tgl_lahir}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {pasien.nm_ibu}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                        {pasien.no_tlp}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleRegisterToPoli(pasien)}
                                                className="px-3 py-1.5 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
                                                title="Daftar Klinik"
                                            >
                                                <i className="fas fa-stethoscope"></i>
                                                DAFTAR KLINIK
                                            </button>
                                            <Link
                                                href={route('pasien.edit', pasien.no_rkm_medis)}
                                                className="p-2 text-slate-400 hover:text-sky-500 hover:bg-white rounded-xl shadow-none hover:shadow-sm transition-all text-center flex items-center justify-center"
                                                title="Edit Pasien"
                                            >
                                                <i className="far fa-edit"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDeletePasien(pasien)}
                                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl shadow-none hover:shadow-sm transition-all"
                                                title="Hapus Pasien"
                                            >
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                                <i className="fas fa-user-slash text-2xl"></i>
                                            </div>
                                            <p className="text-slate-400 font-medium">Belum ada data pasien.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Simple) */}
                {pasiens.links && pasiens.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {pasiens.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${link.active
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                                    : 'bg-white text-slate-500 hover:bg-sky-50 border border-slate-100'
                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
