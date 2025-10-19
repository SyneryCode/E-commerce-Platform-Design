import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle, Package, MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface CheckoutPageProps {
  cartItemsCount: number;
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ cartItemsCount, onNavigate }: CheckoutPageProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-[#007A3D] to-[#006432] rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <div>
            <h2 className="text-[#2A3B4D] mb-3">تم استلام طلبك بنجاح!</h2>
            <p className="text-gray-600">
              سيصلك تأكيد على بريدك الإلكتروني ورقم هاتفك قريبًا
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#007A3D]/10 to-[#D4AF37]/10 p-4 rounded-xl">
            <p className="text-sm text-[#2A3B4D]">
              📞 سنتواصل معك خلال ساعة لتأكيد الطلب والسعر النهائي
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl hover:shadow-lg transition-all"
            >
              عرض طلباتي
            </button>
            <button
              onClick={() => {
                setOrderPlaced(false);
                onNavigate('home');
              }}
              className="w-full py-3 text-[#007A3D] hover:bg-gray-50 rounded-xl transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-[#007A3D]" />
          <h1 className="text-[#2A3B4D]">إتمام الطلب</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-[#2A3B4D] mb-6 pb-4 border-b border-gray-200">معلومات التواصل</h3>
                
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <span>الاسم الكامل</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>رقم الهاتف السوري</span>
                      <span className="text-red-500">*</span>
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
                    <p className="text-xs text-gray-500 mt-1">مثال: 0912345678</p>
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>البريد الإلكتروني</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[#2A3B4D] mb-6 pb-4 border-b border-gray-200">معلومات التوصيل</h3>
                
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>العنوان الكامل</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="المحافظة، المدينة، الحي، اسم الشارع، رقم البناء..."
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>ملاحظات (اختياري)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="أي ملاحظات إضافية للتوصيل..."
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#007A3D] to-[#006432] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  تأكيد الطلب
                </button>
              </div>
            </motion.form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6"
            >
              <h3 className="text-[#2A3B4D] pb-4 border-b border-gray-200">ملخص الطلب</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد المنتجات</span>
                  <span className="text-[#2A3B4D]">{cartItemsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التوصيل</span>
                  <span className="text-[#007A3D]">مجاني</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 p-4 rounded-xl">
                <h4 className="text-[#2A3B4D] mb-2 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  طريقة الدفع
                </h4>
                <p className="text-sm text-gray-700">الدفع نقدًا عند الاستلام</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>سنتواصل معك لتأكيد الطلب</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>السعر النهائي يُحدد عند التأكيد</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">✓</span>
                  <span>توصيل آمن ومضمون</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
