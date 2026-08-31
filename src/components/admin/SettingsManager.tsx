import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const SettingsManager = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      showError("Harap isi semua kolom kata sandi");
      return;
    }

    if (newPassword.length < 6) {
      showError("Kata sandi minimal harus 6 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Konfirmasi kata sandi tidak cocok");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      showSuccess("Kata sandi berhasil diperbarui");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      showError("Gagal memperbarui kata sandi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-800">Keamanan Akun</CardTitle>
              <CardDescription>Perbarui kata sandi akses panel admin Anda</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Kata Sandi Baru</label>
                <div className="relative">
                  <Input
                    type={showPwd ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Konfirmasi Kata Sandi Baru</label>
                <Input
                  type={showPwd ? "text" : "password"}
                  placeholder="Ulangi kata sandi baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto bg-[#4834d4] hover:bg-[#341f97] text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#4834d4]/20"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" size={18} />
                ) : (
                  <Lock className="mr-2" size={18} />
                )}
                SIMPAN KATA SANDI BARU
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
        <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Saran Keamanan:</strong> Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol untuk membuat kata sandi yang lebih kuat. Hindari menggunakan informasi yang mudah ditebak seperti tanggal lahir.
        </p>
      </div>
    </div>
  );
};

export default SettingsManager;