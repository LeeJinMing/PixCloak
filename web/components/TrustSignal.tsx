'use client';

import { useState, useEffect } from 'react';

interface TrustSignalProps {
  showDetails?: boolean;
  compact?: boolean;
}

export default function TrustSignal({ showDetails = true, compact = false }: TrustSignalProps) {
  const verificationSteps = [
    'Processing runs in your browser (Canvas API)',
    'Image bytes are not sent to PixCloak servers',
    'You can verify with DevTools → Network while compressing',
    'Third-party analytics (if enabled) are separate from image data',
  ];

  if (compact) {
    return (
      <div style={{
        padding: '8px 12px',
        backgroundColor: '#f0fdf4',
        borderRadius: '6px',
        border: '1px solid #10b981',
        fontSize: '12px',
        color: '#065f46',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>🔒</span>
        <span>Local browser processing</span>
      </div>
    );
  }

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f0fdf4',
      borderRadius: '8px',
      border: '1px solid #10b981',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: showDetails ? '12px' : '0'
      }}>
        <span style={{ fontSize: '18px' }}>🔒</span>
        <h3 style={{
          margin: '0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#065f46'
        }}>
          Privacy-First Processing
        </h3>
        <div style={{
          padding: '2px 6px',
          backgroundColor: '#047857',
          color: 'white',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: '500'
        }}>
          LOCAL ONLY
        </div>
      </div>

      {showDetails && (
        <div>
          <p style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            color: '#065f46',
            lineHeight: '1.5'
          }}>
            Image compression and redaction use the browser Canvas API on your device. PixCloak does not receive your files.
          </p>

          <div style={{ marginBottom: '12px' }}>
            {verificationSteps.map((step, index) => (
              <div key={index} style={{
                fontSize: '13px',
                color: '#065f46',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                • {step}
              </div>
            ))}
          </div>

          <details style={{ fontSize: '12px', color: '#047857' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
              How to verify this yourself
            </summary>
            <div style={{ marginTop: '8px', paddingLeft: '16px' }}>
              <ol style={{ margin: '0', paddingLeft: '16px', lineHeight: '1.4' }}>
                <li>Open browser Developer Tools (F12)</li>
                <li>Go to Network tab and filter by Fetch/XHR</li>
                <li>Upload and process an image</li>
                <li>Confirm no requests carry your image file (blob: URLs are local)</li>
                <li>Optional: go offline and confirm tools still work</li>
              </ol>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

export function NetworkMonitor() {
  const [isOnline, setIsOnline] = useState(true);
  const [externalRequests, setExternalRequests] = useState(0);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      const input = args[0];
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      if (!url.startsWith('blob:') && !url.startsWith('data:')) {
        setExternalRequests((prev) => prev + 1);
      }
      return originalFetch(...args);
    };

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.fetch = originalFetch;
    };
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '8px 12px',
      backgroundColor: isOnline ? '#fef3c7' : '#f0fdf4',
      border: `1px solid ${isOnline ? '#f59e0b' : '#10b981'}`,
      borderRadius: '6px',
      fontSize: '12px',
      color: isOnline ? '#92400e' : '#065f46',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }}>
      <span>{isOnline ? '🌐' : '🔒'}</span>
      <span>{isOnline ? 'Online' : 'Offline'}</span>
      {externalRequests > 0 && (
        <span style={{
          padding: '2px 4px',
          backgroundColor: '#64748b',
          color: 'white',
          borderRadius: '3px',
          fontSize: '10px'
        }} title="Non-blob fetch calls since load (dev only)">
          {externalRequests} fetch
        </span>
      )}
    </div>
  );
}

export function ProcessingDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    'Reading image file...',
    'Decoding in browser memory...',
    'Encoding with Canvas API...',
    'Generating output blob...',
    'Ready for download!'
  ];

  const startDemo = () => {
    setIsProcessing(true);
    setStep(0);

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Processing Demo</h3>

      {isProcessing ? (
        <div>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#e2e8f0',
            borderRadius: '2px',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
            {steps[step]}
          </p>
        </div>
      ) : (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Click to see how local processing works
          </p>
          <button
            onClick={startDemo}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Start Demo
          </button>
        </div>
      )}
    </div>
  );
}
