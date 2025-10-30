'use client';
import { useEffect } from 'react';

export default function DevPage() {
  useEffect(() => {
    // This will throw an error as soon as the component mounts
    throw new Error('This is a test error to check the error.tsx file');
  }, []);

  return <div>This page will not be rendered.</div>;
}