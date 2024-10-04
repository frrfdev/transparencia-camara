'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { VotingSessions } from './voting-session';

export const ProjectSearch = () => {
  const [projectId, setProjectId] = useState('');

  return (
    <div>
      <Input
        placeholder="Enter project ID..."
        onChange={(e) => setProjectId(e.target.value)}
        value={projectId}
      />

      <VotingSessions projectId={projectId} />
    </div>
  );
};
