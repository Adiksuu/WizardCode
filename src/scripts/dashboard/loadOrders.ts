window.setTimeout(() => {
    if (!route.includes("dashboard")) return;

    if (auth.currentUser) {
        const email: string = auth.currentUser.email;

        if (email === 'codeadiksuu@gmail.com') {
            loadAllOrders();
        } else {
            loadOrders();
        }
    }
}, 2000);

function loadOrders() {
    const database_ref = rdb.ref();

    database_ref.child(`users/${auth.currentUser.uid}/orders`).once("value", function (snapshot: any) {
        snapshot.forEach(function (childSnapshot: any) {
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

    database_ref.child("users").once("value", function (snapshot: any) {
        snapshot.forEach(function (childSnapshot: any) {
            const childKey = childSnapshot.key;
            const childAuthor = childSnapshot.val().email;
            const childAuthorNickname = childSnapshot.val().nickname;

            database_ref.child(`users/${childKey}/orders`).once("value", function (orderSnapshot: any) {
                orderSnapshot.forEach(function (orderChildSnapshot: any) {
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
