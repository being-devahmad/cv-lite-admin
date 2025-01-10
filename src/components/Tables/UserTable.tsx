"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Table from "./Table";
import ButtonDefault from "../Buttons/ButtonDefault";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Users } from "@/types/user";



const UserTable = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true)

  const handleNavigateToUserDetails = (id: string) => {
    router.push(`/users/${id}`)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, [initializing]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("data->", data)
        console.log("currentUser->", user)
        // Filter out the current user
        const filteredUsers = data.filter((u: Users) => u.id !== user?.uid);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  // Delete a user by ID
  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();
      console.log("Delete response:", data);

      // Update the list of users after deletion
      setUsers((prevUsers) => prevUsers.filter((user: any) => user.id !== id));
      showNotification()

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to delete user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    {
      key: "user",
      header: "User",
      render: (user: Users) => (
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <Image
              src={
                user.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={`${user.name || `${user.firstName} ${user.lastName}`}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h5 className="text-dark dark:text-white">
              {user.name || `${user.firstName} ${user.lastName}`}
            </h5>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "location",
      header: "Location",
      render: (user: Users) => (
        <p className="text-dark dark:text-white">
          {user.city && user.country ? `${user.city}, ${user.country}` : "N/A"}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: Users) => (
        <div className="flex items-center justify-end space-x-3.5">
          <button className="hover:text-primary" aria-label="View item"
            onClick={() => handleNavigateToUserDetails(user.id)}>
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99935 6.87492C8.27346 6.87492 6.87435 8.27403 6.87435 9.99992C6.87435 11.7258 8.27346 13.1249 9.99935 13.1249C11.7252 13.1249 13.1243 11.7258 13.1243 9.99992C13.1243 8.27403 11.7252 6.87492 9.99935 6.87492ZM8.12435 9.99992C8.12435 8.96438 8.96382 8.12492 9.99935 8.12492C11.0349 8.12492 11.8743 8.96438 11.8743 9.99992C11.8743 11.0355 11.0349 11.8749 9.99935 11.8749C8.96382 11.8749 8.12435 11.0355 8.12435 9.99992Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99935 2.70825C6.23757 2.70825 3.70376 4.96175 2.23315 6.8723L2.20663 6.90675C1.87405 7.3387 1.56773 7.73652 1.35992 8.20692C1.13739 8.71064 1.04102 9.25966 1.04102 9.99992C1.04102 10.7402 1.13739 11.2892 1.35992 11.7929C1.56773 12.2633 1.87405 12.6611 2.20664 13.0931L2.23316 13.1275C3.70376 15.0381 6.23757 17.2916 9.99935 17.2916C13.7611 17.2916 16.2949 15.0381 17.7655 13.1275L17.792 13.0931C18.1246 12.6612 18.431 12.2633 18.6388 11.7929C18.8613 11.2892 18.9577 10.7402 18.9577 9.99992C18.9577 9.25966 18.8613 8.71064 18.6388 8.20692C18.431 7.73651 18.1246 7.33868 17.792 6.90673L17.7655 6.8723C16.2949 4.96175 13.7611 2.70825 9.99935 2.70825ZM3.2237 7.63475C4.58155 5.87068 6.79132 3.95825 9.99935 3.95825C13.2074 3.95825 15.4172 5.87068 16.775 7.63475C17.1405 8.10958 17.3546 8.3933 17.4954 8.71204C17.627 9.00993 17.7077 9.37403 17.7077 9.99992C17.7077 10.6258 17.627 10.9899 17.4954 11.2878C17.3546 11.6065 17.1405 11.8903 16.775 12.3651C15.4172 14.1292 13.2074 16.0416 9.99935 16.0416C6.79132 16.0416 4.58155 14.1292 3.2237 12.3651C2.85821 11.8903 2.64413 11.6065 2.50332 11.2878C2.37171 10.9899 2.29102 10.6258 2.29102 9.99992C2.29102 9.37403 2.37171 9.00993 2.50332 8.71204C2.64413 8.3933 2.85821 8.10958 3.2237 7.63475Z"
                fill=""
              />
            </svg>
          </button>
          <Link
            href={`/users/${user?.id}/edit`}
            className="hover:text-primary"
            aria-label="Edit item"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
                fill=""
              />
              <path
                d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
                fill=""
              />
            </svg>
          </Link>
          <button
            onClick={() => deleteUser(user?.id)}
            className="hover:text-primary"
            aria-label="Delete item"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  const showNotification = () => {
    setIsVisible(true); // Notification show karein
    setTimeout(() => {
      setIsVisible(false); // 3 seconds baad hide karein
      // router.push("/users");
    }, 3000);

  };
  if (isLoading) {
    return <div className="py-4 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

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
              User Deleted Successfully
            </h5>
            <p className="text-[#637381]">
              Congratulations! User Has Been Deleted Successfully.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <div className="flex items-center justify-between">
            <ButtonDefault
              label="Create User"
              link="/users/create"
              customClasses="bg-green text-white py-[11px] px-6"
            >
              <PlusCircle className="h-4 w-4" />
            </ButtonDefault>
          </div>
        </div>

        <Table data={users} columns={columns} />
      </div>
    </>
  );
};

export default UserTable;
