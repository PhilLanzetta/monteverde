import ReactMarkdown from 'react-markdown'
import type { HeadingAndTextEntry } from '@/types/event'
import styles from './modules.module.css'

export default function HeadingAndText({
  entry,
}: {
  entry: HeadingAndTextEntry
}) {
  const { preHeadingText, headingText, bodyText } = entry.fields
  return (
    <section className={styles.headingAndText}>
      {preHeadingText && (
        <span className={styles.label}>{preHeadingText as string}</span>
      )}
      {headingText && (
        <h2
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: headingText as string }}
        />
      )}
      {bodyText && (
        <div className={styles.bodyText}>
          <ReactMarkdown>{bodyText as string}</ReactMarkdown>
        </div>
      )}
    </section>
  )
}
