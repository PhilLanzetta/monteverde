import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Asset } from 'contentful'
import type { AboutHeadingAndTextEntry } from '@/types/about'
import type { ImageWrapperEntry } from '@/types/publication'
import styles from './columnRenderer.module.css'

type ColumnEntry = AboutHeadingAndTextEntry | ImageWrapperEntry

interface ColumnRendererProps {
  entry: ColumnEntry
  learnMore?: string
}

export default function ColumnRenderer({
  entry,
  learnMore,
}: ColumnRendererProps) {
  const type = entry.sys.contentType.sys.id

  if (type === 'headingAndText') {
    const { preHeadingText, headingText, bodyText } = (
      entry as AboutHeadingAndTextEntry
    ).fields
    return (
      <div className={styles.columnText}>
        {preHeadingText && (
          <span className={styles.label}>{preHeadingText as string}</span>
        )}
        {headingText && (
          <h2
            className={styles.columnHeading}
            dangerouslySetInnerHTML={{ __html: headingText as string }}
          />
        )}
        {bodyText && (
          <div className={styles.columnBody}>
            <ReactMarkdown>{bodyText as string}</ReactMarkdown>
          </div>
        )}
        {learnMore && (
          <Link href={learnMore} className={styles.learnMore}>
            Learn More
          </Link>
        )}
      </div>
    )
  }

  if (type === 'imageWrapper') {
    const asset = (entry as ImageWrapperEntry).fields.image as unknown as Asset
    const caption = (entry as ImageWrapperEntry).fields.caption as
      | string
      | undefined
    const imageUrl = asset?.fields?.file?.url
      ? `https:${asset.fields.file.url}`
      : null
    return (
      <div className={styles.columnImage}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={caption ?? ''}
            width={0}
            height={0}
            sizes='50vw'
            className={styles.imageEl}
          />
        )}
        {caption && <p className={styles.imageCaption}>{caption}</p>}
      </div>
    )
  }

  return null
}
