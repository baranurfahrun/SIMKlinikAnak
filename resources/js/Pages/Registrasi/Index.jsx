import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import axios from 'axios';
import TTVForm from '@/Components/TTVForm';

export default function Index({ auth, registrasi, poliklinik, dokter, allPatients }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalSearchTerm, setModalSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [isTTVModalOpen, setIsTTVModalOpen] = useState(false);

    // Date Filter State
    const [filterByDate, setFilterByDate] = useState({
        tgl_awal: new URLSearchParams(window.location.search).get('tgl_awal') || new Date().toISOString().split('T')[0],
        tgl_akhir: new URLSearchParams(window.location.search).get('tgl_akhir') || new Date().toISOString().split('T')[0]
    });

    const filteredPatients = allPatients?.filter(p =>
        p.nm_pasien.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
        p.no_rkm_medis.includes(modalSearchTerm) ||
        (p.no_peserta && p.no_peserta.includes(modalSearchTerm)) ||
        (p.nik_dec && p.nik_dec.includes(modalSearchTerm))
    ) || [];

    const { data, setData, post, processing, reset, errors } = useForm({
        no_reg: '---',
        no_rawat: 'Auto Generate',
        tgl_reg: new Date().toISOString().split('T')[0],
        jam_reg: new Date().toLocaleTimeString('en-GB'),
        no_rkm_medis: '',
        nm_pasien: '',
        kd_dokter: dokter[0]?.kd_dokter || '',
        kd_poli: poliklinik[0]?.kd_poli || '',
        p_jawab: '',
        hubunganpj: 'Ibu',
        almt_pj: '',
        kd_pj: 'UMM',
        asal_rujukan: '-',
        no_ktp: '',
        // TTV Fields
        suhu_tubuh: '', tensi: '', nadi: '', respirasi: '', spo2: '', tinggi: '', berat: '', lingkar_perut: '', gcs: '', kesadaran: 'Compos Mentis',
    });

    const { delete: destroy } = useForm();

    // Live Search Pasien
    useEffect(() => {
        if (searchTerm.length > 2) {
            axios.get(route('api.pasiens.search', { term: searchTerm }))
                .then(res => {
                    setSearchResults(res.data);
                    setShowResults(true);
                });
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchTerm]);

    const selectPasien = (p) => {
        setData({
            ...data,
            no_rkm_medis: p.no_rkm_medis,
            nm_pasien: p.nm_pasien,
            almt_pj: p.alamat || '',
            p_jawab: p.nm_ibu || '',
            no_ktp: (p.no_peserta && p.nik_dec) ? `${p.no_peserta} / ${p.nik_dec}` : (p.no_peserta || p.nik_dec || ''),
            kd_pj: p.no_peserta ? 'BJS' : 'UMM',
        });
        setSearchTerm(p.nm_pasien);
        setShowResults(false);
    };

    const submit = (e) => {
        e.preventDefault();

        console.log("Submitting registration...", data);

        post(route('registrasi.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSearchTerm('');
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Pendaftaran pasien telah disimpan.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-[24px]' }
                });
            },
            onError: (err) => {
                console.error("Submission errors:", err);
                Swal.fire({
                    title: 'Gagal Simpan!',
                    text: 'Periksa kembali kelengkapan data pendaftaran.',
                    icon: 'error',
                    confirmButtonText: 'Cek Lagi',
                    confirmButtonColor: '#f43f5e',
                    customClass: { popup: 'rounded-[24px]' }
                });
            }
        });
    };

    const handleCancel = (no_rawat, name) => {
        Swal.fire({
            title: 'Batalkan Registrasi?',
            text: `Yakin ingin membatalkan pendaftaran untuk ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Batalkan',
            customClass: { popup: 'rounded-[24px]' }
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('registrasi.destroy', no_rawat));
            }
        });
    };

    const handleFilterDate = () => {
        Inertia.get(route('registrasi.index'), filterByDate, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AppLayout auth={auth} header="Registrasi Periksa">
            <Head title="Registrasi Periksa" />

            <div className="space-y-3 -mt-3 md:-mt-5">
                {/* FORM INPUT DETAIL (Style Khanza Premium) */}
                {/* Accordion Toggle Bar */}
                <div 
                    onClick={() => setIsFormOpen(!isFormOpen)} 
                    className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white px-4 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white/80 transition-all select-none"
                >
                    <div className="w-5 h-5 rounded-lg bg-sky-50 flex items-center justify-center">
                        <i className={`fas fa-caret-up text-[10px] text-sky-500 transition-transform duration-300 ${isFormOpen ? '' : 'rotate-180'}`}></i>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">INPUT DATA</span>
                    </div>
                </div>

                {isFormOpen && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white p-8 mt-1.5 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-100">
                            <i className="fas fa-file-medical text-lg"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Form Pendaftaran Baru</h3>
                            <p className="text-xs text-slate-500 font-medium">Lengkapi data kunjungan pasien hari ini.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                        {/* Error Summary */}
                        {Object.keys(errors).length > 0 && (
                            <div className="col-span-1 lg:col-span-2 bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-4">
                                <p className="text-rose-600 font-bold text-xs mb-1">Terjadi kesalahan pendaftaran:</p>
                                <ul className="list-disc list-inside text-[10px] text-rose-500 font-medium">
                                    {Object.entries(errors).map(([key, value]) => (
                                        <li key={key}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">No. Reg</label>
                                    <input type="text" value={data.no_reg} disabled className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-bold text-slate-400" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">No. Rawat</label>
                                    <input type="text" value={data.no_rawat} disabled className="w-full bg-slate-50 border-slate-200 rounded-xl text-sm font-bold text-slate-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Cari Pasien (Nama / No. RM)</label>
                                <div className="relative flex gap-2">
                                    <div className="relative flex-1">
                                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Ketik minimal 3 karakter..."
                                            className="w-full pl-11 pr-4 py-3 bg-white border-slate-200 rounded-2xl text-sm focus:ring-sky-500 focus:border-sky-500 transition-all font-bold text-slate-700"
                                        />
                                        {showResults && (
                                            <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                                                {searchResults.map(p => (
                                                    <div key={p.no_rkm_medis} onClick={() => selectPasien(p)} className="px-4 py-3 hover:bg-sky-50 cursor-pointer flex justify-between items-center transition-colors">
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-700">{p.nm_pasien}</p>
                                                            <p className="text-[10px] font-mono text-slate-400 tracking-wider">NO. RM: {p.no_rkm_medis}</p>
                                                        </div>
                                                        <i className="fas fa-chevron-right text-sky-300 text-xs"></i>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-4 bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white rounded-2xl transition-all border border-sky-100 shadow-sm shadow-sky-50"
                                        title="Buka Daftar Pasien"
                                    >
                                        <i className="fas fa-list-ul"></i>
                                    </button>
                                </div>
                                {errors.no_rkm_medis && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">{errors.no_rkm_medis}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Poliklinik</label>
                                    <select value={data.kd_poli} onChange={e => setData('kd_poli', e.target.value)} className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                                        {poliklinik.map(p => <option key={p.kd_poli} value={p.kd_poli}>{p.nm_poli}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Dokter Dituju</label>
                                    <select value={data.kd_dokter} onChange={e => setData('kd_dokter', e.target.value)} className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                                        {dokter.map(d => <option key={d.kd_dokter} value={d.kd_dokter}>{d.nm_dokter}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Penanggung Jawab (PJ)</label>
                                    <input type="text" value={data.p_jawab} onChange={e => setData('p_jawab', e.target.value)} placeholder="Nama PJ" className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600" />
                                    {errors.p_jawab && <p className="text-rose-500 text-[10px] mt-1 font-bold">{errors.p_jawab}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Hubungan</label>
                                    <select value={data.hubunganpj} onChange={e => setData('hubunganpj', e.target.value)} className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                                        <option value="Suami">Suami</option>
                                        <option value="Istri">Istri</option>
                                        <option value="Anak">Anak</option>
                                        <option value="Ayah">Ayah</option>
                                        <option value="Ibu">Ibu</option>
                                        <option value="Saudara">Saudara</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Alamat PJ</label>
                                <input type="text" value={data.almt_pj} onChange={e => setData('almt_pj', e.target.value)} placeholder="Alamat Lengkap PJ" className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Jenis Bayar</label>
                                    <select value={data.kd_pj} onChange={e => setData('kd_pj', e.target.value)} className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                                        <option value="UMM">UMUM</option>
                                        <option value="BJS">BPJS / ASURANSI</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">No. Kartu / KTP</label>
                                    <input type="text" value={data.no_ktp} onChange={e => setData('no_ktp', e.target.value)} placeholder="Optional" className="w-full bg-white border-slate-200 rounded-xl text-sm font-bold text-slate-600" />
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsTTVModalOpen(true)}
                                    className="w-1/4 py-4 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 font-black rounded-2xl border-2 border-sky-200/50 hover:border-sky-300 transition-all flex items-center justify-center gap-3 shadow-sm group"
                                    title="Input Tanda-Tanda Vital"
                                >
                                    <i className="fas fa-heartbeat text-sky-500 group-hover:scale-110 transition-transform"></i>
                                    <span className="hidden md:inline uppercase tracking-widest text-[10px]">Input TTV</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold rounded-2xl shadow-xl shadow-sky-100 hover:shadow-sky-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-save"></i>
                                    )}
                                    {processing ? 'SEDANG MENYIMPAN...' : 'SIMPAN & CEK TTV'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                )}

                {/* TABEL ANTRIAN */}
                <div className="bg-white/70 backdrop-blur-xl rounded-[32px] shadow-sm border border-white overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-4">
                        <div className="flex items-center gap-3">
                            <h4 className="font-bold text-slate-700">Daftar Kunjungan</h4>
                            <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100 italic">
                                {registrasi.total} Total Data
                            </span>
                        </div>

                        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Mulai</span>
                                <input
                                    type="date"
                                    value={filterByDate.tgl_awal}
                                    onChange={e => setFilterByDate({ ...filterByDate, tgl_awal: e.target.value })}
                                    className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:ring-0 py-2"
                                />
                            </div>
                            <div className="h-4 w-px bg-slate-100"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sampai</span>
                                <input
                                    type="date"
                                    value={filterByDate.tgl_akhir}
                                    onChange={e => setFilterByDate({ ...filterByDate, tgl_akhir: e.target.value })}
                                    className="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:ring-0 py-2"
                                />
                            </div>
                            <button
                                onClick={handleFilterDate}
                                className="ml-2 w-10 h-10 bg-sky-500 text-white rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all flex items-center justify-center active:scale-95"
                            >
                                <i className="fas fa-filter text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/20">
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Antri</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Pasien</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Dokter / Poli</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Penanggung Jawab</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Bayar</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {registrasi.data.length > 0 ? registrasi.data.map((reg) => (
                                <tr key={reg.no_rawat} className="hover:bg-sky-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <span className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-sky-100">
                                            {reg.no_reg}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-slate-700 text-sm leading-tight">{reg.pasien?.nm_pasien}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{reg.no_rkm_medis}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-bold text-slate-600 truncate max-w-[150px]">{reg.dokter?.nm_dokter}</p>
                                        <p className="text-[10px] text-sky-600 font-bold uppercase">{reg.poliklinik?.nm_poli}</p>
                                    </td>
                                    <td className="px-8 py-5 text-xs text-slate-500 font-medium">
                                        {reg.p_jawab} <span className="text-[10px] opacity-60">({reg.hubunganpj})</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${reg.kd_pj === 'UMM' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
                                            {reg.kd_pj === 'UMM' ? 'UMUM' : 'BPJS'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            {/* Tombol Batal */}
                                            {reg.status_closing !== 'Selesai' ? (
                                                <button
                                                    onClick={() => handleCancel(reg.no_rawat, reg.pasien?.nm_pasien)}
                                                    title="Batalkan Registrasi"
                                                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                                >
                                                    <i className="fas fa-times text-xs"></i>
                                                </button>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black flex items-center gap-1 border border-emerald-100">
                                                    <i className="fas fa-lock text-[10px]"></i> CLOSED
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center text-slate-400 text-sm">Belum ada antrian registrasi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL TTV */}
            {isTTVModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsTTVModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden border border-white p-8 animate-in fade-in zoom-in duration-300">
                        <TTVForm data={data} setData={setData} errors={errors} />
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={() => setIsTTVModalOpen(false)} 
                                className="px-8 py-3 bg-sky-500 text-white font-black rounded-2xl shadow-lg shadow-sky-100 hover:bg-sky-600 transition-all uppercase text-xs"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL PENCARIAN PASIEN ( Khanza Style Premium ) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-white animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Cari Data Pasien</h3>
                                <p className="text-xs text-slate-500 font-medium">Pilih pasien untuk didaftarkan ke poliklinik.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-50 text-slate-400 hover:text-rose-500 transition-all">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="relative mb-6">
                                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                <input
                                    type="text"
                                    placeholder="Filter berdasarkan Nama atau No. RM..."
                                    value={modalSearchTerm}
                                    onChange={(e) => setModalSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border-slate-200 rounded-[20px] text-sm focus:ring-sky-500 font-bold"
                                />
                            </div>

                            <div className="max-h-[400px] overflow-y-auto rounded-2xl border border-slate-50">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white shadow-sm z-10">
                                        <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-50">
                                            <th className="px-6 py-4">No. RM</th>
                                            <th className="px-6 py-4">Nama Pasien</th>
                                            <th className="px-6 py-4">Alamat</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredPatients.length > 0 ? filteredPatients.map(p => (
                                            <tr key={p.no_rkm_medis} className="hover:bg-sky-50/50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs font-bold text-sky-600">{p.no_rkm_medis}</td>
                                                <td className="px-6 py-4 font-bold text-slate-700 text-sm">{p.nm_pasien}</td>
                                                <td className="px-6 py-4 text-xs text-slate-400 truncate max-w-[200px]">{p.alamat}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => { selectPasien(p); setIsModalOpen(false); }}
                                                        className="px-4 py-2 bg-sky-500 text-white text-[10px] font-bold rounded-xl hover:bg-sky-600 shadow-lg shadow-sky-100 transition-all uppercase"
                                                    >
                                                        Pilih
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="py-20 text-center text-slate-400 text-sm font-medium">Data pasien tidak ditemukan.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
