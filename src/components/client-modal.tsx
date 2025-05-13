'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ClientModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (client: {
    name: string;
    email: string;
    phone: string;
    users: {
      marketingDirector: boolean;
      countryManager: boolean;
      storeManager: boolean;
    };
  }) => void;
  initialData?: {
    name: string;
    email: string;
    phone: string;
    users: {
      marketingDirector: boolean;
      countryManager: boolean;
      storeManager: boolean;
    };
  };
}

export default function ClientModal({ show, onClose, onSubmit, initialData }: ClientModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      users: {
        marketingDirector: formData.get('marketingDirector') === 'on',
        countryManager: formData.get('countryManager') === 'on',
        storeManager: formData.get('storeManager') === 'on',
      },
    });
    
    onClose();
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {initialData ? 'Edit Client' : 'Add New Client'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Client Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={initialData?.name}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={initialData?.email}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          defaultValue={initialData?.phone}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700">User Roles</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="marketingDirector"
                              id="marketingDirector"
                              defaultChecked={initialData?.users.marketingDirector}
                              className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                            />
                            <label htmlFor="marketingDirector" className="ml-2 block text-sm text-gray-700">
                              Marketing Director
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="countryManager"
                              id="countryManager"
                              defaultChecked={initialData?.users.countryManager}
                              className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                            />
                            <label htmlFor="countryManager" className="ml-2 block text-sm text-gray-700">
                              Country Manager
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="storeManager"
                              id="storeManager"
                              defaultChecked={initialData?.users.storeManager}
                              className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                            />
                            <label htmlFor="storeManager" className="ml-2 block text-sm text-gray-700">
                              Store Manager
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                        >
                          {initialData ? 'Save Changes' : 'Add Client'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 