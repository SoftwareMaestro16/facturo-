import type { ReactNode } from 'react';
import { SessionBoundary } from '@/entities/session';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <SessionBoundary guestOnly>{children}</SessionBoundary>;
}
