'use client';

import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import ClientModal from '@/components/ClientModal';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  users: {
    marketingDirector: boolean;
    countryManager: boolean;
    storeManager: boolean;
  };
}

interface UserRole {
  role: string;
  permissions: string[];
}

const userRoles: UserRole[] = [
  {
    role: 'Marketing Director',
    permissions: [
      'Order list',
      'Create',
      'Approval from Store manager',
      'Create campaign (full access)',
      'Campaign execution checklist (Generate a report for PDF, country based / store based)',
      'Get notification upon edit request and approval'
    ]
  },
  {
    role: 'Country Manager',
    permissions: [
      'Order list',
      'Create campaign (full access)',
      'Campaign execution checklist (Generate a report for PDF, country based / store based)',
      'Get notification upon edit request and approval'
    ]
  },
  {
    role: 'Store Manager',
    permissions: [
      'Create campaign (Production order request)',
      'Add bunch of products using the products tag',
      'Campaign cost calculation',
      'Notification upon creating a campaign',
      'Create thread on the campaign order notification',
      'Edited campaign request'
    ]
  }
];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 234 567 8900',
      users: {
        marketingDirector: true,
        countryManager: true,
        storeManager: true
      }
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...clientData,
      id: `CLI${Date.now()}`
    };
    setClients([...clients, newClient]);
  };

  const handleEditClient = (clientData: Omit<Client, 'id'>) => {
    if (selectedClient) {
      setClients(clients.map(client => 
        client.id === selectedClient.id 
          ? { ...clientData, id: client.id }
          : client
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Client
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-4">
                        {userRoles.map((role) => (
                          <div key={role.role} className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">{role.role}</h3>
                            <ul className="text-sm text-gray-500 space-y-1">
                              {role.permissions.map((permission, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mr-2"></span>
                                  {permission}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setClients(clients.filter(c => c.id !== client.id));
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ClientModal
        show={showAddModal || !!selectedClient}
        onClose={() => {
          setShowAddModal(false);
          setSelectedClient(null);
        }}
        onSubmit={selectedClient ? handleEditClient : handleAddClient}
        initialData={selectedClient || undefined}
      />
    </div>
  );
}