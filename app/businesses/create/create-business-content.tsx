'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { UploadZone } from '@/components/dashboard/upload-zone';
import { Save, Building2, Check } from 'lucide-react';

export function CreateBusinessContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [logoImage, setLogoImage] = React.useState<File | null>(null);

  const [businessData, setBusinessData] = React.useState({
    // Basic Information
    name: '',
    category: '',
    description: '',
    tagline: '',
    // Contact Information
    phone: '',
    email: '',
    website: '',
    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Hours (simplified - would be more complex in real app)
    isOpen24Hours: false,
    hoursDescription: '',
    // Features
    amenities: [] as string[],
    priceRange: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBusinessData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCoverUpload = (files: File[]) => {
    if (files.length > 0) setCoverImage(files[0]);
  };

  const handleLogoUpload = (files: File[]) => {
    if (files.length > 0) setLogoImage(files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement Supabase business creation
      // 1. Upload images to Supabase Storage
      // 2. Create business record
      // 3. Create user as business owner
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to dashboard or success page
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating business:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const categories = [
    'Restaurant',
    'Retail',
    'Services',
    'Entertainment',
    'Health & Wellness',
    'Education',
    'Professional Services',
    'Other',
  ];

  const amenitiesList = [
    'Parking Available',
    'Wheelchair Accessible',
    'WiFi',
    'Outdoor Seating',
    'Takeout',
    'Delivery',
    'Reservations',
    'Pet Friendly',
  ];

  const priceRanges = [
    { value: '1', label: '$ - Budget Friendly' },
    { value: '2', label: '$$ - Moderate' },
    { value: '3', label: '$$$ - Upscale' },
    { value: '4', label: '$$$$ - Fine Dining/Luxury' },
  ];

  return (
    <div className="py-8">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="font-serif font-bold text-display-md text-foreground mb-2">
            Add Your Business
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Join Midtown Book and connect with your local community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3, 4].map((step) => (
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
                    {step < currentStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <span className="hidden md:block text-body-sm font-medium">
                    {step === 1 && 'Basic Info'}
                    {step === 2 && 'Contact & Location'}
                    {step === 3 && 'Details'}
                    {step === 4 && 'Review'}
                  </span>
                </div>
                {step < 4 && (
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
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name *</Label>
                    <Input
                      id="name"
                      value={businessData.name}
                      onChange={handleChange}
                      placeholder="e.g., Sunrise Café"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={businessData.category}
                      onValueChange={(value) =>
                        setBusinessData((prev) => ({ ...prev, category: value }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={businessData.tagline}
                      onChange={handleChange}
                      placeholder="A short, catchy description"
                      maxLength={60}
                    />
                    <p className="text-label-xs text-muted-foreground">
                      {businessData.tagline.length}/60 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={businessData.description}
                      onChange={handleChange}
                      placeholder="Describe your business, what makes it special, and what customers can expect..."
                      rows={6}
                      required
                    />
                    <p className="text-label-xs text-muted-foreground">
                      Minimum 100 characters recommended
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Business Logo</Label>
                    <UploadZone
                      accept="image/*"
                      maxFiles={1}
                      maxSize={2 * 1024 * 1024}
                      onFilesSelected={handleLogoUpload}
                    />
                    {logoImage && (
                      <p className="text-label-sm text-success">Selected: {logoImage.name}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Cover Photo</Label>
                    <UploadZone
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFilesSelected={handleCoverUpload}
                    />
                    {coverImage && (
                      <p className="text-label-sm text-success">Selected: {coverImage.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Contact & Location */}
          {currentStep === 2 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Contact & Location
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={businessData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessData.email}
                        onChange={handleChange}
                        placeholder="contact@business.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={businessData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Physical Address</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={businessData.address}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={businessData.city}
                            onChange={handleChange}
                            placeholder="Midtown"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={businessData.state}
                            onChange={handleChange}
                            placeholder="CA"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={businessData.zipCode}
                            onChange={handleChange}
                            placeholder="94102"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Business Details
                </h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Price Range</Label>
                    <Select
                      value={businessData.priceRange}
                      onValueChange={(value) =>
                        setBusinessData((prev) => ({ ...prev, priceRange: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Hours of Operation</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="isOpen24Hours"
                          checked={businessData.isOpen24Hours}
                          onCheckedChange={(checked) =>
                            setBusinessData((prev) => ({
                              ...prev,
                              isOpen24Hours: checked as boolean,
                            }))
                          }
                        />
                        <Label htmlFor="isOpen24Hours" className="cursor-pointer">
                          Open 24 Hours
                        </Label>
                      </div>

                      {!businessData.isOpen24Hours && (
                        <div className="space-y-2">
                          <Label htmlFor="hoursDescription">Hours Description</Label>
                          <Textarea
                            id="hoursDescription"
                            value={businessData.hoursDescription}
                            onChange={handleChange}
                            placeholder="e.g., Mon-Fri: 8am-6pm, Sat-Sun: 9am-5pm"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-4">Amenities & Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-3">
                          <Checkbox
                            id={amenity}
                            checked={businessData.amenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setBusinessData((prev) => ({
                                  ...prev,
                                  amenities: [...prev.amenities, amenity],
                                }));
                              } else {
                                setBusinessData((prev) => ({
                                  ...prev,
                                  amenities: prev.amenities.filter((a) => a !== amenity),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={amenity} className="cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card>
              <CardContent className="p-8">
                <h2 className="font-serif font-semibold text-heading-lg mb-6">
                  Review Your Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-heading-sm mb-3">Basic Information</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Business Name:</dt>
                        <dd className="font-medium">{businessData.name || 'Not provided'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Category:</dt>
                        <dd className="font-medium">{businessData.category || 'Not selected'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Logo:</dt>
                        <dd className="font-medium">{logoImage ? '✓ Uploaded' : 'Not uploaded'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Cover Photo:</dt>
                        <dd className="font-medium">{coverImage ? '✓ Uploaded' : 'Not uploaded'}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-3">Contact Information</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Phone:</dt>
                        <dd className="font-medium">{businessData.phone || 'Not provided'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Email:</dt>
                        <dd className="font-medium">{businessData.email || 'Not provided'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Address:</dt>
                        <dd className="font-medium text-right">
                          {businessData.address}, {businessData.city}, {businessData.state}{' '}
                          {businessData.zipCode}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-heading-sm mb-3">Business Details</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Price Range:</dt>
                        <dd className="font-medium">
                          {businessData.priceRange
                            ? priceRanges.find((r) => r.value === businessData.priceRange)?.label
                            : 'Not selected'}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Amenities:</dt>
                        <dd className="font-medium">
                          {businessData.amenities.length > 0
                            ? `${businessData.amenities.length} selected`
                            : 'None'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                    <h3 className="font-semibold text-heading-xs mb-2">What happens next?</h3>
                    <ul className="space-y-2 text-body-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                        <span>
                          Your business listing will be reviewed by our team (usually within 24
                          hours)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                        <span>You'll receive an email confirmation once approved</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary-600 mt-0.5" />
                        <span>
                          You can then access your dashboard to manage your listing and track
                          analytics
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={currentStep === 1 || isLoading}
            >
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button type="button" variant="primary" size="lg" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="lg" loading={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            )}
          </div>
        </form>
      </Container>
    </div>
  );
}
