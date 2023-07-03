window.setTimeout(() => {
    if (!route.includes("dashboard")) return;

    if (auth.currentUser) {
        const email: string = auth.currentUser.email;

        if (email === 'codeadiksuu@gmail.com') {
            loadAllMails();
        } else {
            loadMails()
        }

    }
}, 2000);

function loadMails() {
    const database_ref = rdb.ref();

    database_ref.child(`mails/`).once("value", function (snapshot: any) {
        snapshot.forEach(function (childSnapshot: any) {
            const childData = childSnapshot.val();  

            const email: string = auth.currentUser.email;

            if (childData.author == email) {
                
                const mails = document.querySelector('.mails_list');

                const mail = document.createElement('div');

                mail.classList.add('order');

                mail.classList.add('mail')

                mail.innerHTML = `
                    <div class="left">
                        <img src="../../src/assets/images/logo.png" alt=""/>
                    </div>
                    <div class="right">
                        <div>
                            <h2>Title</h2>
                            <p>${childData.title}</p>
                        </div>
                        <div>
                            <h2>Message</h2>
                            <button onclick="copyMailMessage('${childData.message}')">Click to copy</button>
                        </div>
                    </div>`

                mails.appendChild(mail)
            }

        });
    });
}

function loadAllMails() {
    const database_ref = rdb.ref();

    database_ref.child(`mails/`).once("value", function (snapshot: any) {
        snapshot.forEach(function (childSnapshot: any) {
            const childData = childSnapshot.val();  

            const mails = document.querySelector('.mails_list');

            const mail = document.createElement('div');

            mail.classList.add('order');

            mail.classList.add('mail')

            mail.innerHTML = `
                <div class="left">
                    <img src="../../src/assets/images/logo.png" alt=""/>
                </div>
                <div class="right">
                    <div>
                        <h2>Author</h2>
                        <p>${childData.author}</p>
                    </div>
                    <div>
                        <h2>Title</h2>
                        <p>${childData.title}</p>
                    </div>
                    <div>
                        <h2>Message</h2>
                        <button onclick="copyMailMessage('${childData.message}')">Click to copy</button>
                    </div>
                </div>`

            mails.appendChild(mail)
        });
    });
}

function copyMailMessage(message: string) {
    const mails = document.querySelector('.mails_list');

    const area: any = document.createElement('textarea')
    area.value = message

    mails.appendChild(area)

    area.select()
    document.execCommand('copy')

    mails.removeChild(area)
}