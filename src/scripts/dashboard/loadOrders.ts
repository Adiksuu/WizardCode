window.setTimeout(() => {
    if (!route.includes("dashboard")) return;

    let database_ref = rdb.ref();

    database_ref.child(`users/${auth.currentUser.uid}/orders`).once("value", function (snapshot: any) {
        snapshot.forEach(function (childSnapshot: any) {
            let childData = childSnapshot.val();  

            const orders = document.querySelector('.orders')

            const order = document.createElement('div')

            order.classList.add('order')

            const id = orders.childElementCount

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
                </div>`

            orders.appendChild(order)
        });
    });
    
}, 1000);
