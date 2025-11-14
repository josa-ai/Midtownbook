import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ForgotPasswordForm } from './forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
