// ─────────────────────────────────────────────────────────────
//  CONTENUTI DEL PORTFOLIO
//  Per aggiungere un progetto: copia un blocco { id, title, ... }
//  nella sezione giusta e cambia i testi. Non serve toccare App.tsx.
//
//  Tipi di media:
//   - youtube   → link YouTube (anche "non in elenco"), miniatura automatica
//   - drive     → link di condivisione Google Drive (file pubblico),
//                 miniatura automatica dal file
//   - instagram → link a post/storie (si apre su Instagram)
//   - video     → link esterno generico (si apre in un nuovo tab)
//   - image     → immagine: percorso nel sito ('/images/nome.jpg', file in public/images/)
//                 oppure link Drive pubblico (si apre a piena risoluzione)
//  Campo opzionale "thumb": URL o percorso (es. '/thumbs/ember.jpg')
//  per forzare una miniatura diversa da quella automatica.
// ─────────────────────────────────────────────────────────────

export type MediaType = 'youtube' | 'instagram' | 'drive' | 'video' | 'image';

export interface MediaItem {
  type: MediaType;
  url: string;
  caption: string;
  isProcess?: boolean;
  thumb?: string;
  // Solo per type 'video': indirizzo del player da incorporare (es. il link "Incorpora" di OneDrive)
  embed?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  pdfLinks?: { label: string; url: string }[];
  media: MediaItem[];
}

export const site = {
  name: 'Giorgio Mascio',
  stageName: 'Gorgo',
  role: 'Digital Artist & Creative Technologist',
  email: 'giorgiomascio13@gmail.com',
  // Aggiungi qui i tuoi profili: verranno mostrati in navbar e footer.
  socials: [
    // { label: 'Instagram', url: 'https://www.instagram.com/TUO_PROFILO/' },
    // { label: 'YouTube', url: 'https://www.youtube.com/@TUO_CANALE' },
  ] as { label: string; url: string }[],
  // Link al CV in PDF (es. '/Giorgio_Mascio_CV.pdf' dentro la cartella public/). Vuoto = nascosto.
  cvUrl: '',
  // Studi e realtà con cui hai collaborato (mostrati nella sezione Profile)
  collaborations: ['Topic Studio', 'Studio Roof'],
};

const yt = (url: string, caption: string): MediaItem => ({ type: 'youtube', url, caption });

export const projectsData: Record<string, Project[]> = {
  'topic-studio': [
    {
      id: 'beat-breakdown-sickluke',
      title: 'Beat Breakdown — SickLuke',
      category: 'Fluid Simulation · Title Sequence',
      description: 'Simulazioni fluide in Blender integrate in tipografia vettoriale per la title sequence del documentario Beat Breakdown. I liquidi riempiono e abitano le lettere in un sistema dinamico controllato con precisione frame-by-frame.',
      media: [
        {
          type: 'youtube',
          url: 'https://youtu.be/usNm4t8FaeM?si=gI_Pq6VRv5N7krx6',
          caption: 'Beat Breakdown — Documentario completo'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1Jpq2VhGg3hbEjjJ-aN_AkyCsFFfg6Kf9/view?usp=drive_link',
          caption: 'SickLuke CGI & Render Assets'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DRPY1HHguMJ/?img_index=3',
          caption: 'Post Instagram — Behind the scenes'
        }
      ]
    },
    {
      id: '2trap-helmi-sayf',
      title: '2Trap — Helmi & Sayf',
      category: 'Audio-Reactive · 3D Background',
      description: 'Sistema di onde tridimensionali in Blender pilotato direttamente da un\'analisi audio in tempo reale, con interventi manuali di scultura e compositing. La scena tridimensionale è progettata come fondale dinamico per il videoclip degli artisti.',
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1qCl-gbRQ3u7LKPQQeLvre25Z-MVfV07u/view?usp=drive_link',
          caption: 'Processo creativo — Animazione Onde 3D',
          isProcess: true
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/15x5Qe7Isxs9vAEKpKjuCmFdFgwKP4hno/view?usp=drive_link',
          caption: 'Dettagli Shading & Texture'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1WCgNRX8Q1K1UtFrrIfaafPHsWSUGPq4M/view?usp=drive_link',
          caption: 'WIP Shading Onde Realtime'
        },
        {
          type: 'youtube',
          url: 'https://youtu.be/ueiaDj7c2AU?si=fcyS9hRE9tG4Z3H6',
          caption: 'Helmi x Sayf — 2Trap (videoclip ufficiale)'
        }
      ]
    },
    {
      id: 'west-life-ajtracy',
      title: 'West Life — AjTracy',
      category: 'CGI Environment · Set Design',
      description: 'Modellazione e realizzazione delle ambientazioni CGI per diversi shot del videoclip, in stretta collaborazione con il team di Topic Studio. Un lavoro di set design digitale che integra ambienti tridimensionali con il girato reale.',
      media: [
        {
          type: 'youtube',
          url: 'https://youtu.be/sElX3YbsI1o?si=3rAP4TgaN-mgmOb_',
          caption: 'West Life — Videoclip ufficiale (AjTracy)'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DK6zl5esrwg/?img_index=2',
          caption: 'Post Instagram — CGI Environment Render'
        }
      ]
    },
    {
      id: 'skinny-baci-giuda',
      title: 'Skinny — Baci di Giuda',
      category: 'Procedural Animation · Geometry Nodes',
      description: 'Sistema procedurale costruito su Geometry Nodes in Blender per animare un cuore pulsante che progressivamente si cristallizza. L\'intera simulazione — dal battito all\'effetto ghiaccio — è generata in modo non-distruttivo e parametrico.',
      media: [
        {
          type: 'youtube',
          url: 'https://youtu.be/jzkvVr54NqY?si=l1D1biRoc5Ytm0h8',
          caption: 'Skinny — Baci di Giuda (videoclip ufficiale)'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DK9RQ5XMiKF/?img_index=2',
          caption: 'Post Instagram — Procedural Heart Crystal Breakdown'
        }
      ]
    }
  ],
  'sperimentazioni': [
    {
      id: 'frankenstein-overclocked',
      title: 'Frankenstein Overclocked',
      category: 'Modeling · Shading · Compositing',
      description: 'Reinterpretazione cartoon-futuristica di Frankenstein: concept, modellazione e costruzione completa del laboratorio — interni ed esterni — progettati da zero in Blender. Un esercizio totale che attraversa modellazione procedurale, shading avanzato, rendering e compositing.',
      pdfLinks: [
        { label: 'Tavole Props PDF', url: 'https://drive.google.com/file/d/1plsi5-iwbxO-hCDBBuDoJrjM9nsDqL91/view?usp=sharing' },
        { label: 'Presentazione Progetto PDF', url: 'https://drive.google.com/file/d/1owVhk6LFZzUv0PFacGpxzelxJypF2nie/view?usp=sharing' }
      ],
      media: [
        { type: 'drive', url: 'https://drive.google.com/file/d/1IrisNjiEV3bpcCUimjW9kJxk2nOuF5YN/view?usp=drive_link', caption: 'Laboratorio Frankenstein — Render esterno' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1ijvZMNLBI9eDvAmMRiG0M90q_hBMtn5z/view?usp=drive_link', caption: 'Frankenstein Concept & Props' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1KBmCNEEICYhKjtyQ-fmfSJb6sdYh2XFi/view?usp=drive_link', caption: 'Inquadratura del Generatore' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1LXYPNThiRuOAfdhcs2__BHSue7qH83CG/view?usp=drive_link', caption: 'Illuminazione Esterna Giorno' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1AfTj-xuWJGeduFfRsc9HU__QB9ZzR6FY/view?usp=drive_link', caption: 'Frankenstein Wireframe' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1aUKszjUTA7LkSycQ6Atks3v5qt1qU_J5/view?usp=drive_link', caption: 'Laboratorio Interno Dettagli' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1OfIwARcV60xN2ho5tUhIbkA7ESdSi-p8/view?usp=drive_link', caption: 'Animazione Test Shading' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1ktDQMVbumeEFXynW40L2Y-s5lKrPK8zr/view?usp=drive_link', caption: 'Render Finale Frankenstein Overclocked' }
      ]
    },
    {
      id: 'breakbite',
      title: 'BreakBite',
      category: 'Material Synthesis · 3D Displacement & Audio Reactive',
      description: 'La fusione tra materia organica e spazio generativo: creazione fisica di un pannello artistico realizzato con assi di legno di scarto e successiva modellazione 3D che rappresenta una controparte distorta e cibernetica dello stesso. Una coreografia dinamica pilotata in tempo reale in TouchDesigner dalle frequenze della traccia "Balverine" di Kavari.',
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1N0z-m720ATN_LqcEjYbhWgWIzhuwv4Wq/view?usp=drive_link',
          caption: 'Processo creativo — TouchDesigner Feed & Audio Reactive',
          isProcess: true
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/19ikIwolnn2L3tqJC5Dw-DgnWrMvuTdkV/view?usp=drive_link',
          caption: 'Ricostruzione Virtuale del Pannello'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1YNeVBb3Sdg8TzsyxomclaZLe07BlPnZX/view?usp=drive_link',
          caption: 'Test Struttura Legno & Displacement 3D'
        }
      ]
    },
    {
      id: 'ember-burn-system',
      title: 'Ember — Procedural Burn System',
      category: 'Geometry Nodes · Procedural Simulation',
      description: 'Sistema di combustione interamente procedurale realizzato su Geometry Nodes in Blender: il modello — ideato e costruito da zero — brucia, si consuma, si sgretola e si trasforma in cenere viva senza un singolo keyframe manuale. Ogni parametro del processo è animabile e controllabile parametricamente.',
      media: []
    }
  ],
  'visual-eventi': [
    {
      id: 'wild-beats-sistema',
      title: 'Wild Beats — Sistema Drago × Trikster Tribe',
      category: '3D Animation · Projection Panel · Live Visuals',
      description: 'Visual per la superficie di proiezione a spicchi costruita sul palco da Sistema Drago e Trikster Tribe. La divinità dei boschi, statica sul pannello reale, prende vita in una versione 3D animata a tempo con la musica dal vivo.',
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1LxbnMPbdF1Emp84YIN-SQeFY2qUSfJdh/view?usp=drive_link',
          caption: 'Processo creativo — Modellazione & Rigging Animale Sacro 3D',
          isProcess: true
        },
        { type: 'drive', url: 'https://drive.google.com/file/d/1hD7WHiYA1irzzXdWEeMXL--BpxpIRAF1/view?usp=drive_link', caption: 'Oscillazione Corneale a Frequenze Basse' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1Y98rTq9NssfKkAWVSnpFDx3tEGRspY3V/view?usp=drive_link', caption: 'Shading Materiale Organico / Muschio' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1LDuGwCUIv3JJUDpQ0UMltjSCi599o8tc/view?usp=drive_link', caption: 'Loop 3D Sincronia Ritmica Elevata' },
        { type: 'drive', url: 'https://drive.google.com/file/d/17T1tvr7HmCgvqgYfd3HCqPKVcrPkxkLG/view?usp=drive_link', caption: 'Renders di Prova ad Alta Risoluzione' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1PgCNBQ9suqs3uBJqxtL3Nj8FzgyvjvzZ/view?usp=drive_link', caption: 'Compositing in DaVinci Resolve' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1EQ1eYx8anr93g8nfqVQMXNa2LcmvmJut/view?usp=drive_link', caption: 'Workflow di Esportazione Resolume DXV' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1akRLQmP9Pd5unYE8b9cW9DNg-mG9w4EC/view?usp=drive_link', caption: 'Sviluppo Scheletro osseo 3D' },
        { type: 'drive', url: 'https://drive.google.com/file/d/11E0lcoQoCFgJKfEQ6rFLPJimWlQxQRla/view?usp=drive_link', caption: 'Wireframe del Mesh' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1c6JmvEAnaNg6fkK_0ZUD6InPraEIPif5/view?usp=drive_link', caption: 'WIP Shading Occhi e Volumetrici' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1E3PdyW4eEhDB4ycCy6cXoU7Wyq4p0ycw/view?usp=drive_link', caption: 'Render Camera Spostamento Laterale' },
        { type: 'drive', url: 'https://drive.google.com/file/d/10_cyOqXySEzbzNDOdNQNTL2fjlYHHZpQ/view?usp=drive_link', caption: 'Inquadratura Frontale della Maschera' },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/stories/highlights/17943591252038971/',
          caption: 'Stories Live Highlight — Proiezioni Stage Scenico Wild Beats'
        }
      ]
    },
    {
      id: 'fracasso-frastuono',
      title: 'Frastuono',
      category: 'Creature Design · Cube Mapping · Gen-Patterns',
      description: 'Concept e produzione 3D completi: un\'entità asimmetrica costruita su un mockup prospettico per creare un\'illusione ottica tridimensionale dentro il grande cubo sospeso sopra la dancefloor. Patch generative in TouchDesigner, guidate dalle frequenze, animano il contorno.',
      media: [
        {
          type: 'instagram',
          url: 'https://www.instagram.com/stories/highlights/18128791420543132/',
          caption: 'Riprese live — Frastuono Cubo Proiezione sul Sound System'
        }
      ]
    },
    {
      id: 'teksud-sistema-drago',
      title: 'Teksud — Sistema Drago × Trikster Tribe',
      category: 'CGI Character Rigging · Stage Mapping',
      description: 'Installazione visiva per l\'evento Teksud di Sistema Drago e Trikster Tribe. La creatura simbolo dell\'evento è stata modellata in 3D e riggata per sequenze di rotazione complesse. Proiezioni live gestite in tempo reale via Resolume Arena.',
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1RzmqZm-kkZ0ofrxBR7feZvE4zOseJQR8/view?usp=drive_link',
          caption: 'Processo creativo — Rigging Creatura Teksud 3D',
          isProcess: true
        },
        { type: 'drive', url: 'https://drive.google.com/file/d/1247UnSIGgPrX0rijEI_hS9SpQWCiJFbG/view?usp=drive_link', caption: 'Struttura Estetica e Texturizzazione Creatura' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1vCtc8h0vpHbRK7kI_ncvNaRjOHGTd5Eg/view?usp=drive_link', caption: 'Volo Tridimensionale & Volumetric Glow' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1yeCLkeTWJhekKYF4BwT3E3VwVdPEtaTh/view?usp=drive_link', caption: 'Simulatore Artigli e Luci Reattive' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1WieCqQGsHzq33S86jrhilB1QIkDBUaXF/view?usp=drive_link', caption: 'Esportazione Loop Resolume' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1pF0DgxycMigGBPe2mBdlSITAPu1Clp2J/view?usp=drive_link', caption: 'Render Inquadratura Primaria' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1-kKVO2fTAF9_JpAIG6xhryfEdIoqWqed/view?usp=drive_link', caption: 'Fondale Dinamico Generativo' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1Sud-yfj0TTh0cODKig6BpcWS8dUVor4d/view?usp=drive_link', caption: 'Test Mappatura Angolo Proiezione' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1yqKCEUbuUtQ57SUTQs02P2xtgbbFgpog/view?usp=drive_link', caption: 'Texture Shader Chimico Creatura' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1vvO7VZXKzVxLbtPiBCUqXnPVtfHqO-OF/view?usp=drive_link', caption: 'Dettagli Poligonali Finali' },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/stories/highlights/17869612548545990/',
          caption: 'Stories Instagram — Teksud Live Performance Feed'
        }
      ]
    },
    {
      id: 'samurai-visuals',
      title: 'Samurai Visuals — Shameless',
      category: 'AI 3D Reconstruction · Projection Mapping · TouchDesigner',
      description: 'Dal disegno 2D sul pannello di proiezione dell\'evento è stato ricostruito un modello 3D con l\'intelligenza artificiale, poi rimodellato, texturizzato e riggato per animazioni in loop con rotazioni cinematiche. Loop lavorati in DaVinci Resolve ed esportati per Resolume Arena; patch generative in TouchDesigner estendono i visual in base all\'analisi audio.',
      media: [
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DWHZPArNaTE/',
          caption: 'Post Instagram — Documentazione della scenografia'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/stories/highlights/18187184086346967/',
          caption: 'Riprese live — Samurai Visuals per Shameless (Highlights)'
        }
      ]
    },
    {
      id: 'cheshire-cat-shameless',
      title: 'Cheshire Cat — Shameless',
      category: 'Loop 3D · Projection Mapping',
      description: 'Per l\'evento Shameless di Halloween: un loop 3D dello Stregatto e una serie di loop di carte da gioco, pensati per il mapping e in tema con la serata.',
      media: [
        yt('https://youtube.com/shorts/d9D7R_bXQA4', 'Gatto — reel 2'),
        yt('https://youtu.be/nGkEgkDfhCk', 'Shameless afterparty'),
        yt('https://youtu.be/yHRDsZJicfs', 'Cheshire Cat — loop 3D'),
        yt('https://youtu.be/P9eZcskRN0w', 'Cheshire Cat — clip 1'),
        yt('https://youtu.be/H7zemxqZuDE', 'Cheshire Cat — clip 2')
      ]
    },
    {
      id: 'gianna-nannini',
      title: 'Gianna Nannini',
      category: 'Loop 3D · Montaggio',
      description: 'Loop 3D e montaggio dei visual per Gianna Nannini: render delle scene, ripresa in camera e still delle singole scene in formato LED wall.',
      media: [
        yt('https://youtu.be/HlPnnwl1TP4', 'Render'),
        yt('https://youtu.be/kuN7m9E20Q8', 'Ripresa con videocamera'),
        { type: 'image', url: 'https://drive.google.com/file/d/124PjgmGHTPSuEb5BBQPNb8nkX0KzJNSK/view', caption: 'Still scena 1' },
        { type: 'image', url: 'https://drive.google.com/file/d/1nmx0_9gbBbKSzUXVypUotTq3YuP6RyJJ/view', caption: 'Still scena 2' },
        { type: 'image', url: 'https://drive.google.com/file/d/1IBFHTXIka8EEkzd5YBKDaYTo7jp0g45v/view', caption: 'Still scena 4' },
        { type: 'image', url: 'https://drive.google.com/file/d/1e8FO4vfntn2C41BTu8xHjA5w7iZuRdgH/view', caption: 'Still scena 5' },
        { type: 'image', url: 'https://drive.google.com/file/d/1IZp-3QwousTTpbF0GKqyRlVtD-sz2NXW/view', caption: 'Still scena 6' },
        { type: 'image', url: 'https://drive.google.com/file/d/1QBOeFUbayrtmLO-iNZhCQMih3RPF0UhC/view', caption: 'Still scena 7' },
        { type: 'image', url: 'https://drive.google.com/file/d/1tbxcivSiv-Pl7hZ5y8trCi1XjyJ0oah6/view', caption: 'Still scena 8' },
        { type: 'image', url: 'https://drive.google.com/file/d/1ETw8116GDM3MGq3_nbLuPSmuHXM79wjR/view', caption: 'Still scena 9' },
        { type: 'image', url: 'https://drive.google.com/file/d/1uKYMelJ0OdJWBy-FDDOIqj7nscVTvZ15/view', caption: 'Still scena 10' },
        { type: 'image', url: 'https://drive.google.com/file/d/1aaU3jKDISXtBn8pAzjyp9AVqzrdSFCYf/view', caption: 'Still scena 12' },
        { type: 'image', url: 'https://drive.google.com/file/d/18CHDUwRF2yQku9I5ScblIRL98oQpD2hV/view', caption: 'Still scena post' }
      ]
    },
    {
      id: 'milano-dogana',
      title: 'Milano Dogana',
      category: 'Live 3D · TouchDesigner Patch · Depth Scanner',
      description: 'Visual sperimentali generati in tempo reale con i nuovi nodi 3D di TouchDesigner e uno scanner di profondità: la scena viene ricostruita e deformata dal vivo, senza contenuti pre-renderizzati.',
      media: [
        yt('https://youtu.be/uzIR1YVtup4', 'Patch TouchDesigner — registrazione 1'),
        yt('https://youtu.be/w7kuNwAyk8s', 'Patch TouchDesigner — registrazione 2'),
        yt('https://youtu.be/CGuEK9BjqgU', 'Patch TouchDesigner — registrazione 3'),
        yt('https://youtube.com/shorts/Ng-P6WINRv8', 'Ripresa dal vivo — 1'),
        yt('https://youtube.com/shorts/pZNkJ7fY_Ms', 'Ripresa dal vivo — 2'),
        yt('https://youtube.com/shorts/8biNuYw7gdQ', 'Ripresa dal vivo — 3'),
        yt('https://youtube.com/shorts/lVaJZoJ5fcw', 'Ripresa dal vivo — 4'),
        yt('https://youtube.com/shorts/rbBvsLhS7k0', 'Ripresa dal vivo — 5')
      ]
    },
    {
      id: 'kytrame-visual',
      title: 'Kytrame Visual',
      category: 'Loop 3D · Live Visuals',
      description: 'Visual creati per il DJ Kytrame del collettivo Overkast e proiettati al Kindergarten: una serie di loop 3D costruiti sull\'identità del suo set.',
      media: [
        yt('https://youtu.be/FhdaEVvGVZs', 'Kytrame Visual — loop principale'),
        yt('https://youtube.com/shorts/2GRWqq3ckmo', 'Kytrame Visual — clip 1'),
        yt('https://youtube.com/shorts/Emli_S3-sco', 'Kytrame Visual — clip 2'),
        yt('https://youtube.com/shorts/JIEFUrtsbY8', 'Kytrame Visual — clip 3')
      ]
    },
    {
      id: 'shameless-ingranaggi',
      title: 'Shameless Ingranaggi',
      category: 'Mechanical Design · Interactive Visuals',
      description: 'Progetto gemello di Samurai, costruito su grandi composizioni di ingranaggi in accoppiamento cinetico. Approccio snello e budget contenuto senza rinunciare all\'estetica industrial-techno: loop stabili ed eleganti, sincronizzati sui BPM.',
      media: [
        { type: 'drive', url: 'https://drive.google.com/file/d/16oxmMC72NaA6JGlPigau-Wp8Ms6xozoS/view?usp=drive_link', caption: 'Ingranaggi industriali — Render loop principale' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1rHODqf-gizCnudEE13kvH_kU2MTIbFou/view?usp=drive_link', caption: 'Ancoraggio Tridimensionale Meccanismi' }
      ]
    },
    {
      id: 'visual-grandi-eventi',
      title: 'Visual per Grandi Eventi',
      category: 'Physics Simulation · Electronic Scenic Loops',
      description: 'Visual animati in Blender con simulazioni fisiche a gravità alterata, fluidi ad alta densità e luce volumetrica. Loop originariamente concepiti per schermi LED su larga scala in grandi eventi di musica elettronica e clubbing moderno.',
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1DxVJ0JfP5AmZB-8JWJivuoDV4eer5Tnn/view?usp=drive_link',
          caption: 'Loop 04 — Solidi oscillanti'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1NNU2aCUg-NUeYqaRaIq9LCBYd0_Xq8vr/view?usp=drive_link',
          caption: 'Loop 01 — Cinetica metallica'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1S0Bz8xa8dVMpnVSSkP9UFsmTj-Gzvqqc/view?usp=drive_link',
          caption: 'Loop 02 — Flusso chimico e fluido'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1Br_34IhptgYDeeR-DxWifvUQkuH-DLrQ/view?usp=drive_link',
          caption: 'Loop 03 — Dispersione energetica'
        }
      ]
    }
  ],
  'visual-installazioni': [
    {
      id: 'progetto-multipla',
      title: 'Progetto Multipla',
      category: 'Ethical AI · Local Generation',
      description: 'Sperimentazioni sulle potenzialità di un\'intelligenza artificiale etica, fatta girare interamente in locale sul proprio computer, senza dipendere da servizi cloud.',
      media: [
        yt('https://youtu.be/fa9KiIVi98k', 'Progetto Multipla — sperimentazioni')
      ]
    },
    {
      id: 'the-binding',
      title: 'The Binding',
      category: 'Kinect · Stream Diffusion · TouchDesigner · Interactive Installation',
      description: 'Installazione interattiva e contemplativa che unisce il tracciamento dello scheletro (sensore di profondità Kinect) alla generazione di immagini in tempo reale con Stream Diffusion, il tutto in TouchDesigner. Lo spettatore è insieme generatore e destinatario: con i gesti modifica prompt e parametri dell\'immagine.',
      pdfLinks: [
        { label: 'PDF Dossier Progetto', url: 'https://drive.google.com/file/d/1FjYZhYipPtNrlxg2l-ZFHFdM7SXckOPr/view?usp=sharing' }
      ],
      media: [
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1n0TiNRywBTq2IE26Dz9-RjbAjdTDfE3r/view?usp=drive_link',
          caption: 'The Binding — Prova Generale Generazione d\'Immagini'
        },
        {
          type: 'drive',
          url: 'https://drive.google.com/file/d/1ssnYu7JgQZFjWJ7iXw92BjI0SVVtTZRp/view?usp=drive_link',
          caption: 'Test Interattività Corporea Kinect ed Output Visivo'
        }
      ]
    },
    {
      id: 'reactive-glitches',
      title: 'Reactive Glitches',
      category: 'Kinect Depth · Glitch Aesthetics · TouchDesigner · Digital Mirror',
      description: 'Uno specchio digitale disturbato e meditativo. In TouchDesigner i dati di profondità del Kinect diventano vettori che generano distorsioni video e glitch cromatici controllati. La fisicità dello spettatore modula la densità estetica dell\'installazione.',
      media: [
        {
          type: 'video',
          url: 'https://1drv.ms/v/c/9e659d20fb4022e9/IQDNndOY0gEiSoNl2bIbseRxAZ0vzmhbWewWZ2PQbpv3kWQ?e=y8cgJi',
          caption: 'Video patch — Reactive Glitches demo (Link Interno)'
        }
      ]
    },
    {
      id: 'stream-diffusion-research',
      title: 'Stream Diffusion Experiments',
      category: 'AI Research · Stable Diffusion · Real-Time',
      description: 'Ricerca tecnica sull\'uso di Stable Diffusion in tempo reale a bassa latenza. Ottimizzazione di noise, seed ciclici e feedback loop per mantenere l\'output fluido durante le esibizioni dal vivo.',
      media: [
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DA9Ge1wImZf/',
          caption: 'Stream Diffusion — Test di Coerenza Fluida 01'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/p/DAqoR1XCN2O/',
          caption: 'Stream Diffusion — Risultati ad Alta Risoluzione 02'
        },
        {
          type: 'instagram',
          url: 'https://www.instagram.com/reel/DA1M__viS8S/',
          caption: 'Stream Diffusion — Breakdown Tecnico Pipeline Latency'
        }
      ]
    },
    {
      id: 'altri-progetti-vari',
      title: 'Altri Progetti',
      category: 'Archivio · Sperimentazioni visive',
      description: 'Archivio in continuo aggiornamento: visual, frammenti procedurali, simulazioni e sculture digitali realizzati in Blender o in tempo reale per show e realtà culturali indipendenti.',
      media: [
        { type: 'drive', url: 'https://drive.google.com/file/d/1dn3DO2ykVjd-NjakoWFdOeo4KSVWWDwj/view?usp=drive_link', caption: 'Visual Experiment — Fluidic Dynamics #1' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1bnYWlcGvC3kBKP0HdG2RJCQnILyK-uE_/view?usp=drive_link', caption: 'Visual Experiment — Chrome Displacement' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1PSaHPdRNhYG6kchZxJzNHNj9hOsfI4LE/view?usp=drive_link', caption: 'Visual Experiment — Cyber Matrix Feed' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1ixigETnUGTCppFPjtBuiAbJpxCehYswY/view?usp=drive_link', caption: 'Visual Experiment — Organic Node Grow' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1VJ_vJXThD4w6I4451YqETlUKZpItAopX/view?usp=drive_link', caption: 'Visual Experiment — Neon Grid Shift' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1-a1PcKKy-h5kb28ax-uT9-2i2JzeW9We/view?usp=drive_link', caption: 'Visual Experiment — Fracture Physics' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1e6Gk0rg5FWtANEoOs1FVA2NRZT9ZaOFU/view?usp=drive_link', caption: 'Visual Experiment — Smoke Geometry Flow' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1BjD4og3VUzrH4ffuFxq8etnDB24YfUi0/view?usp=drive_link', caption: 'Visual Experiment — Lowpoly Cybernetic' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1gF0-d3YR48pvLF0DeVaroSS8ffP5kM_R/view?usp=drive_link', caption: 'Visual Experiment — Golden Ratio Waves' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1p5dz0WCVzr4EbCX_M0dWtst6Zw8S3uHn/view?usp=drive_link', caption: 'Visual Experiment — Glitch Particles' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1AKQhnRstGaf5Ezf54iwtB-fY5SzJ1RwA/view?usp=drive_link', caption: 'Visual Experiment — Subsurface Glow Sphere' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1SOI3fKjjSF1GbEUNcDkN29Ciih8zi4IJ/view?usp=drive_link', caption: 'Visual Experiment — Dynamic Wireframe Cage' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1-MoouFIM49VGwClnhyGEK6sDXu1EQ-RQ/view?usp=drive_link', caption: 'Visual Experiment — Organic Morphing' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1kMNs8O5DvWELLSYVG7L9eS0zUZn2QqOG/view?usp=drive_link', caption: 'Visual Experiment — Metallic Noise Array' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1mI5oxmbEuTDIZa7xM-7oDZurhAtpwxhp/view?usp=drive_link', caption: 'Visual Experiment — Virtual Architecture' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1x9k0ehzF9fS_heiff7zP4gg7PW369XDr/view?usp=drive_link', caption: 'Visual Experiment — Mirror Squeeze' },
        { type: 'drive', url: 'https://drive.google.com/file/d/10tFFKhWzxO4nfRBYrbizVIAhjCGqb8tN/view?usp=drive_link', caption: 'Visual Experiment — Abstract Techno Wave' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1mPT9TbmOxRab89-L8IDCsCn8wkZX-vsE/view?usp=drive_link', caption: 'Visual Experiment — Synthetic Spore' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1nXbxm42nQVAqFyiPrwxZmTna0Hk7RTg4/view?usp=drive_link', caption: 'Visual Experiment — Hologram Mesh' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1yjvaTSUhklccv93XZNza9erDrCBKbevJ/view?usp=drive_link', caption: 'Visual Experiment — Corrosive Matter' },
        { type: 'drive', url: 'https://drive.google.com/file/d/14eVviVa5gYlxHUccU38HYwFe8tRT85Fr/view?usp=drive_link', caption: 'Visual Experiment — Bio-Cyber Nodes' },
        { type: 'drive', url: 'https://drive.google.com/file/d/1r9zdDUwJcaaSF18lRHFpKngLwzpTGu0p/view?usp=drive_link', caption: 'Visual Experiment — Liquid Chrome Loops' }
      ]
    }
  ]
};
