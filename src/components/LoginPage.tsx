import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone, Lock, User as UserIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Logo } from "./Logo";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: formData.name || formData.email, isLoggedIn: true });
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007A3D]/5 via-white to-[#D4AF37]/5 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-[#2A3B4D] mb-2">
            {isRegister ? 'إنشاء حساب جديد' : 'مرحبًا بعودتك'}
          </h2>
          <p className="text-gray-600">
            {isRegister ? 'انضم إلى عائلة سوقنا' : 'سجل دخولك للمتابعة'}
          </p>
        </div>

        <motion.form
          layout
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-xl space-y-5"
        >
          {isRegister && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <UserIcon className="w-4 h-4" />
                <span>الاسم الكامل</span>
              </Label>
              <Input
                id="name"
                required={isRegister}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك الكامل"
              />
            </motion.div>
          )}

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4" />
              <span>رقم الهاتف السوري</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="09xxxxxxxx"
                className="flex-1"
                pattern="09[0-9]{8}"
              />
              <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center text-gray-600">
                +963
              </div>
            </div>
          </div>

          {isRegister && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                <span>البريد الإلكتروني</span>
              </Label>
              <Input
                id="email"
                type="email"
                required={isRegister}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </motion.div>
          )}

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              <span>كلمة المرور</span>
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isRegister ? 'إنشاء الحساب' : 'تسجيل الدخول'}
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#007A3D] hover:underline"
            >
              {isRegister ? 'لديك حساب؟ سجل دخولك' : 'ليس لديك حساب؟ سجل الآن'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            تصفح كضيف
          </button>
        </motion.form>

        {isRegister && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-gray-500 mt-6 px-4"
          >
            بإنشاء حساب، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
