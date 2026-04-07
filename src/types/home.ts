import type { Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful'
import type { EventSkeleton } from './event'
import type { PublicationSkeleton } from './publication'

export type HomePageSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    tiles: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<EventSkeleton | PublicationSkeleton>
    >
    aboutBlurb: EntryFieldTypes.EntryLink<EntrySkeletonType>
    audioFile: EntryFieldTypes.AssetLink
    audioCaption: EntryFieldTypes.Text
  },
  'homePage'
>

export type HomePageEntry = Entry<HomePageSkeleton, undefined, string>
