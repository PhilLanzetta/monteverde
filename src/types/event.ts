import type {
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  Asset,
} from 'contentful'

// ── Heading and Text ──────────────────────────────────
export type HeadingAndTextSkeleton = EntrySkeletonType<
  {
    heading: EntryFieldTypes.Text
    bodyText: EntryFieldTypes.Text
  },
  'headingAndText'
>
export type HeadingAndTextEntry = Entry<
  HeadingAndTextSkeleton,
  undefined,
  string
>

// ── Event Details ─────────────────────────────────────
export type EventDetailsSkeleton = EntrySkeletonType<
  {
    date: EntryFieldTypes.Date
    time: EntryFieldTypes.Text
    location: EntryFieldTypes.Text
    ticketLink: EntryFieldTypes.Text
    image: EntryFieldTypes.AssetLink
  },
  'eventDetails'
>
export type EventDetailsEntry = Entry<EventDetailsSkeleton, undefined, string>

// ── Featured Artists ──────────────────────────────────
export type FeaturedArtistsSkeleton = EntrySkeletonType<
  {
    artists: EntryFieldTypes.Text
  },
  'featuredArtists'
>
export type FeaturedArtistsEntry = Entry<
  FeaturedArtistsSkeleton,
  undefined,
  string
>

// ── Media Carousel ────────────────────────────────────
export type MediaCarouselSkeleton = EntrySkeletonType<
  {
    media: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  },
  'mediaCarousel'
>
export type MediaCarouselEntry = Entry<MediaCarouselSkeleton, undefined, string>

// ── Press Item ────────────────────────────────────────
export type PressItemSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    publicationName: EntryFieldTypes.Text
    link: EntryFieldTypes.Text
  },
  'pressItem'
>
export type PressItemEntry = Entry<PressItemSkeleton, undefined, string>

// ── Press Collection ──────────────────────────────────
export type PressCollectionSkeleton = EntrySkeletonType<
  {
    pressItems: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<PressItemSkeleton>
    >
  },
  'pressCollection'
>
export type PressCollectionEntry = Entry<
  PressCollectionSkeleton,
  undefined,
  string
>

// ── Union type for all content modules ───────────────
export type ContentModule =
  | HeadingAndTextEntry
  | EventDetailsEntry
  | FeaturedArtistsEntry
  | MediaCarouselEntry
  | PressCollectionEntry

// ── Event ─────────────────────────────────────────────
export type EventSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    heroImage: EntryFieldTypes.AssetLink
    content: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  },
  'event'
>
export type EventEntry = Entry<EventSkeleton, undefined, string>
