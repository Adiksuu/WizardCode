function db(selection: string) {
    if (selection == 'orders') {
        const db_selection: HTMLDivElement = document.querySelector('.db_selection')
        const db_orders: HTMLDivElement = document.querySelector('.db_orders')

        db_selection.classList.remove('show')
        db_orders.classList.add('show')
    } else if (selection == 'create') {
        const db_selection: HTMLDivElement = document.querySelector('.db_selection')
        const db_create: HTMLDivElement = document.querySelector('.db_create')

        db_selection.classList.remove('show')
        db_create.classList.add('show')
    }
}

setTimeout(() => {
    if (auth.currentUser) {
        const email: String = auth.currentUser.email

        if (email == 'codeadiksuu@gmail.com') {
            const user_tier: HTMLDivElement = document.querySelector('.user_tier')

            user_tier.classList.add('show')
        }
    }
}, 2000);