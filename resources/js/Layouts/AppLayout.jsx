import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import YearCalendar from '@/Components/YearCalendar';

export default function AppLayout({ header, children }) {
    const { auth, settings, copyright } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { post } = useForm();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleOpenCalendar = () => {
        setIsCalendarOpen(true);
    };

    const handleLogout = (e) => {
        Swal.fire({
            title: 'Konfirmasi Keluar',
            text: "Apakah Anda yakin ingin mengakhiri sesi ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            background: 'rgba(255, 255, 255, 0.9)',
            backdrop: `rgba(15, 23, 42, 0.1)`,
            customClass: {
                popup: 'rounded-[24px] border border-white/50 backdrop-blur-xl shadow-2xl font-["Outfit"]',
                title: 'text-slate-800 font-bold',
                confirmButton: 'rounded-xl px-6 py-3 font-bold',
                cancelButton: 'rounded-xl px-6 py-3 font-bold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('logout'));
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#bae6fd] font-['Outfit'] text-slate-800 relative overflow-x-hidden">
            {/* Intensified Ice Blue Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-300/60 blur-[130px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-blue-300/50 blur-[110px]"></div>
                <div className="absolute top-[10%] right-[5%] w-[35%] h-[35%] rounded-full bg-indigo-200/60 blur-[100px]"></div>
                <div className="absolute bottom-[5%] left-[0%] w-[30%] h-[30%] rounded-full bg-cyan-200/70 blur-[90px]"></div>
                <div className="absolute top-[40%] left-[45%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[150px]"></div>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-4 left-4 h-[calc(100vh-32px)] z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[32px] hidden md:flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.02)]`}
            >
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                            <img src="/images/logo.png" className="w-full h-full object-contain" alt="Logo" />
                            {/* Force Reload */}
                        </div>
                        {isSidebarOpen && (
                            <span className="text-xl font-bold tracking-tight text-slate-800">
                                SIM<span className="text-sky-500">Klinik</span> Anak
                            </span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    <NavItem href={route('dashboard')} icon="fas fa-th-large" label="Dashboard" active={route().current('dashboard')} isOpen={isSidebarOpen} />
                    <NavItem href={route('pasien.index')} icon="fas fa-user-plus" label="Pendaftaran" active={route().current('pasien.*')} isOpen={isSidebarOpen} />
                    <NavItem href={route('registrasi.index')} icon="fas fa-clipboard-list" label="Registrasi Poli" active={route().current('registrasi.*')} isOpen={isSidebarOpen} />
                    <NavItem href={route('rekam-medis.index')} icon="fas fa-notes-medical" label="Rekam Medis (RME)" active={route().current('rekam-medis.*')} isOpen={isSidebarOpen} />

                    <NavGroup
                        icon="fas fa-pills"
                        label="Farmasi"
                        isOpen={isSidebarOpen}
                        active={route().current('farmasi.*')}
                        items={[
                            { href: route('farmasi.resep.masuk'), label: 'Resep Masuk', icon: 'fas fa-file-prescription' },
                            { href: route('farmasi.resep.keluar'), label: 'Resep Keluar', icon: 'fas fa-history' },
                            { href: route('farmasi.stok'), label: 'Stok & Inventori', icon: 'fas fa-boxes-stacked' },
                            { href: route('farmasi.opname'), label: 'Stok Opname', icon: 'fas fa-clipboard-check' },
                            { href: route('farmasi.penerimaan'), label: 'Penerimaan Barang', icon: 'fas fa-truck-loading' },
                            { href: route('farmasi.expired'), label: 'Monitoring ED', icon: 'fas fa-calendar-times' },
                            { href: route('farmasi.laporan'), label: 'Laporan Farmasi', icon: 'fas fa-chart-line' },
                        ]}
                    />

                    <NavGroup
                        icon="fas fa-cash-register"
                        label="Kasir & Billing"
                        isOpen={isSidebarOpen}
                        active={route().current('kasir.*')}
                        items={[
                            { href: route('kasir.tarif.index'), label: 'Atur Tarif Tindakan', icon: 'fas fa-tags' },
                            { href: route('kasir.tagihan.index'), label: 'Tagihan Pasien', icon: 'fas fa-file-invoice-dollar' }
                        ]}
                    />

                    <div className="pt-8 pb-2">
                        {isSidebarOpen && <span className="px-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Sistem & Admin</span>}
                        {!isSidebarOpen && <div className="h-[1px] bg-slate-100 mx-2"></div>}
                    </div>

                    <NavItem href={route('kepegawaian.index')} icon="fas fa-users-cog text-amber-600" label="Kepegawaian" active={route().current('kepegawaian.*')} isOpen={isSidebarOpen} />

                    {auth.user.role === 'admin' && (
                        <NavGroup
                            icon="fas fa-cog"
                            label="Pengaturan"
                            isOpen={isSidebarOpen}
                            active={route().current('pengaturan.*')}
                            items={[
                                { href: route('pengaturan.database'), label: 'Koneksi Database', icon: 'fas fa-database' },
                                { href: route('akun.index'), label: 'Pengaturan Akun', icon: 'fas fa-user-shield' },
                                { href: route('pengaturan.sistem'), label: 'Konfigurasi Sistem', icon: 'fas fa-sliders' },
                                { href: route('pengaturan.sistem', { tab: 'security' }), label: 'Performance Guard', icon: 'fas fa-shield-halved' },
                            ]}
                        />
                    )}
                </nav>

                <div className="p-4 border-t border-slate-100/80">
                    <div
                        onClick={() => setIsProfileModalOpen(true)}
                        className={`bg-sky-50/50 hover:bg-sky-50 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.02] duration-200 ${!isSidebarOpen && 'flex-col gap-3'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white">
                                <img
                                    src={auth.user.foto_profil || `https://ui-avatars.com/api/?name=${auth.user.nama || 'A'}&background=0ea5e9&color=fff`}
                                    className="w-full h-full object-cover"
                                    alt="Avatar"
                                />
                            </div>
                            {isSidebarOpen && (
                                <div className="overflow-hidden">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{auth.user.nama || 'User'}</h4>
                                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-wider">Role: {auth.user.role === 'admin' ? 'Super Admin' : (auth.user.jabatan || 'Pegawai')}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {isSidebarOpen && <i className="fas fa-cog text-slate-400 text-xs hover:text-sky-500 transition-colors"></i>}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all ${!isSidebarOpen && 'w-full'}`}
                                title="Keluar"
                            >
                                <i className="fas fa-power-off text-base"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`transition-all duration-300 relative z-10 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-28'}`}>
                {/* Header */}
                <header className="sticky top-4 z-40 bg-white/40 backdrop-blur-3xl px-6 py-2 mx-6 mt-4 rounded-xl flex justify-between items-center border border-white/50 shadow-sm">
                    <div>
                        {header && <div className="text-lg font-bold text-slate-800">{header}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            onClick={handleOpenCalendar}
                            className="bg-white py-1.5 px-3.5 rounded-full shadow-sm border border-slate-100 hidden sm:flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-all hover:scale-105 duration-200"
                        >
                            <i className="far fa-calendar-alt text-sky-500 text-sm"></i>
                            <span className="text-xs font-bold text-slate-700">
                                {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
                            </span>
                        </div>

                    </div>
                </header>

                <div className="p-6 md:p-10 pb-16">
                    {children}
                </div>
            </main>

            {/* Global Sticky Footer for Running Text & Copyright */}
            <footer
                className={`fixed opacity-95 bottom-4 right-6 ${isSidebarOpen ? 'md:left-72' : 'md:left-28'} left-6 h-10 bg-white/40 backdrop-blur-3xl border border-white/50 flex items-center z-40 transition-all duration-300 px-6 rounded-xl shadow-sm`}
            >
                <div className="flex-1 overflow-hidden h-full flex items-center">
                    <div className="marquee-container-footer w-full">
                        <div className="marquee-content-footer" style={{ animationDuration: `${50 - parseInt(settings?.rt_speed || '15')}s` }}>
                            {Array(5).fill(0).map((_, i) => (
                                <span key={i} className="text-xs font-bold text-slate-700 font-sans flex items-center gap-2 mr-40">
                                    <i className="fas fa-bullhorn text-amber-500"></i>
                                    {settings?.running_text || 'Selamat Datang di SIMKlinik Anak. Keamanan Data Prioritas Kami.'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 border-l border-slate-200/50 pl-4 ml-4">
                    <span className="text-[10px] text-sky-600 font-black tracking-widest font-mono">
                        {copyright?.signature ? window.atob(copyright.signature) : '@2026 bara.n.fahrun-085117476001'}
                    </span>
                </div>
            </footer>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                .glass-sidebar {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    border-right: 1px solid rgba(255, 255, 255, 0.3);
                }
                .marquee-container-footer {
                    display: flex;
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }
                .marquee-content-footer {
                    display: flex;
                    width: max-content;
                    animation: scroll-left-footer 35s linear infinite;
                    white-space: nowrap;
                    gap: 0;
                }
                .marquee-content-footer:hover {
                    animation-play-state: paused;
                }
                @keyframes scroll-left-footer {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-20%); }
                }
            `}</style>

            <YearCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
            <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} user={auth.user} />
        </div>
    );
}

function NavItem({ href, icon, label, active = false, isOpen = true }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-sm ${active
                ? 'bg-gradient-to-r from-cyan-300 to-cyan-100 text-cyan-950 font-bold border-l-4 border-cyan-500 shadow-md'
                : 'text-slate-600 hover:bg-cyan-50/40 hover:text-cyan-600'
                }`}
        >
            <i className={`${icon} w-5 text-center ${active ? 'text-cyan-600' : 'group-hover:text-cyan-600'}`}></i>
            {isOpen && <span className="font-medium text-sm">{label}</span>}
        </Link>
    );
}

function NavGroup({ icon, label, items, isOpen = true, active = false }) {
    const [isExpanded, setIsExpanded] = useState(active);

    return (
        <div className="space-y-1">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-sm ${active || isExpanded
                    ? 'bg-gradient-to-r from-cyan-300 to-cyan-100 text-cyan-950 font-bold'
                    : 'text-slate-600 hover:bg-cyan-50/40 hover:text-cyan-600'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <i className={`${icon} w-5 text-center ${active || isExpanded ? 'text-sky-600' : 'group-hover:text-sky-600'}`}></i>
                    {isOpen && <span className="font-medium text-sm">{label}</span>}
                </div>
                {isOpen && (
                    <i className={`fas fa-chevron-right text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}></i>
                )}
            </button>

            {isExpanded && isOpen && (
                <div className="ml-4 pl-4 border-l border-sky-100 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                    {items.map((item, idx) => (
                        item.external ? (
                            <a
                                key={idx}
                                href={item.href}
                                target={item.target || '_self'}
                                className="flex items-center gap-3 p-2 rounded-lg text-xs font-medium text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all group"
                            >
                                <i className={`${item.icon} w-4 text-center opacity-70 group-hover:opacity-100`}></i>
                                <span>{item.label}</span>
                            </a>
                        ) : (
                            <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-3 p-2 rounded-lg text-xs font-medium text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all group"
                            >
                                <i className={`${item.icon} w-4 text-center opacity-70 group-hover:opacity-100`}></i>
                                <span>{item.label}</span>
                            </Link>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

function EditProfileModal({ isOpen, onClose, user }) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: user.nama || user.nama_pegawai || '',
        new_password: '',
        foto_profil: null
    });

    const [preview, setPreview] = useState(user.foto_profil || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto_profil', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess: () => {
                reset('new_password');
                onClose();
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Profil Anda telah diperbarui. Ganti foto membutuhkan reload halaman jika belum ter-refresh otomatis.',
                    icon: 'success',
                    confirmButtonColor: '#0ea5e9'
                }).then(() => {
                    window.location.reload(); // Paksa reload agar Image layout cache diperbarui
                });
            },
            forceFormData: true
        });
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={onClose}></div>
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-sm p-6 relative z-10 animate-in fade-in zoom-in duration-200 font-['Outfit']">
                <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                    <h3 className="text-md font-black text-slate-800 flex items-center gap-2">
                        <i className="fas fa-user-circle text-sky-500"></i> Pengaturan Profil
                    </h3>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all">
                        <i className="fas fa-times text-xs"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Foto Profil Preview */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl relative overflow-hidden group bg-slate-100">
                            <img
                                src={preview || `https://ui-avatars.com/api/?name=${user.nama || user.nama_pegawai || 'A'}&background=0ea5e9&color=fff`}
                                className="w-full h-full object-cover"
                                alt="Avatar"
                            />
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200">
                                <i className="fas fa-camera text-white text-lg"></i>
                                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                            </label>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">Tekan foto untuk mengganti</span>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-slate-600 mb-1 uppercase tracking-wider">Nama Lengkap</label>
                        <input
                            type="text"
                            value={data.nama}
                            onChange={e => setData('nama', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                            required
                        />
                        {errors.nama && <span className="text-rose-500 text-[10px]">{errors.nama}</span>}
                    </div>

                    <div>
                        <label className="block text-[11px] font-black text-slate-600 mb-1 uppercase tracking-wider">Password Baru</label>
                        <input
                            type="password"
                            value={data.new_password}
                            onChange={e => setData('new_password', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                            placeholder="Kosongkan jika tidak diganti"
                        />
                        {errors.new_password && <span className="text-rose-500 text-[10px]">{errors.new_password}</span>}
                    </div>

                    <div className="pt-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-sky-400 hover:to-sky-500 text-white font-black rounded-xl text-sm shadow-md shadow-sky-100 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

