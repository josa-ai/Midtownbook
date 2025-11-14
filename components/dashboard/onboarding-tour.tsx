'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// TODO: Integrate with a tour library like React Joyride or Intro.js
// This is a placeholder component for now

interface TourStep {
  target: string;
  title: string;
  content: string;
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
  className?: string;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({
  steps,
  isOpen,
  onComplete,
  onSkip,
  className,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-modal bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className={cn('max-w-md w-full', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-serif font-semibold text-heading-md text-foreground mb-1">
                {currentStepData.title}
              </h3>
              <p className="text-label-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={onSkip}
              className="p-1 rounded hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <p className="text-body-md text-foreground mb-6">
            {currentStepData.content}
          </p>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
            >
              Skip Tour
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>

          <p className="mt-4 text-label-xs text-muted-foreground text-center">
            Integrate with React Joyride or Intro.js for full functionality
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

OnboardingTour.displayName = 'OnboardingTour';

export { OnboardingTour, type TourStep };
