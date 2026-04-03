import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful'

// ── Image Wrapper ─────────────────────────────────────
export type ImageWrapperSkeleton = EntrySkeletonType<
  {
    image: EntryFieldTypes.AssetLink
    caption: EntryFieldTypes.Text
  },
  'imageWrapper'
>
export type ImageWrapperEntry = Entry<ImageWrapperSkeleton, undefined, string>

// ── Image Gallery ─────────────────────────────────────
export type ImageGallerySkeleton = EntrySkeletonType<
  {
    heading: EntryFieldTypes.Text
    images: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ImageWrapperSkeleton>
    >
  },
  'imageGallery'
>
export type ImageGalleryEntry = Entry<ImageGallerySkeleton, undefined, string>

// ── Author ────────────────────────────────────────────
export type AuthorSkeleton = EntrySkeletonType<
  {
    name: EntryFieldTypes.Text
    bio: EntryFieldTypes.Text
    image: EntryFieldTypes.AssetLink
  },
  'author'
>
export type AuthorEntry = Entry<AuthorSkeleton, undefined, string>

// ── Publication ───────────────────────────────────────
export type PublicationSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    publicationDate: EntryFieldTypes.Date
    tileImage: EntryFieldTypes.AssetLink
    tileText: EntryFieldTypes.Text
    heroDescription: EntryFieldTypes.Text
    purchaseLink: EntryFieldTypes.Text
    heroImages: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ImageWrapperSkeleton>
    >
    authors: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AuthorSkeleton>>
    imageGallery: EntryFieldTypes.EntryLink<ImageGallerySkeleton>
  },
  'publication'
>
export type PublicationEntry = Entry<PublicationSkeleton, undefined, string>
