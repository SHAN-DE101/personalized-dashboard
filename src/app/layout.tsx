import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/components/StoreProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'OmniDash - Personalized Content Dashboard',
  description: 'Track news, recommendations, and social updates in a dynamic unified feed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="p-6 md:p-8 max-w-5xl mx-auto w-full">{children}</main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
