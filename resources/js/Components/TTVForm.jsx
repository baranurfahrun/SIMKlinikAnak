import React from 'react';

const VitalInputSmall = ({ label, value, onChange, icon }) => (
    <div>
        <label className="block text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1 leading-none">{label}</label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                <i className={`fas ${icon} text-[9px]`}></i>
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white outline-none transition-all text-[12px] font-bold text-slate-700 h-10 shadow-sm placeholder:text-slate-300"
                placeholder="..."
            />
        </div>
    </div>
);

export default function TTVForm({ data, setData, errors }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
                        <i className="fas fa-heartbeat text-lg"></i>
                    </div>
                    <div>
                        <h3 className="font-extrabold text-slate-700 leading-tight">Tanda-Tanda Vital</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 leading-none italic opacity-70 border-l-2 border-sky-400 pl-2">Physical Measurements</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <VitalInputSmall label="Suhu (°C)" icon="fa-thermometer-half" value={data.suhu_tubuh || ''} onChange={e => setData('suhu_tubuh', e.target.value)} />
                <VitalInputSmall label="Tensi (mmHg)" icon="fa-tint" value={data.tensi || ''} onChange={e => setData('tensi', e.target.value)} />
                <VitalInputSmall label="Berat (Kg)" icon="fa-weight" value={data.berat || ''} onChange={e => setData('berat', e.target.value)} />
                <VitalInputSmall label="TB (Cm)" icon="fa-ruler-vertical" value={data.tinggi || ''} onChange={e => setData('tinggi', e.target.value)} />
                <VitalInputSmall label="RR (/mnt)" icon="fa-wind" value={data.respirasi || ''} onChange={e => setData('respirasi', e.target.value)} />
                <VitalInputSmall label="Nadi (/mnt)" icon="fa-wave-square" value={data.nadi || ''} onChange={e => setData('nadi', e.target.value)} />
                <VitalInputSmall label="SpO2 (%)" icon="fa-lungs" value={data.spo2 || ''} onChange={e => setData('spo2', e.target.value)} />
                <VitalInputSmall label="GCS (E,V,M)" icon="fa-brain" value={data.gcs || ''} onChange={e => setData('gcs', e.target.value)} />
                <VitalInputSmall label="L.P. (Cm)" icon="fa-ruler-horizontal" value={data.lingkar_perut || ''} onChange={e => setData('lingkar_perut', e.target.value)} />
                
                <div className="col-span-1">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 leading-none">Kesadaran</label>
                    <div className="relative">
                        <select 
                            value={data.kesadaran || 'Compos Mentis'} 
                            onChange={e => setData('kesadaran', e.target.value)} 
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all cursor-pointer shadow-sm h-10 appearance-none pr-8"
                        >
                            <option value="Compos Mentis">Compos Mentis</option>
                            <option value="Apatis">Apatis</option>
                            <option value="Delirium">Delirium</option>
                            <option value="Somnolen">Somnolen</option>
                            <option value="Stupor">Stupor</option>
                            <option value="Coma">Coma</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <i className="fas fa-chevron-down text-[10px]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
