async function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, uppercase, lowercase, numbers, symbols })
    });

    const data = await response.json();
    document.getElementById('password').value = data.password;
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert("Copied!");
}

async function savePassword() {
    const password = document.getElementById('password').value;

    const response = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    const data = await response.json();
    alert(data.message);
}