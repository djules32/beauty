# Décisions de design — Christelle Masso Spa & Beauty

Refonte du site https://christellemassospa.fr/, institut de beauté à Chantilly (Oise).
Toutes les décisions ci-dessous ont été prises seul, sans validation client.

---

## 1. Point de départ : ce que l'on garde de la marque

Le site actuel (Zyro/Hostinger) a une identité réelle, même si l'exécution est datée. J'en ai gardé l'essentiel :

| Élément existant | Ce que j'en fais |
|---|---|
| Rose poudré des boutons et fond blush | Gardé : fond crème rosé `#FBF5F1`, sections blush `#F5E8E3`, rose `#E27D9A` en décor |
| Logo ovale magenta avec écriture script | L'ovale devient un monogramme au trait **« cm »** ; le magenta devient la couleur d'accent **framboise** `#A61F52` |
| Titres marron/cacao | Gardé : texte principal cacao `#3B2723` au lieu du noir |
| Police **Bodoni Moda** déjà utilisée | Gardée et mise en avant, en très grand, avec l'axe optique (opsz 96) |
| Accroche « Votre bulle de bien-être » en script | Gardée comme titre du hero et en script dans le pied de page |
| Motif feuille de palmier / fougère | Redessiné en SVG au trait fin (il était en aplat rouge) |
| Motif ligne avec cœur | Redessiné en SVG, utilisé sous les titres de section. C'est la signature de la page |
| Cercle rose derrière les images | Devenu un halo radial très doux derrière l'arche du hero |

Objectif : une cliente habituée reconnaît immédiatement la maison, mais en plus élégant.

## 2. Direction générale : « la carte d'un bel hôtel », pas un template

Pour éviter l'effet « généré par une IA », j'ai écarté volontairement :
- les dégradés violets/roses, le glassmorphism, les blobs animés ;
- la grille de 3 cartes avec icônes et le « Découvrez nos services » ;
- les emojis (✨🩷❤ présents sur le site actuel) ;
- les chiffres inventés (« +500 clientes satisfaites ») et les faux badges. **Aucun contenu n'a été inventé** : tarifs, textes, avis et horaires viennent du site actuel ;
- les coins arrondis partout et les ombres portées génériques.

Choix retenus à la place : une mise en page **éditoriale**, avec beaucoup de blanc, une hiérarchie typographique marquée, des filets fins, une numérotation de section (01 → 05) et des détails d'imprimé (grain papier léger, points de conduite, astérisques en framboise).

## 3. Typographie

- **Bodoni Moda** (titres, prix, noms de soins) : un Didone très contrasté, reprise directe du site actuel. En grande taille, ses déliés fins rappellent l'univers de la parfumerie et du luxe discret, cohérent avec la « cité princière ».
- **Jost** (texte courant, capitales espacées) : une géométrique inspirée de Futura. L'association Didone + géométrique est un classique de la mode (magazines, maisons de couture). Elle remplace Nunito Sans, trop arrondie et trop « appli ».
- **Sacramento** (script monoligne) : utilisée seulement pour trois touches manuscrites (« cité princière », signature « Christelle Moricette », « rien que pour vous »). Elle évoque l'écriture du logo sans l'imiter, et reste rare pour garder son effet.

Échelle fluide en `clamp()` : le titre du hero passe de 48 px sur mobile à environ 100 px sur grand écran.

## 4. Couleurs

```
--paper     #FBF5F1  crème Chantilly (fond)
--paper-2   #F5E8E3  blush (sections alternées)
--rose      #E27D9A  rose de marque — décor uniquement (contraste insuffisant pour du texte)
--ink       #A61F52  framboise — accents, boutons, liens (contraste AA sur le fond crème)
--cocoa     #3B2723  texte
--night     #2A1A19  sections sombres, pied de page
```

Une seule couleur vive (framboise), utilisée avec parcimonie : les italiques des titres, les boutons, les numéros. Le rose clair ne porte jamais de texte, pour l'accessibilité.

## 5. Motifs signature

- **L'arche** : les images principales (hero, visuels de la carte, plan) sont en arche, c'est-à-dire en demi-cercle en haut. Elle reprend la forme ovale du logo et les fenêtres cintrées du château de Chantilly, avec un filet blanc intérieur comme un cadre de fenêtre. L'image du hero apparaît en se dévoilant de bas en haut.
- **La ligne-cœur** sous chaque titre de section : le motif du site actuel, simplifié en un seul trait.
- **La fougère** au trait, en décor discret autour de l'arche et dans le bandeau de réservation.

## 6. Structure de la page

Le site d'origine répartissait tout sur six pages presque vides. J'ai tout regroupé sur **une seule page** fluide, car les tarifs sont ce que l'on cherche en premier :

1. **Hero** : « Votre bulle de bien-être » en très grand, vidéo du massage (celle du site actuel, libre de droits Pexels) dans l'arche, **offre du moment** en carte superposée (avec un point qui pulse doucement), horaires visibles tout de suite.
2. **Bandeau défilant** des prestations en italique : il crée du rythme sans prendre de place.
3. **01 · La praticienne** : grande citation « Prendre soin de vous, ma passion depuis toujours », signature manuscrite, et le **parcours de Christelle** sous forme d'itinéraire en pointillés (Guadeloupe → Saint-Barthélemy → Courchevel → Paris → **Chantilly**). C'est un élément propre à cette marque, que l'on ne peut pas confondre avec un template.
4. **02 · La carte des soins** : quatre onglets (Corps, Visage, Épilation, Mains & pieds) présentés comme une carte de restaurant gastronomique, avec le nom du soin en Bodoni, la durée en petit et le prix aligné à droite. Les formules phares sont marquées d'un point rose. À gauche, une colonne fixe au défilement avec la description, la photo et, pour le corps, un **nuancier des parfums d'huile** (tiaré, jasmin, monoï, thé vert). Les remises étudiants et retraités sont dans une pastille en bas.
5. **Rituel**, en section sombre : la seule rupture de ton de la page, pour parler de l'expérience (serviette chaude, bandeau sur les yeux). Les trois arguments viennent des avis clients et du site.
6. **03 · En institut** : les produits Héliabrine sur une étagère horizontale qui défile (scroll-snap et flèches). J'ai recadré les photos pour retirer les textes incrustés du site d'origine et les remplacer par une vraie typographie.
7. **04 · Avis** : deux avis Google en grande citation, avec une mise en page asymétrique (le second est décalé vers le bas).
8. **05 · Nous trouver** : adresse, horaires et contact en liste à filets, et un plan OpenStreetMap **teinté aux couleurs du site** par un filtre CSS, toujours dans une arche.
9. **Réservation** : un aplat framboise plein, le seul de la page, avec « Offrez-vous ce moment. » et le bouton Planity.

## 7. Parcours de réservation

- Toutes les réservations pointent vers **Planity**, déjà utilisé par l'institut.
- Bouton « Réserver » toujours visible dans l'en-tête.
- Sur mobile, une **barre d'action en bas d'écran** (Appeler / Réserver) apparaît après le hero. Elle remplace la bulle WhatsApp flottante du site actuel, plus intrusive.

## 8. Mouvement

Des animations lentes et rares, en accord avec un spa :
- apparition des blocs au défilement (fondu et légère montée) ;
- dévoilement de l'arche du hero ;
- bandeau défilant très lent (48 s) ;
- survol : décalage léger des lignes de la carte, flèche qui avance dans les boutons.

Tout est désactivé avec `prefers-reduced-motion`. La vidéo est alors remplacée par une image fixe, comme en mode économie de données.

## 9. Accessibilité, SEO, technique

- Onglets ARIA complets (`tablist`/`tab`/`tabpanel`), navigation au clavier (flèches, Début, Fin), focus visible.
- Sans JavaScript, toutes les catégories de la carte restent affichées : rien n'est caché.
- Lien d'évitement, menu mobile qui se ferme avec Échap, textes alternatifs.
- Données structurées `BeautySalon` (adresse, horaires, téléphone), balises Open Graph.
- HTML/CSS/JS pur, sans framework ni étape de build : le site s'héberge n'importe où. Environ 900 Ko d'images optimisées, plus une vidéo de 4,5 Mo chargée seulement si besoin (`preload="metadata"`).
- Images redimensionnées et recompressées, avec `width`/`height` renseignés pour éviter les décalages de mise en page.

## 10. Ce que je n'ai pas fait, volontairement

- Je n'ai pas redessiné le logo officiel : le monogramme « cm » est une déclinaison web. Le vrai logo reste la propriété de la cliente.
- Je n'ai pas ajouté de prestations, prix, notes Google ou chiffres absents du site d'origine.
- Je n'ai pas créé de pages séparées par catégorie. Si le référencement local l'exige plus tard, chaque onglet peut devenir une page avec la même mise en page.
- Mentions légales et politique de confidentialité : les liens pointent vers les pages existantes.

## Arborescence

```
chantilly/
├── index.html
├── decisions.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── img/        (photos recadrées/optimisées + favicon.svg)
    └── video/rituel.mp4
```

Aperçu local : `python3 -m http.server --directory chantilly` puis http://localhost:8000
