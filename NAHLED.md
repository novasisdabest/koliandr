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

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   záložka **Pages** → **Connect to Git** → vybrat `novasisdabest/koliandr`.

   Musí to být cesta „Connect to Git" nad **existujícím** repozitářem.
   Průvodce „Import a repository" / šablony se pokouší repozitář
   **založit** a skončí chybou *„Cloudflare could not create the Git
   repository right now."* — to není výpadek Cloudflare, jen špatná
   větev průvodce.

   Pokud se `koliandr` v seznamu nenabízí: je privátní a aplikace
   Cloudflare k němu nemá přístup. GitHub → Settings → Applications →
   **Cloudflare Pages** → Configure → *Only select repositories* →
   přidat `koliandr` → Save. Pak se v Cloudflare seznam obnoví.

2. Vyplnit:

   | Pole | zeeko.cz | parkovistenemovitosti.cz |
   | --- | --- | --- |
   | Project name | `zeeko-nahled` | `parkoviste-nahled` |
   | Production branch | `main` | `main` |
   | Framework preset | None | None |
   | Build command | `npm ci && npm run build` | `npm ci && npm run build` |
   | Build output directory | `dist` | `dist` |
   | **Root directory** | `zeeko.cz` | `parkovistenemovitosti.cz` |

   Root directory je to podstatné — bez něj se Cloudflare pokusí stavět
   kořen repozitáře, kde žádný `package.json` není.

3. **Environment variables** → Add:

   | Proměnná | Hodnota |
   | --- | --- |
   | `PUBLIC_PREVIEW` | `true` |
   | `NODE_VERSION` | `22` |

4. **Save and Deploy**. Za ~2 minuty dostaneš adresu
   `https://zeeko-nahled.pages.dev`, druhý projekt obdobně.

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

## Wrangler konfigurace: nepřidávat

V logu buildu se objeví *„No Wrangler configuration detected. Cloudflare
will attempt automatic project configuration."* Je to informace, ne
chyba — statický web žádný `wrangler.toml` nepotřebuje.

Přidávat ho je spíš na škodu: jakmile existuje, stává se zdrojem pravdy
a odpovídající pole v dashboardu zšednou jen na čtení. Build command,
výstupní adresář i root directory by se pak musely spravovat v souboru.

## Alternativa na jedno odpoledne

Pokud nechceš zakládat účet: `npm run build` a výsledný adresář `dist/`
přetáhnout na <https://app.netlify.com/drop>. Adresu dostaneš hned, bez
registrace. Neaktualizuje se sama a po čase zmizí — na jedno ukázání to
stačí, na průběžnou spolupráci ne.

**Pozor:** i tady musí build proběhnout s `PUBLIC_PREVIEW=true`:

```bash
cd zeeko.cz && PUBLIC_PREVIEW=true npm run build
```
