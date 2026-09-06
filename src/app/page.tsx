'use client';

import styles from './styles/Home.module.css';
import { useState } from 'react';
import TransgateConnect from '@zkpass/transgate-js-sdk';

type StatusType = 'idle' | 'info' | 'success' | 'error';

// zkPass error codes: https://github.com/zkPassOfficial/Transgate-JS-SDK/blob/main/src/error.ts
const NOT_MATCH_REQUIREMENTS = 110001;
const VERIFICATION_CANCELED = 110002;

function isTransgateError(error: unknown): error is { code: number; message: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export default function Home() {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<StatusType>('idle');
  const [isVerifying, setIsVerifying] = useState(false);

  const verify = async () => {
    setIsVerifying(true);
    try {
      const appid = "62303da6-8d05-40a6-938b-4980eeb96464";
      const connector = new TransgateConnect(appid);

      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const schemaId = "ae0b750a7f564e3ebe341ea8892c8a13";

        const res = await connector.launch(schemaId);
        setStatusType('success');
        setStatusMessage('Verified! You are a University of Ghana student.');
        console.log('Verification result:', res);
      } else {
        setStatusType('info');
        setStatusMessage('Please install the TransGate extension from the Chrome Web Store.');
        window.open('https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma?pli=1', '_blank');
      }
    } catch (error) {
      console.log('TransGate verification error:', error);
      setStatusType('error');
      if (isTransgateError(error) && error.code === NOT_MATCH_REQUIREMENTS) {
        setStatusMessage("You don't currently meet the requirements — no collected ID card was found on your record.");
      } else if (isTransgateError(error) && error.code === VERIFICATION_CANCELED) {
        setStatusType('info');
        setStatusMessage('Verification was canceled.');
      } else {
        setStatusMessage('Verification failed. Please check your connection and try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.brandPanel}>
        <div className={styles.brandImage} />
        <div className={styles.brandOverlay} />
        <div className={styles.brandContent}>
          <span className={styles.brandBadge}>UG</span>
          <h2 className={styles.brandTitle}>University of Ghana</h2>
          <p className={styles.brandTagline}>
            Prove your student status without ever revealing your personal data.
          </p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formContent}>
          <span className={styles.eyebrow}>Zero-Knowledge Verification</span>
          <h1 className={styles.title}>Verify Student Status</h1>
          <p className={styles.description}>
            Click below to privately confirm you&apos;re a University of Ghana
            student. Powered by zkPass, no personal data ever leaves your browser.
          </p>

          <button
            className={styles.button}
            onClick={verify}
            disabled={isVerifying}
            aria-busy={isVerifying}
          >
            {isVerifying && <span className={styles.spinner} aria-hidden="true" />}
            {isVerifying ? 'Verifying...' : 'Verify Student Status'}
          </button>

          {statusMessage && (
            <div
              id="statusMessage"
              className={`${styles.statusMessage} ${styles[statusType]}`}
              role="status"
            >
              {statusMessage}
            </div>
          )}

          <p className={styles.poweredBy}>Secured by zkPass TransGate</p>
        </div>
      </div>
    </div>
  );
}
