'use client';

import Link from 'next/link';
import styles from './header.module.css';

const NAV_LINKS = [
  { label: 'EVENTS', href: '/events' },
  { label: 'PUBLISHING', href: '/publishing' },
  { label: 'ABOUT', href: '/about' },
];

// Replace with real track data from your CMS or audio player state
const NOW_PLAYING = {
  artists: 'Dev Hynes, Mati Diop, Manon Lutanie',
  title: 'Naked blue',
};

const WAVEFORM_HEIGHTS = [
  6, 10, 18, 28, 22, 14, 32, 40, 36, 24, 16, 38, 44, 30, 20,
  12, 26, 42, 34, 22, 16, 36, 28, 18, 10, 8, 14, 24, 38, 46,
  40, 28, 18, 12, 20, 34, 42, 36, 24, 16,
];

export default function Header() {
  return (
    <header className={styles.header}>

      {/* Logo */}
      <div className={`${styles.cell} ${styles.logo}`}>
        <Link href="/">MONTEVERDE</Link>
      </div>

      {/* Now playing */}
      <div className={`${styles.cell} ${styles.nowPlaying}`}>
        <span>
          {NOW_PLAYING.artists} – <em>{NOW_PLAYING.title}</em>
        </span>
      </div>

      {/* Play button */}
      <div className={`${styles.cell} ${styles.playCell}`}>
        <button className={styles.playButton} aria-label="Play / Pause">
          <span className={styles.playTriangle} />
        </button>
      </div>

      {/* Volume */}
      <div className={`${styles.cell} ${styles.volumeCell}`}>
        <VolumeIcon />
        <div className={styles.volumeTrack}>
          <div className={styles.volumeThumb} />
        </div>
      </div>

      {/* Waveform */}
      <div className={`${styles.cell} ${styles.waveform}`} aria-hidden="true">
        {WAVEFORM_HEIGHTS.map((h, i) => (
          <span key={i} className={styles.bar} style={{ height: h }} />
        ))}
      </div>

      {/* Nav links */}
      {NAV_LINKS.map(({ label, href }) => (
        <div key={label} className={`${styles.cell} ${styles.navCell}`}>
          <Link href={href} className={styles.navLink}>{label}</Link>
        </div>
      ))}

    </header>
  );
}

function VolumeIcon() {
  return (
    <svg className={styles.volIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="2,5 6,5 10,2 10,14 6,11 2,11" fill="currentColor" />
      <path d="M12 5.5 Q14.5 8 12 10.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
