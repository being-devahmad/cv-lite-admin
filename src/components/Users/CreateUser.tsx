"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/actions/createUser";

const initialState = {
  success: false,
  error: '',
  message: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2.5 bg-green px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-50 lg:px-8 xl:px-10"
    >
      {pending ? "Creating..." : "Create"}
    </button>
  );
}

const CreateNewUser = () => {
  const router = useRouter();
  // const { toast } = useToast()
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const showNotification = () => {
    setIsVisible(true); // Notification show karein
    setTimeout(() => {
      setIsVisible(false); // 3 seconds baad hide karein
      router.push("/users");
    }, 3000);
    
  };
  const [state, formAction] = useFormState(createUser, initialState);

  useEffect(() => {
    if (state.success) {
      showNotification();
      
    }
  }, [state.success, router , showNotification]);

  return (
    <>
      {isVisible && (
        <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5.5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-green">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                fill="white"
                stroke="white"
              />
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
              User Created Successfully
            </h5>
            <p className="text-[#637381]">
              Congratulations! New User Has Been Created Successfully.
            </p>
          </div>
        </div>
      )}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <form action={formAction}>
          {state.error && (
            <div
              className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {state.error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2 ">
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstName"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
              />
            </div>

            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastName"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2 ">
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter user email"
                name="email"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
              />
            </div>

            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter user password"
                name="password"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2 ">
            <div>
              <div className="mb-4.5">
                <label className="mb-3 block text-body-sm text-dark dark:text-white">
                  Role
                </label>

                <div className="relative z-20 bg-transparent dark:bg-dark-2">
                  <select
                    value={selectedOption}
                    name="role"
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${
                      isOptionSelected ? "text-dark dark:text-white" : ""
                    }`}
                  >
                    <option value="" disabled className="text-dark-6">
                      Select user role
                    </option>
                    <option value="user" className="text-dark-6">
                      User
                    </option>
                    <option value="admin" className="text-dark-6">
                      Admin
                    </option>
                    {/* <option value="Canada" className="text-dark-6">
            Canada
          </option> */}
                  </select>

                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
                        fill=""
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5.5 p-6.5">
            <div className="w-full">
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNewUser;
