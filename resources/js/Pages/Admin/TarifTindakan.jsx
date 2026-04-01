import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function TarifTindakan({ auth, tarif_tindakan = [] }) {
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nama_tindakan: '',
        tarif: '',
    });

    const [editId, setEditId] = React.useState(null);

    const submit = (e) => {
        e.preventDefault();

        if (editId) {
            put(route('kasir.tarif.update', editId), {
                onSuccess: () => {
                    Swal.fire('Berhasil', 'Tarif berhasil diperbarui', 'success');
                    setEditId(null);
                    reset();
                }
            });
        } else {
            post(route('kasir.tarif.store'), {
                onSuccess: () => {
                    Swal.fire('Berhasil', 'Tarif berhasil ditambahkan', 'success');
                    reset();
                }
            });
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setData({
            nama_tindakan: item.nama_tindakan,
            tarif: item.tarif,
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Tarif tindakan ini akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('kasir.tarif.destroy', id), {
                    onSuccess: () => Swal.fire('Dihapus!', 'Tarif berhasil dihapus.', 'success')
                });
            }
        });
    };

    return (
        <AppLayout auth={auth} header="Atur Tarif Tindakan">
            <Head title="Atur Tarif Tindakan" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Form Input */}
                <div className="lg:col-span-1">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400 to-sky-200 opacity-20 blur-2xl rounded-full"></div>

                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-edit text-sky-500"></i>
                            {editId ? 'Edit Tarif' : 'Tambah Tarif Baru'}
                        </h2>

                        <form onSubmit={submit} className="space-y-4 relative z-10">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Tindakan/Layanan</label>
                                <input
                                    type="text"
                                    value={data.nama_tindakan}
                                    onChange={e => setData('nama_tindakan', e.target.value)}
                                    placeholder="Contoh: Tindakan Dokter"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-sky-500 bg-white/80 text-sm font-medium"
                                />
                                {errors.nama_tindakan && <p className="text-xs text-rose-500 mt-1">{errors.nama_tindakan}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Tarif (Rp)</label>
                                <input
                                    type="number"
                                    value={data.tarif}
                                    onChange={e => setData('tarif', e.target.value)}
                                    placeholder="Contoh: 50000"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-sky-500 bg-white/80 text-sm font-medium"
                                />
                                {errors.tarif && <p className="text-xs text-rose-500 mt-1">{errors.tarif}</p>}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 font-bold text-white rounded-xl shadow-lg shadow-sky-100 hover:shadow-sky-200 transition-all active:scale-95 text-sm"
                                >
                                    {editId ? 'Perbarui' : 'Simpan'}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditId(null); reset(); }}
                                        className="px-4 py-2.5 bg-slate-100 font-bold text-slate-600 rounded-xl hover:bg-slate-200 transition-all active:scale-95 text-sm"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabel List */}
                <div className="lg:col-span-2">
                    <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-list text-emerald-500"></i>
                            Daftar Tarif Tindakan
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Tindakan</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Tarif</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarif_tindakan.length > 0 ? tarif_tindakan.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-sky-50/10 transition-all">
                                            <td className="py-3 px-4 text-sm font-semibold text-slate-800">{item.nama_tindakan}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-sky-600">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.tarif)}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-100 transition-all"
                                                        title="Edit"
                                                    >
                                                        <i className="fas fa-pen-to-square text-xs"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all"
                                                        title="Hapus"
                                                    >
                                                        <i className="fas fa-trash text-xs"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-6 text-slate-400 text-sm italic">Belum ada tarif yang ditambahkan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
