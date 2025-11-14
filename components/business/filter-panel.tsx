'use client';

import * as React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio';
  options: FilterOption[];
}

interface FilterPanelProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearAll: () => void;
  className?: string;
  variant?: 'sidebar' | 'sheet';
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className,
  variant = 'sidebar',
}) => {
  const activeFilterCount = Object.values(selectedFilters).flat().length;

  const handleCheckboxChange = (groupId: string, optionId: string, checked: boolean) => {
    const currentValues = selectedFilters[groupId] || [];
    const newValues = checked
      ? [...currentValues, optionId]
      : currentValues.filter((id) => id !== optionId);
    onFilterChange(groupId, newValues);
  };

  const handleRadioChange = (groupId: string, value: string) => {
    onFilterChange(groupId, [value]);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif font-semibold text-heading-sm">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-primary-600 hover:text-primary-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="multiple" defaultValue={filters.map((f) => f.id)} className="space-y-2">
          {filters.map((group) => {
            const selectedCount = (selectedFilters[group.id] || []).length;

            return (
              <AccordionItem key={group.id} value={group.id} className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-2">
                    <span className="font-medium text-body-md">{group.label}</span>
                    {selectedCount > 0 && (
                      <Badge variant="primary" size="sm">
                        {selectedCount}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {group.type === 'checkbox' ? (
                    <div className="space-y-3">
                      {group.options.map((option) => {
                        const isChecked = (selectedFilters[group.id] || []).includes(option.id);
                        return (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${group.id}-${option.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(group.id, option.id, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`${group.id}-${option.id}`}
                              className="flex-1 flex items-center justify-between cursor-pointer text-body-sm"
                            >
                              <span>{option.label}</span>
                              {option.count !== undefined && (
                                <span className="text-label-sm text-muted-foreground">
                                  ({option.count})
                                </span>
                              )}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <RadioGroup
                      value={(selectedFilters[group.id] || [])[0] || ''}
                      onValueChange={(value) => handleRadioChange(group.id, value)}
                    >
                      <div className="space-y-3">
                        {group.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={option.id}
                              id={`${group.id}-${option.id}`}
                            />
                            <Label
                              htmlFor={`${group.id}-${option.id}`}
                              className="flex-1 flex items-center justify-between cursor-pointer text-body-sm"
                            >
                              <span>{option.label}</span>
                              {option.count !== undefined && (
                                <span className="text-label-sm text-muted-foreground">
                                  ({option.count})
                                </span>
                              )}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Active Filters (if any) */}
      {activeFilterCount > 0 && (
        <div className="border-t border-border p-4">
          <div className="text-label-sm font-semibold text-muted-foreground mb-2">
            Active Filters
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([groupId, values]) => {
              const group = filters.find((f) => f.id === groupId);
              if (!group || values.length === 0) return null;

              return values.map((valueId) => {
                const option = group.options.find((o) => o.id === valueId);
                if (!option) return null;

                return (
                  <Badge
                    key={`${groupId}-${valueId}`}
                    variant="primary"
                    className="cursor-pointer group"
                    onClick={() => {
                      const newValues = values.filter((id) => id !== valueId);
                      onFilterChange(groupId, newValues);
                    }}
                  >
                    {option.label}
                    <X className="h-3 w-3 ml-1 group-hover:text-error transition-colors" />
                  </Badge>
                );
              });
            })}
          </div>
        </div>
      )}
    </div>
  );
};

FilterPanel.displayName = 'FilterPanel';

export { FilterPanel };
