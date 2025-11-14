'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { UploadZone } from '@/components/dashboard/upload-zone';
import { Building2, CheckCircle, ArrowLeft, FileText } from 'lucide-react';

interface Business {
  id: string;
  slug: string;
  name: string;
  address: string;
  category: string;
}

interface ClaimBusinessFormProps {
  business: Business;
}

export function ClaimBusinessForm({ business }: ClaimBusinessFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [documents, setDocuments] = React.useState<File[]>([]);

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    relationship: '',
    additionalInfo: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDocumentsUpload = (files: File[]) => {
    setDocuments((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement Supabase claim submission
      // 1. Upload verification documents to Supabase Storage
      // 2. Create claim request record
      // 3. Send notification emails
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to success page
      router.push(`/businesses/${business.slug}/claim/success`);
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/businesses/${business.slug}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Business Page
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-display-md text-foreground">
                Claim This Business
              </h1>
              <p className="text-body-lg text-muted-foreground">{business.name}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center gap-2 ${
                    step === currentStep
                      ? 'text-primary-600'
                      : step < currentStep
                      ? 'text-success'
                      : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step === currentStep
                        ? 'bg-primary-600 text-white'
                        : step < currentStep
                        ? 'bg-success text-white'
                        : 'bg-neutral-200'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  <span className="hidden md:block text-body-sm font-medium">
                    {step === 1 && 'Verify Business'}
                    {step === 2 && 'Your Information'}
                    {step === 3 && 'Verification'}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 w-16 rounded ${
                      step < currentStep ? 'bg-success' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Verify Business */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-4">
                  Verify Business Information
                </h2>
                <p className="text-body-md text-muted-foreground mb-6">
                  Please confirm that the information below is correct. If any details are
                  incorrect, you'll be able to update them after claiming.
                </p>

                <div className="space-y-4 p-6 rounded-lg bg-neutral-50 border mb-6">
                  <div>
                    <p className="text-label-sm text-muted-foreground">Business Name</p>
                    <p className="text-body-md font-medium">{business.name}</p>
                  </div>
                  <div>
                    <p className="text-label-sm text-muted-foreground">Address</p>
                    <p className="text-body-md font-medium">{business.address}</p>
                  </div>
                  <div>
                    <p className="text-label-sm text-muted-foreground">Category</p>
                    <p className="text-body-md font-medium">{business.category}</p>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-heading-xs mb-2">Why Claim Your Business?</h3>
                  <ul className="space-y-2 text-body-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Update your business information and photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Respond to customer reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Create events and special offers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Track analytics and insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Get verified badge to build trust</span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button type="button" variant="primary" size="lg" onClick={() => setCurrentStep(2)}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Your Information */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Your Information
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Your Position/Title *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="e.g., Owner, Manager"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship to Business *</Label>
                    <Textarea
                      id="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      placeholder="Describe your relationship to this business (e.g., I am the owner/manager)"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      placeholder="Any additional information that might help verify your claim"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" size="lg" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button type="button" variant="primary" size="lg" onClick={() => setCurrentStep(3)}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Verification Documents */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Verification Documents
                </h2>
                <p className="text-body-md text-muted-foreground mb-6">
                  Please upload documents to verify your ownership or authority to manage this
                  business. Accepted documents include:
                </p>

                <ul className="space-y-2 text-body-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span>Business license or registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span>Utility bill with business address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span>Articles of incorporation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                    <span>Letter of authorization from business owner</span>
                  </li>
                </ul>

                <div className="mb-6">
                  <UploadZone
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    maxFiles={5}
                    maxSize={10 * 1024 * 1024}
                    onUpload={handleDocumentsUpload}
                  />
                  {documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-label-sm text-muted-foreground mb-2">
                        Uploaded documents ({documents.length}):
                      </p>
                      <ul className="space-y-1">
                        {documents.map((doc, index) => (
                          <li key={index} className="text-body-sm">
                            • {doc.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50 border mb-6">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <div>
                    <Label htmlFor="agreeToTerms" className="cursor-pointer">
                      I certify that I am authorized to claim this business listing *
                    </Label>
                    <p className="text-label-xs text-muted-foreground mt-1">
                      By submitting this claim, you agree to our{' '}
                      <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                        Terms of Service
                      </Link>{' '}
                      and confirm that all information provided is accurate.
                    </p>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-heading-xs mb-2">What Happens Next?</h3>
                  <ol className="space-y-2 text-body-sm text-muted-foreground list-decimal list-inside">
                    <li>Our team will review your claim within 2-3 business days</li>
                    <li>You'll receive an email with the verification status</li>
                    <li>Once approved, you'll get full access to manage your business listing</li>
                    <li>You can then update information, respond to reviews, and create offers</li>
                  </ol>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    Submit Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Container>
    </div>
  );
}
