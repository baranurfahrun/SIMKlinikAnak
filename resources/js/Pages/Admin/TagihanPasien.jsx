import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function TagihanPasien({ auth, pasien_diperiksa = [], tarif_pilihan = [], tgl_awal, tgl_akhir }) {
    const [startDate, setStartDate] = React.useState(tgl_awal || new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = React.useState(tgl_akhir || new Date().toISOString().split('T')[0]);

    const handleFilter = () => {
        Inertia.get(route('kasir.tagihan.index'), {
            tgl_awal: startDate,
            tgl_akhir: endDate
        }, { preserveState: true });
    };
    const [selectedPasien, setSelectedPasien] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const no_rawat_param = params.get('no_rawat');
            if (no_rawat_param) {
                const found = pasien_diperiksa.find(p => p.no_rawat === no_rawat_param);
                if (found) return found;
            }
        }
        return null;
    });

    React.useEffect(() => {
        if (selectedPasien) {
            setData('no_rawat', selectedPasien.no_rawat);
            fetchBillingDetail(selectedPasien.no_rawat);
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [searchTindakan, setSearchTindakan] = React.useState('');

    const filteredTarif = tarif_pilihan.filter(t =>
        t.nama_tindakan.toLowerCase().includes(searchTindakan.toLowerCase())
    );

    const [billingData, setBillingData] = React.useState({ obat: [], tindakan: [] });
    const [loading, setLoading] = React.useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        no_rawat: '',
        id_tarif: [],
        qty: 1
    });

    const fetchBillingDetail = async (no_rawat) => {
        setLoading(true);
        try {
            const response = await axios.get(route('kasir.tagihan.data', no_rawat));
            setBillingData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPasien = (p) => {
        setSelectedPasien(p);
        setData('no_rawat', p.no_rawat);
        fetchBillingDetail(p.no_rawat);
    };

    const submitTindakan = (e) => {
        e.preventDefault();
        post(route('kasir.tagihan.store_tindakan'), {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Tindakan ditambahkan', 'success');
                fetchBillingDetail(selectedPasien.no_rawat);
                setData('id_tarif', '');
                setData('qty', 1);
            }
        });
    };

    const handleDeleteTindakan = (id) => {
        Swal.fire({
            title: 'Hapus Tindakan?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(route('kasir.tagihan.destroy_tindakan', id))
                    .then(() => {
                        Swal.fire('Dihapus!', 'Tindakan dihapus.', 'success');
                        fetchBillingDetail(selectedPasien.no_rawat);
                    });
            }
        });
    };

    const handleToggleClosing = async () => {
        try {
            const response = await axios.post(route('kasir.tagihan.toggle_closing'), {
                no_rawat: selectedPasien.no_rawat
            });
            if (response.data.success) {
                Swal.fire('Berhasil', response.data.message, 'success');
                fetchBillingDetail(selectedPasien.no_rawat);
            }
        } catch (error) {
            Swal.fire('Gagal', 'Gagal update status klosing.', 'error');
        }
    };

    // Kalkulasi Total
    const totalObat = billingData.obat.reduce((acc, curr) => acc + Number(curr.subtotal || 0), 0);
    const totalTindakan = billingData.tindakan.reduce((acc, curr) => acc + Number(curr.subtotal || 0), 0);
    const grandTotal = totalObat + totalTindakan;

    return (
        <AppLayout auth={auth} header="Rekap Tagihan Pasien">
            <Head title="Rekap Tagihan Pasien">
                <style>{`
                    @media print {
                        /* Sembunyikan semua elemen default */
                        body * { visibility: hidden !important; }
                        
                        /* Tampilkan area detail tagihan */
                        .print-area, .print-area * { visibility: visible !important; }
                        
                        .print-area { 
                            position: absolute; 
                            left: 0; 
                            top: 0; 
                            width: 100% !important; 
                            max-width: 100% !important;
                            border: none !important; 
                            box-shadow: none !important; 
                            padding: 0 !important; 
                            background: white !important;
                        }

                        /* Sembunyikan tombol cetak saat dicetak */
                        .print\\:hidden { display: none !important; }
                        
                        /* Matikan visual shadow/blur effect saat print */
                        .backdrop-blur-xl { backdrop-filter: none !important; }
                        .shadow-xl { box-shadow: none !important; }

                        @page { size: auto; margin: 1cm; }
                    }
                `}</style>
            </Head>

            <div className="max-w-7xl mx-auto p-4 -mt-8 space-y-4">
                {/* Filter Bar */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-3 border border-white/50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center text-sky-500">
                            <i className="fas fa-calendar-alt text-sm"></i>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-700">Filter Riwayat</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Rentang Tanggal Pemeriksaan</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400">Dari:</label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={e => setStartDate(e.target.value)}
                                className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400">Sampai:</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={e => setEndDate(e.target.value)}
                                className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                        </div>
                        <button 
                            onClick={handleFilter}
                            className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-sky-100 transition-all active:scale-95"
                        >
                            <i className="fas fa-sync-alt text-[10px]"></i>
                            Terapkan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Tabel Pasien */}
                <div className="lg:col-span-1">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50 relative overflow-hidden">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-user-check text-sky-500"></i>
                            Sudah Diperiksa
                        </h2>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {pasien_diperiksa.length > 0 ? pasien_diperiksa.map((p) => (
                                <div
                                    key={p.no_rawat}
                                    onClick={() => handleSelectPasien(p)}
                                    className={`p-2 rounded-xl border cursor-pointer transition-all ${selectedPasien?.no_rawat === p.no_rawat ? 'border-sky-500 bg-sky-50/50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}
                                >
                                    <h3 className="font-bold text-slate-800 text-sm">{p.nm_pasien}</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">RM: {p.no_rkm_medis}</p>
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100/50">
                                        <span className="text-xs text-slate-400">Dr. {p.nm_dokter}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-6 text-slate-400 text-sm italic">Belum ada pasien diperiksa.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detail Tagihan */}
                <div className="lg:col-span-2">
                    {selectedPasien ? (
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50 space-y-6 print-area">
                            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{selectedPasien.nm_pasien}</h2>
                                    <p className="text-sm text-slate-500">No. Rawat: {selectedPasien.no_rawat}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-400 block">Tgl Periksa</span>
                                    <span className="text-sm font-semibold text-slate-700">{selectedPasien.tgl_pemeriksaan}</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-10 text-slate-400">Loading data tagihan...</div>
                            ) : (
                                <>
                                    {/* Sub-modul Obat */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <i className="fas fa-pills text-emerald-500"></i>
                                            Biaya Obat & Resep
                                        </h3>
                                        <table className="w-full text-left border border-slate-100 rounded-lg overflow-hidden">
                                            <thead>
                                                <tr className="bg-slate-50 text-xs text-slate-500 font-bold uppercase">
                                                    <th className="py-2 px-3">Nama Obat</th>
                                                    <th className="py-2 px-3 text-center">Qty</th>
                                                    <th className="py-2 px-3 text-right">Harga</th>
                                                    <th className="py-2 px-3 text-right">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {billingData.obat.map((item, i) => (
                                                    <tr key={i} className="border-t border-slate-100 text-sm">
                                                        <td className="py-2 px-3 font-medium text-slate-700">{item.nama_brng}</td>
                                                        <td className="py-2 px-3 text-center text-slate-600">{item.jml}</td>
                                                        <td className="py-2 px-3 text-right text-slate-600">Rp {Number(item.harga_satuan || 0).toLocaleString('id-ID')}</td>
                                                        <td className="py-2 px-3 text-right font-semibold text-slate-800">Rp {Number(item.subtotal || 0).toLocaleString('id-ID')}</td>
                                                    </tr>
                                                ))}
                                                {billingData.obat.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-slate-400 text-xs italic">Tidak ada rincian obat.</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Sub-modul Tindakan */}
                                    <div className="pt-4 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <i className="fas fa-stethoscope text-sky-500"></i>
                                            Biaya Tindakan / Layanan
                                        </h3>

                                        <table className="w-full text-left border border-slate-100 rounded-lg overflow-hidden">
                                            <thead>
                                                <tr className="bg-slate-50 text-xs text-slate-500 font-bold uppercase">
                                                    <th className="py-2 px-3">Tindakan</th>
                                                    <th className="py-2 px-3 text-center">Qty</th>
                                                    <th className="py-2 px-3 text-right">Harga</th>
                                                    <th className="py-2 px-3 text-right">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {billingData.tindakan.map((item) => (
                                                    <tr key={item.id} className="border-t border-slate-100 text-sm">
                                                        <td className="py-2 px-3 font-medium text-slate-700">{item.nama_tindakan}</td>
                                                        <td className="py-2 px-3 text-center text-slate-600">{item.qty}</td>
                                                        <td className="py-2 px-3 text-right text-slate-600">Rp {Number(item.harga_satuan || 0).toLocaleString('id-ID')}</td>
                                                        <td className="py-2 px-3 text-right font-semibold text-slate-800">Rp {Number(item.subtotal || 0).toLocaleString('id-ID')}</td>
                                                    </tr>
                                                ))}
                                                {billingData.tindakan.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-slate-400 text-xs italic">Belum ada rincian tindakan.</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Ringkasan Total */}
                                    <div className="pt-4 border-t border-slate-200 flex flex-col items-end">
                                        <div className="w-64 space-y-1 text-sm text-slate-600">
                                            <div className="flex justify-between"><span>Subtotal Obat:</span><span className="font-semibold">Rp {totalObat.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between"><span>Subtotal Tindakan:</span><span className="font-semibold">Rp {totalTindakan.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between border-t border-slate-100 pt-2 mt-1 text-lg font-bold text-slate-800"><span>Grand Total:</span><span className="text-sky-600">Rp {grandTotal.toLocaleString('id-ID')}</span></div>
                                        </div>

                                        <div className="mt-5 flex justify-end gap-2 print:hidden">
                                            {billingData.status_closing === 'Selesai' ? (
                                                <button 
                                                    onClick={handleToggleClosing} 
                                                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl text-xs shadow-lg shadow-red-100 flex items-center gap-2 transition-all active:scale-95 duration-200"
                                                >
                                                    <i className="fas fa-lock-open text-sm"></i> BUKA KLOSING
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={handleToggleClosing} 
                                                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-xl text-xs shadow-lg shadow-sky-100 flex items-center gap-2 transition-all active:scale-95 duration-200"
                                                >
                                                    <i className="fas fa-lock text-sm"></i> KLOSING
                                                </button>
                                            )}

                                            <button 
                                                onClick={() => window.print()} 
                                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-100 flex items-center gap-2 transition-all active:scale-95 duration-200"
                                            >
                                                <i className="fas fa-print text-sm"></i> CETAK BILLING
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                            <i className="fas fa-file-invoice text-4xl text-slate-300 mb-3"></i>
                            <h3 className="font-bold text-slate-600">Belum Ada Pasien Terpilih</h3>
                            <p className="text-xs mt-1 max-w-xs text-slate-400">Silahkan pilih pasien di daftar sebelah kiri untuk melihat rekap total tagihannya.</p>
                        </div>
                    )}
                </div>
                </div>

            </div>
        </AppLayout>
    );
}
