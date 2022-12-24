import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { projectSchema, validationOpt } from "schema";
import { useForm } from "react-hook-form";
import { addProject } from "@views/contracts/state";
import Input from "../../../components/commons/Input";
import Button from "../../../components/commons/buttons";
import { useNetwork } from "wagmi";
import { useGetAbiQuery } from "@services/api";
import { useEffect } from "react";
import { smartViewApi } from "@services/api";

interface CreateProjectModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
export default function CreateProjectModal({
  showModal,
  setShowModal,
}: CreateProjectModalProps) {
  const [skip, setSkip] = useState(true);
  const validationOption = validationOpt(projectSchema);
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty, isValid },
    // @ts-ignore
  } = useForm<any>(validationOption);

  const isAddress = watch("contractAddress");
  const rawAbi = watch("abiFromApi");

  const formAbi = watch("abi");
  const {
    data: { abi = "", message } = {},
    error,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useGetAbiQuery(
    {
      address: isAddress,
      chainId: chain?.id,
    },
    {
      skip: skip || !!formAbi?.length ? true : false,
    }
  );

  const fetchAbi = () => {
    if (isError) {
      return refetch();
    }
    setSkip(false);
  };

  const validateAbi =
    !!formAbi?.length || isLoading || !isDirty || !!rawAbi?.length;

  useEffect(() => {
    if (!!formAbi?.length) {
      removeAbi();
    }
  }, [formAbi]);

  useEffect(() => {
    if (skip) return;
    if (!!formAbi?.length) return;
    setValue("abiFromApi", abi);
    trigger("abi");
  }, [abi, skip, setValue, trigger]);

  const isDisabled = !isDirty || !isValid;

  const onSubmit = async (data: any) => {
    const file = data?.abi?.[0];
    let contractData = {
      title: data.title,
      contractAddress: data.contractAddress,
      ...(file ? { abi: data.abi } : { abi: JSON.parse(data.abiFromApi) }),
      chainId: chain!.id,
    };

    async function logFile(event: any) {
      let str = event.target.result;
      let json = JSON.parse(str);
      contractData = {
        ...contractData,
        abi: json,
      };
    }

    if (rawAbi?.length == 0) {
      const reader = new FileReader();
      reader.onload = logFile;
      reader.readAsText(file);
    }

    try {
      dispatch(addProject(contractData));
      setShowModal(false);
      reset();
    } catch (e: any) {
      alert(e.message);
      console.log(e.message);
    }
  };

  const removeAbi = async () => {
    setSkip((prev) => !prev);
    dispatch(smartViewApi.util.resetApiState());
    setValue("abiFromApi", "");
    trigger("abi");
  };

  const hideModal = () => {
    setShowModal(false);
    reset();
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-gray-200/80 focus:outline-none dark:bg-gray-800/80">
            <div className="relative w-auto max-w-3xl px-6 pt-3 mx-auto my-6 bg-white border-0 rounded-lg shadow-lg outline-none dark:text-white dark:bg-gray-800 focus:outline-none">
              {/*content*/}
              <div className="relative flex flex-col w-full ">
                {/*header*/}
                <div className="flex items-start justify-between p-2 mb-6 ">
                  <h3 className="text-2xl font-semibold">Create New Project</h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none bg-transparent border-0 outline-none focus:outline-none"
                    onClick={hideModal}
                  >
                    <span className="flex items-center w-6 h-6 text-2xl bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      value={abi}
                      type="hidden"
                      {...register("abiFromApi")}
                    />
                    <Input
                      register={register}
                      currentValue={getValues("title")}
                      placeholder="Your Project title"
                      name="title"
                      required
                      label="Title"
                      errors={errors}
                    />
                  </div>
                  <div className="mb-3">
                    <Input
                      register={register}
                      currentValue={getValues("contractAddress")}
                      placeholder="Contract Address"
                      name="contractAddress"
                      required
                      label="Contract Address"
                      disabled={isLoading}
                      errors={errors}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      Contract Verified?{" "}
                      <Button
                        disabled={validateAbi}
                        type="button"
                        onClick={fetchAbi}
                      >
                        Fetch Abi
                      </Button>
                      {isSuccess ? (
                        <button
                          type="button"
                          className="ml-2"
                          onClick={removeAbi}
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {isLoading ? "Fetching..." : null}
                      {/* @ts-ignore */}
                      {isError && !isLoading ? error?.data?.message : null}
                      {isSuccess && !isLoading ? message : null}
                    </div>
                  </div>
                  <div className="mb-3">
                    <Input
                      register={register}
                      currentValue={getValues("abi")}
                      placeholder=""
                      name="abi"
                      label="Abi"
                      errors={errors}
                      className="border-transparent cursor-pointer"
                      type="file"
                      disabled={isLoading || abi?.length > 0}
                      required={abi?.length == 0}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      disabled={isDisabled}
                      type="submit"
                      className={`py-2 mb-3 text-white bg-red-500 border-transparent `}
                    >
                      Create Project
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
