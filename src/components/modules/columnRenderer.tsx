import Image from 'next/image'
import type { Asset } from 'contentful'
import type { AboutHeadingAndTextEntry } from '@/types/about'
import type { ImageWrapperEntry } from '@/types/publication'
import styles from './columnRenderer.module.css'

type ColumnEntry = AboutHeadingAndTextEntry | ImageWrapperEntry

export default function ColumnRenderer({ entry }: { entry: ColumnEntry }) {
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
          <h2 className={styles.columnHeading}>{headingText as string}</h2>
        )}
        {bodyText && <p className={styles.columnBody}>{bodyText as string}</p>}
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
          <div className={styles.columnImageInner}>
            <Image
              src={imageUrl}
              alt={caption ?? ''}
              fill
              className={styles.img}
            />
          </div>
        )}
        {caption && <p className={styles.imageCaption}>{caption}</p>}
      </div>
    )
  }

  return null
}
