import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { MapPin, Clock, Shield, Zap, Navigation, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">🚀 الحل الأذكى لمواقف السيارات</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              اعثر على موقف سيارتك{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                في ثوانٍ
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              تطبيق ذكي يساعدك على إيجاد أقرب موقف متاح في الوقت الفعلي. وفّر وقتك ووقودك مع ParkSmart.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                ابدأ الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => navigate("/dashboard")}
              >
                جرّب التطبيق
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <Star className="h-5 w-5 fill-secondary text-secondary" />
              </div>
              <div className="text-sm text-muted-foreground">
                أكثر من <span className="font-bold text-foreground">10,000</span> مستخدم نشط
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-3xl rounded-full" />
            <div className="relative bg-card rounded-2xl shadow-2xl p-8 border border-border">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <MapPin className="h-32 w-32 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">لماذا ParkSmart؟</h2>
          <p className="text-xl text-muted-foreground">نوفر لك أفضل تجربة لإيجاد مواقف السيارات</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "توفير الوقت",
              description: "اعثر على موقف في ثوانٍ معدودة بدلاً من البحث لساعات"
            },
            {
              icon: Navigation,
              title: "خرائط تفاعلية",
              description: "عرض فوري لجميع المواقف المتاحة حولك على الخريطة"
            },
            {
              icon: Shield,
              title: "مواقف آمنة",
              description: "جميع المواقف مراقبة ومؤمّنة على مدار الساعة"
            },
            {
              icon: Zap,
              title: "حجز سريع",
              description: "احجز موقفك مسبقاً بضغطة زر واحدة"
            },
            {
              icon: Star,
              title: "أسعار منافسة",
              description: "قارن الأسعار واختر الأفضل لميزانيتك"
            },
            {
              icon: MapPin,
              title: "تغطية واسعة",
              description: "آلاف المواقف في جميع أنحاء المدينة"
            }
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">جاهز للبدء؟</h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف المستخدمين الذين وفروا وقتهم مع ParkSmart
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8"
              onClick={() => navigate("/auth")}
            >
              إنشاء حساب مجاني
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-lg py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 ParkSmart. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
