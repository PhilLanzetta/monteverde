import type { ContentModule } from '@/types/event'
import HeadingAndText from './headingAndText'
import EventDetails from './eventDetails'
import FeaturedArtists from './featuredArtists'
import MediaCarousel from './mediaCarousel'
import PressCollection from './pressCollection'

interface Props {
  modules: ContentModule[]
}

export default function ContentModuleRenderer({ modules }: Props) {
  return (
    <>
      {modules.map((module) => {
        const type = module.sys.contentType.sys.id
        const key = module.sys.id

        switch (type) {
          case 'headingAndText':
            return <HeadingAndText key={key} entry={module as any} />
          case 'eventDetails':
            return <EventDetails key={key} entry={module as any} />
          case 'featuredArtists':
            return <FeaturedArtists key={key} entry={module as any} />
          case 'mediaCarousel':
            return <MediaCarousel key={key} entry={module as any} />
          case 'pressCollection':
            return <PressCollection key={key} entry={module as any} />
          default:
            return null
        }
      })}
    </>
  )
}
