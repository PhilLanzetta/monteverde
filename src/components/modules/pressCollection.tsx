import type { PressCollectionEntry, PressItemEntry } from '@/types/event'
import styles from './pressCollection.module.css'

export default function PressCollection({
  entry,
}: {
  entry: PressCollectionEntry
}) {
  const items = (entry.fields.pressItems as unknown as PressItemEntry[]) ?? []

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Press</h2>
      <div className={styles.topBorder} />
      {items.map((item) => (
        <div key={item.sys.id} className={styles.item}>
          <div className={styles.itemLeft}>
            <p className={styles.title}>{item.fields.title as string}</p>
            {item.fields.publication && (
              <p className={styles.publication}>
                {item.fields.publication as string}
              </p>
            )}
          </div>
          {item.fields.link && (
            <a
              href={item.fields.link as string}
              className={styles.readBtn}
              target='_blank'
              rel='noreferrer'
            >
              {(item.fields.buttonText as string | undefined) ?? 'Read'}
            </a>
          )}
        </div>
      ))}
    </section>
  )
}
