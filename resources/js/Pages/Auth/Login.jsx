import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function Login({ errors: authErrors, copyright }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        captcha_code: '',
    });

    const [captchaUrl, setCaptchaUrl] = React.useState(route('captcha.load'));

    const reloadCaptcha = () => {
        setCaptchaUrl(route('captcha.load') + '?t=' + Date.now());
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 font-['Outfit']">
            <Head title="Log in" />

            <div className="w-full max-w-md">
                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/50">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 flex items-center justify-center overflow-hidden mx-auto mb-4">
                            <img src="/images/logo.png" className="w-full h-full object-contain" alt="Logo" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">SIM<span className="text-sky-500">Klinik</span> Anak</h1>

                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-3">
                            <i className="fas fa-exclamation-circle text-lg"></i>
                            <span>{errors.username || errors.password}</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Username / ID User</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    autoFocus
                                    className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                                    placeholder="Masukkan username/karakter..."
                                    onChange={onHandleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                                    placeholder="••••••••••••"
                                    onChange={onHandleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Kode Keamanan</label>
                            <div className="flex gap-2 items-center">
                                <div className="relative flex-1 group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <i className="fas fa-shield-halved text-slate-400 group-focus-within:text-sky-500 transition-colors"></i>
                                    </div>
                                    <input
                                        type="text"
                                        name="captcha_code"
                                        value={data.captcha_code}
                                        className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 font-bold text-center tracking-wider uppercase"
                                        placeholder="KODE"
                                        maxLength={6}
                                        onChange={onHandleChange}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="flex gap-3 items-center bg-white/80 border border-slate-100/80 p-2 rounded-2xl shadow-sm">
                                    <img src={captchaUrl} alt="CAPTCHA" className="h-[44px] rounded-xl" />
                                    <button type="button" onClick={reloadCaptcha} className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-sky-500 rounded-xl transition-all border border-slate-100/50" title="Muat Ulang Captcha">
                                        <i className="fas fa-sync-alt text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <i className="fas fa-circle-notch fa-spin"></i>
                            ) : (
                                <>
                                    <span>MASUK KE SISTEM</span>
                                    <i className="fas fa-arrow-right text-xs"></i>
                                </>
                            )}
                        </button>
                    </form>

                        <div className="mt-8 text-center space-y-1">

                            <p className="text-[10px] text-slate-400/80 font-medium tracking-wide">
                                {copyright?.signature ? window.atob(copyright.signature) : '© 2026 bara.n.fahrun - 085117476001'}
                            </p>
                        </div>
                </div>
            </div>
        </div>
    );
}
