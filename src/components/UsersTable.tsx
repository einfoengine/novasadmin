'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/outline';
import TableBuilder from './TableBuilder';

interface User {
  userId: string;
  userName: string;
  userType: string;
  avatarUrl: string;
  joiningDate: string;
  endingDate: string;
  status: string;
  contact: string;
  address: string;
}

interface TableUser extends Omit<User, 'userId'> {
  id: string;
}

interface UsersTableProps {
  title?: string;
  icon?: React.ReactNode;
  selectable?: boolean;
  onRowClick?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  title = "Users",
  icon = <UserIcon className="h-6 w-6" />,
  selectable = false,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/data/users.json');
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Map users to the format expected by TableBuilder
  const tableUsers: TableUser[] = users.map(user => ({
    id: user.userId,
    userName: user.userName,
    userType: user.userType,
    avatarUrl: user.avatarUrl,
    joiningDate: user.joiningDate,
    endingDate: user.endingDate,
    status: user.status,
    contact: user.contact,
    address: user.address,
  }));

  const columns = [
    { 
      key: 'userName', 
      label: 'Name', 
      type: 'link' as const, 
      linkHref: (value: unknown) => `/users/${value}`,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'userType', 
      label: 'Role', 
      type: 'status' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'contact', 
      label: 'Contact',
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'joiningDate', 
      label: 'Joining Date', 
      type: 'date' as const,
      className: 'text-gray-900 dark:text-white'
    },
    { 
      key: 'endingDate', 
      label: 'Ending Date', 
      type: 'date' as const,
      className: 'text-gray-900 dark:text-white'
    },
  ];

  const handleRowClick = (tableUser: TableUser) => {
    const user = users.find(u => u.userId === tableUser.id);
    if (user) {
      if (onRowClick) {
        onRowClick(user);
      } else {
        router.push(`/users/${user.userId}`);
      }
    }
  };

  const handleEdit = (tableUser: TableUser) => {
    const user = users.find(u => u.userId === tableUser.id);
    if (user && onEdit) {
      onEdit(user);
    }
  };

  const handleDelete = (tableUser: TableUser) => {
    if (onDelete) {
      onDelete(tableUser.id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableBuilder
      data={tableUsers}
      columns={columns}
      title={title}
      icon={icon}
      selectable={selectable}
      onRowClick={handleRowClick}
      onEdit={onEdit ? handleEdit : undefined}
      onDelete={onDelete ? handleDelete : undefined}
      actionButton={{
        label: 'Add User',
        href: '/users/new',
      }}
    />
  );
};

export default UsersTable; 