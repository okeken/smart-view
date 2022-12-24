import { IProject } from "types";
import { Tabs, Button, Tooltip } from "flowbite-react";
import ArrowDown from "@components/Icons/arrowDown";
import useProject from "hooks/useProject";
import { useState } from "react";

interface IProps {
  project: IProject;
}

const inputsArr = (arr: any) => {
  const mapped = arr.map((items: any) => `${items?.type} ${items?.name}`);
  return mapped.join(", ");
};
const SidebarContent = ({ project }: IProps) => {
  const { viewData, data, writeData, writeInfo } = useProject({
    abi: project?.abi,
    address: project?.contractAddress,
  });

  const response = (array: any[], index: number) => {
    return String(array[index]?.data ?? "");
  };

  const [userInput, setUserInput] = useState({});

  const handleChange = (e: any) => {
    setUserInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getArgs = (item: string) => {
    if (!item) return;
    const type = item;
    // type as keyof typeof userInput
    const sub = userInput[type as keyof typeof userInput] as string;
    const arr = sub?.trim()?.split(",");
    return arr;
  };

  const _view = project?.abi
    ?.filter((pro: any) => pro.stateMutability == "view")
    ?.map((item: any, index: number) => (
      <>
        <div
          className="grid items-center grid-cols-12 gap-10 mb-4 "
          key={index}
        >
          <div className="col-span-3 col-start-1 ">
            <Button
              className="w-full capitalize "
              onClick={() =>
                viewData({
                  funcName: item.name,
                  index,
                  ...(getArgs(item.name) && {
                    args: getArgs(item.name),
                  }),
                })
              }
            >
              {item?.name}
            </Button>
          </div>
          <div className="col-start-4 col-end-12">
            <input
              name={item.name}
              onChange={handleChange}
              disabled={!item.inputs.length}
              className="w-full p-2 rounded-md"
              placeholder={
                item.inputs.length
                  ? inputsArr(item.inputs)
                  : response(data, index)
              }
            />
            {!!item.inputs.length && response(data, index) && (
              <small>Response: {response(data, index)}</small>
            )}
          </div>
          <div
            className={`cursor-pointer ${!item.inputs.length ? "hidden" : ""}`}
          >
            {/* <ArrowDown /> */}
            {item.inputs.length ? <ArrowDown /> : null}
          </div>
        </div>
      </>
    ));
  const _write = project?.abi
    ?.filter((pro: any) => pro.stateMutability == "nonpayable")
    ?.map((item: any, index: number) => (
      <>
        <div
          className={`grid items-center grid-cols-12 gap-10 mb-4 ${
            item.type == `constructor` && `hidden`
          }`}
          key={index}
        >
          <div className="col-span-3 col-start-1 ">
            <Button
              className="w-full capitalize "
              onClick={() =>
                writeData({
                  funcName: item.name,
                  index,
                  ...(getArgs(item.name) && {
                    args: getArgs(item.name),
                  }),
                })
              }
            >
              {item?.name}
            </Button>
          </div>
          <div className="col-start-4 col-end-12">
            <input
              name={item.name}
              onChange={handleChange}
              disabled={!item.inputs.length}
              className="w-full p-2 rounded-md"
              placeholder={
                item.inputs.length
                  ? inputsArr(item.inputs)
                  : response(data, index)
              }
            />
            {/* {!!item.inputs.length && response(data, index) && (
              <small>Response: {response(data, index)}</small>
            )} */}
          </div>
          <div
            className={`cursor-pointer ${!item.inputs.length ? "hidden" : ""}`}
          >
            {/* <ArrowDown /> */}
            {item.inputs.length ? <ArrowDown /> : null}
          </div>
        </div>
      </>
    ));

  return (
    <div>
      <div className="flex">
        <Tabs.Group aria-label="Tabs with icons" style="underline">
          <Tabs.Item title="View Functions">{_view}</Tabs.Item>
          <Tabs.Item title="Write Functions">{_write}</Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default SidebarContent;
