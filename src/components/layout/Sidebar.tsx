import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UserRound,
  Building2,
  Stethoscope,
  Link as LinkIcon,
  Smartphone,
  Settings,
  MailOpen,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: UserRound, label: "Doctors", path: "/dashboard/doctors" },
  { icon: Building2, label: "Brands", path: "/dashboard/brands" },
  {
    icon: Stethoscope,
    label: "Specializations",
    path: "/dashboard/specializations",
  },
  {
    icon: LinkIcon,
    label: "Registration Links",
    path: "/dashboard/registration",
  },
  { icon: MailOpen, label: "Invitation", path: "/dashboard/invitation" },
  { icon: Smartphone, label: "APK Links", path: "/dashboard/apk-links" },
  { icon: Settings, label: "Admin Profile", path: "/dashboard/profile" },
];


interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-0 translate-x-full md:translate-x-0 hidden"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={
                    location.pathname === item.path ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <Button
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
            variant="ghost"
            className="w-full justify-start hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
