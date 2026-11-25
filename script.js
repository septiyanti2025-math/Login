
// Mengambil elemen halaman
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const dashboard = document.getElementById("dashboard");

// Menampilkan halaman login
function showLogin() {
    loginPage.classList.remove("hidden");
    registerPage.classList.add("hidden");
    dashboard.classList.add("hidden");
}

// Menampilkan halaman registrasi
function showRegister() {
    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
    dashboard.classList.add("hidden");
}

// Registrasi akun
function register() {
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (username === "" || password === "") {
        alert("Username dan password harus diisi!");
        return;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
        user => user.username === username
    );

    if (userExists) {
        alert("Username sudah digunakan!");
        return;
    }

    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil!");

    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";

    showLogin();
}

// Login akun
function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        item =>
            item.username === username &&
            item.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", username);

        showDashboard(username);

        alert("Login berhasil!");
    } else {
        alert("Username atau password salah!");
    }
}

// Menampilkan dashboard
function showDashboard(username) {
    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    dashboard.classList.remove("hidden");

    document.getElementById("welcomeUser").textContent =
        "Halo, " + username;
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");

    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

    showLogin();

    alert("Anda berhasil logout!");
}

// Memeriksa sesi login saat halaman dibuka
window.onload = function() {
    const username = localStorage.getItem("loggedInUser");

    if (username) {
        showDashboard(username);
    } else {
        showLogin();
    }
};
