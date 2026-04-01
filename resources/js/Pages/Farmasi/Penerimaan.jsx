import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import Select from 'react-select';

export default function Penerimaan({ auth, penerimaan, barang, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search || '');

    // Date Filter State
    const [filterByDate, setFilterByDate] = useState({
        tgl_awal: filters.tgl_awal || new Date().toISOString().split('T')[0],
        tgl_akhir: filters.tgl_akhir || new Date().toISOString().split('T')[0]
    });

    const { data, setData, post, processing, reset, errors } = useForm({
        no_faktur: '',
        tgl_penerimaan: new Date().toISOString().split('T')[0],
        supplier: '',
        items: [{ kode_brng: '', jml: 0, harga_beli: 0, tgl_expired: '' }]
    });

    const [selectedPenerimaan, setSelectedPenerimaan] = useState(null);
    const [penerimaanDetails, setPenerimaanDetails] = useState([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [oldNoFaktur, setOldNoFaktur] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('farmasi.penerimaan'), {
            search,
            tgl_awal: filterByDate.tgl_awal,
            tgl_akhir: filterByDate.tgl_akhir
        }, { preserveState: true });
    };

    const showDetails = (p) => {
        setSelectedPenerimaan(p);
        fetch(route('farmasi.penerimaan.details', p.no_faktur))
            .then(res => res.json())
            .then(data => {
                setPenerimaanDetails(data);
                setIsDetailModalOpen(true);
            });
    };

    const handleEdit = (p) => {
        setIsEditMode(true);
        setOldNoFaktur(p.no_faktur);
        setSelectedPenerimaan(p);

        fetch(route('farmasi.penerimaan.details', p.no_faktur))
            .then(res => res.json())
            .then(details => {
                setData({
                    no_faktur: p.no_faktur,
                    tgl_penerimaan: p.tgl_penerimaan,
                    supplier: p.supplier || '',
                    items: details.map(d => ({
                        kode_brng: d.kode_brng,
                        jml: d.jml,
                        harga_beli: d.harga_beli,
                        tgl_expired: d.tgl_expired || ''
                    }))
                });
                setIsModalOpen(true);
            });
    };

    const closeMainModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setOldNoFaktur('');
        reset();
    };

    const handleAddNew = () => {
        setIsEditMode(false);
        setOldNoFaktur('');
        reset();
        setIsModalOpen(true);
    };

    const handleDelete = (noFaktur) => {
        Swal.fire({
            title: 'Hapus Faktur?',
            text: "Stok obat akan dikurangi kembali sesuai isi faktur ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('farmasi.penerimaan.destroy', noFaktur), {
                    onSuccess: () => Swal.fire('Terhapus', 'Data & stok telah dikoreksi.', 'success')
                });
            }
        });
    };

    const addItem = () => {
        setData('items', [...data.items, { kode_brng: '', jml: 0, harga_beli: 0, tgl_expired: '' }]);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            Inertia.put(route('farmasi.penerimaan.update', oldNoFaktur), data, {
                onSuccess: () => {
                    closeMainModal();
                    Swal.fire('Berhasil', 'Penerimaan barang telah diperbarui.', 'success');
                }
            });
        } else {
            post(route('farmasi.penerimaan.store'), {
                onSuccess: () => {
                    closeMainModal();
                    Swal.fire('Berhasil', 'Penerimaan barang telah disimpan.', 'success');
                },
                onError: (err) => {
                    Swal.fire('Gagal', 'Pastikan semua data terisi dengan benar.', 'error');
                }
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Prepare options for Select
    const barangOptions = barang.map(b => ({
        value: b.kode_brng,
        label: `${b.nama_brng} (${b.kode_sat})`
    }));

    return (
        <AppLayout auth={auth} header="Penerimaan Barang">
            <Head title="Farmasi - Penerimaan Barang" />

            <div className="space-y-4 -mt-8">
                {/* Header Stats & Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/40 backdrop-blur-3xl p-4 rounded-3xl border border-white/50 shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                            <i className="fas fa-truck-loading text-lg"></i>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">Logistik & Penerimaan</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Kelola stok masuk dari supplier dan faktur pembelian</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Date Filter */}
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-100 shadow-sm">
                            <input
                                type="date"
                                value={filterByDate.tgl_awal}
                                onChange={e => setFilterByDate({ ...filterByDate, tgl_awal: e.target.value })}
                                className="border-none bg-transparent p-0 text-[10px] font-black text-slate-600 focus:ring-0"
                            />
                            <span className="text-slate-300">/</span>
                            <input
                                type="date"
                                value={filterByDate.tgl_akhir}
                                onChange={e => setFilterByDate({ ...filterByDate, tgl_akhir: e.target.value })}
                                className="border-none bg-transparent p-0 text-[10px] font-black text-slate-600 focus:ring-0"
                            />
                            <button onClick={handleSearch} className="ml-2 text-emerald-500 hover:text-emerald-700">
                                <i className="fas fa-filter text-xs"></i>
                            </button>
                        </div>

                        <button
                            onClick={handleAddNew}
                            className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3"
                        >
                            <i className="fas fa-plus"></i>
                            Barang Masuk Baru
                        </button>
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white/60 backdrop-blur-3xl rounded-[32px] border border-white/50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100">
                        <form onSubmit={handleSearch} className="relative max-w-md">
                            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                            <input
                                type="text"
                                placeholder="Cari No. Faktur atau Supplier..."
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Tgl. Penerimaan</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">No. Faktur</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Supplier</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Total Bayar</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {penerimaan.length > 0 ? penerimaan.map((p, idx) => (
                                    <tr key={idx} className="group hover:bg-emerald-50/30 transition-all">
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-600 block">{p.tgl_penerimaan}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-black text-slate-800 tracking-tight uppercase">{p.no_faktur}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-500 uppercase">{p.supplier || '-'}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="text-xs font-black text-emerald-600">{formatCurrency(p.total_bayar)}</span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => showDetails(p)}
                                                    className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all border border-sky-100"
                                                    title="Detail"
                                                >
                                                    <i className="fas fa-eye text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white transition-all border border-amber-100"
                                                    title="Edit"
                                                >
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.no_faktur)}
                                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                                                    title="Hapus"
                                                >
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <i className="fas fa-box-open text-6xl"></i>
                                                <p className="text-xs font-black uppercase tracking-[0.2em]">Belum ada data penerimaan untuk periode ini</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Detail Penerimaan */}
            {isDetailModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsDetailModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
                                    <i className="fas fa-file-invoice text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Rincian Faktur: {selectedPenerimaan?.no_faktur}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Supplier: {selectedPenerimaan?.supplier || 'Umum'}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsDetailModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-50 text-slate-400 transition-all border border-transparent hover:border-slate-100">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50/50">
                                        <tr className="text-left">
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Obat</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Hrg Beli</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Subtotal</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Expired</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {penerimaanDetails.map((d, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 font-bold text-slate-700">{d.nama_brng}</td>
                                                <td className="px-6 py-4 text-center font-black text-slate-500">{d.jml} {d.kode_sat}</td>
                                                <td className="px-6 py-4 text-right font-bold">{formatCurrency(d.harga_beli)}</td>
                                                <td className="px-6 py-4 text-right font-black text-emerald-600">{formatCurrency(d.jml * d.harga_beli)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold border border-amber-100">{d.tgl_expired || '-'}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-emerald-50/50">
                                            <td colSpan="3" className="px-6 py-4 text-[10px] font-black text-emerald-700 uppercase tracking-widest">Total Keseluruhan</td>
                                            <td className="px-6 py-4 text-right font-black text-emerald-700 text-lg">{formatCurrency(selectedPenerimaan?.total_bayar)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={closeMainModal}></div>
                    <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${isEditMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                                    <i className={`fas ${isEditMode ? 'fa-edit' : 'fa-file-invoice'} text-xl`}></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight">
                                        {isEditMode ? 'Edit Faktur Penerimaan' : 'Formulir Barang Masuk'}
                                    </h3>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                        {isEditMode ? `Mengubah data faktur: ${oldNoFaktur}` : 'Input data faktur dan item barang yang diterima'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={closeMainModal} className="w-10 h-10 rounded-full hover:bg-slate-50 text-slate-400 transition-all border border-transparent hover:border-slate-100">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto flex-1 bg-slate-50/50">
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">No. Faktur Vendor</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                            value={data.no_faktur}
                                            onChange={e => setData('no_faktur', e.target.value)}
                                            placeholder="INV/2026/..."
                                        />
                                        {errors.no_faktur && <p className="text-rose-500 text-[10px] font-bold mt-1 px-1">{errors.no_faktur}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tgl. Penerimaan</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                            value={data.tgl_penerimaan}
                                            onChange={e => setData('tgl_penerimaan', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Supplier / PBF</label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                            value={data.supplier}
                                            onChange={e => setData('supplier', e.target.value)}
                                            placeholder="Nama Supplier..."
                                        />
                                    </div>
                                </div>

                                {/* Items Container */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Detail Item Barang Masuk</label>
                                        <button
                                            type="button"
                                            onClick={addItem}
                                            className="text-[10px] font-black text-emerald-500 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-2"
                                        >
                                            <i className="fas fa-plus-circle"></i> Tambah Baris
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.items.map((item, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-in slide-in-from-right-2 duration-200">
                                                <div className="md:col-span-4">
                                                    <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 ml-1">Nama Barang</label>
                                                    <Select
                                                        options={barangOptions}
                                                        value={barangOptions.find(opt => opt.value === item.kode_brng) || null}
                                                        className="text-sm font-bold"
                                                        placeholder="Cari & Pilih Obat..."
                                                        isClearable
                                                        isSearchable
                                                        onChange={(val) => updateItem(index, 'kode_brng', val ? val.value : '')}
                                                        menuPortalTarget={document.body}
                                                        styles={{
                                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                            control: (base) => ({
                                                                ...base,
                                                                borderRadius: '1rem',
                                                                padding: '4px',
                                                                border: '1px solid #f1f5f9',
                                                                boxShadow: 'none',
                                                                '&:hover': { border: '#10b981' }
                                                            }),
                                                            singleValue: (base) => ({
                                                                ...base,
                                                                color: '#0f172a', // slate-900 (ultra dark for visibility)
                                                                fontWeight: '800'
                                                            }),
                                                            option: (base, state) => ({
                                                                ...base,
                                                                color: state.isSelected ? 'white' : '#1e293b',
                                                                backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#ecfdf5' : 'white',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                cursor: 'pointer'
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 ml-1">Qty</label>
                                                    <input
                                                        type="number"
                                                        required
                                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20"
                                                        value={item.jml}
                                                        onChange={e => updateItem(index, 'jml', e.target.value)}
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 ml-1">Hrg. Beli</label>
                                                    <input
                                                        type="number"
                                                        required
                                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20"
                                                        value={item.harga_beli}
                                                        onChange={e => updateItem(index, 'harga_beli', e.target.value)}
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="md:col-span-3">
                                                    <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 ml-1">Expired Date</label>
                                                    <input
                                                        type="date"
                                                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20"
                                                        value={item.tgl_expired}
                                                        onChange={e => updateItem(index, 'tgl_expired', e.target.value)}
                                                    />
                                                </div>
                                                <div className="md:col-span-1 flex items-end justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="w-10 h-10 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all mb-1"
                                                        disabled={data.items.length === 1}
                                                    >
                                                        <i className="fas fa-trash-alt text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-white sticky bottom-0 z-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Total Tagihan</span>
                                <span className="text-xl font-black text-emerald-600">
                                    {formatCurrency(data.items.reduce((acc, item) => acc + (item.jml * item.harga_beli), 0))}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={closeMainModal}
                                    className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submit}
                                    disabled={processing}
                                    className={`px-10 py-4 ${isEditMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50`}
                                >
                                    {processing ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Penerimaan')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
