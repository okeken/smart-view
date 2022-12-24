import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "@components/commons/deleteModal";
import { IProject } from "types";
import { deleteProject as deleteProjActions } from "@views/contracts/state";
import { AppState } from "@state/index";
import { chainObject } from "@config/chains";
import Button from "@components/commons/buttons";

interface IProjectDash {
  setShowCreateModal: (show: boolean) => void;
}
const ProjectDash = ({ setShowCreateModal }: IProjectDash) => {
  const { asPath } = useRouter();
  const projectList = useSelector(
    (state: AppState) => state.projectReducer.projects
  );
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = useState<string>("");

  const showDeleteModal = (pro: IProject) => {
    setShowModal(true);
    setCurrentAddress(pro.contractAddress);
  };
  const hideDeleteModal = () => {
    setShowModal(false);
    setCurrentAddress("");
  };

  const deleteProject = () => {
    // delete project
    dispatch(deleteProjActions(currentAddress));
    hideDeleteModal();
  };

  return (
    <>
      <DeleteModal
        show={showModal}
        onHide={hideDeleteModal}
        onClick={deleteProject}
        message="Are you sure you want to delete this project?"
      />

      <div className="relative mt-10 overflow-x-auto">
        {projectList.length ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Network
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contract Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project: IProject) => (
                  <tr
                    key={project.contractAddress}
                    className="bg-white dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{project.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">
                            {chainObject?.[project.chainId]?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">
                            {project.contractAddress}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <Link
                            className="px-2 py-1 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500"
                            href={`/${asPath}/${project.contractAddress}`}
                          >
                            View
                          </Link>
                        </div>
                        <div>
                          <button
                            onClick={() => showDeleteModal(project)}
                            className="px-2 py-1 font-semibold text-white bg-red-600 rounded hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="flex justify-center ">
            <div>
              <p className="mb-8 text-2xl">No Projects Found</p>
              <Button
                className="flex items-center justify-center text-xl"
                onClick={() => setShowCreateModal(true)}
                type="button"
              >
                Add new project
                <span className="ml-2 text-2xl">+</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDash;

// <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white opacity-75">
//             <div className="flex flex-col items-center justify-center text-center">
//                 <svg className="w-12 h-12 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                 </svg>
//                 <p className="mt-2 text-sm font-medium text-gray-500">Loading...</p>
//             </div>
//         </div>
