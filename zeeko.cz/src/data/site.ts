/**
 * Jediný zdroj pravdy pro kontakty a navigaci.
 * V původní šabloně byl WhatsApp odkaz čtyřikrát okopírovaný včetně
 * URL-encoded textu — změna čísla znamenala čtyři místa a jednu zapomenutou.
 */

export interface NavItem {
  readonly href: string;
  readonly label: string;
  /** Zvýrazněná položka (odkaz na samostatný projekt). */
  readonly accent?: boolean;
}

export const SITE = {
  name: 'ZEEKO',
  owner: 'Zdeněk Koliandr',
  role: 'Investor & vyjednavač',
  tagline: 'Nemovitosti. Investice. Složité případy.',
  experience: '20+ let praxe',
  url: 'https://zeeko.cz',
} as const;

export const CONTACT = {
  /** Mezinárodní formát bez mezer a plusu — tak to chce wa.me. */
  whatsappNumber: '420608606866',
  phoneDisplay: '+420 608 606 866',
  phoneHref: 'tel:+420608606866',
  email: 'zdenek@zeeko.cz',
  instagram: 'https://www.instagram.com/zdenekkoliandr/',
  instagramHandle: '@zdenekkoliandr',
  parkoviste: 'https://www.parkovistenemovitosti.cz',
} as const;

const WHATSAPP_PREFILL = 'Dobrý den, mám zájem probrat případ.';

/** wa.me odkaz s předvyplněnou zprávou. */
export const whatsappHref = (message: string = WHATSAPP_PREFILL): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** mailto odkaz s předmětem. */
export const mailtoHref = (subject = 'Dotaz z webu ZEEKO'): string =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

export const NAV: readonly NavItem[] = [
  { href: '#o-mne', label: 'O mně' },
  { href: '#specializace', label: 'Specializace' },
  { href: '#pripady', label: 'Případy z praxe' },
  { href: '#know-how', label: 'Know-how' },
  { href: '#parkoviste', label: 'Parkoviště nemovitostí', accent: true },
];
