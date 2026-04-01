import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/inertia-react';

export default function PharmacyPlaceholder({ auth, title, icon }) {
    return (
        <AppLayout auth={auth} header={title}>
            <Head title={`Farmasi - ${title}`} />

            <div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-10 border border-white/50 shadow-sm">
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[24px] flex items-center justify-center text-2xl shadow-lg shadow-emerald-100">
                        <i className={`fas ${icon} font-black`}></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Modul Farmasi & Logistik</p>
                    </div>
                </div>

                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border border-slate-100 shadow-inner">
                        <i className={`fas ${icon} text-4xl`}></i>
                    </div>
                    <p className="text-xl font-black text-slate-400 uppercase tracking-[0.2em] italic">Segera Hadir: {title}</p>
                    <p className="text-xs text-slate-300 font-bold mt-4 max-w-md leading-relaxed">System sedang dalam tahap pengembangan untuk modul {title}. Silakan kembali beberapa saat lagi.</p>
                </div>
            </div>
        </AppLayout>
    );
}
