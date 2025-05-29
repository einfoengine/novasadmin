'use client';

import React from 'react';
import CreateTemplate from '@/components/CreateTemplate';

export default function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  return <CreateTemplate mode="edit" templateId={resolvedParams.id} />;
} 