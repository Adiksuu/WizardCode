function registerCheck() {
    const reg_nickname: HTMLInputElement =
        document.querySelector("#reg_nickname");
    const reg_email: HTMLInputElement = document.querySelector("#reg_email");
    const reg_password: HTMLInputElement =
        document.querySelector("#reg_password");

    if (reg_nickname.value == "") {
        reg_nickname.classList.add("error");
        return
    } else {
        reg_nickname.classList.remove("error");
    }
    if (reg_email.value == "" || !reg_email.value.includes("@")) {
        reg_email.classList.add("error");
        return
    } else {
        reg_email.classList.remove("error");
    }
    if (reg_password.value == "" || reg_password.value.length < 8) {
        reg_password.classList.add("error");
        return
    } else {
        reg_password.classList.remove("error");
    }

    register(reg_email.value, reg_password.value, reg_nickname.value)
}

window.setTimeout(() => {
    if (!route.includes("register")) return;
    const reg_form: HTMLFormElement = document.querySelector("#reg_form");

    reg_form.addEventListener("submit", (event) => {
        event.preventDefault();

        registerCheck();
    });

    const show_pass: HTMLElement = document.querySelector("#show_pass");
    const reg_password: HTMLInputElement =
        document.querySelector("#reg_password");

    show_pass.addEventListener("click", () => {
        if (reg_password.type == "password") {
            reg_password.type = "text";
            show_pass.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            reg_password.type = "password";
            show_pass.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}, 2000);

function register(email: String, password: String, nickname: String) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(async function () {
            let user = auth.currentUser;
            let database_ref = rdb.ref();

            let user_data = {
                email: email,
                password: password,
                nickname: nickname
            };
            showPopup('SUCCESS', 'You have been successfully registered! Do not refresh the page, you will be automatically redirected after registration', 'check-circle', 'success')
            await database_ref.child(`users/${user.uid}`).set(user_data);
            toSite('dashboard')
        })
        .catch(function (error: any) {
            let error_code = error.code;
            let error_message = error.message;

            if (error_code === "auth/wrong-password") {
                showPopup('ERROR', 'Wrong password', 'times-circle', 'error')
            } else if (error_code === "auth/invalid-email") {
                showPopup('ERROR', 'Wrong email', 'times-circle', 'error')
            } else if (error_code === "auth/user-not-found") {
                showPopup('ERROR', 'User cannot be found', 'times-circle', 'error')
            } else if (error_code === "auth/email-already-in-use") {
                showPopup('ERROR', 'This email is already used', 'times-circle', 'error')
            } else {
                showPopup('ERROR', 'Something went wrong... Check console', 'times-circle', 'error')
                console.error(error_message);
            }
        });
}
