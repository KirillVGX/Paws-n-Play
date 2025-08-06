document.addEventListener('DOMContentLoaded', () => {
    const API = 'http://localhost:3000';

    const form = document.getElementById('submitMessage');
    const formSubscibe = document.getElementById('subscribeForm');


    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch(`${API}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    email: form.email.value,
                    message: form.message.value,
                    agreement: form.agreement.checked
                })
            });
            form.reset();
        });
    }

    if (formSubscibe) {
        formSubscibe.addEventListener('submit', async (e) => {
            e.preventDefault();
            await fetch(`${API}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formSubscibe.email.value
                })
            });
            formSubscibe.reset();
        });
    }
});