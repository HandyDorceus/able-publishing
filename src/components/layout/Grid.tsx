import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface GridProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

interface ColProps {
  span?: number
  smSpan?: number
  mdSpan?: number
  lgSpan?: number
  xlSpan?: number
  start?: number
  mdStart?: number
  as?: ElementType
  className?: string
  children: ReactNode
}

interface SectionProps {
  as?: ElementType
  flush?: boolean
  id?: string
  className?: string
  children: ReactNode
}

interface ContainerProps {
  className?: string
  children: ReactNode
}

// ─── Span / start lookup maps (Tailwind v4 needs static strings for JIT) ─────

const SPAN_MAP: Record<number, string> = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
  9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
}

const SM_SPAN_MAP: Record<number, string> = {
  1: 'sm:col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3', 4: 'sm:col-span-4',
  5: 'sm:col-span-5', 6: 'sm:col-span-6', 7: 'sm:col-span-7', 8: 'sm:col-span-8',
  9: 'sm:col-span-9', 10: 'sm:col-span-10', 11: 'sm:col-span-11', 12: 'sm:col-span-12',
}

const MD_SPAN_MAP: Record<number, string> = {
  1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4',
  5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7', 8: 'md:col-span-8',
}

const LG_SPAN_MAP: Record<number, string> = {
  1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4',
  5: 'lg:col-span-5', 6: 'lg:col-span-6', 7: 'lg:col-span-7', 8: 'lg:col-span-8',
  9: 'lg:col-span-9', 10: 'lg:col-span-10', 11: 'lg:col-span-11', 12: 'lg:col-span-12',
}

const XL_SPAN_MAP: Record<number, string> = {
  1: 'xl:col-span-1', 2: 'xl:col-span-2', 3: 'xl:col-span-3', 4: 'xl:col-span-4',
  5: 'xl:col-span-5', 6: 'xl:col-span-6', 7: 'xl:col-span-7', 8: 'xl:col-span-8',
  9: 'xl:col-span-9', 10: 'xl:col-span-10', 11: 'xl:col-span-11', 12: 'xl:col-span-12',
}

const LG_START_MAP: Record<number, string> = {
  1: 'lg:col-start-1', 2: 'lg:col-start-2', 3: 'lg:col-start-3', 4: 'lg:col-start-4',
  5: 'lg:col-start-5', 6: 'lg:col-start-6', 7: 'lg:col-start-7', 8: 'lg:col-start-8',
  9: 'lg:col-start-9', 10: 'lg:col-start-10', 11: 'lg:col-start-11', 12: 'lg:col-start-12',
}

const MD_START_MAP: Record<number, string> = {
  1: 'md:col-start-1', 2: 'md:col-start-2', 3: 'md:col-start-3', 4: 'md:col-start-4',
  5: 'md:col-start-5', 6: 'md:col-start-6', 7: 'md:col-start-7', 8: 'md:col-start-8',
}

// ─── Components ───────────────────────────────────────────────────────────────

export function Grid({ as = 'div', className, children }: GridProps) {
  const Tag = as as ElementType
  return (
    <Tag
      className={cn(
        'grid',
        'grid-cols-4 gap-x-4 px-4',            // mobile:  4 cols, 16px gutter, 16px margin
        'md:grid-cols-8 md:gap-x-4 md:px-10',  // tablet:  8 cols, 16px gutter, 40px margin
        'lg:grid-cols-12 lg:gap-x-6 lg:px-20', // desktop: 12 cols, 24px gutter, 80px margin
        'w-full max-w-screen-2xl mx-auto',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Col({
  span,
  smSpan,
  mdSpan,
  lgSpan,
  xlSpan,
  start,
  mdStart,
  as = 'div',
  className,
  children,
}: ColProps) {
  const Tag = as as ElementType
  return (
    <Tag
      className={cn(
        span    ? SPAN_MAP[span]       : 'col-span-4',
        smSpan  ? SM_SPAN_MAP[smSpan] : undefined,
        mdSpan  ? MD_SPAN_MAP[mdSpan] : 'md:col-span-8',
        lgSpan  ? LG_SPAN_MAP[lgSpan] : 'lg:col-span-12',
        xlSpan  ? XL_SPAN_MAP[xlSpan] : undefined,
        start   ? LG_START_MAP[start] : undefined,
        mdStart ? MD_START_MAP[mdStart] : undefined,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Section({ as = 'section', flush = false, id, className, children }: SectionProps) {
  const Tag = as as ElementType
  return (
    <Tag id={id} className={cn(!flush && 'py-section-sm lg:py-section', className)}>
      {children}
    </Tag>
  )
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-screen-xl mx-auto', className)}>
      {children}
    </div>
  )
}
