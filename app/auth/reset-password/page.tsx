import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ResetPasswordForm } from './reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account',
};

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
        <ResetPasswordForm />
      </main>
      <Footer />
    </>
  );
}
