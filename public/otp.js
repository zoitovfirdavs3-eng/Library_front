// OTP Verification JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const pendingEmail = localStorage.getItem('pending_email');
    const otpForm = document.getElementById('otpForm');
    const otpInput = document.getElementById('otpInput');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const emailDisplay = document.getElementById('emailDisplay');

    // Show pending email
    if (pendingEmail && emailDisplay) {
        emailDisplay.textContent = pendingEmail;
    }

    if (!otpForm) return;

    // Form submission handler
    otpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const otp = otpInput.value.trim();
        
        // Validation
        if (!otp || otp.length !== 6) {
            showMessage('Iltimos, 6 xonali OTP kodini kiriting', 'error');
            return;
        }

        // Show loading state
        setLoading(true);
        hideMessage();

        try {
            const response = await verifyOTP(pendingEmail, otp);
            
            if (response.success) {
                showMessage('OTP tasdiqlandi! Tizimga kirilmoqda...', 'success');
                
                // Clear pending email
                localStorage.removeItem('pending_email');
                
                // Redirect to login or dashboard based on response
                setTimeout(() => {
                    if (response.redirectTo === 'dashboard' && response.token) {
                        // Store token and redirect to dashboard
                        localStorage.setItem('accessToken', response.token);
                        window.location.href = '/dashboard';
                    } else {
                        // Redirect to login page
                        window.location.href = '/login';
                    }
                }, 1500);
            } else {
                showMessage(response.message || 'OTP tasdiqlashda xatolik', 'error');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            showMessage('Server xatosi. Iltimos, keyinroq urinib ko\'ring', 'error');
        } finally {
            setLoading(false);
        }
    });

    // OTP input validation
    if (otpInput) {
        otpInput.addEventListener('input', function(e) {
            // Only allow numbers
            e.target.value = e.target.value.replace(/\D/g, '');
            
            // Limit to 6 digits
            if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
            }
        });
    }

    // Helper functions
    async function verifyOTP(email, otp) {
        const BASE_URL = getBaseUrl();
        const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            // Handle specific error cases
            if (response.status === 400) {
                return {
                    success: false,
                    message: 'Noto\'g\'ri OTP kod'
                };
            } else if (response.status === 410) {
                return {
                    success: false,
                    message: 'OTP kod muddati tugagan. Yangi kod so\'rang.'
                };
            } else if (response.status === 429) {
                return {
                    success: false,
                    message: 'Juda ko\'p urunish. Iltimos, birozdan so\'ng urinib ko\'ring.'
                };
            } else {
                return {
                    success: false,
                    message: data.message || 'OTP tasdiqlashda xatolik'
                };
            }
        }

        return {
            success: true,
            message: data.message,
            redirectTo: data.redirectTo || 'login',
            token: data.accessToken
        };
    }

    function getBaseUrl() {
        // Get the base URL from environment or use current origin
        if (typeof VITE_API_URL !== 'undefined') {
            return VITE_API_URL;
        }
        return window.location.origin;
    }

    function showMessage(text, type) {
        if (!messageDiv) return;
        
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    function hideMessage() {
        if (!messageDiv) return;
        messageDiv.style.display = 'none';
    }

    function setLoading(loading) {
        if (!submitBtn) return;
        
        if (loading) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Tekshirilmoqda...';
            submitBtn.classList.add('loading');
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Tasdiqlash';
            submitBtn.classList.remove('loading');
        }
    }
});
