'use client';

import styles from './styles/Home.module.css';
import { useState } from 'react';
import TransgateConnect from '@zkpass/transgate-js-sdk';

export default function Home() {
  const [statusMessage, setStatusMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = async () => {
    setIsVerifying(true);
    try {
      const appid = "55274c84-4ce2-4a90-8b77-2c9d1956ed3b";
      const connector = new TransgateConnect(appid);

      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "d0324dbb56d24f15bdef0f7dfee108c2";

        const res = await connector.launch(schemaId);
        setStatusMessage('Verification successful!');
        console.log('Verification result:', res);
      } else {
        setStatusMessage('Please install the TransGate extension from the Chrome Web Store.');
        window.open('https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma?pli=1', '_blank');
      }
    } catch (error) {
      console.log('TransGate verification error:', error);
      setStatusMessage('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>University ID Card Status</h1>
        <p className={styles.description}>
          Click the button below to check if you have collected your ID card.
        </p>
        <button
          className={styles.button}
          onClick={verify}
          disabled={isVerifying}
          aria-busy={isVerifying}
        >
          {isVerifying && <span className={styles.spinner} aria-hidden="true" />}
          {isVerifying ? 'Verifying...' : 'Check Status'}
        </button>
        <div id="statusMessage" className={styles.statusMessage}>{statusMessage}</div>
      </div>
    </div>
  );
}
