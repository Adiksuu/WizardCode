setTimeout(() => {
    if (auth.currentUser) {
        if (route.includes('register') || route.includes('login')) {
            toSite('dashboard')
        }
    } else {
        if (route.includes('dashboard')) {
            toSite('')
        }
    }
}, 1000);