import ProjectOverviewPage from "@/components/projects/ProjectOverviewPage";
import LayoutApp from "@/components/layout/LayoutApp";
import LayoutWrapperTeam from "@/components/layout/LayoutWrapperTeam";

export default function FormOverview({}) {
  return (
    <LayoutApp>
      <LayoutWrapperTeam>
        <ProjectOverviewPage />
      </LayoutWrapperTeam>
    </LayoutApp>
  );
}
