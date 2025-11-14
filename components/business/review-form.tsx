'use client';

import * as React from 'react';
import { Star, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ReviewFormProps {
  businessId: string;
  businessName?: string;
  onSubmit: (review: ReviewFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  images: File[];
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  businessId,
  businessName,
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [images, setImages] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }

    setImages((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (content.trim().length < 10) {
      alert('Please write a review with at least 10 characters');
      return;
    }

    onSubmit({
      rating,
      title,
      content,
      images,
    });
  };

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="font-serif font-semibold text-heading-md text-foreground mb-1">
              Write a Review
            </h3>
            {businessName && (
              <p className="text-body-sm text-muted-foreground">
                for {businessName}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none focus:ring-2 focus:ring-accent-300 rounded"
                >
                  <Star
                    className={cn(
                      'h-8 w-8 transition-colors',
                      star <= (hoverRating || rating)
                        ? 'fill-accent-500 text-accent-500'
                        : 'text-neutral-300'
                    )}
                  />
                  <span className="sr-only">{star} star</span>
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-body-sm text-muted-foreground">
                  {rating} {rating === 1 ? 'star' : 'stars'}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title (Optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="Summarize your experience..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              disabled={isLoading}
            />
            <p className="text-label-xs text-muted-foreground">
              {title.length}/100 characters
            </p>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              placeholder="Share details about your experience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              minLength={10}
              maxLength={1000}
              disabled={isLoading}
              required
            />
            <p className="text-label-xs text-muted-foreground">
              {content.length}/1000 characters (minimum 10)
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <p className="text-label-sm text-muted-foreground">
              Add up to 5 photos to help others
            </p>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100"
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-neutral-900/70 hover:bg-neutral-900 transition-colors"
                    >
                      <X className="h-3 w-3 text-white" />
                      <span className="sr-only">Remove image</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < 5 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="sr-only"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  leftIcon={<Upload className="h-4 w-4" />}
                >
                  Upload Photos
                </Button>
                <p className="mt-1 text-label-xs text-muted-foreground">
                  JPG, PNG up to 5MB each
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || rating === 0 || content.trim().length < 10}
              loading={isLoading}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

ReviewForm.displayName = 'ReviewForm';

export { ReviewForm };
