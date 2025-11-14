'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatDate, getInitials } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'comment' | 'review' | 'event' | 'deal' | 'update' | 'system';
  title: string;
  description?: string;
  timestamp: string | Date;
  user?: {
    name: string;
    avatar?: string;
  };
  icon?: LucideIcon;
  iconColor?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  };
  link?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  isLoading?: boolean;
  showAvatar?: boolean;
  maxItems?: number;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  isLoading = false,
  showAvatar = true,
  maxItems,
  className,
}) => {
  const displayedActivities = maxItems
    ? activities.slice(0, maxItems)
    : activities;

  if (isLoading) {
    return (
      <Card className={cn('', className)}>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className={cn('', className)}>
        <CardContent className="p-6 text-center">
          <p className="text-body-sm text-muted-foreground">No recent activity</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {displayedActivities.map((activity, index) => {
            const Icon = activity.icon;
            const isLast = index === displayedActivities.length - 1;

            return (
              <div
                key={activity.id}
                className={cn(
                  'relative flex gap-4',
                  !isLast && 'pb-6',
                  activity.link && 'cursor-pointer hover:bg-neutral-50 -mx-2 px-2 py-2 rounded-lg transition-colors'
                )}
                onClick={() => activity.link && window.location.assign(activity.link)}
              >
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-neutral-200" />
                )}

                {/* Avatar or Icon */}
                {showAvatar && activity.user ? (
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback>
                      {getInitials(activity.user.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : Icon ? (
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                      activity.iconColor || 'bg-neutral-100'
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-neutral-100 shrink-0" />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-body-md text-foreground">
                      {activity.title}
                    </p>
                    {activity.badge && (
                      <Badge
                        variant={activity.badge.variant}
                        size="sm"
                        className="shrink-0"
                      >
                        {activity.badge.text}
                      </Badge>
                    )}
                  </div>

                  {activity.description && (
                    <p className="text-body-sm text-muted-foreground mb-1">
                      {activity.description}
                    </p>
                  )}

                  <p className="text-label-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed, type Activity };
