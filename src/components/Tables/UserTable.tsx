'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import Table from "./Table";
import ButtonDefault from "../Buttons/ButtonDefault";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  avatar: string;
  city: string;
  country: string;
  email: string;
  createdAt: string;
  postalCode: string;
  role: string;
  phone: string;
  name: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (user: User) => (
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <Image
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
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
      key: 'email',
      header: 'Email',
    },
    {
      key: 'location',
      header: 'Location',
      render: (user: User) => (
        <p className="text-dark dark:text-white">
          {user.city && user.country ? `${user.city}, ${user.country}` : 'N/A'}
        </p>
      ),
    },
  ];

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <div className="flex justify-between items-center">
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
  );
};

export default UserTable;

