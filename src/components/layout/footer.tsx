import styles from './footer.module.css';

const CONTACT = {
  instagram: '@monteverde',
  email: 'info@monteverde-productions.com',
  pressEmail: 'press@monteverde-productions.com',
};

const LEGAL =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec ante nulla. Cras ut mauris eget leo interdum pulvinar non porttitor dui.';

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.logoMark} aria-label="Monteverde logo">
        <MonteVerdeLogoMark />
      </div>

      <address className={styles.contact}>
        <p>
          <em>Instagram:</em>{' '}
          <a href={`https://instagram.com/${CONTACT.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">
            {CONTACT.instagram}
          </a>
        </p>
        <p>
          <em>Contact:</em>{' '}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <p>
          <em>For Press Inquiries Contact:</em>{' '}
          <a href={`mailto:${CONTACT.pressEmail}`}>{CONTACT.pressEmail}</a>
        </p>
      </address>

      <p className={styles.legal}>{LEGAL}</p>

    </footer>
  );
}

function MonteVerdeLogoMark() {
  return (
    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="54" height="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4"  y="8"  width="4" height="32" fill="currentColor" />
      <rect x="10" y="14" width="4" height="26" fill="currentColor" />
      <rect x="16" y="20" width="4" height="20" fill="currentColor" />
      <rect x="22" y="14" width="4" height="26" fill="currentColor" />
      <rect x="28" y="8"  width="4" height="32" fill="currentColor" />
      <rect x="34" y="14" width="4" height="26" fill="currentColor" />
      <rect x="40" y="20" width="4" height="20" fill="currentColor" />
      <rect x="46" y="14" width="4" height="26" fill="currentColor" />
      <text
        x="28" y="52"
        fontFamily="Oswald, sans-serif"
        fontSize="7"
        letterSpacing="1.5"
        textAnchor="middle"
        fill="currentColor"
      >
        MONTEVERDE
      </text>
    </svg>
  );
}
