/**
 * Obsah webu Parkoviště nemovitostí.
 *
 * POZOR — položky označené TODO obsahují obchodní podmínky, které si musí
 * Zdeněk potvrdit (a u zápůjčky nechat zkontrolovat advokátem). Dokud tam
 * zůstane TODO, nesmí web tvrdit konkrétní čísla.
 */

export interface Option {
  readonly key: 'a' | 'b';
  readonly label: string;
  readonly title: string;
  readonly lead: string;
  readonly steps: readonly string[];
  readonly fitFor: string;
}

export const OPTIONS: readonly Option[] = [
  {
    key: 'a',
    label: 'Možnost A',
    title: 'Zaparkovat nemovitost',
    lead: 'Nemovitost odkoupím, vy v ní zůstanete bydlet v nájmu a máte sjednanou možnost budoucího odkupu zpět.',
    steps: [
      'Odkup nemovitosti — závazky se vypořádají z kupní ceny.',
      'Nájemní smlouva — bydlíte dál, nestěhujete se.',
      'Sjednaná možnost zpětného odkupu ve smluvené lhůtě.',
    ],
    fitFor: 'Když je potřeba závazky uzavřít definitivně, ale zároveň neztratit bydlení.',
  },
  {
    key: 'b',
    label: 'Možnost B',
    title: 'Zaparkovat finanční problém',
    lead: 'Nemovitost zůstává vaše. Zajištěná zápůjčka proti nemovitosti vyřeší akutní závazek a získá vám čas.',
    steps: [
      'Posouzení nemovitosti a skutečné výše závazků.',
      'Zápůjčka zajištěná zástavním právem k nemovitosti.',
      'Splacení v dohodnutém termínu, zástava se vymaže.',
    ],
    fitFor: 'Když je nemovitost hodnotná, závazek zvládnutelný a chybí hlavně čas.',
  },
];

export interface Situation {
  readonly title: string;
  readonly body: string;
}

export const SITUATIONS: readonly Situation[] = [
  {
    title: 'Exekuce na nemovitosti',
    body: 'Jedna nebo více exekucí, kde rozhoduje pořadí věřitelů a skutečná výše závazků.',
  },
  {
    title: 'Hrozící dražba',
    body: 'Nařízená dražba, kde je nejdůležitější, kolik času reálně zbývá.',
  },
  {
    title: 'Hypotéka v prodlení',
    body: 'Splátky, které přestaly být udržitelné, a banka už začala jednat.',
  },
  {
    title: 'Zástavy a dluhy',
    body: 'Zástavní práva více věřitelů, kde se nedá jednat s jedním bez druhého.',
  },
  {
    title: 'Insolvence',
    body: 'Probíhající nebo hrozící insolvenční řízení a nemovitost v majetkové podstatě.',
  },
  {
    title: 'Potřeba rychlé hotovosti',
    body: 'Situace, kde je hodnota v nemovitosti, ale peníze jsou potřeba teď.',
  },
];

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly body: string;
}

export const PROCESS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Ozvete se',
    body: 'Stačí popsat situaci — jaká nemovitost, jaké závazky, kolik zbývá času. Nezávazně a bez poplatku.',
  },
  {
    number: '02',
    title: 'Projdu podklady',
    body: 'List vlastnictví, exekuční a insolvenční rejstřík, skutečná výše závazků a pořadí věřitelů.',
  },
  {
    number: '03',
    title: 'Dostanete konkrétní návrh',
    body: 'Buď možnost A, nebo možnost B, nebo poctivé „tohle nedává smysl" — s vysvětlením proč.',
  },
  {
    number: '04',
    title: 'Realizace',
    body: 'Smluvní dokumentace přes advokáta, úschova a vypořádání závazků. Nic neběží mimo papír.',
  },
];

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export const FAQ: readonly Faq[] = [
  {
    question: 'Musím se vystěhovat?',
    answer:
      'U možnosti A ne — nájemní smlouva je součástí řešení. U možnosti B nemovitost ani neměníte, zůstává ve vašem vlastnictví.',
  },
  {
    question: 'Funguje to i s více exekucemi?',
    answer:
      'Ano, to je typický případ. Rozhoduje pořadí věřitelů a skutečná výše závazků, ne jejich počet.',
  },
  {
    question: 'Kolik to stojí, když se nedomluvíme?',
    answer: 'Nic. Posouzení situace a návrh řešení jsou nezávazné a bez poplatku.',
  },
  {
    question: 'Kdo připravuje smlouvy?',
    answer:
      'Advokát. Peníze jdou přes úschovu a závazky se vypořádávají doloženě, ne na slovo.',
  },
  {
    question: 'Jak rychle se to dá stihnout?',
    answer:
      'Záleží na tom, v jaké fázi je exekuce nebo dražba. Proto je první otázka vždy, kolik času reálně zbývá.',
  },
  {
    question: 'Za jakých podmínek?',
    answer:
      'TODO(Zdeněk): doplnit rámec — do jaké výše hodnoty nemovitosti, na jak dlouho, za jakých nákladů. Bez konkrétního rámce zůstane tahle otázka nezodpovězená a lidé se ptají zbytečně.',
  },
];
