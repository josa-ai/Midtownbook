import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { SettingsContent } from './settings-content';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your business settings and account',
};

export default function SettingsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <SettingsContent />
      </main>
    </>
  );
}
