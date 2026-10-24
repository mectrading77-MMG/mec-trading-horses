# MEC HORSES Mobile

Expo / React Native foundation for iOS and Android.

- Existing Next.js website remains the source of truth.
- Public catalogue endpoint: `https://www.mechorses.com/api/public/horses`.
- The endpoint reads horse records from the existing Prisma database and exposes only public catalogue fields.
- Intended locale support: EN, FR, AR, DE, NL.

## Run locally
1. Install Node.js LTS.
2. From this directory run `npm install`.
3. Run `npx expo start` and open the project in Expo Go or a simulator.

## Before release
- Verify the endpoint is deployed and reachable over HTTPS.
- Confirm database records include translations for all five locales; the schema currently documents EN/FR/AR.
- Add branded icon/splash assets, privacy policy, store screenshots, EAS Build config, and test on real iOS/Android devices.
- Do not submit to stores before builds and privacy/security review pass.
