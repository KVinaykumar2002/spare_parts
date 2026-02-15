'use client';

import * as React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type SortOption =
  | 'default'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z';

export interface ProductFiltersState {
  searchQuery?: string;
  sortBy: SortOption;
  priceMin?: number;
  priceMax?: number;
}

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onFiltersChange: (filters: ProductFiltersState) => void;
  priceRange?: { min: number; max: number };
  showSearch?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-a-z', label: 'Name: A to Z' },
];

export function ProductFilters({
  filters,
  onFiltersChange,
  priceRange,
  showSearch = true,
  searchPlaceholder = 'Search petrol pump parts...',
  className,
}: ProductFiltersProps) {
  const [minInput, setMinInput] = React.useState(
    filters.priceMin != null ? String(filters.priceMin) : ''
  );
  const [maxInput, setMaxInput] = React.useState(
    filters.priceMax != null ? String(filters.priceMax) : ''
  );

  React.useEffect(() => {
    setMinInput(filters.priceMin != null ? String(filters.priceMin) : '');
    setMaxInput(filters.priceMax != null ? String(filters.priceMax) : '');
  }, [filters.priceMin, filters.priceMax]);

  const hasActiveFilters =
    (filters.searchQuery?.trim()?.length ?? 0) > 0 ||
    filters.sortBy !== 'default' ||
    filters.priceMin != null ||
    filters.priceMax != null;

  const handleSortChange = (value: SortOption) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handlePriceApply = () => {
    const min = minInput ? Number(minInput) : undefined;
    const max = maxInput ? Number(maxInput) : undefined;
    onFiltersChange({
      ...filters,
      priceMin: min,
      priceMax: max,
    });
  };

  const handleClearFilters = () => {
    setMinInput('');
    setMaxInput('');
    onFiltersChange({
      searchQuery: '',
      sortBy: 'default',
      priceMin: undefined,
      priceMax: undefined,
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4',
        className
      )}
    >
      {showSearch && (
        <div className="flex items-center border border-border-gray-alt rounded-md h-10 w-full sm:w-64 sm:min-w-[200px] overflow-hidden">
          <Search className="h-4 w-4 text-muted-foreground ml-3 flex-shrink-0" aria-hidden />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={filters.searchQuery ?? ''}
            onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full flex-grow pl-2"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          Sort by
        </span>
        <Select
          value={filters.sortBy}
          onValueChange={(v) => handleSortChange(v as SortOption)}
        >
          <SelectTrigger className="w-[180px] sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {priceRange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'gap-2',
                (filters.priceMin != null || filters.priceMax != null) &&
                  'border-primary text-primary'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Price range
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72">
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Min price (₹)
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder={String(priceRange.min)}
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Max price (₹)
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder={String(priceRange.max)}
                  value={maxInput}
                  onChange={(e) => setMaxInput(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handlePriceApply} className="flex-1">
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setMinInput('');
                    setMaxInput('');
                    handlePriceApply();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}

/** Products with collections format: title + variants[].price */
type CollectionsProduct = { title: string; variants: { price: number }[] };
/** Products with popular format: name + price */
type PopularProduct = { name: string; price: number };
type FilterableProduct = CollectionsProduct | PopularProduct;

function getFilterPrice(p: FilterableProduct): number {
  if ('price' in p && typeof p.price === 'number') return p.price;
  return (p as CollectionsProduct).variants?.[0]?.price ?? 0;
}

function getFilterTitle(p: FilterableProduct): string {
  if ('title' in p) return (p as CollectionsProduct).title;
  return (p as PopularProduct).name;
}

export function applyProductFilters<T extends FilterableProduct>(
  products: T[],
  filters: ProductFiltersState
): T[] {
  let result = [...products];

  const q = (filters.searchQuery ?? '').toLowerCase().trim();
  if (q) {
    result = result.filter((p) => getFilterTitle(p).toLowerCase().includes(q));
  }

  if (filters.priceMin != null || filters.priceMax != null) {
    const min = filters.priceMin ?? 0;
    const max = filters.priceMax ?? Infinity;
    result = result.filter((p) => {
      const price = getFilterPrice(p);
      return price >= min && price <= max;
    });
  }

  switch (filters.sortBy) {
    case 'price-low-high':
      result.sort((a, b) => getFilterPrice(a) - getFilterPrice(b));
      break;
    case 'price-high-low':
      result.sort((a, b) => getFilterPrice(b) - getFilterPrice(a));
      break;
    case 'name-a-z':
      result.sort((a, b) => getFilterTitle(a).localeCompare(getFilterTitle(b)));
      break;
    case 'default':
    default:
      break;
  }

  return result;
}
