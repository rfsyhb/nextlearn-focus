'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector?: string; // CSS selector mount point, defult 'body'
}

export default function Portal({ children, selector = 'body' }: PortalProps) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(selector);
    setMountNode(node);
  }, [selector]);

  if (!mountNode) return null;
  return createPortal(children, mountNode);
}
