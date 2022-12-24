import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "@state/index";
import { IProject } from "types";
import SidebarContent from "./components/SidebarContent";

const Contract = () => {
  const projectList = useSelector(
    (state: AppState) => state.projectReducer.projects
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject: IProject = projectList[currentIndex];

  useEffect(() => {
    router.push("/contracts/" + currentProject.contractAddress);
  }, [currentIndex]);

  const router = useRouter();
  const handleCurrent = (index: number) => {
    setCurrentIndex(index);
  };

  const { address } = router.query;

  return (
    <div>
      <h1>Contract {address}</h1>
      <div className="flex mt-3">
        <div className="p-2 mr-6 border ">
          {projectList.map((project: IProject, index: number) => (
            <div
              onClick={() => handleCurrent(index)}
              className="mb-3 cursor-pointer "
              key={project.contractAddress}
            >
              {project.title}
            </div>
          ))}
        </div>
        <div>
          <SidebarContent project={currentProject} />
        </div>
      </div>
    </div>
  );
};

export default Contract;
