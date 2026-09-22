# SportLink

SportLink aide à préparer une activité sportive : trouver un lieu de pratique, comprendre le matériel utile, obtenir un plan avec l'Assistant SportLink et sauvegarder ses préparations.

Site : https://sportlink-app.site

## Architecture

- `front/` : React + Vite
- `back/` : NestJS + MongoDB
- Data ES : recherche de lieux en direct, sans import dans la base SportLink
- LLM : assistant de préparation sportive
- Comptes : sauvegarde de plans personnels

SportLink ne propose pas de location ni de réservation de matériel ou de terrain.
