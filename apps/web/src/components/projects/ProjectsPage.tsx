"use client";

import ProjectsList from "@/components/projects/ProjectsList";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProjects } from "@/lib/projects";
import { useTeam } from "@/lib/teams";
import { useRouter } from "next/router";

export default function ProjectsPage({}) {
  const router = useRouter();
  const { isLoadingProjects, isErrorProjects } = useProjects(router.query.teamId?.toString());
  const { team, isLoadingTeam, isErrorTeam } = useTeam(router.query.teamId?.toString());

  if (isLoadingProjects || isLoadingTeam) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorProjects || isErrorTeam) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }
  return (
    <div className="mx-auto py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Projects
          <span className="text-brand-dark ml-4 inline-flex items-center rounded-md border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-sm font-medium">
            {team.name}
          </span>
        </h1>
      </header>
      <ProjectsList teamId={router.query.teamId} />
    </div>
  );
}
