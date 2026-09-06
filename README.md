# UG Student Verification

An open-source, zero-knowledge student verification tool. It lets an institution, employer, or any third-party organization confirm that someone is a genuine student at a given university — **without that student ever handing over their personal data** to the verifying party.

Under the hood it's powered by [zkPass TransGate](https://zkpass.org/), which generates a cryptographic zero-knowledge proof of the underlying fact (e.g. "this person has an active, ID-card-collected student record") directly in the student's browser. Only the proof — never the student's name, ID number, or portal credentials — is shared with the requesting organization.

Currently configured for the **University of Ghana**, and built to be extended to other institutions — see [Adding another university](#adding-another-university) below.

## How it works

1. The student clicks **Verify Student Status**.
2. The app checks whether the zkPass TransGate browser extension is installed, prompting installation if it's missing.
3. TransGate privately checks the student's university portal session against a predefined verification schema (for UG: an active ID card collection record).
4. TransGate generates a zero-knowledge proof of that fact and returns it to the app — no personal data is ever transmitted to this app or to whoever is requesting the verification.
5. The result ("Verified!" or "Verification failed") is shown immediately.

## Features

- One-click, privacy-preserving proof of student status for any requesting organization.
- Zero personal data exposure — only a cryptographic proof of the underlying fact leaves the student's browser.
- Automatically prompts users to install the zkPass TransGate extension if it's missing.
- Open source and designed to support additional universities beyond UG.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akpahsamuel/ZKpass.git
   cd ZKpass
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

   > The zkPass app ID used by this project is registered with an origin allow-list that only permits `http://localhost:3000`. Running the dev server on a different port (e.g. because 3000 is already in use) will cause verification to fail with an "Origin not allow" error.

## Prerequisites

- **zkPass TransGate Chrome extension** — required for verification to run; the app prompts for installation if it's missing.
- **Node.js** and **pnpm** — to build and run the Next.js app.
- The student must be logged into their university's student portal (currently [UG's](https://sts.ug.edu.gh/services/welcome)) in the same browser so TransGate can privately check their record.

## Project Structure

```
/public
    - ugimg.jpg              # UG campus image for the brand panel
/src
    /app
        - layout.tsx         # Root layout and page metadata
        - page.tsx           # Verification UI and TransGate integration
        - schema.json         # zkPass schema definition used for verification
        /styles
            - Home.module.css # Component styles
tsconfig.json                 # TypeScript configuration
```

## Technologies Used

- **Next.js 14** (App Router) + **React 18** — application framework.
- **TypeScript** — the codebase is fully typed.
- **@zkpass/transgate-js-sdk** — integrates with zkPass TransGate for zero-knowledge verification.
- **Tailwind CSS / CSS Modules** — styling.

## Adding another university

This project ships with one schema (University of Ghana), but the verification flow itself is university-agnostic — anything zkPass can prove about a student portal session can be plugged in. To add a new institution:

1. Define a zkPass schema for that university's student portal (see `src/app/schema.json` for the UG example) and register it in the [zkPass dashboard](https://zkpass.org/).
2. Register a zkPass app ID for the new schema, with the appropriate origin allow-list for your deployment.
3. Wire up the new `appid`/`schemaId` pair in `src/app/page.tsx` (or extend the UI to let a user pick their institution).

Contributions adding support for new universities are welcome.

## Known Issues

- Desktop browsers only — TransGate is currently a Chrome extension.
- Only University of Ghana is supported out of the box; other institutions require their own zkPass schema and app registration (see above).

## Future Enhancements

- Support browsers beyond Chrome.
- Multi-institution selector, so one deployment can verify students across several universities.
- Add on-chain or off-chain verification logic after a successful zkPass proof.
- Improve error handling and user feedback for verification failures (e.g. distinguishing "not a student" from network/extension errors).
