import ProjectsPage from "@/components/projects/ProjectsPage";
import LayoutApp from "@/components/layout/LayoutApp";
import LayoutWrapperTeam from "@/components/layout/LayoutWrapperTeam";

export default function TeamFormsPage({}) {
  return (
    <LayoutApp>
      <LayoutWrapperTeam>
        <ProjectsPage />
      </LayoutWrapperTeam>
    </LayoutApp>
  );
}
