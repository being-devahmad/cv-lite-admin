"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTemplateById } from "@/actions/getTemplateById";
import Image from "next/image";
interface ViewUserProps {
  id: string;
}

const ViewUser: React.FC<ViewUserProps> = ({ id }) => {
  const [user, setUser] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchResumesByUserId = async (userId: string) => {
      try {
        console.log("Fetching resumes for userId:", userId);

        // Pass userId in query params
        const response = await fetch(`/api/resumes/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.error || "Unknown error");
        }

        const data = await response.json();
        setResume(data);
        console.log("Fetched resumes:", data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setError("Failed to load resumes.");
      }
    };

    if (id) {
      fetchUser();
      fetchResumesByUserId(id);
    }
  }, [id]);
  // const fetchResumes = async () => {
  //     const response = await fetch('/api/resumes');
  //     const data = await response.json();
  //     console.log('Resumes:', data);
  // };
  // fetchResumes()

  // Example usage

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }
  console.log("user", user);
  console.log("Resume", resume);
  return (
    <>
      {/* {state.success && (
          <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
              User Updated Successfully
            </h5>
            <p className="text-[#637381]">
              Congratulations! User has been updated successfully.
            </p>
          </div>
        )} */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <form>
          {/* {state.error && (
              <div
                className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {state.error}
              </div>
            )} */}
          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={user?.firstName || user?.name || ""}
                disabled
                //   onChange={}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={user?.lastName || ""}
                disabled
                //   onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2">
            {/* Email */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                disabled
                //   onChange={handleChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Role
              </label>
              <select
                name="role"
                value={user?.role || ""}
                disabled
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* <div className="p-6.5">
              <SubmitButton />
            </div> */}
        </form>
      </div>

      {resume && resume.length > 0 ? (
        <>
          <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="px-4 py-6 md:px-6 xl:px-9">
              <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
                Resumes
              </h4>
            </div>

            <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Name</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Resume Id</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Job Title</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Template Id</p>
              </div>
            </div>

            {resume.map((val: any, key: number) => (
              <div
                className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
                key={key}
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {val.name
                        ? val?.name
                        : `${val?.firstName}-${val?.lastName}-CV`}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {val.id}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {val.jobTitle}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {val.templateId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 gap-5.5 p-6.5">
        <div className="flex w-full justify-between">
          <button
            onClick={() => router.push("/users")}
            className="inline-flex items-center justify-center gap-2.5 bg-gray-500 px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Back to Users
          </button>
          <button
            onClick={() => router.push(`/users/${id}/edit`)}
            className="inline-flex items-center justify-center gap-2.5 bg-green px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Edit User
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
