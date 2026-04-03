import Image from 'next/image'
import styles from './about.module.css'

const BODY_SHORT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec ante nulla. Cras ut mauris eget leo interdum pulvinar non porttitor dui. Donec vel sem, fringilla a est sed, venenatis dictum nisi. Vivamus facilisis nibh libero, vitae dignissim velit consequat quis. Nullam non efficitur velit, at tincidunt arcu.`

const BODY_LONG = `Born in Switzerland in 1969, Olivier Berggruen attended the Ecole Alsacienne in Paris and graduated in 1987. He studied piano and composition at the Conservatory Serge Rachmaninoff and with Fiamma Batiste. He acquired an MA from the Courtauld Institute of Art, London 1993. After various gallery stints in London, he opened a contemporary art gallery with André Zerr in 1997. From 2001–2007, he served as associate curator at the Schirn Kunsthalle Frankfurt. His writings on Paul Klee, Cy Twombly, Kara Walker and others have been published in various museum catalogues as well as online. He also served as co-organiser of Picasso and the Ballets Russes at the Staatsgalerie Stuttgart in 2015, and is the author of The Writing of Art (Pushkin Press, London 2016) and Peinture du désir: une brève histoire de la collection d'art (Presses du réel, Dijon 2016).

Olivier is a member of the advisory board for the Museen Berggruen in Berlin and The Station in New York. In 2016 he was awarded an honorary doctorate from the University of Durres in Albania.`

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ── Section 1: text left, image right ── */}
      <section className={styles.sectionTextImage}>
        <div className={styles.textBlock}>
          <span className={styles.label}>ABOUT</span>
          <h2 className={styles.heading}>Lorem Ipsum Dolor Sit Amet</h2>
          <p className={styles.body}>{BODY_SHORT}</p>
          <p className={styles.body}>{BODY_SHORT}</p>
        </div>
        <div className={styles.imageRight}>
          <Image
            src='https://picsum.photos/seed/mv1/800/600'
            alt='Mountain landscape'
            fill
            className={styles.img}
          />
        </div>
      </section>

      {/* ── Staggered pair A: left high, right low ── */}
      <div className={styles.staggeredA}>
        <div className={styles.staggeredALeft}>
          <Image
            src='https://picsum.photos/seed/mv2/800/600'
            alt='Alpine meadow'
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.staggeredARight}>
          <Image
            src='https://picsum.photos/seed/mv3/800/700'
            alt='Mountain cottage'
            fill
            className={styles.img}
          />
        </div>
      </div>

      {/* ── Section 2: image left, text right ── */}
      <section className={styles.sectionImageText}>
        <div className={styles.imageLeft}>
          <Image
            src='https://picsum.photos/seed/mv4/800/900'
            alt='Dark interior'
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.textBlock}>
          <span className={styles.label}>ABOUT</span>
          <h2 className={styles.heading}>
            Nulla Tincidunt Consectetur In Dapibus
          </h2>
          <p className={styles.body}>{BODY_SHORT}</p>
          <p className={styles.body}>{BODY_SHORT}</p>
        </div>
      </section>

      {/* ── Staggered pair B: right high, left low ── */}
      <div className={styles.staggeredB}>
        <div className={styles.staggeredBLeft}>
          <Image
            src='https://picsum.photos/seed/mv5/800/700'
            alt='Portrait'
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.staggeredBRight}>
          <Image
            src='https://picsum.photos/seed/mv6/800/600'
            alt='Outdoor scene'
            fill
            className={styles.img}
          />
        </div>
      </div>

      {/* ── Section 3: bio — text left, portrait right ── */}
      <section className={styles.sectionBio}>
        <div className={styles.bioText}>
          <span className={styles.label}>ABOUT</span>
          <h2 className={styles.headingBio}>Olivier Berggruen</h2>
          <p className={styles.body}>{BODY_LONG}</p>
        </div>
        <div className={styles.bioImage}>
          <Image
            src='https://picsum.photos/seed/mv7/600/800'
            alt='Olivier Berggruen'
            fill
            className={styles.img}
          />
        </div>
      </section>
    </div>
  )
}
