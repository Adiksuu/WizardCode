var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function toSite(site) {
    window.location.hash = '';
    window.location.search = site;
}
const route = window.location.search.substring(1);
if (route != "") {
    fetch(`./src/routes/${route}.html`)
        .then(function (response) {
        if (!response.ok) {
            window.location.search = "";
        }
        return response.text();
    })
        .then(function (html) {
        document.body.innerHTML = html;
    });
}
window.setTimeout(() => {
    if (!route.includes("dashboard"))
        return;
    if (auth.currentUser) {
        const email = auth.currentUser.email;
        if (email === 'codeadiksuu@gmail.com') {
            loadAllOrders();
        }
        else {
            loadOrders();
        }
    }
}, 2000);
function loadOrders() {
    const database_ref = rdb.ref();
    database_ref.child(`users/${auth.currentUser.uid}/orders`).once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const childData = childSnapshot.val();
            const orders = document.querySelector('.orders');
            const order = document.createElement('div');
            order.classList.add('order');
            const id = orders.childElementCount + 1;
            order.innerHTML = `
                <div class="left">
                    <span>${id}</span>
                    <img
                        src="../../src/assets/images/logo.png"
                        alt=""
                    />
                </div>
                <div class="right">
                    <div>
                        <h2>Date</h2>
                        <p>${childData.date}</p>
                    </div>
                    <div>
                        <h2>Time</h2>
                        <p>${childData.time}</p>
                    </div>
                    <div>
                        <h2>Confirmed</h2>
                        <p>Waiting...</p>
                    </div>
                    <div>
                        <h2>Type</h2>
                        <p>${childData.type}</p>
                    </div>
                    <div>
                        <h2>Cost</h2>
                        <p>Waiting...</p>
                    </div>
                </div>`;
            orders.appendChild(order);
        });
    });
}
function loadAllOrders() {
    const database_ref = rdb.ref();
    database_ref.child("users").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const childKey = childSnapshot.key;
            const childAuthor = childSnapshot.val().email;
            const childAuthorNickname = childSnapshot.val().nickname;
            database_ref.child(`users/${childKey}/orders`).once("value", function (orderSnapshot) {
                orderSnapshot.forEach(function (orderChildSnapshot) {
                    const orders = document.querySelector('.orders');
                    const order = document.createElement('div');
                    order.classList.add('order');
                    order.innerHTML = `
                        <div class="left">
                            <span>${childAuthor} | ${childAuthorNickname}</span>
                            <img
                                src="../../src/assets/images/logo.png"
                                alt=""
                            />
                        </div>
                        <div class="right">
                            <div>
                                <h2>Date</h2>
                                <p>${orderChildSnapshot.val().date}</p>
                            </div>
                            <div>
                                <h2>Time</h2>
                                <p>${orderChildSnapshot.val().time}</p>
                            </div>
                            <div>
                                <h2>Confirmed</h2>
                                <p>Waiting...</p>
                            </div>
                            <div>
                                <h2>Type</h2>
                                <p>${orderChildSnapshot.val().type}</p>
                            </div>
                            <div>
                                <h2>Cost</h2>
                                <p>Waiting...</p>
                            </div>
                        </div>`;
                    orders.appendChild(order);
                });
            });
        });
    });
}
window.setTimeout(() => {
    if (!route.includes('dashboard'))
        return;
    const area = document.querySelector("#order_description");
    area.style.height = `${area.scrollHeight}px;`;
    area.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = `${this.scrollHeight}px`;
    });
}, 2000);
window.setTimeout(() => {
    if (!route.includes('dashboard'))
        return;
    const select_darkmode = document.querySelector('#select_darkmode');
    const select_type = document.querySelector('#select_type');
    function clearMode() {
        for (let i = 0; i < select_darkmode.childElementCount; i++) {
            select_darkmode.children[i].classList.remove('active');
        }
    }
    function clearType() {
        for (let i = 0; i < select_type.childElementCount; i++) {
            select_type.children[i].classList.remove('active');
        }
    }
    function defaults() {
        clearMode();
        clearType();
        select_darkmode.children[1].classList.add('active');
        select_type.children[0].classList.add('active');
        const colorsInput = document.querySelector('#orderColors');
        colorsInput.value = '';
        const descriptionArea = document.querySelector('#order_description');
        descriptionArea.value = '';
    }
    for (let i = 0; i < select_darkmode.childElementCount; i++) {
        select_darkmode.children[i].addEventListener('click', () => {
            clearMode();
            select_darkmode.children[i].classList.add('active');
        });
    }
    for (let i = 0; i < select_type.childElementCount; i++) {
        select_type.children[i].addEventListener('click', () => {
            clearType();
            select_type.children[i].classList.add('active');
        });
    }
    const confirmButton = document.querySelector('.confirmOrder');
    confirmButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        const actives = document.querySelectorAll('.active');
        const mode = actives[0].textContent;
        const type = actives[1].textContent;
        const colorsInput = document.querySelector('#orderColors');
        const colors = colorsInput.value;
        const descriptionArea = document.querySelector('#order_description');
        const description = descriptionArea.value;
        if (colors.length == 0) {
            colorsInput.classList.add('error');
            return;
        }
        else {
            colorsInput.classList.remove('error');
        }
        if (description.length == 0) {
            descriptionArea.classList.add('error');
            return;
        }
        else {
            descriptionArea.classList.remove('error');
        }
        let user = auth.currentUser;
        let database_ref = rdb.ref();
        let random = Math.floor(Math.random() * 9999999);
        const date = new Date;
        const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const currentTime = `${date.getHours()}:${date.getMinutes()}`;
        let order_data = {
            darkmode: mode,
            type: type,
            colors: colors,
            description: description,
            date: currentDate,
            time: currentTime
        };
        yield database_ref.child(`users/${user.uid}/orders/${random}`).set(order_data);
        defaults();
        window.location.reload();
    }));
}, 2000);
function db(selection) {
    if (selection == 'orders') {
        const db_selection = document.querySelector('.db_selection');
        const db_orders = document.querySelector('.db_orders');
        db_selection.classList.remove('show');
        db_orders.classList.add('show');
    }
    else if (selection == 'create') {
        const db_selection = document.querySelector('.db_selection');
        const db_create = document.querySelector('.db_create');
        db_selection.classList.remove('show');
        db_create.classList.add('show');
    }
}
setTimeout(() => {
    if (auth.currentUser) {
        const email = auth.currentUser.email;
        if (email == 'codeadiksuu@gmail.com') {
            const user_tier = document.querySelector('.user_tier');
            user_tier.classList.add('show');
        }
    }
}, 2000);
const auth = firebase.auth();
const rdb = firebase.database();
window.setTimeout(() => {
    const ripples = document.querySelectorAll(".ripple");
    ripples.forEach((button) => {
        button.addEventListener("mouseenter", (e) => {
            let x = e.offsetX;
            let y = e.offsetY;
            let effect = document.createElement("span");
            effect.classList.add("ripple_effect");
            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;
            button.appendChild(effect);
            setTimeout(() => {
                effect.remove();
            }, 1000);
        });
    });
}, 500);
window.setTimeout(() => {
    const loading = document.querySelector('.loading');
    loading.classList.add('hide');
}, 2500);
window.addEventListener("scroll", reveal);
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 50;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active");
        }
    }
}
function activeMobile() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('mobile');
}
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const percent = (scrollTop / (scrollHeight - windowHeight)) * 100;
    const progress = document.querySelector("#progress");
    progress.style.width = `${Math.round(percent)}%`;
});
const stats = document.querySelectorAll('.stats');
function updateStats() {
    let stat1 = 0;
    let stat2 = 0;
    let stat3 = 0;
    let stat4 = 0;
    setInterval(() => {
        if (stat1 != stats_counters[1]) {
            stat1++;
            stats[0].children[1].textContent = `${stat1}`;
        }
        if (stat2 != stats_counters[2]) {
            stat2++;
            stats[1].children[1].textContent = `${stat2}`;
        }
        if (stat3 != stats_counters[3]) {
            stat3++;
            stats[2].children[1].textContent = `${stat3}`;
        }
        if (stat4 != stats_counters[4]) {
            stat4++;
            stats[3].children[1].textContent = `${stat4}`;
        }
    }, 150);
}
setTimeout(() => {
    updateStats();
}, 3500);
const stats_counters = {
    1: '1',
    2: '1',
    3: '0',
    4: '2'
};
setTimeout(() => {
    if (auth.currentUser) {
        if (route.includes('register') || route.includes('login')) {
            toSite('dashboard');
        }
    }
    else {
        if (route.includes('dashboard')) {
            toSite('');
        }
    }
}, 1000);
function loginCheck() {
    const log_email = document.querySelector("#log_email");
    const log_password = document.querySelector("#log_password");
    if (log_email.value == "" || !log_email.value.includes("@")) {
        log_email.classList.add("error");
        return;
    }
    else {
        log_email.classList.remove("error");
    }
    if (log_password.value == "" || log_password.value.length < 8) {
        log_password.classList.add("error");
        return;
    }
    else {
        log_password.classList.remove("error");
    }
    login(log_email.value, log_password.value);
}
window.setTimeout(() => {
    if (!route.includes("login"))
        return;
    const log_form = document.querySelector("#log_form");
    log_form.addEventListener("submit", (event) => {
        event.preventDefault();
        loginCheck();
    });
    const show_pass = document.querySelector("#show_pass");
    const log_password = document.querySelector("#log_password");
    show_pass.addEventListener("click", () => {
        if (log_password.type == "password") {
            log_password.type = "text";
            show_pass.classList.replace("fa-eye", "fa-eye-slash");
        }
        else {
            log_password.type = "password";
            show_pass.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}, 2000);
function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
        toSite("dashboard");
    })
        .catch(function (error) {
        let error_code = error.code;
        let error_message = error.message;
        console.log(error_code, error_message);
    });
}
function registerCheck() {
    const reg_nickname = document.querySelector("#reg_nickname");
    const reg_email = document.querySelector("#reg_email");
    const reg_password = document.querySelector("#reg_password");
    if (reg_nickname.value == "") {
        reg_nickname.classList.add("error");
        return;
    }
    else {
        reg_nickname.classList.remove("error");
    }
    if (reg_email.value == "" || !reg_email.value.includes("@")) {
        reg_email.classList.add("error");
        return;
    }
    else {
        reg_email.classList.remove("error");
    }
    if (reg_password.value == "" || reg_password.value.length < 8) {
        reg_password.classList.add("error");
        return;
    }
    else {
        reg_password.classList.remove("error");
    }
    register(reg_email.value, reg_password.value, reg_nickname.value);
}
window.setTimeout(() => {
    if (!route.includes("register"))
        return;
    const reg_form = document.querySelector("#reg_form");
    reg_form.addEventListener("submit", (event) => {
        event.preventDefault();
        registerCheck();
    });
    const show_pass = document.querySelector("#show_pass");
    const reg_password = document.querySelector("#reg_password");
    show_pass.addEventListener("click", () => {
        if (reg_password.type == "password") {
            reg_password.type = "text";
            show_pass.classList.replace("fa-eye", "fa-eye-slash");
        }
        else {
            reg_password.type = "password";
            show_pass.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}, 2000);
function register(email, password, nickname) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            let user = auth.currentUser;
            let database_ref = rdb.ref();
            let user_data = {
                email: email,
                password: password,
                nickname: nickname
            };
            yield database_ref.child(`users/${user.uid}`).set(user_data);
            toSite('dashboard');
        });
    })
        .catch(function (error) {
        let error_code = error.code;
        let error_message = error.message;
        console.log(error_code, error_message);
    });
}
//# sourceMappingURL=app.js.map