import type { HeadingAndTextEntry } from '@/types/event'
import styles from './modules.module.css'

export default function HeadingAndText({
  entry,
}: {
  entry: HeadingAndTextEntry
}) {
  const { heading, bodyText } = entry.fields
  return (
    <section className={styles.headingAndText}>
      {heading && <h2 className={styles.heading}>{heading as string}</h2>}
      {bodyText && <p className={styles.bodyText}>{bodyText as string}</p>}
    </section>
  )
}
