'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// TODO: Integrate with a charting library like Recharts or Chart.js
// This is a placeholder component for now

interface DataPoint {
  label: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  type?: 'line' | 'bar' | 'area' | 'pie';
  height?: number;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'line',
  height = 300,
  className,
}) => {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <h3 className="font-serif font-semibold text-heading-sm text-foreground">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <div
          className="flex items-center justify-center bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <p className="text-body-md text-muted-foreground mb-2">
              Analytics Chart Placeholder
            </p>
            <p className="text-label-sm text-muted-foreground">
              {type.charAt(0).toUpperCase() + type.slice(1)} chart with {data.length} data points
            </p>
            <p className="text-label-xs text-muted-foreground mt-4">
              Integrate with Recharts or Chart.js for full functionality
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AnalyticsChart.displayName = 'AnalyticsChart';

export { AnalyticsChart, type DataPoint };
