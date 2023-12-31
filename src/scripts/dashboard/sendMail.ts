setTimeout(() => {

    if (!route.includes('dashboard')) return

    const mailTitle: HTMLInputElement = document.querySelector('#mailTitle')
    const mailMessage: HTMLTextAreaElement = document.querySelector('#mailMessage')
    const mailConfirm: HTMLButtonElement = document.querySelector('.confirmMail')

    mailConfirm.addEventListener('click', async () => {

        if (!auth.currentUser.emailVerified) {
            showPopup('ERROR', "Sorry but you can't send a mail, you must verify your account before. A verification link has been sent to your email", 'times-circle', 'error')
            auth.currentUser.sendEmailVerification()
            return
        }

        if (mailTitle.value == '' && mailMessage.value == '') return

        let user = auth.currentUser;
        let database_ref = rdb.ref();

        let random = Math.floor(Math.random() * 9999999)

        let mail_data = {
            title: mailTitle.value,
            message: mailMessage.value,
            author: user.email
        };

        await database_ref.child(`mails/${random}`).set(mail_data)
        window.location.reload()
    })
    
}, 2000);