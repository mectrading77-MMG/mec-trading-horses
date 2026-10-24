# MEC HORSES Mobile

Expo / React Native application for iOS and Android.

## Current implementation
- Catalogue screen with EN, FR, AR, DE, NL interface labels and status filters.
- Horse detail screen with translated horse fields and image gallery.
- Reads public catalogue data from `https://www.mechorses.com/api/public/horses`.
- EAS build profiles are defined in `eas.json`.
- App icon and Android adaptive icon reference the existing MEC HORSES compact logo assets in the website repository.

## Run locally
1. Install Node.js LTS.
2. From this directory run `npm install`.
3. Run `npx expo start` and open the project in Expo Go or a simulator.

## Build and release setup
1. Create an Expo account at https://expo.dev/ and run `npx eas-cli@latest login`.
2. From this directory run `npx eas-cli@latest build:configure` if further EAS project setup is requested.
3. Create Apple Developer Program membership and App Store Connect access: https://developer.apple.com/programs/ .
4. Create a Google Play Console developer account: https://play.google.com/console/ .
5. Configure signing credentials, create production builds, test on physical devices, complete store listings/privacy declarations, and submit for review.

## Release blockers to verify
- Verify the public endpoint is deployed and reachable over HTTPS; this has not been confirmed from the current environment.
- Confirm the production database has horse translations for EN, FR, AR, DE, and NL. The current data model historically documented EN/FR/AR, so UI translations alone do not guarantee horse content exists in all five languages.
- Run dependency installation, TypeScript checks, and iOS/Android production builds before release.
- Add approved store screenshots, privacy policy URL, support contact, and store metadata.
- Publishing requires the owner to create and authorize the Apple, Google Play, and Expo accounts; account creation and store submission have not been completed.