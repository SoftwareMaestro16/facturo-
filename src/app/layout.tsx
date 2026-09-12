import type { ReactNode } from 'react';

/// The locale layout owns <html> and <body>; this file exists only because the
/// App Router requires a root layout above the [locale] segment.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
