import { notFound } from 'next/navigation'
import { getAboutPage } from '@/lib/about'
import type {
  AboutContentModule,
  AboutHeadingAndTextEntry,
  TwoColumnContentEntry,
} from '@/types/about'
import ColumnRenderer from '@/components/modules/columnRenderer'
import styles from './page.module.css'

export const revalidate = 3600

export default async function AboutPage() {
  const page = await getAboutPage()
  if (!page) notFound()

  const modules = (page.fields.content as unknown as AboutContentModule[]) ?? []

  return (
    <div className={styles.page}>
      {modules.map((module) => {
        const type = module.sys.contentType.sys.id
        const key = module.sys.id

        if (type === 'headingAndText') {
          const entry = module as AboutHeadingAndTextEntry
          const { preHeadingText, headingText, bodyText } = entry.fields
          return (
            <section key={key} className={styles.standaloneText}>
              {preHeadingText && (
                <span className={styles.label}>{preHeadingText as string}</span>
              )}
              {headingText && (
                <h2
                  className={styles.standaloneHeading}
                  dangerouslySetInnerHTML={{ __html: headingText as string }}
                />
              )}
              {bodyText && (
                <p className={styles.standaloneBody}>{bodyText as string}</p>
              )}
            </section>
          )
        }

        if (type === 'twoColumnContent') {
          const entry = module as TwoColumnContentEntry
          const columns = (entry.fields.columnContent as any[]) ?? []
          return (
            <section key={key} className={styles.twoColumn}>
              {columns.map((col: any) => (
                <ColumnRenderer key={col.sys.id} entry={col} />
              ))}
            </section>
          )
        }

        return null
      })}
    </div>
  )
}
