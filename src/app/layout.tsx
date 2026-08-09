import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PlateScreen — Singapore food screener',
  description: 'Screen Singapore food by macros, price, protein-per-dollar, diet tags, and location — like a stock screener, for meals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
