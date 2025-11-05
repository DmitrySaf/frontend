"use client";

import { useCreateProjectMutation, useProjectsQuery } from "@/entities/project";
import { Button } from "@/shared/components";
import { ProjectCreateModal, type CreateProjectData } from "@/widgets/project-create-modal";
import { MessageCircleMore, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useCallback } from "react";
import ProfileButton from "./ProfileButton";

export default function MainSidebar() {
  const { data: projects, isLoading, error } = useProjectsQuery();
  
  const [createParam, setCreateParam] = useQueryState("create");
  const isCreateModalOpen = createParam === "project";

  const createProject = useCreateProjectMutation();

  const handleCloseCreateModal = useCallback(() => {
    setCreateParam(null);
  }, [setCreateParam]);

  const handleCreateProject = useCallback(
    async (data: CreateProjectData) => {
      await createProject.mutateAsync(data);
    },
    [createProject]
  );

  return (
    <>
      <ProjectCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateProject}
      />
      <div className="w-15 flex flex-col">
        <div className="flex-1 flex flex-col gap-3 w-12 self-center">
          <Image src="/logo.svg" alt="VK" width={48} height={48} />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Button
                theme="ghost"
                size="l"
                Icon={MessageCircleMore}
              />
              <Button
                theme="ghost"
                size="l"
                Icon={Search}
              />
            </div>
            {projects?.map((project) => (<div key={project.name} className="bg-white w-12 h-12 rounded-xl flex items-center justify-center">🐼</div>))}
            <Button
              theme="primary"
              size="l"
              Icon={Plus}
              onClick={() => setCreateParam("project")}
            />
          </div>
        </div>
        
        <ProfileButton />
      </div>
    </>
  );
}
