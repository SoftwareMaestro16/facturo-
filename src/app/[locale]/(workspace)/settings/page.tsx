import type { Metadata } from 'next';
import { AccountView } from '@/views/account';
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function SettingsPage() {
  return <AccountView />;
}
