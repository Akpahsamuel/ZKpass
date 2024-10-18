# University ID Card Verification

This is a Next.js web application that allows university students to verify if they have collected their ID cards without revealing any sensitive information. The application integrates with zkPass TransGate to ensure privacy-preserving verification using zero-knowledge proofs.

## Features

- A simple user interface where students can check their ID card collection status.
- Integration with zkPass TransGate for decentralized identity verification.
- Privacy-preserving technology ensuring students' sensitive information is not exposed.
- Automatically prompts users to install the zkPass TransGate extension if not already installed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/university-id-verification.git
   cd university-id-verification
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the application:

   Open your browser and navigate to http://localhost:3000 to use the application.

## Usage

Once the application is running, the user can click the "Check Status" button on the homepage to initiate the verification process. The app will check if the zkPass TransGate extension is installed. If it is not, the user will be prompted to install the extension from the Chrome Web Store. If the extension is available, the app will initiate the verification using the provided schema. After verification, the result is displayed on the page (e.g., "Verification successful!" or "Verification failed").

## Prerequisites

- zkPass TransGate Chrome Extension: The application requires the zkPass TransGate Chrome extension to function. If not installed, the user will be prompted to install it.
- Node.js: The app is built using Next.js, so you’ll need Node.js to run it.

## Project Structure

```
/public
    - ugimg.jpg        # Background image (University of Ghana)
/src
    /app
        - page.js      # Main page with the logic for the application
/styles
    - Home.module.css  # Styles for the user interface
```

## Technologies Used

- Next.js: A React framework used for building this application.
- TransGate JS-SDK: For integrating with zkPass to enable decentralized and privacy-preserving verification.
- CSS Modules: For styling the components.

## Known Issues

The application currently only supports desktop browsers with the zkPass TransGate Chrome extension. Ensure that the schema and app ID in the page.js file are correctly configured for the zkPass verification to succeed.

## Future Enhancements

- Add support for more browsers beyond Chrome.
- Implement off-chain or on-chain verification logic after zkPass verification.
- Improve error handling and user feedback during verification failures.
