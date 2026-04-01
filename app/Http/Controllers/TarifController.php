<?php

namespace App\Http\Controllers;

use App\Models\TarifTindakan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TarifController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/TarifTindakan', [
            'tarif_tindakan' => TarifTindakan::orderBy('nama_tindakan', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_tindakan' => 'required|string|max:100',
            'tarif' => 'required|numeric|min:0',
        ]);

        TarifTindakan::create($request->all());

        return redirect()->back()->with('success', 'Tarif tindakan berhasil ditambahkan! 🎉');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_tindakan' => 'required|string|max:100',
            'tarif' => 'required|numeric|min:0',
        ]);

        $tarif = TarifTindakan::findOrFail($id);
        $tarif->update($request->all());

        return redirect()->back()->with('success', 'Tarif tindakan berhasil diperbarui! 🎉');
    }

    public function destroy($id)
    {
        $tarif = TarifTindakan::findOrFail($id);
        $tarif->delete();

        return redirect()->back()->with('success', 'Tarif tindakan berhasil dihapus! 🎉');
    }
}
