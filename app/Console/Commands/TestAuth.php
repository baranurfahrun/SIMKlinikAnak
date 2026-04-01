<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UserPegawai;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use App\Helpers\SIKCrypt;
use Illuminate\Http\Request;

class TestAuth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:auth';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("Fetching first pegawai");
        $pegawai = UserPegawai::first();
        if (!$pegawai) {
            $this->error("Pegawai not found");
            return 1;
        }
        $this->info("Pegawai ID: {$pegawai->id_user}");

        $admin = Admin::find($pegawai->id_user);
        if ($admin) {
            $this->info("Wait! Found the same ID in Admin table!");
            dump($admin->toArray());
        } else {
            $this->info("ID not found in Admin table.");
        }

        // Create a dummy request and session to simulate web login
        $request = Request::create('/login', 'POST');
        $session = app('session.store');
        $request->setLaravelSession($session);
        app()->instance('request', $request);

        Auth::guard('pegawai')->login($pegawai);
        $this->info("Logged in as pegawai!");

        $this->info("Is admin checked? " . (Auth::guard('admin')->check() ? "YES" : "NO"));
        if (Auth::guard('admin')->check()) {
            $this->info("Admin User: " . Auth::guard('admin')->user()->nama);
        }

        $this->info("Is pegawai checked? " . (Auth::guard('pegawai')->check() ? "YES" : "NO"));
        if (Auth::guard('pegawai')->check()) {
            $this->info("Pegawai User: " . Auth::guard('pegawai')->user()->nama);
        }

        // What about request->user('admin')?
        $this->info("request->user('admin'): " . ($request->user('admin') ? 'YES' : 'NO'));
        
        $this->info("Admin guard name: " . Auth::guard('admin')->getName());
        $this->info("Pegawai guard name: " . Auth::guard('pegawai')->getName());
        $this->info("session content:");
        dump($session->all());

        return 0;
    }
}
