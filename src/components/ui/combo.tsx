import * as React from 'react';

import type * as Select from '@radix-ui/react-select';
import { useDebounce, useIntersectionObserver } from '@uidotdev/usehooks';
import { Check, ChevronsUpDown, LoaderCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

import { buttonVariants } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

export type SelectChangeNativeEvent = {
  target: {
    value: string | string[];
    name: string;
  };
};

export type OptionData<T = unknown> = (
  | {
      value: string;
      label: React.ReactNode;
      disabled?: boolean;
      readable?: string;
      key?: string;
      [other: string]: unknown;
    }
  | {
      value: string;
      label: string | React.ReactNode;
      disabled?: boolean;
      readable?: string;
      key?: string;
      [other: string]: unknown;
    }
) & { data?: T };

export type ComboBoxItem = {
  label: string;
  value: string;
};

export type ComboBoxProps<T> = Omit<Select.SelectProps, 'onValueChange' | 'value'> & {
  placeholder?: string;
  selectAll?: boolean;
  searchPlaceholder?: string;
  options: T[];
  initialOptions?: T[];
  onValueChange?: (value: string | null, option: ComboBoxProps<T>['options'][number] | null) => void;
  onChange?: (value: SelectChangeNativeEvent) => void;
  emptyMessage?: string;
  variant?: 'normal' | 'outlined';
  isLoading?: boolean;
  disabledOptions?: string[];
  className?: string;
  showClearButton?: boolean;
  onSearch?: (value: string) => void;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
  mode?: 'single' | 'multi';
  value?: string | string[];
  categoryKey?: string;
  categoryRender?: (key: string) => React.ReactNode;
  optionClassName?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const getNestedProperty = (obj: unknown, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part as keyof typeof acc], obj);
};

const Combo = <T extends OptionData>(
  {
    options = [] as T[],
    onFocus,
    placeholder,
    onValueChange,
    onChange,
    disabledOptions,
    value,
    searchPlaceholder,
    emptyMessage,
    name,
    className,
    disabled,
    isLoading,
    showClearButton = true,
    onSearch,
    onLoadMore,
    showLoadMore = false,
    initialOptions = [],
    mode = 'single',
    selectAll,
    categoryKey,
    categoryRender,
    optionClassName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ..._
  }: ComboBoxProps<T>,
  ref: React.Ref<HTMLInputElement> | null
) => {
  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string | string[]>(mode === 'multi' ? [] : '');
  const [filteredOptions, setFilteredOptions] = React.useState<T[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<T[]>([]);
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});
  const [isFocused, setIsFocused] = React.useState(false);

  const search = useDebounce(searchText, 300);

  const isMulti = Array.isArray(value) || mode === 'multi';

  const selectedOption = React.useMemo(() => {
    return internalValue
      ? isMulti
        ? (value as string[])?.map((val) =>
            [...selectedOptions, ...initialOptions, ...options].find((option) => option.value === val)
          )
        : [...selectedOptions, ...initialOptions, ...options].find((option) => option.value === internalValue)
      : null;
  }, [internalValue, isMulti, value, selectedOptions, initialOptions, options]);

  const selectedOptionData = React.useMemo(() => {
    const getParsedValues = (selectedOption: T) => {
      return {
        label: selectedOption.label,
        readable: selectedOption.readable,
      };
    };
    if (!selectedOption) return null;
    if (Array.isArray(selectedOption)) {
      if (selectedOption.length === 0) return null;
      const text = selectedOption
        .filter((option) => !!option)
        .map((option) => option.label)
        .join(', ');
      if (!text) return null;
      return getParsedValues({
        value: '',
        label: text,
        readable: text,
      } as T);
    }
    return getParsedValues(selectedOption);
  }, [selectedOption]);

  const handleFilter = (value: string) => {
    setIsTyping(true);
    setSearchText(value);
    setFilteredOptions(
      options
        .map((option) => ({
          ...option,
          readable: typeof option.label !== 'string' ? option.readable ?? '' : option.label.toString(),
        }))
        .filter(
          (option) =>
            option.readable
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(
                value
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
              ) && !initialOptions.find((initialOption) => initialOption.value === option.value)
        )
    );
  };

  const resetValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => {
    const newValue: string | string[] = isMulti ? [] : '';
    e.stopPropagation();
    setInternalValue(newValue);
    onValueChange?.('', null);
    onChange?.({
      target: {
        value: newValue,
        name: name ?? '',
      },
    });
  };

  const handleSelectAll = () => {
    setInternalValue(options.map((option) => option.value));
    onChange?.({
      target: {
        value: options.map((option) => option.value),
        name: name ?? '',
      },
    });
    setSelectedOptions(options);
  };

  const handleSelect = (currentValue: string, option: T) => {
    const newValue = currentValue === value ? '' : currentValue;
    const treatedValue = isMulti
      ? ((value as string[]) ?? []).includes(newValue)
        ? (value as string[]).filter((v) => v !== newValue)
        : [...((value as string[]) || []), newValue]
      : newValue;
    setInternalValue(treatedValue);
    onChange?.({
      target: {
        value: treatedValue,
        name: name ?? '',
      },
    });
    setSelectedOptions((old) =>
      old.find((opt) => opt.value === currentValue)
        ? [...old.filter((opt) => opt.value !== currentValue)]
        : [...old, option]
    );
    onValueChange?.(newValue, option);

    if (mode !== 'multi') setOpen(false);
  };

  const toggleCategory = (category: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const groupedOptions = React.useMemo(() => {
    if (!categoryKey) return { undefined: filteredOptions };

    const grouped = filteredOptions.reduce((acc, option) => {
      const category = getNestedProperty(option, categoryKey) ?? 'other';
      if (!category) return acc;
      if (!acc[category.toString()]) acc[category.toString()] = [];
      acc[category.toString()].push(option);
      return acc;
    }, {} as Record<string, T[]>);

    // Move 'other' category to the end if it exists
    if (grouped.other) {
      const { other } = grouped;
      delete grouped.other;
      grouped.other = other;
    }

    return grouped;
  }, [filteredOptions, categoryKey]);

  React.useEffect(() => {
    if (value?.toString() !== internalValue?.toString()) {
      setInternalValue(value ?? '');
      onChange?.({
        target: {
          value: value ?? '',
          name: name ?? '',
        },
      });
    }
  }, [value]);

  React.useEffect(() => {
    onSearch?.(search);
    setIsTyping(false);
  }, [search]);

  React.useEffect(() => {
    if (ref && 'current' in ref) {
      ref.current?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      onLoadMore?.();
    }
  }, [entry?.isIntersecting]);

  React.useEffect(() => {
    if (categoryKey) {
      const initialOpenState = Object.keys(groupedOptions).reduce((acc, category) => {
        acc[category] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setOpenCategories(initialOpenState);
    }
  }, [categoryKey, groupedOptions]);

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <input
        name={name}
        value={value}
        onChange={() => null}
        className="w-0 h-0 absolute"
        tabIndex={0}
        ref={ref}
        onFocus={(e) => {
          onFocus?.(e);
          setIsFocused(true);
        }}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <PopoverTrigger asChild type="button" disabled={disabled} className="w-full relative group/combo">
        <div
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'w-[200px] h-10 py-2 justify-between overflow-hidden overflow-ellipsis whitespace-nowrap focus-visible:ring-0 focus:ring-0 focus-visible:outline-none',

            (!placeholder && !selectedOption) ?? 'justify-end',
            className,
            disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
          )}
          data-focused={isFocused}
          aria-expanded={open}
          title={
            (selectedOptionData &&
              (typeof selectedOptionData.label === 'string'
                ? selectedOptionData.label
                : selectedOptionData.readable)) ||
            ''
          }
        >
          <span
            className={cn(
              'text-gray-500 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap',
              placeholder && !selectedOptionData ? 'text-gray-400' : ''
            )}
          >
            {selectedOptionData ? selectedOptionData.label : placeholder}
          </span>
          {isLoading ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : value && showClearButton ? (
            <button
              onClick={resetValue}
              type="button"
              aria-label="clear"
              className="focus:text-red-600 opacity-50 focus:opacity-100"
              title="Limpar"
            >
              <X className="ml-2 h-4 w-4 shrink-0" />
            </button>
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder={searchPlaceholder} onValueChange={handleFilter} value={searchText} />
          <CommandEmpty>{emptyMessage || (isLoading || isTyping ? `Carregando...` : 'Nada para mostrar')}</CommandEmpty>
          <CommandGroup className="max-h-[200px] flex flex-col w-full overflow-y-auto">
            <CommandList className="w-full h-full max-h-full">
              {selectAll && isMulti ? (
                <CommandItem
                  key="all"
                  value="all"
                  onSelect={handleSelectAll}
                  className={cn(optionClassName)}
                  disabled={value?.length === options?.length}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value?.length === options?.length ? 'opacity-100' : 'opacity-0')}
                  />
                  Todos
                </CommandItem>
              ) : null}

              {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <React.Fragment key={category}>
                  {categoryKey && category !== 'undefined' ? (
                    <Collapsible open={openCategories[category]} onOpenChange={undefined}>
                      <CollapsibleTrigger asChild>
                        <CommandItem
                          value={`category-${category}`}
                          className={cn('font-semibold text-muted-foreground cursor-pointer', optionClassName)}
                          onSelect={undefined}
                        >
                          <div
                            className="flex items-center justify-between w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category, e);
                            }}
                          >
                            {categoryRender ? categoryRender(category) : category}
                            {openCategories[category] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </CommandItem>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {categoryOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(val) => handleSelect(val, option)}
                            className={cn(optionClassName)}
                            disabled={disabledOptions?.includes(option.value)}
                            data-checked={
                              isMulti ? ((value as string[]) ?? []).includes(option.value) : value === option.value
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                (isMulti ? ((value as string[]) ?? []).includes(option.value) : value === option.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    categoryOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(val) => handleSelect(val, option)}
                        className={cn(optionClassName)}
                        data-checked={
                          isMulti ? ((value as string[]) ?? []).includes(option.value) : value === option.value
                        }
                        disabled={disabledOptions?.includes(option.value)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            (isMulti ? ((value as string[]) ?? []).includes(option.value) : value === option.value)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))
                  )}
                </React.Fragment>
              ))}
            </CommandList>
            {showLoadMore && !isTyping ? <div ref={loadMoreRef} /> : null}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const ComboBox = React.forwardRef(Combo);
