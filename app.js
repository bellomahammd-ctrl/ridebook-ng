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
    if (button.dataset.role) document.getElementById('role').value = button.dataset.role;
    updateAuthDialog();
    authMessage.textContent = '';
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else alert('Please use a modern browser that supports dialog windows.');
  });
});

function updateAuthDialog() {
  const signup = authMode === 'signup';
  dialogEyebrow.textContent = signup ? 'JOIN RIDEBOOK NG' : 'WELCOME BACK';
  dialogTitle.textContent = signup ? 'Create your account' : 'Log in to your account';
  nameLabel.hidden = !signup;
  fullName.hidden = !signup;
  fullName.required = signup;
  authSubmit.textContent = signup ? 'Create demo account' : 'Log in (demo)';
  switchAuth.textContent = signup ? 'Already have an account? Log in' : 'New here? Create an account';
}

document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
switchAuth.addEventListener('click', () => {
  authMode = authMode === 'signup' ? 'login' : 'signup';
  authMessage.textContent = '';
  updateAuthDialog();
});

authForm.addEventListener('submit', event => {
  event.preventDefault();
  authMessage.textContent = 'Demo only: no account was created. Supabase authentication must be connected before launch.';
});

document.getElementById('rideForm').addEventListener('submit', event => {
  event.preventDefault();
  const pickup = document.getElementById('pickup').value.trim();
  const destination = document.getElementById('destination').value.trim();
  if (!pickup || !destination) return;
  document.getElementById('rideMessage').textContent =
    `Route preview: ${pickup} → ${destination}. This demo does not send a real ride request yet.`;
});

const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('mainNav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
