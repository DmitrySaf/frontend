import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Home, Plus, Search } from "lucide-react";

export default function MainSidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-6">
        &#x267F;
      </div>

      {/* Add Project Button */}
      <Button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl mb-6 p-0">
        <Plus className="w-5 h-5 text-white" />
      </Button>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4">
        <Button variant="ghost" className="w-10 h-10 rounded-xl p-0">
          <Home className="w-5 h-5 text-gray-600" />
        </Button>

        <Button variant="ghost" className="w-10 h-10 rounded-xl p-0">
          <Search className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* User Avatar */}
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-lg">🐼</span>
      </div>
    </div>
  );
}
