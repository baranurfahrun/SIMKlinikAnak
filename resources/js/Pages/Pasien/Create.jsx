import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

// Komponen Sub-UI dipindahkan ke luar untuk mencegah re-mount saat pengetikan (fix bug focus loss)
const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center shadow-sm">
            <i className={`fas ${icon} text-lg`}></i>
        </div>
        <div>
            <h3 className="font-bold text-slate-700 leading-tight">{title}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>
        </div>
    </div>
);

const Label = ({ children }) => (
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{children}</label>
);

const Input = ({ type = 'text', value, onChange, placeholder, disabled = false, required = false, icon }) => (
    <div className="relative group">
        {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-500 transition-colors">
                <i className={`fas ${icon} text-xs`}></i>
            </div>
        )}
        <input
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            className={`w-full ${icon ? 'pl-10' : 'px-4'} py-3 bg-white border border-slate-100 rounded-xl focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 text-sm font-bold text-slate-600 ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}
        />
    </div>
);

const Select = ({ value, onChange, options }) => (
    <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all text-sm font-bold text-slate-600"
    >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
);

export default function Create({ auth, nextNoRM }) {
    const { data, setData, post, processing, errors } = useForm({
        no_rkm_medis: nextNoRM,
        nm_pasien: '',
        nik: '',
        jk: 'L',
        tmp_lahir: '',
        tgl_lahir: '',
        nm_ibu: '',
        no_tlp: '',
        alamat: '',
        agama: 'ISLAM',
        pekerjaan: '-',
        stts_nikah: 'BELUM MENIKAH',
        gol_darah: '-',
        pendidikan: '-',
        no_peserta: '',
        email: '',
        suku_bangsa: '-',
        bahasa_pasien: 'BAHASA INDONESIA',
        cacat_fisik: '-',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        propinsi: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pasien.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data pasien berhasil disimpan.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-[24px] font-["Outfit"]'
                    }
                });
            }
        });
    };

    return (
        <AppLayout auth={auth} header="Pendaftaran Pasien">
            <Head title="Pendaftaran Pasien" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Pasien Baru</h2>
                        <p className="text-sm text-slate-500">Formulir pendaftaran pasien lengkap standar Khanza.</p>
                    </div>
                    <Link
                        href={route('pasien.index')}
                        className="px-5 py-2.5 bg-white text-slate-500 font-bold rounded-xl border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm shadow-sm"
                    >
                        <i className="fas fa-arrow-left"></i>
                        <span>KEMBALI</span>
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* SECTION 1: DATA UTAMA */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white p-8">
                            <SectionHeader icon="fa-id-card-alt" title="Data Utama" subtitle="Identitas dasar pasien" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>No. Rekam Medis</Label>
                                        <Input value={data.no_rkm_medis} disabled placeholder="Auto" />
                                    </div>
                                    <div>
                                        <Label>NIK (KTP/KIA)</Label>
                                        <Input value={data.nik} onChange={e => setData('nik', e.target.value)} placeholder="16 Digit NIK" required icon="fa-fingerprint" />
                                        {errors.nik && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.nik}</p>}
                                    </div>
                                </div>
                                <div>
                                    <Label>Nama Lengkap Pasien</Label>
                                    <Input value={data.nm_pasien} onChange={e => setData('nm_pasien', e.target.value)} placeholder="Nama Sesuai ID" required icon="fa-user" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <Label>J.K.</Label>
                                        <Select value={data.jk} onChange={e => setData('jk', e.target.value)} options={[
                                            { label: 'Laki-Laki', value: 'L' },
                                            { label: 'Perempuan', value: 'P' }
                                        ]} />
                                    </div>
                                    <div className="col-span-1">
                                        <Label>Tgl Lahir</Label>
                                        <Input type="date" value={data.tgl_lahir} onChange={e => setData('tgl_lahir', e.target.value)} required />
                                    </div>
                                    <div className="col-span-1">
                                        <Label>Tmp Lahir</Label>
                                        <Input value={data.tmp_lahir} onChange={e => setData('tmp_lahir', e.target.value)} placeholder="Kota" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: ALAMAT & KONTAK */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white p-8">
                            <SectionHeader icon="fa-map-marked-alt" title="Alamat & Kontak" subtitle="Data tempat tinggal" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>No. Telp / WA</Label>
                                        <Input value={data.no_tlp} onChange={e => setData('no_tlp', e.target.value)} placeholder="0812..." icon="fa-phone" />
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="user@mail.com" icon="fa-envelope" />
                                    </div>
                                </div>
                                <div>
                                    <Label>Alamat Lengkap</Label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={e => setData('alamat', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:ring-4 focus:ring-sky-500/5 focus:border-sky-500 outline-none transition-all text-sm font-bold text-slate-600 h-[88px]"
                                        placeholder="Nama Jalan, RT/RW"
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Kelurahan</Label>
                                        <Input value={data.kelurahan} onChange={e => setData('kelurahan', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Kecamatan</Label>
                                        <Input value={data.kecamatan} onChange={e => setData('kecamatan', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Kabupaten</Label>
                                        <Input value={data.kabupaten} onChange={e => setData('kabupaten', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Provinsi</Label>
                                        <Input value={data.propinsi} onChange={e => setData('propinsi', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: PEKERJAAN & ASURANSI */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white p-8">
                            <SectionHeader icon="fa-briefcase" title="Pekerjaan & Asuransi" subtitle="Profesional & penjamin" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Pekerjaan</Label>
                                        <Input value={data.pekerjaan} onChange={e => setData('pekerjaan', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Pendidikan Terakhir</Label>
                                        <Select value={data.pendidikan} onChange={e => setData('pendidikan', e.target.value)} options={[
                                            { label: '-', value: '-' },
                                            { label: 'SD', value: 'SD' },
                                            { label: 'SMP', value: 'SMP' },
                                            { label: 'SMA', value: 'SMA' },
                                            { label: 'D3', value: 'D3' },
                                            { label: 'S1', value: 'S1' },
                                            { label: 'S2', value: 'S2' },
                                            { label: 'S3', value: 'S3' },
                                        ]} />
                                    </div>
                                </div>
                                <div>
                                    <Label>No. Peserta BPJS / Asuransi</Label>
                                    <Input value={data.no_peserta} onChange={e => setData('no_peserta', e.target.value)} placeholder="000..." icon="fa-credit-card" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Agama</Label>
                                        <Select value={data.agama} onChange={e => setData('agama', e.target.value)} options={[
                                            { label: 'ISLAM', value: 'ISLAM' },
                                            { label: 'KRISTEN', value: 'KRISTEN' },
                                            { label: 'KATOLIK', value: 'KATOLIK' },
                                            { label: 'HINDU', value: 'HINDU' },
                                            { label: 'BUDHA', value: 'BUDHA' },
                                            { label: 'KONGHUCU', value: 'KONGHUCU' },
                                        ]} />
                                    </div>
                                    <div>
                                        <Label>Status Nikah</Label>
                                        <Select value={data.stts_nikah} onChange={e => setData('stts_nikah', e.target.value)} options={[
                                            { label: 'BELUM MENIKAH', value: 'BELUM MENIKAH' },
                                            { label: 'MENIKAH', value: 'MENIKAH' },
                                            { label: 'DUDA', value: 'DUDA' },
                                            { label: 'JANDA', value: 'JANDA' },
                                        ]} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: DATA SOSIAL & TAMBAHAN */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white p-8">
                            <SectionHeader icon="fa-users" title="Data Sosial & Tambahan" subtitle="Informasi pendukung" />
                            <div className="space-y-4">
                                <div>
                                    <Label>Nama Ibu Kandung</Label>
                                    <Input value={data.nm_ibu} onChange={e => setData('nm_ibu', e.target.value)} placeholder="Sesuai Akte" icon="fa-female" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Gol. Darah</Label>
                                        <Select value={data.gol_darah} onChange={e => setData('gol_darah', e.target.value)} options={[
                                            { label: '-', value: '-' },
                                            { label: 'A', value: 'A' },
                                            { label: 'B', value: 'B' },
                                            { label: 'O', value: 'O' },
                                            { label: 'AB', value: 'AB' },
                                        ]} />
                                    </div>
                                    <div>
                                        <Label>Suku / Bangsa</Label>
                                        <Input value={data.suku_bangsa} onChange={e => setData('suku_bangsa', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Bahasa Dipakai</Label>
                                        <Input value={data.bahasa_pasien} onChange={e => setData('bahasa_pasien', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Cacat Fisik</Label>
                                        <Input value={data.cacat_fisik} onChange={e => setData('cacat_fisik', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full max-w-lg py-5 bg-gradient-to-r from-sky-600 to-sky-400 text-white font-bold rounded-[24px] shadow-xl shadow-sky-100 hover:shadow-sky-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            {processing ? (
                                <i className="fas fa-circle-notch fa-spin"></i>
                            ) : (
                                <>
                                    <i className="fas fa-save"></i>
                                    <span>SIMPAN DATA PASIEN LENGKAP</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-12 p-6 bg-emerald-50 border border-emerald-100 rounded-[28px] flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-500 shadow-sm border border-blue-50">
                        <i className="fas fa-shield-check text-xl"></i>
                    </div>
                    <div>
                        <p className="font-bold text-emerald-800 uppercase tracking-widest text-xs mb-1">SIK Data Integrity & Privacy</p>
                        <p className="text-[11px] text-emerald-600 font-medium leading-relaxed">
                            Form ini telah dioptimalkan untuk standar keamanan SIK. Data identitas (NIK) akan melewati proses enkripsi asimetris sebelum disimpan.
                            Pastikan data asuransi (BPJS) diisi dengan benar untuk mempermudah integrasi V-Claim di masa mendatang.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
