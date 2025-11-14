'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadZone } from '@/components/dashboard/upload-zone';
import { ArrowLeft, Save, Tag, Percent } from 'lucide-react';

export function CreateDealContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [dealImage, setDealImage] = React.useState<File | null>(null);
  const [dealData, setDealData] = React.useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    originalPrice: '',
    startDate: '',
    endDate: '',
    code: '',
    maxRedemptions: '',
    terms: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDealData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setDealImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement Supabase deal creation
      // 1. Upload deal image to Supabase Storage
      // 2. Create deal record with image URL
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating deal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFinalPrice = () => {
    if (!dealData.originalPrice || !dealData.discountValue) return null;
    const original = parseFloat(dealData.originalPrice);
    const discount = parseFloat(dealData.discountValue);

    if (dealData.discountType === 'percentage') {
      return (original * (1 - discount / 100)).toFixed(2);
    } else {
      return (original - discount).toFixed(2);
    }
  };

  return (
    <div className="py-8">
      <Container size="lg">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-body-sm font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif font-bold text-display-sm text-foreground mb-2">
            Create Deal
          </h1>
          <p className="text-body-md text-muted-foreground">
            Attract customers with special offers and discounts
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Deal Details
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Deal Title *</Label>
                      <Input
                        id="title"
                        value={dealData.title}
                        onChange={handleChange}
                        placeholder="e.g., 20% Off All Menu Items"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={dealData.description}
                        onChange={handleChange}
                        placeholder="Describe your deal, what's included, and any important details..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discount Details */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Discount
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="discountType">Discount Type *</Label>
                        <Select
                          value={dealData.discountType}
                          onValueChange={(value) =>
                            setDealData((prev) => ({ ...prev, discountType: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage Off</SelectItem>
                            <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="discountValue">
                          {dealData.discountType === 'percentage'
                            ? 'Percentage (%)'
                            : 'Amount ($)'}
                          *
                        </Label>
                        <Input
                          id="discountValue"
                          type="number"
                          min="0"
                          max={dealData.discountType === 'percentage' ? '100' : undefined}
                          step="0.01"
                          value={dealData.discountValue}
                          onChange={handleChange}
                          placeholder={
                            dealData.discountType === 'percentage' ? '20' : '5.00'
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={dealData.originalPrice}
                        onChange={handleChange}
                        placeholder="25.00"
                      />
                      {calculateFinalPrice() && (
                        <p className="text-label-sm text-success">
                          Final price: ${calculateFinalPrice()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validity Period */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Validity Period
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={dealData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={dealData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Settings */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Additional Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="code">Promo Code</Label>
                      <Input
                        id="code"
                        value={dealData.code}
                        onChange={handleChange}
                        placeholder="SAVE20"
                        className="uppercase"
                      />
                      <p className="text-label-xs text-muted-foreground">
                        Leave blank if no code is required
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxRedemptions">Max Redemptions</Label>
                      <Input
                        id="maxRedemptions"
                        type="number"
                        min="1"
                        value={dealData.maxRedemptions}
                        onChange={handleChange}
                        placeholder="100"
                      />
                      <p className="text-label-xs text-muted-foreground">
                        Leave blank for unlimited redemptions
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="terms">Terms & Conditions</Label>
                      <Textarea
                        id="terms"
                        value={dealData.terms}
                        onChange={handleChange}
                        placeholder="Enter any terms and conditions, restrictions, or requirements..."
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deal Image */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif font-semibold text-heading-md mb-6">
                    Deal Image
                  </h2>
                  <UploadZone
                    accept="image/*"
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    onUpload={handleImageUpload}
                  />
                  {dealImage && (
                    <p className="text-label-sm text-muted-foreground mt-2">
                      Selected: {dealImage.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-heading-xs mb-4">Deal Preview</h3>
                  {dealImage && (
                    <div className="mb-4 aspect-video bg-neutral-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(dealImage)}
                        alt="Deal preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    {dealData.discountValue && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600 text-white text-label-sm font-semibold">
                        {dealData.discountType === 'percentage' ? (
                          <>
                            <Percent className="h-3 w-3" />
                            {dealData.discountValue}% OFF
                          </>
                        ) : (
                          <>
                            <Tag className="h-3 w-3" />$
                            {parseFloat(dealData.discountValue).toFixed(2)} OFF
                          </>
                        )}
                      </div>
                    )}
                    <h4 className="font-semibold text-body-md">
                      {dealData.title || 'Deal Title'}
                    </h4>
                    <p className="text-label-sm text-muted-foreground line-clamp-3">
                      {dealData.description || 'Add a description...'}
                    </p>
                    {dealData.endDate && (
                      <p className="text-label-xs text-muted-foreground">
                        Valid until {new Date(dealData.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-heading-xs mb-3">Quick Tips</h3>
                  <ul className="space-y-2 text-label-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>
                      <span>
                        Clear, specific titles perform better (e.g., "20% Off Lunch Menu")
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>
                      <span>Add high-quality images to increase engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>
                      <span>Set realistic expiration dates to create urgency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span>
                      <span>Include all important terms and restrictions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Deal
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
