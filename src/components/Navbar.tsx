import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ParkSmart
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            تسجيل الدخول
          </Button>
          <Button variant="default" onClick={() => navigate("/auth")}>
            إنشاء حساب
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
