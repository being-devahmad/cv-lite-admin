"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { updateUser } from "@/actions/updateUser";

const initialState = {
  success: false,
  error: '',
  message: undefined
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  address?: string;
  avatar?: string;
  city?: string;
  country?: string;
  email: string;
  createdAt?: string;
  postalCode?: string;
  role: string;
  phone?: string;
  name?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2.5 bg-green px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-50 lg:px-8 xl:px-10"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
}

const EditNewUser = () => {
    const router = useRouter();
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const [_, formAction] = useFormState((state: any, formData: FormData) => updateUser(id as string, formData), initialState);
  
    // Fetch user data by ID
    useEffect(() => {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/users/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          console.log("user->" , user)
          setUser(data);
        } catch (err) {
          console.error("Error fetching user:", err);
          setError("Failed to load user data. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUser();
    }, [id , user]);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("userId", String(id));  // Convert id to a string before appending
  
      formAction(formData);  // Submit the form data including the userId
    };
  
    // Redirect to the user list after successful update
    useEffect(() => {
      if (_.success) {
        setTimeout(() => {
          router.push("/users");
        }, 2000);
      }
    }, [_.success, router]);
  
    // Handle input changes
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setUser((prevUser) =>
        prevUser ? { ...prevUser, [name]: value } : null
      );
    };
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <>
        {_.success && (
          <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <h5 className="mb-2 font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
              User Updated Successfully
            </h5>
            <p className="text-[#637381]">
              Congratulations! User has been updated successfully.
            </p>
          </div>
        )}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <form onSubmit={handleSubmit}>
            {_.error && (
              <div
                className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {_.error}
              </div>
            )}
            <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user?.firstName || ""}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
  
              {/* Password */}
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user?.password || ""}
                  onChange={handleChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-green active:border-green dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
              </div>
            </div>
  
            {/* Role */}
            <div className="grid grid-cols-1 gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Role
                </label>
                <select
                  name="role"
                  value={user?.role || ""}
                  onChange={handleChange}
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
  
            <div className="p-6.5">
              <SubmitButton />
            </div>
          </form>
        </div>
      </>
    );
  };

export default EditNewUser;
