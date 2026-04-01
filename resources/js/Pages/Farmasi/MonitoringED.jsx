import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/inertia-react';

export default function MonitoringED({ auth, expired = [] }) {
    const [search, setSearch] = useState('');

    const stats = {
        total: expired.length,
        expired: expired.filter(i => i.color === 'rose').length,
        warning: expired.filter(i => i.color === 'amber').length,
        safe: expired.filter(i => i.color === 'emerald').length
    };

    const filteredData = expired.filter(item =>
        (item.nama_brng?.toLowerCase().includes(search.toLowerCase())) ||
        (item.no_faktur?.toLowerCase().includes(search.toLowerCase())) ||
        (item.kode_brng?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AppLayout auth={auth} header="Monitoring ED (Kadaluwarsa)">
            <Head title="Farmasi - Monitoring ED" />

            <div className="space-y-4 -mt-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Batch"
                        value={stats.total}
                        icon="fa-boxes-stacked"
                        color="sky"
                    />
                    <StatCard
                        title="Telah Kadaluwarsa"
                        value={stats.expired}
                        icon="fa-calendar-times"
                        color="rose"
                        badge="CRITICAL"
                    />
                    <StatCard
                        title="Segera Kadaluwarsa"
                        value={stats.warning}
                        icon="fa-calendar-day"
                        color="amber"
                        badge="WARNING"
                    />
                    <StatCard
                        title="Stok Aman"
                        value={stats.safe}
                        icon="fa-calendar-check"
                        color="emerald"
                    />
                </div>

                {/* Main Section */}
                <div className="bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-sm overflow-hidden min-h-[500px]">
                    {/* Toolbar */}
                    <div className="py-2.5 px-4 border-b border-white/50 bg-white/30 flex flex-col lg:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-50 text-xs">
                                <i className="fas fa-search"></i>
                            </div>
                            <div className="relative group min-w-[300px]">
                                <input
                                    type="text"
                                    placeholder="Cari Nama Obat, Kode, atau No. Faktur..."
                                    className="w-full bg-white/50 border-none rounded-xl px-4 py-1.5 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-sky-500/5 transition-all outline-none"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status Monitoring:</span>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Aktif</span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/30">
                                    <th className="px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Data Obat</th>
                                    <th className="px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Detail Batch / Qty</th>
                                    <th className="px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Tgl. Expired</th>
                                    <th className="px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Sisa Waktu</th>
                                    <th className="px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/20">
                                {filteredData.length > 0 ? filteredData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/30 transition-all group">
                                        <td className="px-2 py-0.5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-700 tracking-tight">{item.nama_brng}</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0">{item.kode_brng}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-0.5">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-black text-slate-700 font-mono tracking-tight">{item.jml} {item.kode_sat}</span>
                                                <span className="text-[11px] font-bold text-slate-600 group-hover:text-sky-600 transition-colors uppercase font-mono mt-0">{item.no_faktur}</span>
                                                <span className="text-[10px] font-medium text-slate-400 mt-0">Diterima: {item.tgl_penerimaan}</span>
                                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter italic">Suplier: {item.supplier || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-0.5 text-center">
                                            <span className={`px-2 py-0.5 rounded-xl text-xs font-black tracking-tight ${item.color === 'rose' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-700'}`}>
                                                {item.tgl_expired}
                                            </span>
                                        </td>
                                        <td className="px-2 py-0.5 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className={`text-[13px] font-black ${item.color === 'rose' ? 'text-rose-600' : (item.color === 'amber' ? 'text-amber-600' : 'text-emerald-600')}`}>
                                                    {item.sisa_hari <= 0 ? (Math.abs(item.sisa_hari)) + ' Hari Lalu' : item.sisa_hari + ' Hari Lagi'}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Life span remaining</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-0.5 text-center">
                                            <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-xl border ${item.color === 'rose' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                (item.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100')
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${item.color === 'rose' ? 'bg-rose-500 animate-pulse' :
                                                    (item.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500')
                                                    }`}></span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-40">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-2 border border-slate-100">
                                                    <i className="fas fa-calendar-alt text-4xl"></i>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic">Tidak ada data ED ditemukan</p>
                                                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Semua stok obat dalam kondisi aman</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend / Info */}
                <div className="flex flex-wrap gap-6 items-center justify-center px-4 py-2 bg-white/20 rounded-2xl border border-white/30">
                    <LegendItem color="rose" text="Sudah melewati batas waktu penggunaan" />
                    <div className="w-1 h-1 bg-slate-200 rounded-full hidden md:block"></div>
                    <LegendItem color="amber" text="Mendekati masa kedaluwarsa (Kurang dari 3 bulan)" />
                    <div className="w-1 h-1 bg-slate-200 rounded-full hidden md:block"></div>
                    <LegendItem color="emerald" text="Masa penggunaan masih panjang dan aman" />
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, icon, color, badge }) {
    const colors = {
        sky: 'from-sky-500 to-sky-600 text-sky-600 bg-sky-50 shadow-sky-100 border-sky-100',
        rose: 'from-rose-500 to-rose-600 text-rose-600 bg-rose-50 shadow-rose-100 border-rose-100',
        amber: 'from-amber-500 to-amber-600 text-amber-600 bg-amber-50 shadow-amber-100 border-amber-100',
        emerald: 'from-emerald-500 to-emerald-600 text-emerald-600 bg-emerald-50 shadow-emerald-100 border-emerald-100'
    };

    return (
        <div className="bg-white/40 backdrop-blur-3xl rounded-xl p-2.5 border border-white/50 shadow-sm flex flex-col hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-md ${colors[color]}`}>
                    <i className={`fas ${icon}`}></i>
                </div>
                {badge && (
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black tracking-widest border ${colors[color]}`}>
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
            <p className="text-xl font-black text-slate-800 tracking-tighter">{value}</p>
        </div>
    );
}

function LegendItem({ color, text }) {
    const bg = {
        rose: 'bg-rose-500',
        amber: 'bg-amber-500',
        emerald: 'bg-emerald-500'
    };
    return (
        <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${bg[color]}`}></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{text}</span>
        </div>
    );
}
