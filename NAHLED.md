# Sdílení náhledu s klientem

Než bude hosting na Active24, běží náhled na Cloudflare Pages. Zdarma,
napojené na tenhle repozitář, každý push ho aktualizuje.

## Proč ne rovnou ostrá doména

Náhled **musí** běžet s `PUBLIC_PREVIEW=true`. Ta proměnná přidá:

- `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` s `Disallow: /`
- viditelný pruh „Náhled rozpracovaného webu — ostrá adresa bude jiná."

Bez toho by si Google zaindexoval dočasnou adresu a ta by pak
konkurovala ostré doméně jako duplicitní obsah.

## Nastavení (jednorázově, ~5 minut na projekt)

Cloudflare dnes vede i statické weby přes **Workers Builds** (průvodce
říká „Configure your Worker project"). Proti staršímu Pages flow to má
dva rozdíly: je potřeba `wrangler.jsonc` v repozitáři (už tam je) a
**Root directory**, jinak se build spustí v kořeni, kde žádný
`package.json` není.

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Import a repository** → `novasisdabest/koliandr`.

   Pokud se repozitář nenabízí, je privátní a aplikace Cloudflare k němu
   nemá přístup: GitHub → Settings → Applications → Cloudflare →
   Configure → *Only select repositories* → přidat `koliandr`.

2. Vyplnit:

   | Pole | zeeko.cz | parkovistenemovitosti.cz |
   | --- | --- | --- |
   | Project name | `zeeko-nahled` | `parkoviste-nahled` |
   | **Path** (root directory) | `zeeko.cz` | `parkovistenemovitosti.cz` |
   | Build command | `npm ci && npm run build` | `npm ci && npm run build` |
   | Deploy command | `npx wrangler deploy` | `npx wrangler deploy` |

   Pole se v průvodci jmenuje **Path**, ne „Root directory", a je
   předvyplněné `/`. Je hned nad výběrem API tokenu. Bez změny se build
   spustí v kořeni repozitáře a spadne na chybějícím `package.json`.

3. **Build variables**:

   | Proměnná | Hodnota |
   | --- | --- |
   | `PUBLIC_PREVIEW` | `true` |

   Musí to být *build* proměnná — Astro ji čte při buildu, ne za běhu.

4. **API token**: nechat Cloudflare vytvořit nový. Token z jiného
   projektu obvykle nemá potřebná oprávnění a průvodce na to upozorní
   žlutou hláškou.

5. Odškrtnout **Builds for non-production branches**, pokud nechceš
   nasazení z každé větve. Náhled běží z `main`.

6. **Deploy**. Adresa bude `https://zeeko-nahled.<účet>.workers.dev`.

### Co je v `wrangler.jsonc`

```jsonc
{
  "name": "zeeko-nahled",
  "compatibility_date": "2026-09-15",
  "assets": { "directory": "./dist/", "not_found_handling": "404-page" }
}
```

Assets-only Worker: žádný `main`, žádný skript. Requesty obsluhuje
přímo síť Cloudflare, Worker se nespouští, takže se za ně nic neúčtuje.
`not_found_handling` zařídí, že neexistující adresa vrátí naši
`404.html` se správným stavem 404.

**Pozor:** `public/.htaccess` je jen pro Apache na Active24. Na
Cloudflare nedělá nic — bezpečnostní hlavičky a cache pravidla tam
neplatí. Pro náhled to nevadí, na ostrém hostingu se použijí.

## Co poslat klientovi

> Dobrý den,
> náhled webu je na https://zeeko-nahled.pages.dev
> Je to pracovní verze na dočasné adrese, ostrá doména bude jiná.
> Vpravo nahoře je přepínač světlé a tmavé varianty — zajímá mě,
> která vám sedí víc.
> Fotku, texty a případové studie můžeme kdykoliv upravit.

## Aktualizace

`git push` do `main`. Cloudflare postaví a nasadí sám, adresa zůstává.

## Až přijde přístup na Active24

1. Nastavit FTP secrets v GitHubu (viz [README.md](README.md)).
2. Spustit workflow *Deploy zeeko.cz*.
3. Náhledové projekty v Cloudflare **smazat** — dvě živé kopie téhož
   webu jsou zbytečné riziko, i s `noindex`.

## Když Git integrace nejde

Nahrání složky přímo, bez napojení na repozitář. Funguje hned, jen se
neaktualizuje samo — po každé změně příkaz zopakuj.

```bash
npx wrangler login          # jednorázově, otevře prohlížeč

cd zeeko.cz
PUBLIC_PREVIEW=true npm run build
npx wrangler pages deploy dist --project-name zeeko-nahled

cd ../parkovistenemovitosti.cz
PUBLIC_PREVIEW=true npm run build
npx wrangler pages deploy dist --project-name parkoviste-nahled
```

Projekt se při prvním nasazení založí sám (zeptá se na název a
produkční větev). Limity 20 000 souborů / 25 MiB na soubor jsou mimo
dosah — naše buildy mají 21 a 18 souborů, největší 83 kB.

**`PUBLIC_PREVIEW=true` tady musíš napsat ručně** — tahle cesta nezná
proměnné z nastavení projektu v dashboardu.

## Alternativa na jedno odpoledne

Pokud nechceš zakládat účet: `npm run build` a výsledný adresář `dist/`
přetáhnout na <https://app.netlify.com/drop>. Adresu dostaneš hned, bez
registrace. Neaktualizuje se sama a po čase zmizí — na jedno ukázání to
stačí, na průběžnou spolupráci ne.

**Pozor:** i tady musí build proběhnout s `PUBLIC_PREVIEW=true`:

```bash
cd zeeko.cz && PUBLIC_PREVIEW=true npm run build
```
