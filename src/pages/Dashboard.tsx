import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ParkingMap from "@/components/ParkingMap";
import { MapPin, Clock, Star, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ParkSmart
            </span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <CardDescription>الحجوزات النشطة</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="pb-3">
                <CardDescription>الوقت المتبقي</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  2:45
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardHeader className="pb-3">
                <CardDescription>النقاط المكتسبة</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Star className="h-6 w-6 text-accent" />
                  245
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>الخريطة التفاعلية</CardTitle>
                <CardDescription>
                  اختر موقف السيارات المناسب لك
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-100px)]">
                <ParkingMap />
              </CardContent>
            </Card>
          </div>

          {/* Nearby Parking */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle>مواقف قريبة منك</CardTitle>
                <CardDescription>الأكثر توفراً</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-3">
                {[
                  { name: "موقف سيتي مول", distance: "0.5 كم", available: 45, total: 100, price: "0.5 د.أ/ساعة" },
                  { name: "موقف عبدون مول", distance: "0.8 كم", available: 12, total: 80, price: "1 د.أ/ساعة" },
                  { name: "موقف مكة مول", distance: "1.2 كم", available: 67, total: 120, price: "0.75 د.أ/ساعة" },
                  { name: "موقف تاج مول", distance: "1.5 كم", available: 89, total: 150, price: "0.5 د.أ/ساعة" },
                  { name: "موقف جاليريا مول", distance: "2.1 كم", available: 23, total: 90, price: "0.8 د.أ/ساعة" },
                ].map((parking, index) => {
                  const availability = (parking.available / parking.total) * 100;
                  const statusColor = availability > 50 ? "text-secondary" : availability > 20 ? "text-yellow-600" : "text-destructive";
                  
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{parking.name}</h4>
                            <p className="text-sm text-muted-foreground">{parking.distance}</p>
                          </div>
                          <span className={`font-bold ${statusColor}`}>
                            {parking.available}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                          <span>متاح من {parking.total}</span>
                          <span className="font-semibold text-foreground">{parking.price}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full ${availability > 50 ? "bg-secondary" : availability > 20 ? "bg-yellow-600" : "bg-destructive"} transition-all`}
                            style={{ width: `${availability}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
