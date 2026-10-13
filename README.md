# Fluir Labs: legal pages

Static pages for Fluir Labs apps, served by GitHub Pages at https://ichagas.github.io/fluirlabs/ (no build step, no scripts, nothing that tracks).

| Page | Path |
|---|---|
| Privacy Policy (English) | `/privacy/pizzaria/` |
| Política de Privacidade (Português) | `/privacy/pizzaria/pt-BR/` |
| Drive Dash Pro Privacy Policy (English) | `/privacy/drivedashpro/` |
| Drive Dash Pro Política de Privacidade (Português) | `/privacy/drivedashpro/pt-BR/` |
| AdMob seller file | `/app-ads.txt` |

## Before publishing

1. Developer name: **Fluir Labs**. Public contact: **fluirgames@gmail.com** (use only this address in the pages).
2. `node check.mjs` must pass. It fails if a page still has a `[[...]]` placeholder, a local link is broken, or the two languages have a different number of sections.
3. Keep the policy true: if the app starts collecting something new (analytics, accounts, a new ad network, a new permission), change the policy and its date **before** the app ships.

## Where the URL goes

- AdMob: Privacy & messaging → the consent message asks for the privacy policy URL.
- App Store Connect: App Information → Privacy Policy URL (and App Privacy answers).
- Google Play Console: App content → Privacy policy (and Data safety).
- `app-ads.txt` must be served at the root of the developer website you list in the store listing and in AdMob.
