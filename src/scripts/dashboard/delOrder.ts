async function delOrder(orderKey: string, userKey: string) {
    const database_ref: any = rdb.ref();

    await database_ref.child(`users/${userKey}/orders/${orderKey}`).remove()

    const removedOrder: HTMLElement = document.getElementById(orderKey)

    removedOrder.remove()
}