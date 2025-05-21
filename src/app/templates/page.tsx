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

  const columns = [
    {
      key: 'template_name',
      label: 'Template Name',
      type: 'text' as const,
    },
    {
      key: 'creation_date',
      label: 'Creation Date',
      type: 'date' as const,
    },
    {
      key: 'editing_date',
      label: 'Last Edited',
      type: 'date' as const,
    },
    {
      key: 'total_cost',
      label: 'Total Cost',
      type: 'currency' as const,
    },
  ]

  const handleRowClick = (template: Template) => {
    router.push(`/templates/${template.id}`)
  }

  return (
    <div className="p-6">
      <TableBuilder
        data={templates}
        columns={columns}
        title="Templates"
        icon={<DocumentIcon className="h-6 w-6" />}
        onRowClick={handleRowClick}
        actionButton={{
          label: 'Create Template',
          href: '/templates/create',
        }}
      />
    </div>
  )
}