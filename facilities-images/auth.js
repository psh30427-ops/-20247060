function toggleRoleFields(role) {
    const fields = document.getElementById('employee-fields');
    const labelCustomer = document.getElementById('label-role-customer');
    const labelEmployee = document.getElementById('label-role-employee');
    
    if (role === 'employee') {
        if (fields) fields.style.display = 'flex';
        if (labelEmployee) labelEmployee.style.background = '#edf2f7';
        if (labelCustomer) labelCustomer.style.background = '#ffffff';
        const empInput = document.getElementById('signup-emp-id');
        const codeInput = document.getElementById('signup-code');
        if (empInput) empInput.required = false; // 임시 가입 테스트를 위해 필수 해제
        if (codeInput) codeInput.required = false; // 임시 가입 테스트를 위해 필수 해제
    } else {
        if (fields) fields.style.display = 'none';
        if (labelEmployee) labelEmployee.style.background = '#ffffff';
        if (labelCustomer) labelCustomer.style.background = '#edf2f7';
        const empInput = document.getElementById('signup-emp-id');
        const codeInput = document.getElementById('signup-code');
        if (empInput) {
            empInput.required = false;
            empInput.value = '';
        }
        if (codeInput) {
            codeInput.required = false;
            codeInput.value = '';
        }
    }
}

// Tab switching
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        history.replaceState(null, '', 'auth.html');
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        history.replaceState(null, '', 'auth.html?tab=signup');
    }
}

// Password visibility toggle
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Password match check
const pwConfirm = document.getElementById('signup-password-confirm');
if (pwConfirm) {
    pwConfirm.addEventListener('input', function () {
        const pw = document.getElementById('signup-password').value;
        const msg = document.getElementById('pw-match-msg');
        if (this.value === '') {
            msg.textContent = '';
        } else if (this.value === pw) {
            msg.textContent = '비밀번호가 일치합니다.';
            msg.className = 'pw-match-msg match';
        } else {
            msg.textContent = '비밀번호가 일치하지 않습니다.';
            msg.className = 'pw-match-msg no-match';
        }
    });
}

// Login handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const remember = document.getElementById('remember-me').checked;

    const users = JSON.parse(localStorage.getItem('batech_users') || '[]');
    const user = users.find(u => u.email === email && u.password === btoa(password));

    if (!user) {
        showAlert('이메일 또는 비밀번호가 올바르지 않습니다.', 'error');
        return;
    }

    const session = { email: user.email, name: user.name, role: user.role || 'customer' };
    if (remember) {
        localStorage.setItem('batech_session', JSON.stringify(session));
    } else {
        sessionStorage.setItem('batech_session', JSON.stringify(session));
    }

    showAlert(`${user.name}님, 환영합니다!`, 'success');
    setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}

// Signup handler
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-password-confirm').value;

    if (password !== confirm) {
        showAlert('비밀번호가 일치하지 않습니다.', 'error');
        return;
    }

    const roleEl = document.querySelector('input[name="signup-role"]:checked');
    const role = roleEl ? roleEl.value : 'customer';
    let empId = '';

    if (role === 'employee') {
        const empIdInput = document.getElementById('signup-emp-id');
        empId = empIdInput ? empIdInput.value.trim() : '';

        // 사원번호를 입력하지 않았거나 아무렇게 입력해도 가입이 가능하도록 설정
        if (!empId) {
            empId = 'EM-' + Math.floor(100 + Math.random() * 900);
        }
    }

    const users = JSON.parse(localStorage.getItem('batech_users') || '[]');
    if (users.find(u => u.email === email)) {
        showAlert('이미 가입된 이메일입니다.', 'error');
        return;
    }

    users.push({ name, email, phone, password: btoa(password), role, empId });
    localStorage.setItem('batech_users', JSON.stringify(users));

    showAlert('회원가입이 완료되었습니다! 로그인 해주세요.', 'success');
    setTimeout(() => switchTab('login'), 1200);
}

// Alert UI
function showAlert(message, type) {
    const existing = document.querySelector('.auth-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.className = `auth-alert auth-alert-${type}`;
    alert.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${message}`;
    alert.style.cssText = `
        position: fixed; top: 90px; left: 50%; transform: translateX(-50%);
        padding: 14px 24px; border-radius: 10px; font-size: 0.95rem; font-weight: 500;
        z-index: 9999; display: flex; align-items: center; gap: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        animation: slideDown 0.3s ease;
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

// Init: check URL param for tab
(function () {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'signup') {
        switchTab('signup');
    }
})();

// Nav auth state (used on all pages via script.js load)
function updateNavAuth() {
    const session = JSON.parse(localStorage.getItem('batech_session') || sessionStorage.getItem('batech_session') || 'null');
    const authBtns = document.querySelector('.nav-auth-buttons');
    if (!authBtns) return;

    if (session) {
        authBtns.innerHTML = `
            <span class="nav-username"><i class="fa-solid fa-user-circle"></i> ${session.name}님 ${session.role === 'employee' ? '<small style="background:#0077b6;color:#fff;padding:2px 6px;border-radius:4px;font-size:0.75rem;margin-left:4px;font-weight:bold;">임직원</small>' : ''}</span>
            <button class="btn-logout" onclick="logout()">로그아웃</button>
        `;

        // 만약 임직원 로그인 상태라면 네비게이션 메뉴에 인트라넷 링크 추가
        const navMenu = document.querySelector('.nav-menu ul');
        if (navMenu && session.role === 'employee') {
            if (!document.getElementById('nav-intranet-item')) {
                const li = document.createElement('li');
                li.id = 'nav-intranet-item';
                li.innerHTML = '<a href="intranet.html" id="nav-intranet">사내 인트라넷</a>';
                navMenu.appendChild(li);
            }
        }
    }
}

function logout() {
    localStorage.removeItem('batech_session');
    sessionStorage.removeItem('batech_session');
    window.location.reload();
}

updateNavAuth();
