import ProjectDash from "@pages/contracts/components/ProjectDash";
import { useState } from "react";
import Button from "@components/commons/buttons";
import CreateProjectModal from "@pages/contracts/components/createProject";

const Contracts = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <CreateProjectModal showModal={showModal} setShowModal={setShowModal} />
      <div className="">
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="text-2xl">Contracts List</h1>
          </div>
          <div>
            <Button type="button" onClick={() => setShowModal(true)}>
              Contract +
            </Button>
          </div>
        </div>
        <ProjectDash setShowCreateModal={setShowModal} />
      </div>
    </div>
  );
};

export default Contracts;
