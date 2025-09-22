'use client'

import { Button } from "@/shared/components";
import { Bell, HelpCircle, Home, Plus, Search } from "lucide-react";
import { useQueryState } from "nuqs";

export default function MainSidebar() {
  const [, setCreateParam] = useQueryState('create')

  const handleCreateProject = () => {
    setCreateParam('project')
  }

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-6">
        &#x267F;
      </div>

      {/* Add Project Button */}
      <Button 
        theme="primary"
        size="m"
        Icon={Plus}
        onClick={handleCreateProject}
        className="mb-6"
      />

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4">
        <Button theme="ghost" size="m" Icon={Home} />

        <Button theme="ghost" size="m" Icon={Search} />
      </div>

      {/* User Avatar */}
      <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-lg">🐼</span>
      </div>
    </div>
  );
}
