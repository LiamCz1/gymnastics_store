// Simple client-side auth helpers using localStorage
// NOTE: This is for demo/local use only — not production-safe.

async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('gymUsers') || '[]');
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem('gymUsers', JSON.stringify(users));
}

function setCurrentUser(user) {
  const { passwordHash, ...sessionUser } = user;
  localStorage.setItem('gymCurrentUser', JSON.stringify(sessionUser));
  window.dispatchEvent(new Event('storage'));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('gymCurrentUser') || 'null');
  } catch (e) {
    return null;
  }
}

function clearCurrentUser() {
  localStorage.removeItem('gymCurrentUser');
  window.dispatchEvent(new Event('storage'));
}

async function signupUser({ name, email, password }) {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('A user with that email already exists.');
  }
  const pwHash = await hashPassword(password);
  const user = { name: name.trim(), email: email.trim().toLowerCase(), passwordHash: pwHash, createdAt: Date.now() };
  users.push(user);
  saveUsers(users);
  setCurrentUser(user);
  return user;
}

async function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('No user with that email was found.');
  const pwHash = await hashPassword(password);
  if (pwHash !== user.passwordHash) throw new Error('Incorrect password.');
  setCurrentUser(user);
  return user;
}

// Update header links based on session
function refreshAuthNav() {
  const current = getCurrentUser();
  const loginLink = document.getElementById('nav-login-link');
  const signupLink = document.getElementById('nav-signup-link');
  const navUser = document.getElementById('nav-user');
  const navUsername = document.getElementById('nav-username');
  const navLogout = document.getElementById('nav-logout-link');
  const navAvatar = document.getElementById('nav-avatar');

  if (current && navUser && navUsername) {
    if (loginLink) loginLink.style.display = 'none';
    if (signupLink) signupLink.style.display = 'none';
    navUser.style.display = 'flex';
    navUsername.textContent = current.name || current.email;
    if (navAvatar) {
      if (current.avatar) {
        navAvatar.src = current.avatar;
        navAvatar.style.display = '';
      } else {
        navAvatar.style.display = 'none';
      }
    }
    if (navLogout) {
      navLogout.addEventListener('click', (e) => {
        e.preventDefault();
        clearCurrentUser();
        window.location.href = 'index.html';
      });
    }
  } else {
    if (loginLink) loginLink.style.display = '';
    if (signupLink) signupLink.style.display = '';
    if (navUser) navUser.style.display = 'none';
  }
}

// Expose functions for pages to call
window.auth = {
  signupUser,
  loginUser,
  getCurrentUser,
  clearCurrentUser
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  refreshAuthNav();
});

// Keep nav in sync when other tabs change auth state
window.addEventListener('storage', () => {
  refreshAuthNav();
});

// Parse a JWT token payload (no verification) to extract user info
function parseJwt (token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const parsed = JSON.parse(decodeURIComponent(escape(json)));
    console.debug('parseJwt -> payload:', parsed);
    return parsed;
  } catch (e) {
    return null;
  }
}

// Handle Google credential response (JWT). Creates/returns local user and signs in.
async function handleGoogleSignIn(credential) {
  console.debug('handleGoogleSignIn -> credential received');
  const payload = parseJwt(credential);
  if (!payload || !payload.email) throw new Error('Invalid Google credential');

  const name = payload.name || payload.given_name || '';
  const email = payload.email.toLowerCase();
  const picture = payload.picture || '';
  console.debug('handleGoogleSignIn -> user:', { name, email });
  const users = getUsers();
  let user = users.find(u => u.email && u.email.toLowerCase() === email);
  if (!user) {
    // Create lightweight user entry for Google sign-ins
    user = { name: name.trim(), email: email, passwordHash: '', google: true, avatar: picture, createdAt: Date.now() };
    users.push(user);
    saveUsers(users);
    console.debug('handleGoogleSignIn -> created local user', user);
  }
  // update avatar if changed
  if (picture && user.avatar !== picture) {
    user.avatar = picture;
    saveUsers(users);
  }

  setCurrentUser(user);
  console.debug('handleGoogleSignIn -> signed in as', user.email);
  return user;
}

// Expose Google handler
window.auth.handleGoogleSignIn = handleGoogleSignIn;

// Global Google Identity callback used by Google Identity script
window.handleCredentialResponse = async function(response) {
  try {
    if (!response || !response.credential) return;
    await handleGoogleSignIn(response.credential);
    // Refresh header UI
    refreshAuthNav();
    // If not on signup/login pages, reload after a short delay to reflect signed-in state
    if (!/signup|login/.test(window.location.pathname)) {
      setTimeout(() => { window.location.reload(); }, 300);
    }
  } catch (e) {
    console.error('Google sign-in failed', e);
  }
};
