import type {
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  Asset,
} from 'contentful'

// ── Heading and Text ──────────────────────────────────
export type HeadingAndTextSkeleton = EntrySkeletonType<
  {
    preHeadingText: EntryFieldTypes.Text
    headingText: EntryFieldTypes.Text
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
    image: EntryFieldTypes.AssetLink
    address: EntryFieldTypes.Text
    datetime: EntryFieldTypes.Text
    ticketPrice: EntryFieldTypes.Text
    ticketUrl: EntryFieldTypes.Text
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

// ── Video Wrapper ─────────────────────────────────────
export type VideoWrapperSkeleton = EntrySkeletonType<
  {
    videoLink: EntryFieldTypes.Text
    posterImage: EntryFieldTypes.AssetLink
    caption: EntryFieldTypes.Text
  },
  'videoWrapper'
>
export type VideoWrapperEntry = Entry<VideoWrapperSkeleton, undefined, string>

// ── Media Carousel ────────────────────────────────────
export type MediaCarouselSkeleton = EntrySkeletonType<
  {
    media: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  },
  'mediaCarousel'
>
export type MediaCarouselEntry = Entry<MediaCarouselSkeleton, undefined, string>

// ── Press Item ────────────────────────────────────────
export type PressItemSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    publication: EntryFieldTypes.Text
    link: EntryFieldTypes.Text
    buttonText: EntryFieldTypes.Text
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
    date: EntryFieldTypes.Date
    heroImage: EntryFieldTypes.AssetLink
    tileImage: EntryFieldTypes.AssetLink
    tileText: EntryFieldTypes.Text
    content: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  },
  'event'
>
export type EventEntry = Entry<EventSkeleton, undefined, string>
