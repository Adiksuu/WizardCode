const stats: NodeListOf<Element> = document.querySelectorAll('.stats')
function updateStats() {
    let stat1: number = 0
    let stat2: number = 0
    let stat3: number = 0
    let stat4: number = 0

    setInterval(() => {
        if (stat1 != stats_counters[1]) {
            stat1++
            stats[0].children[1].textContent = `${stat1}`
        }
        if (stat2 != stats_counters[2]) {
            stat2++
            stats[1].children[1].textContent = `${stat2}`
        }
        if (stat3 != stats_counters[3]) {
            stat3++
            stats[2].children[1].textContent = `${stat3}`
        }
        if (stat4 != stats_counters[4]) {
            stat4++
            stats[3].children[1].textContent = `${stat4}`
        }
    }, 150);
}

setTimeout(() => {
    updateStats()
}, 3500);