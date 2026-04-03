import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful'

// ── Heading and Text ──────────────────────────────────
export type AboutHeadingAndTextSkeleton = EntrySkeletonType<
  {
    preHeadingText: EntryFieldTypes.Text
    headingText: EntryFieldTypes.Text
    bodyText: EntryFieldTypes.Text
  },
  'headingAndText'
>
export type AboutHeadingAndTextEntry = Entry<
  AboutHeadingAndTextSkeleton,
  undefined,
  string
>

// ── Image Wrapper (reused from publication types) ─────
// Re-exported here for convenience — use the one from publication.ts
export type { ImageWrapperEntry, ImageWrapperSkeleton } from './publication'

// ── Two Column Content ────────────────────────────────
export type TwoColumnContentSkeleton = EntrySkeletonType<
  {
    columnContent: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<EntrySkeletonType>
    >
  },
  'twoColumnContent'
>
export type TwoColumnContentEntry = Entry<
  TwoColumnContentSkeleton,
  undefined,
  string
>

// ── About Page ────────────────────────────────────────
export type AboutPageSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    content: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  },
  'aboutPage'
>
export type AboutPageEntry = Entry<AboutPageSkeleton, undefined, string>

// ── Union of top-level content modules ───────────────
export type AboutContentModule =
  | AboutHeadingAndTextEntry
  | TwoColumnContentEntry
