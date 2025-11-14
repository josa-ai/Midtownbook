'use client';

import * as React from 'react';
import { Search, MapPin, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'business' | 'category' | 'location';
  icon?: React.ReactNode;
}

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  trendingSearches?: string[];
  showLocation?: boolean;
  location?: string;
  onLocationChange?: (location: string) => void;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search businesses, services, or categories...',
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  showLocation = false,
  location,
  onLocationChange,
  className,
}) => {
  const [query, setQuery] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setShowSuggestions(newValue.length > 0 || isFocused);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      onSearch?.(finalQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleClear = () => {
    setQuery('');
    onChange?.('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Click outside to close suggestions
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasSuggestions = suggestions.length > 0;
  const hasRecentSearches = recentSearches.length > 0 && query.length === 0;
  const hasTrendingSearches = trendingSearches.length > 0 && query.length === 0;
  const showDropdown = showSuggestions && (hasSuggestions || hasRecentSearches || hasTrendingSearches);

  return (
    <div ref={searchRef} className={cn('relative w-full', className)}>
      <div className={cn(
        'flex gap-2',
        showLocation && 'flex-col sm:flex-row'
      )}>
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                'flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2',
                'text-body-md placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300',
                'transition-all duration-200'
              )}
              aria-label="Search"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded={showDropdown}
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Location Input (Optional) */}
        {showLocation && (
          <div className="relative sm:w-64">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={location || ''}
              onChange={(e) => onLocationChange?.(e.target.value)}
              placeholder="Location"
              className={cn(
                'flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2',
                'text-body-md placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300',
                'transition-all duration-200'
              )}
              aria-label="Location"
            />
          </div>
        )}

        {/* Search Button */}
        <Button
          onClick={() => handleSearch()}
          variant="primary"
          size="lg"
          className="shrink-0"
        >
          <Search className="h-5 w-5 sm:mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-dropdown border border-border max-h-96 overflow-y-auto z-dropdown"
          role="listbox"
        >
          {/* Suggestions from query */}
          {hasSuggestions && (
            <div className="p-2">
              <div className="text-label-sm font-semibold text-muted-foreground px-3 py-2">
                Suggestions
              </div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-left"
                  role="option"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100">
                    {suggestion.icon || <Search className="h-4 w-4 text-neutral-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-body-sm text-foreground truncate">
                      {suggestion.text}
                    </div>
                    <div className="text-label-sm text-muted-foreground capitalize">
                      {suggestion.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {hasRecentSearches && (
            <div className="p-2">
              <div className="text-label-sm font-semibold text-muted-foreground px-3 py-2">
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    handleSearch(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-left"
                >
                  <Search className="h-4 w-4 text-neutral-400" />
                  <span className="text-body-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {hasTrendingSearches && (
            <div className="p-2 border-t border-border">
              <div className="text-label-sm font-semibold text-muted-foreground px-3 py-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </div>
              <div className="flex flex-wrap gap-2 px-3 py-2">
                {trendingSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-colors"
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBox.displayName = 'SearchBox';

export { SearchBox };
export type { SearchSuggestion };
