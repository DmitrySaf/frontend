import { Button } from "@/shared/components";
import { Bell, HelpCircle, Search } from "lucide-react";

interface ProjectHeaderProps {
  slug: string;
}

export default function ProjectHeader({ slug }: ProjectHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="rounded-xl">
            ←
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              ⌘K
            </span>
          </div>

          <Button variant="ghost" size="sm" className="rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="sm" className="rounded-xl">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
