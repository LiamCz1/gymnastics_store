(function () {
  const DEFAULT_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  const DEFAULT_ALLOWED_ORIGINS = [
    'http://localhost:4173',
    'http://127.0.0.1:4173'
  ];

  window.GOOGLE_CLIENT_ID = window.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID;
  window.GOOGLE_AUTH_ALLOWED_ORIGINS = window.GOOGLE_AUTH_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS;

  if (window.GOOGLE_CLIENT_ID === DEFAULT_CLIENT_ID) {
    console.warn(
      'Google OAuth is not configured yet. Replace YOUR_GOOGLE_CLIENT_ID in google-config.js and add the current origin to the Google Cloud Console authorized JavaScript origins.'
    );
  }
})();
