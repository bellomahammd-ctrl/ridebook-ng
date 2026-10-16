const SUPABASE_URL = 'https://oqdjivzqfesjonwgdfxl.supabase.co';
const SUPABASE_KEY = 'PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE';
sb_publishable_Og27rq67na6gto1SXvckyg_STKGQ4pr
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const dialog = document.getElementById('authDialog');
const authForm = document.getElementById('authForm');
const dialogTitle = document.getElementById('dialogTitle');
const dialogEyebrow = document.getElementById('dialogEyebrow');
const nameLabel = document.getElementById('nameLabel');
const fullName = document.getElementById('fullName');
const authSubmit = document.getElementById('authSubmit');
const switchAuth = document.getElementById('switchAuth');
const authMessage = document.getElementById('authMessage');

let authMode = 'signup';

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    authMode = button.dataset.open;

    if (button.dataset.role) {
      document.getElementById('role').value = button.dataset.role;
    }

    updateAuthDialog();
    authMessage.textContent = '';

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  });
});

function updateAuthDialog() {
  const signup = authMode === 'signup';

  dialogEyebrow.textContent = signup
    ? 'JOIN RIDEBOOK NG'
    : 'WELCOME BACK';

  dialogTitle.textContent = signup
    ? 'Create your account'
    : 'Log in to your account';

  nameLabel.hidden = !signup;
  fullName.hidden = !signup;
  fullName.required = signup;

  authSubmit.textContent = signup
    ? 'Create account'
    : 'Log in';

  switchAuth.textContent = signup
    ? 'Already have an account? Log in'
    : 'New here? Create an account';
}

document.getElementById('closeDialog').addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

switchAuth.addEventListener('click', () => {
  authMode = authMode === 'signup' ? 'login' : 'signup';
  authMessage.textContent = '';
  updateAuthDialog();
});

authForm.addEventListener('submit', async event => {
  event.preventDefault();

  authSubmit.disabled = true;
  authMessage.textContent = 'Please wait...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    let result;

    if (authMode === 'signup') {
      const name = fullName.value.trim();

      if (!name) {
        throw new Error('Please enter your full name.');
      }

      result = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (result.error) throw result.error;

      authMessage.textContent = result.data.session
        ? 'Account created successfully! You are signed in.'
        : 'Signup submitted! Check your email to confirm your account.';
    } else {
      result = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (result.error) throw result.error;

      authMessage.textContent = 'Login successful!';
    }
  } catch (error) {
    authMessage.textContent = error.message || 'Something went wrong. Please try again.';
  } finally {
    authSubmit.disabled = false;
  }
});

document.getElementById('rideForm').addEventListener('submit', event => {
  event.preventDefault();

  const pickup = document.getElementById('pickup').value.trim();
  const destination = document.getElementById('destination').value.trim();

  if (!pickup || !destination) return;

  document.getElementById('rideMessage').textContent =
    `Route preview: ${pickup} → ${destination}. Real ride booking is not connected yet.`;
});

const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});
