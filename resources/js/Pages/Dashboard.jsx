import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';

export default function Dashboard({ auth, errors, antrianHariIni, terlayani, antrianLive }) {
    return (
        <AppLayout
            auth={auth}
            errors={errors}
            header="Dashboard Utama"
        >
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 -mt-8">
                <StatCard
                    label="Antrian Hari Ini"
                    value={antrianHariIni || 0}
                    trend={`+${antrianHariIni} total kunjungan`}
                    icon="fas fa-users"
                    trendColor="text-emerald-500"
                />
                <StatCard
                    label="Pasien Terlayani"
                    value={terlayani || 0}
                    icon="fas fa-check-circle"
                    progress={antrianHariIni > 0 ? (terlayani / antrianHariIni) * 100 : 0}
                />
                <StatCard
                    label="Obat Racikan"
                    value="15"
                    trend="3 resep diproses"
                    icon="fas fa-mortar-pestle"
                    trendColor="text-amber-500"
                />
            </div>

            {/* Content Grid */}
            <div className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <i className="fas fa-stream text-sky-500"></i> Antrian Saat Ini
                        </h4>
                        <button className="text-xs font-bold text-sky-600 hover:text-sky-700">Lihat Semua Antrian</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-50">
                                    <th className="pb-4">No. Antri</th>
                                    <th className="pb-4">Nama Pasien</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {antrianLive && antrianLive.length > 0 ? antrianLive.map((row, index) => (
                                    <QueueRow
                                        key={row.no_rawat}
                                        id={row.no_reg}
                                        name={row.pasien?.nm_pasien || 'Unknown'}
                                        dokter={row.dokter?.nm_dokter || 'Dr. Siska, Sp.A'}
                                        status={row.stts === 'Belum' ? 'MENUNGGU' : 'DIPERIKSA'}
                                        statusColor={row.stts === 'Belum' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'}
                                        isCurrent={row.stts === 'Sudah'} 
                                    />
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="py-10 text-center text-slate-400 font-medium">Belum ada antrian hari ini.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

        </AppLayout>
    );
}

function calculateAge(birthDate) {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years}th ${months}bln`;
}

function StatCard({ label, value, trend, icon, trendColor, progress }) {
    return (
        <div className="bg-white p-3 rounded-[20px] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                {trend && <p className={`text-[10px] ${trendColor} font-bold mt-2`}><i className="fas fa-arrow-up mr-1 text-[8px]"></i> {trend}</p>}
                {progress && (
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-sky-900 text-7xl group-hover:scale-110 transition-transform">
                <i className={icon}></i>
            </div>
        </div>
    );
}

function QueueRow({ id, name, dokter, status, statusColor, isCurrent = false, onClick }) {
    return (
        <tr onClick={onClick} className="border-b border-slate-50 group hover:bg-sky-50/50 transition-colors cursor-pointer">

            <td className="py-4">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${isCurrent ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-slate-100 text-slate-600'}`}>
                    {id}
                </span>
            </td>
            <td className="py-4">
                <p className="font-bold text-slate-700">{name}</p>
                <p className="text-[10px] text-slate-400">Poli Anak • {dokter}</p>
            </td>
            <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColor}`}>{status}</span>
            </td>
            <td className="py-4 text-center">
                <button className="bg-white border border-slate-200 p-2 px-3 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    {status === 'MENUNGGU' ? 'PANGGIL' : 'DETAIL'}
                </button>
            </td>
        </tr>
    );
}

function TumbuhKembangModal({ isOpen, onClose, data, pasien }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[24px] p-6 w-full max-w-2xl shadow-xl animate-scale-up relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <i className="fas fa-times text-lg"></i>
                </button>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <i className="fas fa-chart-line text-sky-500"></i> Detail Tumbuh Kembang
                </h4>
                <p className="text-xs text-slate-500 mb-6">Pasien: <span className="font-bold text-slate-700">{pasien?.nm_pasien || 'Pilih Pasien'}</span></p>
                
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <div className="max-h-[350px] overflow-y-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">
                                    <th className="pb-3">Tanggal</th>
                                    <th className="pb-3 text-center">Berat (kg)</th>
                                    <th className="pb-3 text-center">Tinggi (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? data.map((d, i) => (
                                    <tr key={i} className="border-b border-slate-50 hover:bg-white/80 transition-colors">
                                        <td className="py-3 text-slate-600 font-medium">{d.tgl_pemeriksaan}</td>
                                        <td className="py-3 font-bold text-slate-700 text-center bg-sky-50/40">{d.berat} kg</td>
                                        <td className="py-3 font-bold text-slate-700 text-center">{d.tinggi} cm</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="py-10 text-center text-slate-400 font-medium">Belum ada riwayat pemeriksaan pertumbuhan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
