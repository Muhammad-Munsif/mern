const API_BASE = 'http://localhost:5000/api';


const out = document.getElementById('output');
const setOut = (v) => { out.textContent = typeof v === 'string' ? v : JSON.stringify(v, null, 2); };


// Register
document.getElementById('registerForm').addEventListener('submit', async (e) => {
e.preventDefault();
const f = e.target;
const data = { name: f.name.value, email: f.email.value, password: f.password.value };


const res = await fetch(API_BASE + '/auth/register', {
method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
});


const body = await res.json();
if (res.ok && body.token) {
localStorage.setItem('token', body.token);
setOut(body);
} else {
setOut(body);
}
});


// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
e.preventDefault();
const f = e.target;
const data = { email: f.email.value, password: f.password.value };


const res = await fetch(API_BASE + '/auth/login', {
method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
});


const body = await res.json();
if (res.ok && body.token) {
localStorage.setItem('token', body.token);
setOut(body);
} else {
setOut(body);
}
});


// Get protected profile
document.getElementById('btnProfile').addEventListener('click', async () => {
const token = localStorage.getItem('token');
if (!token) return setOut('No token found; please login first.');


const res = await fetch(API_BASE + '/profile/me', {
headers: { 'Authorization': `Bearer ${token}` }
});
const body = await res.json();
setOut(body);
});


// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
localStorage.removeItem('token');
setO