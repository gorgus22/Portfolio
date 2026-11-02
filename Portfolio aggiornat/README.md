# Giorgio Mascio — Portfolio

Sito portfolio (Vite + React + TypeScript + Tailwind).

## Modificare i contenuti

Tutti i testi e i progetti stanno in **`src/data/projects.ts`**:

- `site` → nome, nome d'arte, email, profili social, link al CV
- `projectsData` → i progetti, divisi per sezione

Per aggiungere un progetto copia un blocco esistente e cambia i testi.
Le miniature si generano da sole per i link YouTube e Google Drive (i file Drive devono essere condivisi come "Chiunque abbia il link").
Per forzare una miniatura diversa aggiungi `thumb: '/thumbs/nome.jpg'` al media e metti l'immagine in `public/thumbs/`.

## Pagine

- `/` → home (presentazione, profilo, contatti)
- `/digital-art` → pagina Digital Art
- `/visual` → pagina Visual

Il file `vercel.json` fa funzionare questi indirizzi anche aprendoli direttamente o ricaricando la pagina.

## Provarlo sul computer

Serve [Node.js](https://nodejs.org) (versione LTS).

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000

## Metterlo online (GitHub + Vercel, gratis)

1. Crea un account su https://github.com e installa **GitHub Desktop** (https://desktop.github.com).
2. In GitHub Desktop: *File → Add local repository* → scegli questa cartella → "create a repository" → *Publish repository* (puoi lasciarlo privato).
3. Vai su https://vercel.com, accedi con GitHub, *Add New → Project*, scegli il repository e premi **Deploy** (Vercel riconosce Vite da solo).
4. Da qui in poi: ogni volta che fai *Commit* + *Push* da GitHub Desktop, il sito si aggiorna in automatico.
5. (Opzionale) In Vercel → *Settings → Domains* puoi collegare un dominio tuo.

## Immagine di anteprima per i social

Metti un'immagine 1200×630 chiamata `og-image.jpg` dentro `public/`: è quella che appare quando condividi il link.
