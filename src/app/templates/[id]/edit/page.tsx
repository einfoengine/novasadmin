'use client';

import React from 'react';
import CreateTemplate from '@/components/CreateTemplate';

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  return <CreateTemplate mode="edit" templateId={params.id} />;
} 