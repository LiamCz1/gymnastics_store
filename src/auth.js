import { supabase } from './supabase-client.js';

async function signupUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { name: name.trim() }
    }
  });
  if (error) throw error;
  return data.user;
}

async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });
  if (error) throw error;
  return data.user;
}

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

async function clearCurrentUser() {
  await supabase.auth.signOut();
  window.dispatchEvent(new Event('storage'));
}

async function refreshAuthNav() {
  const current = await getCurrentUser();
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
    navUsername.textContent = current.user_metadata?.name || current.email;
    if (navAvatar) {
      if (current.user_metadata?.avatar) {
        navAvatar.src = current.user_metadata.avatar;
        navAvatar.style.display = '';
      } else {
        navAvatar.style.display = 'none';
      }
    }
    if (navLogout) {
      navLogout.onclick = async (e) => {
        e.preventDefault();
        await clearCurrentUser();
        window.location.href = 'index.html';
      };
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

// Listen to Supabase auth state changes to update UI
supabase.auth.onAuthStateChange((event, session) => {
  refreshAuthNav();
});
