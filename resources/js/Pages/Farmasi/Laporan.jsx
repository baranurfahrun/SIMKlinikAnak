import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Laporan({ auth, summary, chart_data, list_resep, filters }) {
    const [tglAwal, setTglAwal] = useState(filters.tgl_awal);
    const [tglAkhir, setTglAkhir] = useState(filters.tgl_akhir);

    const handleFilter = (e) => {
        e.preventDefault();
        Inertia.get(route('farmasi.laporan'), {
            tgl_awal: tglAwal,
            tgl_akhir: tglAkhir
        }, { preserveState: true });
    };

    return (
        <AppLayout auth={auth} header="Laporan Farmasi">
            <Head title="Laporan Farmasi" />

            <div className="space-y-4 -mt-8">
                {/* 1. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard 
                        icon="fa-file-prescription" 
                        color="emerald" 
                        title="Resep Hari Ini" 
                        value={summary.total_resep_hari_ini} 
                        desc="Resep terinput"
                    />
                    <StatCard 
                        icon="fa-pills" 
                        color="sky" 
                        title="Obat Aktif" 
                        value={summary.obat_aktif} 
                        desc="Item di master"
                    />
                    <StatCard 
                        icon="fa-triangle-exclamation" 
                        color="rose" 
                        title="Stok Menipis" 
                        value={summary.stok_menipis} 
                        desc="Item di bawah 10"
                    />
                    <StatCard 
                        icon="fa-money-bill-trend-up" 
                        color="violet" 
                        title="Nilai Aset Stok" 
                        value={`Rp ${Number(summary.nilai_aset).toLocaleString('id-ID')}`} 
                        desc="Estimasi Total"
                    />
                </div>

                {/* 2. Filter & Lists Section */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-6 border border-white/50 shadow-sm">
                    {/* Header Table & Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-base font-black text-slate-700 uppercase tracking-wide">Riwayat E-Resep</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Daftar resep yang masuk dari Dokter</p>
                        </div>

                        <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3 bg-white/80 p-2 rounded-2xl shadow-inner border border-slate-100">
                            <div className="flex items-center gap-1.5 px-3">
                                <i className="fas fa-calendar-day text-slate-400 text-xs"></i>
                                <input 
                                    type="date" 
                                    value={tglAwal} 
                                    onChange={e => setTglAwal(e.target.value)}
                                    className="border-none bg-transparent p-1 text-xs font-bold text-slate-700 focus:ring-0 outline-none"
                                />
                            </div>
                            <span className="text-slate-300 font-bold text-xs">-</span>
                            <div className="flex items-center gap-1.5 px-3">
                                <i className="fas fa-calendar-week text-slate-400 text-xs"></i>
                                <input 
                                    type="date" 
                                    value={tglAkhir} 
                                    onChange={e => setTglAkhir(e.target.value)}
                                    className="border-none bg-transparent p-1 text-xs font-bold text-slate-700 focus:ring-0 outline-none"
                                />
                            </div>
                            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-md shadow-emerald-100 transition-all flex items-center gap-2">
                                <i className="fas fa-filter text-[9px]"></i> Filter
                            </button>
                        </form>
                    </div>

                    {/* Table View */}
                    <div className="overflow-hidden border border-slate-100 rounded-2xl bg-white/80">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Resep / Tgl</th>
                                    <th className="py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pasien</th>
                                    <th className="py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dokter</th>
                                    <th className="py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Daftar Obat</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {list_resep.data.length > 0 ? list_resep.data.map((r) => (
                                    <tr key={r.no_resep} className="hover:bg-slate-50/50 transition-colors duration-200">
                                        <td className="py-4 px-4 align-top">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-emerald-600">{r.no_resep}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{r.tgl_perawatan} {r.jam_perawatan}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 align-top">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-700 tracking-tight">{r.pasien?.nm_pasien || 'N/A'}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{r.no_rawat}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 align-top">
                                            <span className="text-xs font-bold text-slate-600">{r.dokter?.nm_dokter || 'N/A'}</span>
                                        </td>
                                        <td className="py-4 px-4 align-top">
                                            <div className="flex flex-wrap gap-1">
                                                {r.detail?.map((dt, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700">
                                                        {dt.barang?.nama_brng} ({dt.jml})
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <i className="fas fa-box-open text-3xl text-slate-300"></i>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Tidak ada data resep</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Simple */}
                    {list_resep.links && list_resep.links.length > 3 && (
                        <div className="mt-5 flex justify-center gap-1">
                            {list_resep.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => link.url && Inertia.get(link.url)}
                                    disabled={!link.url}
                                    className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
                                        link.active 
                                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                                            : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon, color, title, value, desc }) {
    const colors = {
        emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-100 bg-emerald-50 text-emerald-600',
        sky: 'from-sky-500 to-sky-600 shadow-sky-100 bg-sky-50 text-sky-600',
        rose: 'from-rose-500 to-rose-600 shadow-rose-100 bg-rose-50 text-rose-600',
        violet: 'from-violet-500 to-violet-600 shadow-violet-100 bg-violet-50 text-violet-600'
    };

    return (
        <div className="bg-white/40 backdrop-blur-3xl rounded-xl p-3 shadow-sm border border-white/50 flex items-center gap-3 transition-all hover:translate-x-0.5 duration-300 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-md ${colors[color]} group-hover:scale-105 transition-transform`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-xl font-black text-slate-800 mt-0.5">{value}</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">{desc}</p>
            </div>
        </div>
    );
}
