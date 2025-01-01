'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getTemplateById } from '@/actions/getTemplateById'

interface ViewUserProps {
    id: string;
}

const ViewUser: React.FC<ViewUserProps> = ({ id }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
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
      
          fetchUser();
        }, [id]);
    // const fetchResumes = async () => {
    //     const response = await fetch('/api/resumes');
    //     const data = await response.json();
    //     console.log('Resumes:', data);
    // };
    // fetchResumes()
    const fetchResumesByUserId = async (userId) => {
        try {
          const response = await fetch(`/api/resumes/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch resumes');
          }
          const resumes = await response.json();
          console.log('User Resumes:', resumes);
        } catch (error) {
          console.error('Error fetching resumes:', error);
        }
      };
      
      // Example usage
      fetchResumesByUserId(id);
      
    if (!user) {
        return <div className="text-center p-6">Loading...</div>
    }
console.log("user",user)
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
          <form >
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
      </>
    )
}

export default ViewUser

