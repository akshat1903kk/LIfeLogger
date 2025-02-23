// static/script.js

// Register Form Handling
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const payload = {
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password")
        };

        try {
            const response = await fetch('/auth/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Registration successful! Redirecting to login...");
                window.location.href = '/';
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail || "Something went wrong"}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const payload = new URLSearchParams();
        payload.append("username", formData.get("username"));
        payload.append("password", formData.get("password"));

        try {
            const response = await fetch('/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload.toString()
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.access_token); // Store token in localStorage
                alert("Login successful! Redirecting...");
                window.location.href = '/dashboard';
            } else {
                const data = await response.json();
                alert(`Error: ${data.detail || "Invalid login credentials"}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
}