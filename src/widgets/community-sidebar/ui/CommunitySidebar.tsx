"use client";

import { usePathname } from "next/navigation";
import { Tab } from "@/shared/components";
import { MAIN_TABS, SIDEBAR_SECTIONS } from "../model";
import CollapsibleSection from "./CollapsibleSection";
import CommunityBanner from "./CommunityBanner";

interface CommunitySidebarProps {
  slug: string;
}

export default function CommunitySidebar({ slug }: CommunitySidebarProps) {
  const pathname = usePathname();

  // Mock data - some communities have preview, some don't
  const hasPreview = slug === "profound-university"; // Example condition
  const mockPreviewUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop";

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Community Banner */}
      <CommunityBanner
        name="ProFound University"
        description="Only the elite allowed."
        previewUrl={hasPreview ? mockPreviewUrl : undefined}
      />

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Main Tabs (not in groups) */}
          <nav className="space-y-1">
            {MAIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const href = `/communities/${slug}${tab.path}`;
              const isActive = pathname === href;

              return (
                <Tab
                  key={tab.id}
                  text={tab.name}
                  isActive={isActive}
                  href={href}
                  Icon={Icon}
                />
              );
            })}
          </nav>

          {/* Collapsible Sections */}
          {SIDEBAR_SECTIONS.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              icon={section.icon}
            >
              <nav className="space-y-1">
                {section.tabs.map((tab) => {
                  const Icon = tab.icon;
                  const href = `/communities/${slug}${tab.path}`;
                  const isActive = pathname === href;

                  return (
                    <Tab
                      key={tab.id}
                      text={tab.name}
                      isActive={isActive}
                      href={href}
                      Icon={Icon}
                    />
                  );
                })}
              </nav>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  );
}
