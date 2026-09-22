# SportLink — Backend

API NestJS de SportLink. Le produit aide à trouver des lieux de pratique, consulter une bibliothèque de matériel, préparer une séance avec un assistant et sauvegarder des plans personnels.

## Fonctionnalités

- Authentification JWT avec rôles `ADMIN` et `MEMBER`.
- Bibliothèque de matériel sportif via `/equipment`.
- Recherche de lieux via `/places`, proxy en lecture seule vers Data ES ; aucun résultat de recherche n'est persisté.
- Assistant de préparation via `/recommendations/demo` et `/recommendations`.
- Plans personnels via `/plans` et `/plans/me`.
- Administration des utilisateurs et consultation des plans.
- MongoDB Atlas pour les comptes, la bibliothèque et les plans sauvegardés.

SportLink ne gère plus de réservation, de prêt, de retour ni de stock physique.

## Démarrage

```bash
pnpm install
cp .env.example .env
pnpm start:dev
```

Variables principales :

```env
MONGODB_URI=
JWT_SECRET=
LLM_API_KEY=
LLM_BASE_URL=https://api.mistral.ai/v1
LLM_MODEL=mistral-small-latest
CORS_ORIGIN=http://localhost:5173
PORT=3000
```

`DATA_ES_API_KEY` est optionnelle. La recherche Data ES est effectuée à la demande et n'est pas enregistrée par SportLink.

## Endpoints principaux

```text
POST   /auth/register
POST   /auth/login

GET    /equipment
GET    /equipment/:id

GET    /places?location=Melun&sport=football

POST   /recommendations/demo
POST   /recommendations

POST   /plans
GET    /plans/me
DELETE /plans/:id
GET    /plans            # ADMIN
```

## Build

```bash
pnpm build
pnpm start:prod
```
