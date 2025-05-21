'use client'

import { useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  template_name: string
  creation_date: string
  editing_date: string
  total_cost: number
}

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState<Template | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null)

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch('/data/templates.json')
        const data = await response.json()
        const foundTemplate = data.templates.find((t: Template) => t.id === params.id)
        if (foundTemplate) {
          setTemplate(foundTemplate)
          setEditedTemplate(foundTemplate)
        }
      } catch (error) {
        console.error('Error fetching template:', error)
      }
    }

    fetchTemplate()
  }, [params.id])

  const handleSave = async () => {
    // Here you would typically make an API call to update the template
    // For now, we'll just update the local state
    if (editedTemplate) {
      setTemplate(editedTemplate)
      setIsEditing(false)
    }
  }

  if (!template) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{template.template_name}</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Template Name</label>
              <input
                type="text"
                value={editedTemplate?.template_name}
                onChange={(e) =>
                  setEditedTemplate((prev) => prev ? { ...prev, template_name: e.target.value } : null)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Cost</label>
              <input
                type="number"
                value={editedTemplate?.total_cost}
                onChange={(e) =>
                  setEditedTemplate((prev) => prev ? { ...prev, total_cost: parseFloat(e.target.value) } : null)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Template ID</h3>
              <p className="mt-1">{template.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Creation Date</h3>
              <p className="mt-1">{new Date(template.creation_date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Edited</h3>
              <p className="mt-1">{new Date(template.editing_date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
              <p className="mt-1">${template.total_cost.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 