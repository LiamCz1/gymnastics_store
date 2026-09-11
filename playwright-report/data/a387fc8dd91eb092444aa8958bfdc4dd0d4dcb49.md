# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: google-auth-config.spec.ts >> Google auth configuration >> uses a configurable client ID instead of a hardcoded OAuth credential
- Location: tests\specs\google-auth-config.spec.ts:4:7

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "1028753478315-uiopbg7e2osj31mopfrkhu1ld51h4jd7.apps.googleusercontent.com"
Received string:        "


    const form = document.getElementById('login-form');
    const success = document.getElementById('login-success');
    const error = document.getElementById('login-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.style.display = 'none';
      success.style.display = 'none';

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const submitBtn = form.querySelector('button[type=\"submit\"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';
        await window.auth.loginUser({ email, password });
        success.style.display = 'block';
        setTimeout(() => { window.location.href = 'index.html'; }, 700);
      } catch (err) {
        error.textContent = err.message || 'Failed to sign in.';
        error.style.display = 'block';
      } finally {
        const submitBtn = form.querySelector('button[type=\"submit\"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
      }
    });

    // Google Sign-In callback
    function handleCredentialResponse(response) {
      if (!response || !response.credential) return;
      window.auth.handleGoogleSignIn(response.credential)
        .then(() => { success.style.display = 'block'; setTimeout(() => { window.location.href = 'index.html'; }, 600); })
        .catch(err => { error.textContent = err.message || 'Google sign-in failed'; error.style.display = 'block'; });
    }

    // Render Google button (replace YOUR_GOOGLE_CLIENT_ID)
    window.addEventListener('load', () => {
      try {
        const onloadDiv = document.createElement('div');
        onloadDiv.id = 'g_id_onload';
        onloadDiv.setAttribute('data-client_id', '1028753478315-uiopbg7e2osj31mopfrkhu1ld51h4jd7.apps.googleusercontent.com');
        onloadDiv.setAttribute('data-callback', 'handleCredentialResponse');
        document.body.appendChild(onloadDiv);

        // Initialize Google Identity SDK when available and render the button
        (function initGoogleButton(retries = 0) {
          const container = document.getElementById('login-google-btn');
          if (window.google && google.accounts && google.accounts.id) {
            console.debug('GSI available — initializing login button');
            google.accounts.id.initialize({
              client_id: '1028753478315-uiopbg7e2osj31mopfrkhu1ld51h4jd7.apps.googleusercontent.com',
              callback: handleCredentialResponse
            });
            if (container) {
              google.accounts.id.renderButton(container, { theme: 'outline', size: 'large', text: 'signin_with' });
            }
            try { google.accounts.id.prompt(); } catch (e) { /* optional prompt */ }
          } else if (retries < 10) {
            setTimeout(() => initGoogleButton(retries + 1), 250);
          } else {
            const signinDiv = document.createElement('div');
            signinDiv.className = 'g_id_signin';
            signinDiv.setAttribute('data-type', 'standard');
            document.getElementById('login-form').insertAdjacentElement('beforebegin', signinDiv);
          }
        })();
      } catch (e) { /* ignore */ }
    });

    // Toggle between email and Google login methods
    (function() {
      const btnEmail = document.getElementById('login-method-email');
      const btnGoogle = document.getElementById('login-method-google');
      const form = document.getElementById('login-form');
      const googleContainer = document.getElementById('login-google-container');

      function showEmail() {
        form.style.display = '';
        googleContainer.style.display = 'none';
        btnEmail.classList.add('active');
        btnGoogle.classList.remove('active');
      }
      function showGoogle() {
        form.style.display = 'none';
        googleContainer.style.display = 'flex';
        btnEmail.classList.remove('active');
        btnGoogle.classList.add('active');
      }

      btnEmail.addEventListener('click', showEmail);
      btnGoogle.addEventListener('click', showGoogle);
      // default: show email form
      showEmail();
    })();
  "
```

# Page snapshot

```yaml
- main [ref=e2]:
  - link "← Back to Home" [ref=e3] [cursor=pointer]:
    - /url: index.html
  - heading "Log in to your account" [level=1] [ref=e4]
  - paragraph [ref=e5]: Access your bookings, orders, and account settings.
  - generic [ref=e6]:
    - button "Log in with Email" [ref=e7] [cursor=pointer]
    - button "Log in with Google" [ref=e8] [cursor=pointer]
  - generic [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]: Email address
      - textbox "Email address" [ref=e12]
    - generic [ref=e13]:
      - generic [ref=e14]: Password
      - textbox "Password" [ref=e15]
    - button "Log in" [ref=e16] [cursor=pointer]
  - paragraph [ref=e17]:
    - text: Don't have an account?
    - link "Create one" [ref=e18] [cursor=pointer]:
      - /url: signup.html
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/test-fixtures';
  2  | 
  3  | test.describe('Google auth configuration', () => {
  4  |   test('uses a configurable client ID instead of a hardcoded OAuth credential', async ({ page }) => {
  5  |     await page.goto('/login.html');
  6  | 
  7  |     const scriptText = await page.evaluate(() => {
  8  |       return Array.from(document.querySelectorAll('script'))
  9  |         .map(script => script.textContent || '')
  10 |         .join('\n');
  11 |     });
  12 | 
  13 |     expect(scriptText).toContain('GOOGLE_CLIENT_ID');
> 14 |     expect(scriptText).not.toContain('1028753478315-uiopbg7e2osj31mopfrkhu1ld51h4jd7.apps.googleusercontent.com');
     |                            ^ Error: expect(received).not.toContain(expected) // indexOf
  15 |   });
  16 | });
  17 | 
```