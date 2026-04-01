import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Index({ auth, antrian, filters, tarif_pilihan }) {
    const [search, setSearch] = useState(filters.search || '');
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Tindakan Modal State
    const [isTindakanModalOpen, setIsTindakanModalOpen] = useState(false);
    const [selectedPasien, setSelectedPasien] = useState(null);
    const [searchTindakan, setSearchTindakan] = useState('');
    const [selectedTindakan, setSelectedTindakan] = useState([]); // id_tarif array
    const [qtyTindakan, setQtyTindakan] = useState(1);
    const [isSubmittingTindakan, setIsSubmittingTindakan] = useState(false);

    // Obat Modal State
    const [isObatModalOpen, setIsObatModalOpen] = useState(false);
    const [searchObat, setSearchObat] = useState('');
    const [filteredObat, setFilteredObat] = useState([]);
    const [selectedObat, setSelectedObat] = useState([]); // {kode_brng, nama_brng, jml: 1, aturan_pakai: '3 x 1'}
    const [isSearchingObat, setIsSearchingObat] = useState(false);
    const [isSubmittingObat, setIsSubmittingObat] = useState(false);

    // === Fitur Racikan ===
    const [activePrescriptionTab, setActivePrescriptionTab] = useState('non_racik'); // 'non_racik' | 'racik'
    const [selectedRacikan, setSelectedRacikan] = useState([]); // [{id, nama_racikan, metode_racik, jml_racik, aturan_pakai, items: []}]
    const [activeRacikanId, setActiveRacikanId] = useState(null); // Grup Aktif
    
    // Form Input Grup Racikan
    const [namaRacik, setNamaRacik] = useState('');
    const [metodeRacik, setMetodeRacik] = useState('Kapsul');
    const [jmlRacik, setJmlRacik] = useState(10);
    const [aturanPakaiRacik, setAturanPakaiRacik] = useState('3 x 1');

    // === Fitur Ganti Dokter (Untuk Akun Admin) ===
    const [dokterList, setDokterList] = useState([]);
    const [selectedKdDokter, setSelectedKdDokter] = useState('');

    const filteredTarif = tarif_pilihan?.filter(t =>
        t.nama_tindakan.toLowerCase().includes(searchTindakan.toLowerCase())
    ) || [];

    const handleCheckboxChange = (id) => {
        if (selectedTindakan.includes(id)) {
            setSelectedTindakan(selectedTindakan.filter(item => item !== id));
        } else {
            setSelectedTindakan([...selectedTindakan, id]);
        }
    };

    const submitTindakan = async () => {
        if (selectedTindakan.length === 0) {
            Swal.fire('Perhatian', 'Pilih minimal satu tindakan!', 'warning');
            return;
        }

        setIsSubmittingTindakan(true);
        try {
            await axios.post(route('kasir.tagihan.store_tindakan'), {
                no_rawat: selectedPasien?.no_rawat,
                id_tarif: selectedTindakan,
                qty: qtyTindakan
            });

            Swal.fire('Berhasil!', 'Tindakan berhasil ditambahkan.', 'success');
            setIsTindakanModalOpen(false);
            setSelectedTindakan([]);
            setQtyTindakan(1);
        } catch (error) {
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menyimpan tindakan.', 'error');
            console.error(error);
        } finally {
            setIsSubmittingTindakan(false);
        }
    };

    // Filter Obat Debounce
    useEffect(() => {
        if (isObatModalOpen) {
            setIsSearchingObat(true);
            const delayDebounceFn = setTimeout(() => {
                axios.get(route('api.farmasi.obat'), { params: { search: searchObat } })
                    .then(res => {
                        setFilteredObat(res.data);
                        setIsSearchingObat(false);
                    });
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setFilteredObat([]);
        }
    }, [searchObat, isObatModalOpen]);

    useEffect(() => {
        // Load All Dokter untuk seleksi manual di popup resep
        axios.get('/api/dokter').then(res => setDokterList(res.data));
    }, []);

    useEffect(() => {
        if (selectedPasien) {
            setSelectedKdDokter(selectedPasien.kd_dokter);
        }
    }, [selectedPasien]);

    const submitObat = async () => {
        if (selectedObat.length === 0 && selectedRacikan.length === 0) {
            Swal.fire('Perhatian', 'Pilih minimal satu resep non-racik atau racikan!', 'warning');
            return;
        }

        setIsSubmittingObat(true);
        try {
            await axios.post(route('farmasi.store'), {
                no_rawat: selectedPasien?.no_rawat,
                kd_dokter: selectedKdDokter,
                items: selectedObat,
                racikan: selectedRacikan
            });

            Swal.fire('Berhasil!', 'Resep berhasil terkirim ke Farmasi.', 'success');
            setIsObatModalOpen(false);
            setSelectedObat([]);
            setSelectedRacikan([]); // Reset racikan
            setSearchObat('');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Terjadi kesalahan saat menyimpan resep.';
            Swal.fire('Gagal!', errorMsg, 'error');
            console.error(error);
        } finally {
            setIsSubmittingObat(false);
        }
    };

    // Date Filter State
    const [filterByDate, setFilterByDate] = useState({
        tgl_awal: filters.tgl_awal || new Date().toISOString().split('T')[0],
        tgl_akhir: filters.tgl_akhir || new Date().toISOString().split('T')[0]
    });

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('rekam-medis.index'), {
            search,
            tgl_awal: filterByDate.tgl_awal,
            tgl_akhir: filterByDate.tgl_akhir
        }, { preserveState: true });
    };

    const handleFilterDate = () => {
        Inertia.get(route('rekam-medis.index'), {
            ...filterByDate,
            search
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AppLayout auth={auth} header="Rekam Medis Elektronik">
            <Head title="Rekam Medis (RME)" />

            <div className="space-y-6 -mt-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Antrian Pemeriksaan</h2>
                        <p className="text-sm text-slate-500 font-medium">Daftar pasien menunggu dan dalam pemeriksaan hari ini.</p>
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Cari Nama atau No. RM..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all font-bold text-sm text-slate-700"
                        />
                    </form>
                </div>

                {/* Main Table */}
                <div className={`bg-white/40 backdrop-blur-3xl rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/50 transition-all duration-300 ${openDropdownId ? 'z-[100] relative shadow-2xl shadow-sky-900/5' : 'relative z-10'}`}>
                    <div className="px-8 py-6 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-center bg-slate-50/30 rounded-t-[32px] gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-50 text-sky-500 rounded-lg flex items-center justify-center text-xs shadow-sm">
                                <i className="fas fa-list-ol"></i>
                            </div>
                            <h4 className="font-bold text-slate-700">Daftar Antrian Poli</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Date Filter */}
                            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Mulai</span>
                                    <input
                                        type="date"
                                        value={filterByDate.tgl_awal}
                                        onChange={e => setFilterByDate({ ...filterByDate, tgl_awal: e.target.value })}
                                        className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:ring-0 py-1.5"
                                    />
                                </div>
                                <div className="h-4 w-px bg-slate-100"></div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sampai</span>
                                    <input
                                        type="date"
                                        value={filterByDate.tgl_akhir}
                                        onChange={e => setFilterByDate({ ...filterByDate, tgl_akhir: e.target.value })}
                                        className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:ring-0 py-1.5"
                                    />
                                </div>
                                <button
                                    onClick={handleFilterDate}
                                    className="ml-2 w-8 h-8 bg-sky-500 text-white rounded-lg shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all flex items-center justify-center active:scale-95"
                                >
                                    <i className="fas fa-filter text-[10px]"></i>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live Update</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-visible">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-50">No. Reg</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-50">Identitas Pasien</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-50">Tujuan & Dokter</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-50">Status Periksa</th>
                                    <th className="px-8 py-5 text-[10px] font-bold uppercase text-slate-400 tracking-widest border-b border-slate-50 text-center">Aksi RME</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {antrian.data.length > 0 ? antrian.data.map((reg) => (
                                    <tr
                                        key={reg.no_rawat}
                                        className={`hover:bg-sky-50/20 transition-all duration-300 group ${openDropdownId === reg.no_rawat ? 'z-[60] relative bg-sky-50/30' : 'relative z-1'}`}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-700 text-sm shadow-sm group-hover:border-sky-200 group-hover:text-sky-600 group-hover:shadow-sky-100 transition-all">
                                                {reg.no_reg}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{reg.pasien?.nm_pasien}</span>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{reg.no_rkm_medis}</span>
                                                    <span className="text-[8px] font-black text-rose-400 bg-rose-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                        {reg.pasien?.umur}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700">{reg.poliklinik?.nm_poli}</span>
                                                <span className="text-[10px] font-bold text-sky-500 uppercase mt-0.5">{reg.dokter?.nm_dokter}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${reg.stts === 'Belum'
                                                ? 'bg-amber-50 border-amber-100 text-amber-600'
                                                : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${reg.stts === 'Belum' ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{reg.stts} Periksa</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-3">
                                                {/* Button Panggil */}
                                                <button
                                                    onClick={() => { }} // Nanti panggil TTS
                                                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-100 transition-all active:scale-95"
                                                    title="Panggil Antrian"
                                                >
                                                    <i className="fas fa-volume-up text-sm"></i>
                                                </button>

                                                {/* Action Dropdown */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpenDropdownId(openDropdownId === reg.no_rawat ? null : reg.no_rawat)}
                                                        className={`px-5 py-2.5 font-black rounded-xl shadow-lg transition-all text-[10px] uppercase tracking-widest flex items-center gap-3 active:scale-95 ${openDropdownId === reg.no_rawat
                                                            ? 'bg-slate-800 text-white shadow-slate-200'
                                                            : 'bg-sky-500 text-white shadow-sky-100 hover:bg-sky-600'
                                                            }`}
                                                    >
                                                        <i className={`fas ${openDropdownId === reg.no_rawat ? 'fa-times' : 'fa-hand-holding-medical'} text-xs`}></i>
                                                        {reg.stts === 'Belum' ? 'Periksa' : 'Update'}
                                                        <i className={`fas fa-chevron-down text-[8px] transition-transform duration-300 ${openDropdownId === reg.no_rawat ? 'rotate-180' : ''}`}></i>
                                                    </button>

                                                    {openDropdownId === reg.no_rawat && (
                                                        <>
                                                            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdownId(null)}></div>
                                                            <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[24px] shadow-2xl z-50 overflow-hidden p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                <Link
                                                                    href={route('rekam-medis.create', { no_rawat: reg.no_rawat, tab: 'soap' })}
                                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-sky-500 hover:text-white rounded-2xl transition-all group/item"
                                                                >
                                                                    <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center group-hover/item:bg-white/20 transition-colors">
                                                                        <i className="fas fa-file-waveform text-sky-600 group-hover/item:text-white text-xs"></i>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">Input S.O.A.P.I.E</span>
                                                                        <span className="text-[8px] font-bold text-slate-400 group-hover/item:text-sky-100 uppercase mt-0.5 tracking-tight">Data Rekam Medis</span>
                                                                    </div>
                                                                </Link>

                                                                <div className="h-[1px] bg-slate-100/50 my-1 mx-2"></div>

                                                                <button
                                                                     onClick={() => { setSelectedPasien(reg); setIsObatModalOpen(true); setOpenDropdownId(null); }}
                                                                     className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all group/item2 text-left"
                                                                 >
                                                                     <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center group-hover/item2:bg-white/20 transition-colors">
                                                                         <i className="fas fa-pills text-emerald-600 group-hover/item2:text-white text-xs"></i>
                                                                     </div>
                                                                     <div className="flex flex-col">
                                                                         <span className="text-[10px] font-black uppercase tracking-widest">Input Obat</span>
                                                                         <span className="text-[8px] font-bold text-slate-400 group-hover/item2:text-emerald-100 uppercase mt-0.5 tracking-tight">Farmasi & Resep</span>
                                                                     </div>
                                                                 </button>

                                                                <div className="h-[1px] bg-slate-100/50 my-1 mx-2"></div>

                                                                <Link
                                                                    href={route('rekam-medis.create', { no_rawat: reg.no_rawat, tab: 'gabungan' })}
                                                                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-amber-500 hover:text-white rounded-2xl transition-all group/item3"
                                                                >
                                                                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center group-hover/item3:bg-white/20 transition-colors">
                                                                        <i className="fas fa-hand-holding-medical text-amber-600 group-hover/item3:text-white text-xs"></i>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">Input Tindakan</span>
                                                                        <span className="text-[8px] font-bold text-slate-400 group-hover/item3:text-amber-100 uppercase mt-0.5 tracking-tight">Biaya & Rekap</span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-40">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                    <i className="fas fa-folder-open text-2xl"></i>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-500 font-bold">Tidak ada antrian pasien</p>
                                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Silakan cari berdasarkan Nama/RM untuk data hari ini</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Simple Pagination */}
                    {antrian.links && antrian.links.length > 3 && (
                        <div className="px-8 py-6 border-t border-slate-50 bg-slate-50/20 flex items-center justify-center gap-2">
                            {antrian.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${link.active
                                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                                        : 'bg-white border border-slate-100 text-slate-500 hover:bg-sky-50'
                                        } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Card Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <InfoCard icon="fa-user-clock" color="sky" title="Menunggu" value={antrian.data.filter(a => a.stts === 'Belum').length} />
                    <InfoCard icon="fa-check-circle" color="emerald" title="Telah Diperiksa" value={antrian.data.filter(a => a.stts === 'Sudah').length} />
                    <InfoCard icon="fa-users" color="slate" title="Total Antrian" value={antrian.total} />
                </div>

                {/* MODAL INPUT TINDAKAN */}
                {isTindakanModalOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsTindakanModalOpen(false)}></div>
                        <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in duration-200">
                            {/* Modal Header */}
                            <div className="p-5 bg-[#2d3248] text-white flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-users text-base"></i>
                                    <h3 className="text-sm font-bold tracking-wide">Daftar Tindakan Gabungan (Dokter & Petugas)</h3>
                                </div>
                                <button onClick={() => setIsTindakanModalOpen(false)} className="hover:text-slate-300 transition-colors">
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 flex flex-col p-6 space-y-4">
                                {/* Search Bar & Filter Button */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ketik Kode atau Nama Tindakan..."
                                        value={searchTindakan}
                                        onChange={e => setSearchTindakan(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#1cd2df]/30 focus:border-[#1cd2df] outline-none transition-all placeholder:text-slate-400"
                                    />
                                    <button className="px-6 py-2 bg-[#1cd2df] hover:bg-[#18b9c5] text-white font-black text-xs rounded uppercase tracking-wider transition-all">
                                        FILTER
                                    </button>
                                </div>

                                {/* Table Layout */}
                                <div className="border border-slate-200 rounded flex-1 overflow-hidden flex flex-col shadow-sm">
                                    <div className="bg-[#e2e8f0] flex items-center font-bold text-[11px] text-[#475569] px-4 py-2.5 border-b border-slate-300">
                                        <div className="w-8 text-center">P</div>
                                        <div className="w-24 text-left">Kode</div>
                                        <div className="flex-1 text-left">Nama Perawatan</div>
                                        <div className="w-32 text-left">Kategori</div>
                                        <div className="w-28 text-right">Tarif/Biaya</div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                                        {filteredTarif.length > 0 ? filteredTarif.map((t, idx) => (
                                            <label key={idx} className="flex items-center px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-[12px] font-bold text-slate-600 transition-all border-l-2 border-transparent hover:border-[#1cd2df]">
                                                <div className="w-8 flex justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTindakan.includes(t.id)}
                                                        onChange={() => handleCheckboxChange(t.id)}
                                                        className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:border-[#1cd2df] checked:bg-[#1cd2df] hover:border-[#1cd2df] focus:outline-none"
                                                    />
                                                </div>
                                                <div className="w-24 text-slate-500 font-mono tracking-tight">{t.kd_tindakan || t.id}</div>
                                                <div className="flex-1 text-[#4f7ebd] hover:underline font-semibold">{t.nama_tindakan}</div>
                                                <div className="w-32 text-slate-500 font-normal">{t.kategori || 'Umum'}</div>
                                                <div className="w-28 text-right font-bold text-[#1cd2df]">Rp {Number(t.tarif).toLocaleString('id-ID')}</div>
                                            </label>
                                        )) : (
                                            <div className="py-20 flex flex-col items-center justify-center text-center text-slate-400">
                                                <i className="fas fa-folder-open text-3xl mb-2"></i>
                                                <span className="text-xs">Data tidak ditemukan</span>
                                            </div>
                                        )}
                                    </div>
                                    {/* 🩺 Dropdown Pilihan Dokter (Fleksibel) */}
                                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                            <i className="fas fa-user-md text-emerald-500"></i> Dokter Pengirim:
                                        </span>
                                        <select 
                                            value={selectedKdDokter} 
                                            onChange={(e) => setSelectedKdDokter(e.target.value)}
                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-emerald-500 focus:border-emerald-500 min-w-[220px]"
                                        >
                                            {dokterList.map(d => (
                                                <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-100 bg-white flex justify-end items-center gap-2">
                                <button
                                    onClick={() => { setIsTindakanModalOpen(false); setSelectedTindakan([]); }}
                                    className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded shadow-sm hover:bg-slate-50 transition-all text-xs"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={submitTindakan}
                                    disabled={isSubmittingTindakan || selectedTindakan.length === 0}
                                    className="px-6 py-2 bg-[#1cd2df] hover:bg-[#18b9c5] text-white font-black rounded shadow-md disabled:opacity-50 transition-all text-xs tracking-wide"
                                >
                                    {isSubmittingTindakan ? 'MENYIMPAN...' : 'SIMPAN TINDAKAN GABUNGAN'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL INPUT OBAT/RESEP */}
                {isObatModalOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => { setIsObatModalOpen(false); setSelectedObat([]); setSearchObat(''); }}></div>
                        <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in duration-200">
                            {/* Modal Header */}
                            <div className="p-5 bg-emerald-600 text-white flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-prescription text-base"></i>
                                    <h3 className="text-sm font-bold tracking-wide">E-Prescribing (Input Resep/Obat)</h3>
                                </div>
                                <button onClick={() => { setIsObatModalOpen(false); setSelectedObat([]); setSearchObat(''); }} className="hover:text-emerald-100 transition-colors">
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>

                            {/* Tab Header */}
                            <div className="flex border-b border-slate-100 bg-slate-50/50">
                                <button
                                    onClick={() => setActivePrescriptionTab('non_racik')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activePrescriptionTab === 'non_racik' ? 'border-emerald-500 text-emerald-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <i className="fas fa-pills mr-2"></i> Non-Racik
                                </button>
                                <button
                                    onClick={() => setActivePrescriptionTab('racik')}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activePrescriptionTab === 'racik' ? 'border-emerald-500 text-emerald-600 bg-white' : 'border-transparent text-slate-400 hover:bg-slate-50'}`}
                                >
                                    <i className="fas fa-mortar-pestle mr-2"></i> Racikan
                                </button>
                            </div>

                            {/* Modal Body */}
                            {activePrescriptionTab === 'non_racik' ? (
                                <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                                {/* Left Side: Search & Selection */}
                                <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <i className="fas fa-search text-slate-500"></i> Cari & Tambah Obat
                                    </span>
                                    <div className="relative">
                                        <i className={`fas ${isSearchingObat ? 'fa-spinner fa-spin' : 'fa-search'} absolute left-4 top-1/2 -translate-y-1/2 text-slate-400`}></i>
                                        <input
                                            type="text"
                                            placeholder="Ketik Nama Obat..."
                                            value={searchObat}
                                            onChange={e => setSearchObat(e.target.value)}
                                            className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="border border-slate-200 rounded-xl flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar bg-slate-50/30">
                                        {filteredObat.length > 0 ? filteredObat.map((o) => (
                                            <button
                                                key={o.kode_brng}
                                                onClick={() => {
                                                    const exist = selectedObat.find(i => i.kode_brng === o.kode_brng);
                                                    if (!exist) {
                                                        setSelectedObat([...selectedObat, { kode_brng: o.kode_brng, nama_brng: o.nama_brng, jml: 1, aturan_pakai: '3 x 1', stok: o.stok }]);
                                                    } else {
                                                        Swal.fire('Info', 'Obat sudah ada dalam daftar.', 'info');
                                                    }
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-50 text-left transition-all"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-700">{o.nama_brng}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{o.kode_brng} | Stok: {o.stok}</span>
                                                </div>
                                                <i className="fas fa-plus-circle text-emerald-500 text-sm"></i>
                                            </button>
                                        )) : (
                                            <div className="py-16 flex flex-col items-center justify-center text-center text-slate-400 opacity-60">
                                                <i className="fas fa-briefcase-medical text-3xl mb-2"></i>
                                                <span className="text-xs font-bold uppercase tracking-wide">Ketik minimal 2 huruf di atas</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Ordered Prescription Items */}
                                <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <i className="fas fa-list-check text-slate-500"></i> Daftar Resep Anda
                                    </h4>
                                    
                                    <div className="border border-slate-200 rounded-xl flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100 bg-white">
                                        {selectedObat.length > 0 ? selectedObat.map((item, idx) => (
                                            <div key={item.kode_brng} className="p-4 flex flex-col gap-3 hover:bg-slate-50/50 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-emerald-600">{item.nama_brng}</span>
                                                        <span className="text-[9px] font-bold text-slate-400">Stok: {item.stok}</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => setSelectedObat(selectedObat.filter(o => o.kode_brng !== item.kode_brng))}
                                                        className="text-slate-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <i className="fas fa-trash-can text-xs"></i>
                                                    </button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-24 flex flex-col gap-1">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Jumlah</span>
                                                        <input 
                                                            type="number"
                                                            value={item.jml}
                                                            onChange={e => setSelectedObat(selectedObat.map(o => o.kode_brng === item.kode_brng ? { ...o, jml: e.target.value } : o))}
                                                            className="w-full px-2 py-1 border border-slate-200 rounded text-center text-xs font-bold text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col gap-1">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Aturan Pakai</span>
                                                        <input 
                                                            type="text"
                                                            value={item.aturan_pakai}
                                                            onChange={e => setSelectedObat(selectedObat.map(o => o.kode_brng === item.kode_brng ? { ...o, aturan_pakai: e.target.value } : o))}
                                                            className="w-full px-2 py-1 border border-slate-200 rounded text-xs font-medium text-slate-700 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                            placeholder="3 x 1 Setelah Makan"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="py-20 flex flex-col items-center justify-center text-center text-slate-300 opacity-60">
                                                <i className="fas fa-prescription-bottle-medical text-3xl mb-2"></i>
                                                <span className="text-xs">Belum ada obat dipilih</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            ) : (
                                <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                                    {/* Left Side: Form Buat & Cari Obat */}
                                    <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-folder-plus text-emerald-500"></i> Informasi Racikan
                                        </span>
                                        
                                        <div className="grid grid-cols-2 gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="col-span-2">
                                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Nama Racikan</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Contoh: Kapsul Flu & Batuk"
                                                    value={namaRacik}
                                                    onChange={e => setNamaRacik(e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Metode</label>
                                                <select 
                                                    value={metodeRacik}
                                                    onChange={e => setMetodeRacik(e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                                                >
                                                    <option value="Kapsul">Kapsul</option>
                                                    <option value="Pulveres">Pulveres (Puyer)</option>
                                                    <option value="Sirup">Sirup</option>
                                                    <option value="Salep">Salep</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Jml Racik</label>
                                                <input 
                                                    type="number" 
                                                    value={jmlRacik}
                                                    onChange={e => setJmlRacik(e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 text-center focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Aturan Pakai (Signa)</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="3 x 1 Setelah Makan"
                                                    value={aturanPakaiRacik}
                                                    onChange={e => setAturanPakaiRacik(e.target.value)}
                                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <button 
                                                    onClick={() => {
                                                        if(!namaRacik.trim()) { Swal.fire('Perhatian', 'Nama racikan wajib diisi!', 'warning'); return; }
                                                        const newGroup = {
                                                            id: Date.now(),
                                                            nama_racikan: namaRacik,
                                                            metode_racik: metodeRacik,
                                                            jml_racik: Number(jmlRacik),
                                                            aturan_pakai: aturanPakaiRacik,
                                                            items: []
                                                        };
                                                        setSelectedRacikan([...selectedRacikan, newGroup]);
                                                        setActiveRacikanId(newGroup.id);
                                                        setNamaRacik('');
                                                    }}
                                                    className="w-full py-2 bg-emerald-50 text-emerald-600 font-bold rounded-xl text-xs hover:bg-emerald-100 transition-colors border border-emerald-100"
                                                >
                                                    <i className="fas fa-plus mr-2"></i> Buat Grup Racikan
                                                </button>
                                            </div>
                                        </div>

                                        {/* Cari Bahan */}
                                        <div className="flex-1 flex flex-col space-y-2 overflow-hidden mt-4">
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <i className="fas fa-search text-slate-500"></i> Tambah Bahan
                                            </span>
                                            <div className="relative">
                                                <i className={`fas ${isSearchingObat ? 'fa-spinner fa-spin' : 'fa-search'} absolute left-4 top-1/2 -translate-y-1/2 text-slate-400`}></i>
                                                <input
                                                    type="text"
                                                    placeholder={activeRacikanId ? "Cari bahan untuk racikan aktif..." : "Pilih grup racikan dulu..."}
                                                    disabled={!activeRacikanId}
                                                    value={searchObat}
                                                    onChange={e => setSearchObat(e.target.value)}
                                                    className="w-full pl-11 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/30"
                                                />
                                            </div>
                                            
                                            <div className="border border-slate-200 rounded-xl flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar bg-slate-50/30">
                                                {filteredObat.length > 0 ? filteredObat.map(o => (
                                                    <button
                                                        key={o.kode_brng}
                                                        onClick={() => {
                                                            if (!activeRacikanId) return;
                                                            setSelectedRacikan(selectedRacikan.map(g => {
                                                                if (g.id === activeRacikanId) {
                                                                    const exist = g.items.find(i => i.kode_brng === o.kode_brng);
                                                                    if (exist) return g;
                                                                    return { ...g, items: [...g.items, { kode_brng: o.kode_brng, nama_brng: o.nama_brng, jml: 1, stok: o.stok }] };
                                                                }
                                                                return g;
                                                            }));
                                                        }}
                                                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 text-left transition-all"
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-700">{o.nama_brng}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold">{o.kode_brng} | Stok: {o.stok}</span>
                                                        </div>
                                                        <i className="fas fa-plus-circle text-emerald-500 text-sm"></i>
                                                    </button>
                                                )) : (
                                                    <div className="py-10 text-center text-slate-400 text-[11px] font-bold uppercase">Ketik minimal 2 huruf</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: List Racikan Anda */}
                                    <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <i className="fas fa-list-check text-slate-500"></i> Daftar Racikan
                                        </h4>
                                        <div className="border border-slate-200 rounded-xl flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100 bg-white">
                                            {selectedRacikan.length > 0 ? selectedRacikan.map(gr => (
                                                <div key={gr.id} className={`p-4 flex flex-col gap-3 transition-colors ${activeRacikanId === gr.id ? 'bg-emerald-50/40 border-l-4 border-emerald-500' : 'hover:bg-slate-50/50'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <button onClick={() => setActiveRacikanId(gr.id)} className="flex flex-col text-left">
                                                            <span className="text-sm font-black text-slate-700">{gr.nama_racikan}</span>
                                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                                                                {gr.metode_racik} | {gr.jml_racik} Bungkus | {gr.aturan_pakai}
                                                            </span>
                                                        </button>
                                                        <button 
                                                            onClick={() => setSelectedRacikan(selectedRacikan.filter(g => g.id !== gr.id))}
                                                            className="text-slate-300 hover:text-rose-500 transition-colors"
                                                        >
                                                            <i className="fas fa-trash-can text-xs"></i>
                                                        </button>
                                                    </div>

                                                    <div className="space-y-2 mt-1">
                                                        {gr.items.map(it => (
                                                            <div key={it.kode_brng} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-100">
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs font-bold text-slate-600">{it.nama_brng}</span>
                                                                    <span className="text-[9px] font-bold text-slate-400">Total Kebutuhan: {(it.jml * gr.jml_racik).toFixed(1)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <input 
                                                                        type="number" 
                                                                        step="0.1"
                                                                        value={it.jml}
                                                                        onChange={e => {
                                                                            setSelectedRacikan(selectedRacikan.map(g => g.id === gr.id ? { ...g, items: g.items.map(i => i.kode_brng === it.kode_brng ? { ...i, jml: Number(e.target.value) } : i) } : g));
                                                                        }}
                                                                        className="w-16 px-1.5 py-1 border border-slate-200 rounded text-center text-xs font-black text-slate-700"
                                                                    />
                                                                    <button onClick={() => setSelectedRacikan(selectedRacikan.map(g => g.id === gr.id ? { ...g, items: g.items.filter(i => i.kode_brng !== it.kode_brng) } : g))} className="text-slate-300 hover:text-rose-500">
                                                                        <i className="fas fa-times text-xs"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="py-20 flex flex-col items-center justify-center text-center text-slate-300 opacity-60">
                                                    <i className="fas fa-mortar-pestle text-3xl mb-2"></i>
                                                    <span className="text-xs font-bold uppercase">Belum ada grup racikan</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-100 bg-white flex justify-end items-center gap-2">
                                <button
                                    onClick={() => { setIsObatModalOpen(false); setSelectedObat([]); setSearchObat(''); }}
                                    className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded shadow-sm hover:bg-slate-50 transition-all text-xs"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={submitObat}
                                    disabled={isSubmittingObat || (selectedObat.length === 0 && selectedRacikan.length === 0)}
                                    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded shadow-md disabled:opacity-50 transition-all text-xs tracking-wide flex items-center gap-2"
                                >
                                    {isSubmittingObat ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i> MENYIMPAN...
                                        </>
                                    ) : (
                                        <>
                                             <i className="fas fa-paper-plane text-xs"></i> KIRIM RESEP (E-PRESCRIBE [{selectedObat.length} | {selectedRacikan.length}])
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function InfoCard({ icon, color, title, value }) {
    const colors = {
        sky: 'from-sky-500 to-sky-600 shadow-sky-100 bg-sky-50 text-sky-600',
        emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-100 bg-emerald-50 text-emerald-600',
        slate: 'from-slate-700 to-slate-800 shadow-slate-100 bg-slate-50 text-slate-600'
    };

    return (
        <div className="bg-white/40 backdrop-blur-3xl rounded-[28px] p-4 shadow-sm border border-white/50 flex items-center gap-5 transition-all hover:translate-x-1 duration-300 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg ${colors[color]} group-hover:scale-110 transition-transform`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
            </div>
        </div>
    );
}
