'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = React.useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  React.useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement Supabase password reset
      // await supabase.auth.updateUser({
      //   password: password
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;
  const getStrengthColor = () => {
    if (strengthScore <= 2) return 'bg-error';
    if (strengthScore <= 3) return 'bg-warning';
    return 'bg-success';
  };

  if (success) {
    return (
      <Container size="sm">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
              Password Reset Successfully!
            </h1>
            <p className="text-body-md text-muted-foreground mb-8">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <div className="space-y-3">
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button variant="ghost" size="lg" className="w-full" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="sm">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="font-serif font-bold text-heading-lg text-foreground mb-2">
              Reset Your Password
            </h1>
            <p className="text-body-md text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error text-error text-body-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {password && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-label-sm mb-2">
                    <span className="text-muted-foreground">Password Strength:</span>
                    <span
                      className={`font-medium ${
                        strengthScore <= 2
                          ? 'text-error'
                          : strengthScore <= 3
                          ? 'text-warning'
                          : 'text-success'
                      }`}
                    >
                      {strengthScore <= 2 ? 'Weak' : strengthScore <= 3 ? 'Fair' : 'Strong'}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < strengthScore ? getStrengthColor() : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <ul className="space-y-1 text-label-xs">
                    <li
                      className={
                        passwordStrength.hasMinLength ? 'text-success' : 'text-muted-foreground'
                      }
                    >
                      ✓ At least 8 characters
                    </li>
                    <li
                      className={
                        passwordStrength.hasUpperCase ? 'text-success' : 'text-muted-foreground'
                      }
                    >
                      ✓ One uppercase letter
                    </li>
                    <li
                      className={
                        passwordStrength.hasLowerCase ? 'text-success' : 'text-muted-foreground'
                      }
                    >
                      ✓ One lowercase letter
                    </li>
                    <li
                      className={
                        passwordStrength.hasNumber ? 'text-success' : 'text-muted-foreground'
                      }
                    >
                      ✓ One number
                    </li>
                    <li
                      className={
                        passwordStrength.hasSpecialChar ? 'text-success' : 'text-muted-foreground'
                      }
                    >
                      ✓ One special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              Reset Password
            </Button>

            <div className="text-center">
              <p className="text-body-sm text-muted-foreground">
                Remember your password?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-heading-xs mb-3">Security Tips</h3>
          <ul className="space-y-2 text-body-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Use a unique password you don't use for other websites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Consider using a password manager to generate and store secure passwords</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-0.5">•</span>
              <span>Never share your password with anyone</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}
