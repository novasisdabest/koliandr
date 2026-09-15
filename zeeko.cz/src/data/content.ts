/** Obsah stránky. Přidání případu = jeden objekt v poli, žádný zásah do markupu. */

export interface Pillar {
  readonly number: string;
  readonly title: string;
  readonly body: string;
}

export interface CaseMetric {
  readonly label: string;
  readonly value: string;
  /** `highlight` = výsledek vyjednávání, `total` = finální cena. */
  readonly emphasis?: 'highlight' | 'total';
}

export interface CaseStudy {
  readonly id: string;
  readonly index: string;
  readonly location?: string;
  readonly title: string;
  readonly body: string;
  readonly note?: string;
  readonly metrics: readonly CaseMetric[];
  readonly status: 'published' | 'draft';
}

export const PILLARS: readonly Pillar[] = [
  {
    number: '01',
    title: 'Problémové nemovitosti',
    body: 'Nemovitosti zatížené exekucemi, zástavami, dluhy nebo dalšími právními vadami.',
  },
  {
    number: '02',
    title: 'Investice',
    body: 'Vyhledávání a posuzování nemovitostí, kde komplikovanost vytváří investiční příležitost.',
  },
  {
    number: '03',
    title: 'Vyjednávání',
    body: 'Komunikace s vlastníky, věřiteli, exekutory a dalšími účastníky transakce.',
  },
  {
    number: '04',
    title: 'Řešení',
    body: 'Hledání praktického řešení, které funguje nejen na papíře, ale také v reálném procesu.',
  },
];

export const CASES: readonly CaseStudy[] = [
  {
    id: 'brno-3kk',
    index: 'Případ 01',
    location: 'Brno',
    title: 'Byt 3+1 / Brno',
    body: 'Nemovitost se třemi exekucemi nevypadala na první pohled jako jednoduchá investice. Rozhodující nebyla pouze hodnota bytu, ale pořadí věřitelů, skutečná výše závazků a možnost celý proces bezpečně provést.',
    note: 'Veřejně prezentováno v rozhovoru o investování do problémových nemovitostí.',
    status: 'published',
    metrics: [
      { label: 'Tržní hodnota', value: '3,8 mil. Kč' },
      { label: 'Exekuce na nemovitosti', value: '3' },
      { label: 'Dluhy', value: 'cca 890 tis. Kč' },
      { label: 'Vyjednané dluhy', value: 'cca 480 tis. Kč', emphasis: 'highlight' },
      { label: 'Kupní cena vč. závazků', value: 'cca 3,15 mil. Kč', emphasis: 'total' },
    ],
  },
  {
    id: 'rodinny-dum',
    index: 'Případ 02',
    title: 'Rodinný dům / v přípravě',
    body: 'Detailní případová studie bude brzy zveřejněna.',
    status: 'draft',
    metrics: [],
  },
];

export const TOPICS: readonly string[] = [
  'Exekuce a nemovitosti',
  'Zástavní práva',
  'Jak číst list vlastnictví',
  'Právní vady nemovitostí',
  'Investice do problémových nemovitostí',
  'Vyjednávání s věřiteli',
  'Rizika při koupi zadlužené nemovitosti',
];

export interface FactRow {
  readonly label: string;
  readonly value: string;
  readonly accent?: boolean;
}

export const ABOUT_FACTS: readonly FactRow[] = [
  { label: 'Praxe', value: '20+ let' },
  { label: 'Zaměření', value: 'Problémové nemovitosti' },
  { label: 'Role', value: 'Investor & vyjednavač', accent: true },
];
