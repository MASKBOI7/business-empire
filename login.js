document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('rememberLogin').checked;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (remember) {
            localStorage.setItem('loginInfo', JSON.stringify({
                username,
                token: data.token
            }));
        }
        
        window.location.href = '/welcome';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
    }
});

// Check for saved login info
document.addEventListener('DOMContentLoaded', () => {
    const savedLogin = localStorage.getItem('loginInfo');
    if (savedLogin) {
        const { username, token } = JSON.parse(savedLogin);
        // Auto-login with saved credentials
        window.location.href = '/welcome';
    }
});
