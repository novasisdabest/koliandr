# koliandr

Monorepo dvou statických webů Zdeňka Koliandra. Stejný stack, oddělený obsah,
oddělený deploy.

| Složka                      | Doména                      | Účel                                          |
| --------------------------- | --------------------------- | --------------------------------------------- |
| `zeeko.cz/`                 | zeeko.cz                    | Osobní profil — praxe, případy, know-how      |
| `parkovistenemovitosti.cz/` | parkovistenemovitosti.cz    | Projekt pro majitele nemovitostí s problémem  |

## Stack

- **Astro 5** — statický výstup, nula runtime JS kromě 20 řádků mobilního menu
- **Tailwind CSS 4** — CSS-first konfigurace v `src/styles/global.css`
- **TypeScript strict** — obsah je typovaná data, ne markup
- **Fonty self-hostované** (Inter, Playfair Display, IBM Plex Mono, jen latin + latin-ext)

Hosting je **Active24 Webhosting** — Apache/LiteSpeed bez Node runtime.
Build proto běží v GitHub Actions a přes FTPS se nahrává jen obsah `dist/`.

## Vývoj

```bash
cd zeeko.cz          # nebo parkovistenemovitosti.cz
npm install
npm run dev          # http://localhost:4321
npm run build        # astro check + astro build -> dist/
npm run preview      # náhled produkčního buildu
```

Node 22 (`.nvmrc`). `npm run build` spouští i typovou kontrolu — pokud neprojde
`astro check`, build spadne a nic se nenasadí.

## Kde se co mění

| Chci změnit                    | Soubor                                   |
| ------------------------------ | ---------------------------------------- |
| Telefon, e-mail, WhatsApp      | `src/data/site.ts`                       |
| Texty sekcí, případy, FAQ      | `src/data/content.ts`                    |
| Barvy, fonty, odstíny          | `src/styles/global.css` (blok `@theme`)  |
| Bezpečnostní hlavičky, cache   | `public/.htaccess`                       |
| Fotka do hera (zeeko)          | `src/assets/portrait.jpg` — viz níže     |

### Fotka do hera

Hero na `zeeko.cz` hledá `src/assets/portrait.{jpg,png,webp,avif}`.
Dokud tam soubor není, vykreslí se monogramový placeholder a **build nespadne**.
Jakmile soubor přidáš, Astro z něj automaticky vygeneruje AVIF/WebP ve třech
šířkách. Ideální zdroj: na výšku, min. 1200 px široký, obličej v horní třetině.

## Deploy

Push do `main` spustí workflow jen pro tu složku, která se změnila.

Potřebné GitHub secrets (Settings → Secrets and variables → Actions):

| Secret                        | Hodnota                                       |
| ----------------------------- | --------------------------------------------- |
| `ZEEKO_FTP_HOST`              | FTP server z Active24 administrace            |
| `ZEEKO_FTP_USER`              | FTP uživatel                                  |
| `ZEEKO_FTP_PASSWORD`          | FTP heslo                                     |
| `ZEEKO_FTP_REMOTE_DIR`        | docroot, např. `/www/` (ověř v administraci!) |
| `PARKOVISTE_FTP_HOST`         | dtto pro druhý web                            |
| `PARKOVISTE_FTP_USER`         |                                               |
| `PARKOVISTE_FTP_PASSWORD`     |                                               |
| `PARKOVISTE_FTP_REMOTE_DIR`   |                                               |

Deploy nahrává jen změněné soubory — stav si drží v `.ftp-deploy-sync-state.json`
přímo na serveru. `dangerous-clean-slate` musí zůstat `false`, jinak se docroot
vymaže.

### První deploy

1. Ověř docroot v Active24 administraci (`/www/` vs. `/domains/<doména>/public_html/`).
2. Nastav secrets.
3. Actions → *Deploy zeeko.cz* → **Run workflow**.
4. Zkontroluj, že se nahrál i `.htaccess` (skryté soubory některé FTP klienty přeskakují).

## Co ještě chybí

- [ ] `zeeko.cz/src/assets/portrait.jpg` — reálná fotka
- [ ] `public/og-zeeko.jpg` a `public/og-parkoviste.jpg` — 1200×630 náhledy pro sdílení
- [ ] `parkovistenemovitosti.cz/src/data/content.ts` — FAQ „Za jakých podmínek?" má TODO
- [ ] Právní posouzení Možnosti B (viz TODO v `Footer.astro`)
