import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';

export default function YearCalendar({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={onClose}></div>

            {/* Modal Card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in duration-200">
                
                {/* Header Modal */}
                <div className="p-6 border-b border-slate-100/80 flex justify-between items-center bg-white/50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setCurrentYear(currentYear - 1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all active:scale-95 duration-100">
                            <i className="fas fa-chevron-left text-xs"></i>
                        </button>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentYear}</h2>
                        <button onClick={() => setCurrentYear(currentYear + 1)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all active:scale-95 duration-100">
                            <i className="fas fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                    
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-95 duration-100">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Body: Grid 12 Months */}
                <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50/30">
                    {months.map((m) => {
                        const monthDate = new Date(currentYear, m, 1);
                        const monthStart = startOfMonth(monthDate);
                        const monthEnd = endOfMonth(monthStart);
                        const startDate = startOfWeek(monthStart); 
                        const endDate = endOfWeek(monthEnd);

                        const days = eachDayOfInterval({ start: startDate, end: endDate });

                        return (
                            <div key={m} className="bg-white rounded-2xl p-4 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <h3 className="text-sm font-black text-slate-700 mb-3 capitalize border-b border-slate-50 pb-1">
                                    {format(monthDate, "MMMM", { locale: id })}
                                </h3>
                                
                                {/* Week Days Header */}
                                <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                                    {['S','S','R','K','J','S','M'].map((d, idx) => (
                                        <span key={idx} className={`text-[9px] font-bold ${idx === 0 || idx === 6 ? 'text-rose-500' : 'text-slate-400'}`}>{d}</span>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((day, idx) => {
                                        const isCurrentMonth = isSameMonth(day, monthStart);
                                        const isToday = isSameDay(day, new Date());
                                        const isSunday = format(day, "i") === '7';

                                        return (
                                            <div 
                                                key={idx} 
                                                className={`text-[10px] h-6 flex items-center justify-center rounded-md font-bold
                                                    ${!isCurrentMonth ? 'text-slate-200 font-normal' : 'text-slate-600'}
                                                    ${isToday ? 'bg-sky-500 text-white shadow-sm shadow-sky-100 font-black' : ''}
                                                    ${isCurrentMonth && !isToday && isSunday ? 'text-rose-500' : ''}
                                                `}
                                            >
                                                {format(day, "d")}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
