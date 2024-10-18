'use client';

import styles from './styles/Home.module.css';
import { useState } from 'react';
import TransgateConnect from '@zkpass/transgate-js-sdk';  // Import the installed TransGate SDK

export default function Home() {
  const [statusMessage, setStatusMessage] = useState('');

  const verify = async () => {
    try {
      const appid = "55274c84-4ce2-4a90-8b77-2c9d1956ed3b"; // Your TransGate project app ID
      const connector = new TransgateConnect(appid); // Initialize the TransGate connector

      // Check if TransGate is available
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "25f27d0605d64a48af55eccb8de422c5"; // Your schema ID

        // Launch the verification process using the schema ID
        const res = await connector.launch(schemaId);
        setStatusMessage('Verification successful!');  // Display success message
        
        // Here, you can add the logic to handle on-chain/off-chain verification
        console.log('Verification result:', res);
      } else {
        setStatusMessage('Please install the TransGate extension from the Chrome Web Store.');
        // Open the Chrome Web Store link in a new tab
        window.open('https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma?pli=1', '_blank');
      }
    } catch (error) {
      console.log('TransGate verification error:', error); // Print the error to console
      setStatusMessage('Verification failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>University ID Card Status</h1>
        <p className={styles.description}>
          Click the button below to check if you have collected your ID card.
        </p>
        <button className={styles.button} onClick={verify}>Check Status</button>
        <div id="statusMessage" className={styles.statusMessage}>{statusMessage}</div>
      </div>
    </div>
  );
}
