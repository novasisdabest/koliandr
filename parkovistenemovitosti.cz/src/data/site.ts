export interface NavItem {
  readonly href: string;
  readonly label: string;
}

export const SITE = {
  name: 'Parkoviště nemovitostí',
  owner: 'Zdeněk Koliandr',
  tagline: 'Když potřebujete peníze nebo čas, nemusíte dělat definitivní rozhodnutí.',
  url: 'https://parkovistenemovitosti.cz',
} as const;

export const CONTACT = {
  whatsappNumber: '420608606866',
  phoneDisplay: '+420 608 606 866',
  phoneHref: 'tel:+420608606866',
  // TODO(Zdeněk): potvrdit, jestli má projekt vlastní e-mail, nebo zůstává zeeko.cz
  email: 'zdenek@zeeko.cz',
  zeeko: 'https://zeeko.cz',
  instagram: 'https://www.instagram.com/zdenekkoliandr/',
} as const;

const WHATSAPP_PREFILL = 'Dobrý den, chci se zeptat na Parkoviště nemovitostí.';

export const whatsappHref = (message: string = WHATSAPP_PREFILL): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoHref = (subject = 'Dotaz — Parkoviště nemovitostí'): string =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

export const NAV: readonly NavItem[] = [
  { href: '#jak-to-funguje', label: 'Jak to funguje' },
  { href: '#pro-koho', label: 'Pro koho to je' },
  { href: '#postup', label: 'Postup' },
  { href: '#otazky', label: 'Časté otázky' },
];
