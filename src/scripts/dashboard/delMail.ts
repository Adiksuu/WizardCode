async function delMail(mailKey: string) {
    const database_ref: any = rdb.ref();

    await database_ref.child(`mails/${mailKey}`).remove()

    const removedOrder: HTMLElement = document.getElementById(mailKey)

    removedOrder.remove()
}