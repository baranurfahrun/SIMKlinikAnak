import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import TTVForm from '@/Components/TTVForm';

export default function Create({ auth, registrasi, riwayat, templates, tarif_pilihan, tindakan_gabungan, pemeriksaan_sekarang }) {
    const [showForm, setShowForm] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editKey, setEditKey] = useState(null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    // TAB MANAGEMENT
    const queryParams = new URLSearchParams(window.location.search);
    const [activeTab, setActiveTab] = useState(queryParams.get('tab') || 'soap');

    // Tindakan Modal State
    const [isTindakanModalOpen, setIsTindakanModalOpen] = useState(false);
    const [searchTindakan, setSearchTindakan] = useState('');
    const [selectedTindakan, setSelectedTindakan] = useState([]);
    const [qtyTindakan, setQtyTindakan] = useState(1);
    const [isSubmittingTindakan, setIsSubmittingTindakan] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        no_rawat: registrasi.no_rawat, 
        suhu_tubuh: pemeriksaan_sekarang?.suhu_tubuh || '', 
        tensi: pemeriksaan_sekarang?.tensi || '', 
        nadi: pemeriksaan_sekarang?.nadi || '', 
        respirasi: pemeriksaan_sekarang?.respirasi || '', 
        spo2: pemeriksaan_sekarang?.spo2 || '', 
        tinggi: pemeriksaan_sekarang?.tinggi || '', 
        berat: pemeriksaan_sekarang?.berat || '', 
        lingkar_perut: pemeriksaan_sekarang?.lingkar_perut || '', 
        gcs: pemeriksaan_sekarang?.gcs || '', 
        kesadaran: pemeriksaan_sekarang?.kesadaran || 'Compos Mentis',
        keluhan: pemeriksaan_sekarang?.keluhan === '-' ? '' : (pemeriksaan_sekarang?.keluhan || ''), 
        pemeriksaan: pemeriksaan_sekarang?.pemeriksaan === '-' ? '' : (pemeriksaan_sekarang?.pemeriksaan || ''), 
        penilaian: pemeriksaan_sekarang?.penilaian === '-' ? '' : (pemeriksaan_sekarang?.penilaian || ''), 
        tindak_lanjut: pemeriksaan_sekarang?.tindak_lanjut === '-' ? '' : (pemeriksaan_sekarang?.tindak_lanjut || ''), 
        instruksi: pemeriksaan_sekarang?.instruksi || '', 
        evaluasi: pemeriksaan_sekarang?.evaluasi || '', 
        alergi: pemeriksaan_sekarang?.alergi === '-' ? '' : (pemeriksaan_sekarang?.alergi || ''), 
        jadikan_template: false,
    });

    const filteredTarif = tarif_pilihan?.filter(t =>
        t.nama_tindakan.toLowerCase().includes(searchTindakan.toLowerCase())
    ) || [];

    const filteredRiwayat = riwayat.filter(h => {
        if (!startDate && !endDate) return true;
        const checkDate = h.tgl_pemeriksaan; 
        if (startDate && checkDate < startDate) return false;
        if (endDate && checkDate > endDate) return false;
        return true;
    });

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
                no_rawat: registrasi.no_rawat,
                id_tarif: selectedTindakan,
                qty: qtyTindakan
            });

            Swal.fire('Berhasil!', 'Tindakan berhasil ditambahkan.', 'success');
            setIsTindakanModalOpen(false);
            setSelectedTindakan([]);
            setQtyTindakan(1);
            Inertia.reload();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Terjadi kesalahan saat menyimpan tindakan.';
            Swal.fire('Gagal!', errorMsg, 'error');
        } finally {
            setIsSubmittingTindakan(false);
        }
    };

    const handleDeleteTindakan = (id) => {
        Swal.fire({
            title: 'Hapus?',
            text: "Yakin ingin menghapus tindakan ini dari tagihan?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('kasir.tagihan.destroy_tindakan', id), {
                    onSuccess: () => Swal.fire('Dihapus!', 'Tindakan berhasil dihapus.', 'success')
                });
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            Inertia.put(route('rekam-medis.update'), { ...data, ...editKey }, {
                onSuccess: () => {
                    Swal.fire('Berhasil!', 'Data pemeriksaan telah diperbarui.', 'success');
                    resetForm();
                }
            });
        } else {
            post(route('rekam-medis.store'), {
                onSuccess: () => {
                    Swal.fire('Tersimpan!', 'Data pemeriksaan baru berhasil dicatat.', 'success');
                    reset();
                }
            });
        }
    };

    const resetForm = () => { reset(); setIsEditMode(false); setEditKey(null); };

    const handleEdit = (h) => {
        setIsEditMode(true);
        setEditKey({ no_rawat: h.no_rawat, tgl_pemeriksaan: h.tgl_pemeriksaan, jam_pemeriksaan: h.jam_pemeriksaan });
        setData({
            no_rawat: h.no_rawat, suhu_tubuh: h.suhu_tubuh, tensi: h.tensi, nadi: h.nadi, respirasi: h.respirasi, spo2: h.spo2, tinggi: h.tinggi, berat: h.berat, lingkar_perut: h.lingkar_perut, gcs: h.gcs, kesadaran: h.kesadaran, keluhan: h.keluhan, pemeriksaan: h.pemeriksaan, penilaian: h.penilaian, tindak_lanjut: h.tindak_lanjut, instruksi: h.instruksi, evaluasi: h.evaluasi, alergi: h.alergi || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (h) => {
        Swal.fire({
            title: 'Hapus data CPPT?',
            text: "Data pemeriksaan medis ini akan dihapus secara permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('rekam-medis.destroy'), {
                    data: { no_rawat: h.no_rawat, tgl_pemeriksaan: h.tgl_pemeriksaan, jam_pemeriksaan: h.jam_pemeriksaan },
                    onSuccess: () => Swal.fire('Dihapus!', 'Data CPPT berhasil dihapus.', 'success')
                });
            }
        });
    };

    const applyTemplate = (t) => {
        setData({ ...data, keluhan: t.keluhan || '', pemeriksaan: t.pemeriksaan || '', penilaian: t.penilaian || '', tindak_lanjut: t.tindak_lanjut || '', instruksi: t.instruksi || '', evaluasi: t.evaluasi || '' });
        setIsTemplateModalOpen(false);
    };

    return (
        <AppLayout auth={auth} title={activeTab === 'gabungan' ? "Penanganan Dokter & Petugas" : "Pemeriksaan Pasien (RME)"}>
            <Head title={`RME - ${activeTab === 'gabungan' ? "Penanganan & Tindakan" : "Pemeriksaan"}`} />

            <div className="max-w-[1600px] mx-auto space-y-4 -mt-4 md:-mt-7">
                {/* Top Info Bar */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-2xl shadow-sm border border-white/50 py-3 px-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={route('rekam-medis.index')} className="w-9 h-9 bg-white/80 hover:bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-500 transition-all border border-white/50 shadow-sm"><i className="fas fa-arrow-left text-xs"></i></Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-black text-slate-800 leading-tight">{registrasi.pasien?.nm_pasien}</h1>
                                <span className="px-2 py-0.5 bg-sky-50 text-sky-500 rounded-lg text-[9px] font-black uppercase border border-sky-100/30">{registrasi.no_rkm_medis}</span>
                                {registrasi.pasien?.umur && registrasi.pasien.umur !== '-' && (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black border border-emerald-100/30 flex items-center gap-1 shadow-sm">
                                        <i className="fas fa-baby text-emerald-500 text-[10px]"></i>
                                        {registrasi.pasien.umur.split(', ').map(p => p.replace(' Tahun', ' T').replace(' Bulan', ' B').replace(' Hari', ' H')).reverse().join(' - ')}
                                    </span>
                                )}
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide leading-none">No. Rawat: {registrasi.no_rawat}</p>
                        </div>
                    </div>
                </div>

                {/* CONDITIONAL RENDERING */}
                {activeTab === 'soap' && (
                    <>
                        <div onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/40 border-y border-white/30 cursor-pointer transition-all group rounded-2xl">
                            <div className={`w-5 h-5 flex items-center justify-center transition-transform ${showForm ? '' : 'rotate-180'}`}><i className="fas fa-caret-up text-sky-500"></i></div>
                            <span className="text-[10px] font-black text-slate-600 uppercase flex items-center gap-2"><span className="text-sky-400">.:</span> Input Data</span>
                        </div>

                        {showForm && (
                             <form onSubmit={submit} className="space-y-6 animate-in slide-in-from-top duration-500">
                                 {/* LAPIS 1: SOAP RATA */}
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                     <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/50 p-8 space-y-6">
                                         <SoapField label="S (Subjek)" subtitle="Keluhan utama & riwayat" value={data.keluhan} onChange={e => setData('keluhan', e.target.value)} placeholder="Apa yang dikeluhkan pasien?..." error={errors.keluhan} minHeight="60px" />
                                         <SoapField label="O (Objek)" subtitle="Pemeriksaan fisik & penunjang" value={data.pemeriksaan} onChange={e => setData('pemeriksaan', e.target.value)} placeholder="Apa yang ditemukan pada pasien?..." error={errors.pemeriksaan} minHeight="60px" />
                                     </div>
                                     <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/50 p-8 space-y-6">
                                         <SoapField label="A (Asesmen)" subtitle="Penilaian klinis / Diagnosis" value={data.penilaian} onChange={e => setData('penilaian', e.target.value)} placeholder="Diagnosis..." error={errors.penilaian} minHeight="60px" />
                                         <SoapField label="P (Plan)" subtitle="Rencana tindakan / Terapi" value={data.tindak_lanjut} onChange={e => setData('tindak_lanjut', e.target.value)} placeholder="Terapi..." error={errors.tindak_lanjut} minHeight="60px" />
                                     </div>
                                 </div>

                                 {/* LAPIS 2: TANDA-TANDA VITAL (2 KOLOM) */}
                                 <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/50 p-8">
                                     <TTVForm data={data} setData={setData} errors={errors} />
                                 </div>

                                 {/* LAPIS 3: TOMBOL AKSI */}
                                 <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] border border-white/50 p-4 flex justify-between items-center shadow-lg shadow-sky-900/5">
                                     <div className="flex items-center gap-4">
                                         <button type="button" onClick={() => setIsTemplateModalOpen(true)} className="px-5 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-2xl font-bold text-xs transition-all flex items-center gap-1"><i className="fas fa-paste"></i> Template</button>
                                         <div className="flex items-center gap-2">
                                             <input 
                                                 type="checkbox" 
                                                 id="jadikan_template" 
                                                 checked={data.jadikan_template} 
                                                 onChange={e => setData('jadikan_template', e.target.checked)} 
                                                 className="rounded text-sky-500 focus:ring-sky-500 cursor-pointer w-4 h-4" 
                                             />
                                             <label htmlFor="jadikan_template" className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-700 transition-all select-none">Simpan sebagai Template</label>
                                         </div>
                                     </div>
                                     <button 
                                         type="submit" 
                                         disabled={processing || registrasi?.status_closing === 'Selesai'} 
                                         className={`px-10 py-2.5 ${registrasi?.status_closing === 'Selesai' ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-sky-500 hover:bg-sky-600 text-white'} font-black rounded-3xl transition-all shadow-xl shadow-sky-200`}
                                     >
                                         {registrasi?.status_closing === 'Selesai' ? 'TERKUNCI (CLOSED)' : (isEditMode ? 'UPDATE RME' : 'SIMPAN CPPT')}
                                     </button>
                                 </div>
                             </form>
                        )}

                        {/* Logger Data CPPT */}
                        <div className="bg-white/40 backdrop-blur-3xl rounded-[40px] shadow-sm border border-white/50 overflow-hidden mt-6">
                            <div className="px-8 py-4 border-b border-white/50 bg-white/30 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
                                        <i className="fas fa-file-medical-alt text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800">Logger Data CPPT Tersimpan</h3>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 leading-none">Daftar riwayat pemeriksaan medis pasien secara detail</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dari</span>
                                        <input 
                                            type="date" 
                                            value={startDate} 
                                            onChange={e => setStartDate(e.target.value)} 
                                            className="px-3 py-1.5 bg-white/80 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:border-sky-300 focus:ring-2 focus:ring-sky-200/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">s/d</span>
                                        <input 
                                            type="date" 
                                            value={endDate} 
                                            onChange={e => setEndDate(e.target.value)} 
                                            className="px-3 py-1.5 bg-white/80 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:border-sky-300 focus:ring-2 focus:ring-sky-200/20 outline-none transition-all"
                                        />
                                    </div>
                                    {(startDate || endDate) && (
                                        <button 
                                            onClick={() => { setStartDate(''); setEndDate(''); }} 
                                            className="p-1 px-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg text-xs font-bold transition-all"
                                            title="Reset Filter"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/30">
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest w-[140px]">No Rawat</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest w-[180px]">Waktu & Vital</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">S (Subjek)</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">O (Objek)</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">A (Asesmen)</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">P (Plan)</th>
                                            <th className="px-8 py-3 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/20">
                                        {filteredRiwayat.length > 0 ? filteredRiwayat.map((h, i) => (
                                            <tr key={i} className="hover:bg-white/30 transition-all group">
                                                <td className="px-10 py-6">
                                                    <span className="text-xs font-black text-slate-700">{h.no_rawat}</span>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="space-y-2">
                                                        <div className="flex flex-col"><span className="text-xs font-black text-sky-600">{h.tgl_pemeriksaan}</span><span className="text-[10px] font-bold text-slate-400 font-mono">{h.jam_pemeriksaan}</span></div>
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-bold text-slate-500"><span>T: {h.suhu_tubuh}°C</span><span>TD: {h.tensi}</span><span>N: {h.nadi}</span><span>SPO2: {h.spo2}%</span></div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6"><p className="text-xs font-medium text-slate-600 line-clamp-3 max-w-[200px] leading-relaxed">{h.keluhan}</p></td>
                                                <td className="px-10 py-6"><p className="text-xs font-medium text-slate-600 line-clamp-3 max-w-[200px] leading-relaxed">{h.pemeriksaan}</p></td>
                                                <td className="px-10 py-6"><span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black border border-amber-100">{h.penilaian}</span></td>
                                                <td className="px-10 py-6"><p className="text-xs font-medium text-slate-600 line-clamp-3 max-w-[200px] leading-relaxed">{h.tindak_lanjut}</p></td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleEdit(h)} className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-all border border-amber-100" title="Edit Data">
                                                            <i className="fas fa-edit text-xs"></i>
                                                        </button>
                                                        <button onClick={() => handleDelete(h)} className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-100 transition-all border border-rose-100" title="Hapus Data">
                                                            <i className="fas fa-trash text-xs"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="7" className="py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest opacity-50 italic">Belum ada data pemeriksaan tersimpan</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'gabungan' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in slide-in-from-top duration-300">
                        <div className="lg:col-span-5 bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col space-y-4">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2"><i className="fas fa-users text-[#1cd2df]"></i> Input Penanganan Dokter & Petugas</h3>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 mb-1">Dokter/Perawat :</label>
                                <div className="flex gap-2">
                                    <input type="text" value={auth.user?.nama || 'Pegawai'} className="flex-1 px-4 py-2 border border-slate-200 rounded text-sm bg-slate-50 cursor-not-allowed" readOnly />
                                    <button className="px-5 py-2 bg-slate-600 text-white font-black text-xs rounded"><i className="fas fa-search"></i> CARI</button>
                                </div>
                            </div>
                            <button type="button" onClick={() => setIsTindakanModalOpen(true)} className="w-full py-3 bg-[#1cd2df] hover:bg-[#18b9c5] text-white font-black text-sm rounded shadow-md uppercase flex items-center justify-center gap-2">
                                <i className="fas fa-list-check text-sm"></i> TAMPILKAN DAFTAR TINDAKAN GABUNGAN
                            </button>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col space-y-4">
                            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2"><i className="fas fa-history text-cyan-600"></i> Daftar Tindakan Gabungan Hari Ini</h3>
                            <div className="border border-slate-200 rounded flex-1 overflow-y-auto">
                                <table className="w-full text-left">
                                    <thead><tr className="bg-[#e2e8f0] font-semibold text-[11px] text-slate-700"><th className="px-4 py-3">Nama Tindakan</th><th className="px-4 py-3 text-center w-20">Aksi</th></tr></thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tindakan_gabungan?.length > 0 ? tindakan_gabungan.map(t => (
                                            <tr key={t.id} className="hover:bg-slate-50 transition-all text-xs font-semibold text-slate-600">
                                                <td className="px-4 py-3">{t.nama_tindakan}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => handleDeleteTindakan(t.id)} className="text-rose-500 hover:text-rose-700 w-8 h-8 flex items-center justify-center mx-auto rounded-lg hover:bg-rose-50" title="Hapus"><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="2" className="py-10 text-center text-slate-400 font-bold uppercase text-[9px] tracking-widest opacity-50 italic">Belum ada tindakan hari ini</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {isTemplateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTemplateModalOpen(false)}></div>
                        <div className="relative bg-white w-full max-w-2xl max-h-[70vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                                <h3 className="font-black text-sm flex items-center gap-2"><i className="fas fa-paste text-sky-400"></i> Pilih Template SOAP</h3>
                                <button onClick={() => setIsTemplateModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all"><i className="fas fa-times text-xs"></i></button>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto space-y-2">
                                {templates?.length > 0 ? templates.map((t, idx) => (
                                    <div key={idx} onClick={() => applyTemplate(t)} className="p-4 bg-slate-50 hover:bg-sky-50/50 border border-slate-100 rounded-2xl cursor-pointer transition-all hover:border-sky-200 group flex justify-between items-center">
                                        <div className="flex-1">
                                            <span className="text-xs font-black text-slate-700 group-hover:text-sky-600 transition-colors">Template {idx + 1}</span>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5 line-clamp-1">S: <span className="text-slate-500">{t.keluhan || '-'}</span> | O: <span className="text-slate-500">{t.pemeriksaan || '-'}</span></p>
                                        </div>
                                        <i className="fas fa-arrow-right text-slate-300 group-hover:text-sky-400 group-hover:translate-x-1 transition-all text-xs"></i>
                                    </div>
                                )) : (
                                    <div className="py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest opacity-50 italic">Belum ada template tersimpan</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {isTindakanModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60" onClick={() => setIsTindakanModalOpen(false)}></div>
                        <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col">
                            <div className="p-4 bg-[#2d3248] text-white flex justify-between">Pilih Tindakan <button onClick={() => setIsTindakanModalOpen(false)}>X</button></div>
                            <div className="p-4 flex-1 overflow-y-auto">
                                <table className="w-full text-left divide-y divide-slate-100">
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredTarif.map(t => (
                                            <tr key={t.id} className="hover:bg-slate-50 transition-all font-semibold">
                                                <td className="p-3 w-10">
                                                    <input type="checkbox" checked={selectedTindakan.includes(t.id)} onChange={() => handleCheckboxChange(t.id)} className="rounded text-[#1cd2df] focus:ring-[#1cd2df] cursor-pointer" />
                                                </td>
                                                <td className="p-3 text-xs font-bold text-slate-700">{t.nama_tindakan}</td>
                                                <td className="p-3 text-xs font-black text-cyan-600 text-right font-mono">Rp {Number(t.tarif).toLocaleString('id-ID')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer Modal */}
                            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                                <button type="button" onClick={() => setIsTindakanModalOpen(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">Batal</button>
                                <button 
                                    type="button" 
                                    onClick={submitTindakan} 
                                    disabled={isSubmittingTindakan || registrasi?.status_closing === 'Selesai'} 
                                    className={`px-6 py-2.5 ${registrasi?.status_closing === 'Selesai' ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#1cd2df] hover:bg-[#18b9c5] text-white'} rounded-xl text-xs font-black flex items-center gap-2 shadow-md disabled:opacity-50`}
                                >
                                    {isSubmittingTindakan ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>} {registrasi?.status_closing === 'Selesai' ? 'Terkunci (Closed)' : 'Simpan Tindakan'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

const SoapField = ({ label, subtitle, value, onChange, placeholder, error, minHeight = "100px" }) => (
    <div className="group">
        <div className="flex justify-between items-end mb-2 ml-1">
            <div>
                <label className="block text-[12px] font-black text-slate-800 uppercase tracking-widest leading-none">{label}</label>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 leading-none">{subtitle}</p>
            </div>
        </div>
        <textarea
            value={value}
            onChange={onChange}
            className={`w-full px-5 py-4 bg-white border ${error ? 'border-rose-400 ring-rose-500/10 ring-4' : 'border-slate-200 group-hover:border-sky-200'} rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 text-[13px] font-bold text-slate-700 leading-relaxed shadow-sm`}
            placeholder={placeholder}
            style={{ minHeight }}
        ></textarea>
        {error && <p className="text-rose-500 text-[10px] font-bold mt-2 ml-2 italic tracking-tight">{error}</p>}
    </div>
);
