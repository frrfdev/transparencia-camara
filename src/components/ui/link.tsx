import * as React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

export interface LinkProps
  extends NextLinkProps,
    VariantProps<typeof buttonVariants>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <NextLink
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';

export { Link };
