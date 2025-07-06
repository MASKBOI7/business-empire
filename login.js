/* js/login.js */
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show/hide remember me checkbox
            const rememberMe = document.querySelector('.remember-me');
            if (tab.dataset.tab === 'login') {
                rememberMe.classList.add('visible');
            } else {
                rememberMe.classList.remove('visible');
            }
            
            // Show/hide tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === tab.dataset.tab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Login form handling
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

    // Signup form handling
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            window.location.href = '/welcome';
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    });

    // Check for saved login info
    const savedLogin = localStorage.getItem('loginInfo');
    if (savedLogin) {
        const { username, token } = JSON.parse(savedLogin);
        window.location.href = '/welcome';
    }
});
