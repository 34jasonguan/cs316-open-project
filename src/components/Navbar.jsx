import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  AlertCircle,
  User,
  LayoutDashboard,
  MessageSquareWarning,
  Dices,
  GraduationCap,
  ChevronDown,
  Menu,
  Search
} from "lucide-react"

const NavBar = () => {
  const [openSubbar, setOpenSubbar] = useState('');

  const toggleSubbar = (name) => {
        setOpenSubbar(prev => (prev === name ? '' : name));
  };

  return (
    <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">ResiDevils</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </a>
        <a href="/search" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
          <Search className="h-5 w-5" />
          <span>Search User</span>
        </a>
        <a href="/schedule" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
          <Calendar className="h-5 w-5" />
          <span>Schedule</span>
        </a>
        <div className="space-y-2">
          <div
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            onClick={() => toggleSubbar('reportInfo')}
          >
            <MessageSquareWarning className="h-5 w-5" />
            <span>Report</span>
            <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'reportInfo' ? 'rotate-180' : ''}`} />
          </div>
          {openSubbar === 'reportInfo' && (
            <div className="ml-8 space-y-1">
              <a href="/report" className="block px-3 py-2 rounded-lg hover:bg-white/10">Submit Report</a>
              <a href="/report_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">Report History</a>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
            onClick={() => toggleSubbar('activityInfo')}
          >
            <Dices className="h-5 w-5" />
            <span>Activity</span>
            <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'activityInfo' ? 'rotate-180' : ''}`} />
          </div>
          {openSubbar === 'activityInfo' && (
            <div className="ml-8 space-y-1">
              <a href="/proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">Proposal Form</a>
              <a href="/activity_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">Activity History</a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;