window.setTimeout(() => {

    if (!route.includes('dashboard')) return

    const area: HTMLTextAreaElement = document.querySelector("#order_description");
    area.style.height = `${area.scrollHeight}px;`;

    area.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = `${this.scrollHeight}px`;
    });
}, 1000);

window.setTimeout(() => {

    if (!route.includes('dashboard')) return

    const select_darkmode: HTMLDivElement = document.querySelector('#select_darkmode')
    const select_type: HTMLDivElement = document.querySelector('#select_type')

    function clearMode() {
        for (let i = 0; i < select_darkmode.childElementCount; i++) {
            select_darkmode.children[i].classList.remove('active')
        }
    }
    function clearType() {
        for (let i = 0; i < select_type.childElementCount; i++) {
            select_type.children[i].classList.remove('active')
        }
    }

    function defaults() {
        clearMode()
        clearType()

        select_darkmode.children[1].classList.add('active')
        select_type.children[0].classList.add('active')

        const colorsInput: HTMLInputElement = document.querySelector('#orderColors')
        colorsInput.value = ''

        const descriptionArea: HTMLTextAreaElement = document.querySelector('#order_description')
        descriptionArea.value = ''
    }

    for (let i = 0; i < select_darkmode.childElementCount; i++) {
        select_darkmode.children[i].addEventListener('click', () => {
            clearMode()
            select_darkmode.children[i].classList.add('active')
        })
    }
    for (let i = 0; i < select_type.childElementCount; i++) {
        select_type.children[i].addEventListener('click', () => {
            clearType()
            select_type.children[i].classList.add('active')
        })
    }

    const confirmButton: HTMLButtonElement = document.querySelector('.confirmOrder')

    confirmButton.addEventListener('click', async () => {
        const actives = document.querySelectorAll('.active')

        const mode: String = actives[0].textContent
        const type: String = actives[1].textContent

        const colorsInput: HTMLInputElement = document.querySelector('#orderColors')
        const colors: String = colorsInput.value

        const descriptionArea: HTMLTextAreaElement = document.querySelector('#order_description')
        const description = descriptionArea.value

        if (colors.length == 0) {
            colorsInput.classList.add('error')
            return
        } else {
            colorsInput.classList.remove('error')
        }
        if (description.length == 0) {
            descriptionArea.classList.add('error')
            return
        } else {
            descriptionArea.classList.remove('error')
        }

        let user = auth.currentUser;
        let database_ref = rdb.ref();

        let random = Math.floor(Math.random() * 9999999)

        const date = new Date

        const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        const currentTime = `${date.getHours()}:${date.getMinutes()}`

        let order_data = {
            darkmode: mode,
            type: type,
            colors: colors,
            description: description,
            date: currentDate,
            time: currentTime
        };

        await database_ref.child(`users/${user.uid}/orders/${random}`).set(order_data)

        defaults()
        window.location.reload()
    })

}, 1000)
