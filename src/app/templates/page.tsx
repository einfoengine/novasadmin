'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TableBuilder from '@/components/TableBuilder'
import { DocumentIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  template_name: string
  creation_date: string
  editing_date: string
  total_cost: number
}

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'status' | 'link' | 'custom' | 'image';
  format?: (value: unknown) => string;
  render?: <T>(item: T) => React.ReactNode;
  className?: string;
  linkHref?: (value: unknown) => string;
}

export default function Page() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/data/templates.json')
        const data = await response.json()
        setTemplates(data.templates)
      } catch (error) {
        console.error('Error fetching templates:', error)
      }
    }

    fetchTemplates()
  }, [])

  const columns: Column[] = [
    {
      key: 'template_name',
      label: 'Template Name',
      type: 'text',
      className: 'font-medium'
    },
    {
      key: 'creation_date',
      label: 'Creation Date',
      type: 'date'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status'  // Or use `render` to customize badges
    },
    {
      key: 'total_cost',
      label: 'Total Cost',
      type: 'currency'
    },
  ];
  

  const handleRowClick = (template: Template) => {
    router.push(`/templates/${template.id}`)
  }

  const handleEdit = (store: Template) => {
    router.push(`/stores/${store.id}/edit`);
  };

  return (
    <div className="p-6">
      <TableBuilder
        data={templates}
        columns={columns}
        title="Templates"
        icon={<DocumentIcon className="h-6 w-6" />}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        searchable
        selectable
        actionButton={{
          label: 'Create Template',
          href: '/templates/create',
        }}
      />
    </div>
  )
}