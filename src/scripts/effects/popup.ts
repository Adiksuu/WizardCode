function hidePopup() {
    const popup: HTMLDivElement = document.querySelector('.important_popup')

    popup.style.opacity = '0'

    window.setTimeout(() => {
        popup.remove()
    }, 250)
}

function showPopup(status: string, popupInfo: string, icon: string, color: string) {

    if (route.includes('register') || route.includes('login')) {

        const popup = document.createElement('div');
        
        popup.classList.add('important_popup');
        
        popup.innerHTML = `
        <div class="bg_blur"></div>
        <div class="popup ${color}">
        <h3><i class="fas fa-${icon}"></i></h3>
        <span>${status}</span>
        <p>${popupInfo}</p>
        <button class="ripple" id="hidePopup">Continue</button>
        </div>`;
        
        const main = document.querySelector('.main');

        main.appendChild(popup);

        const hidePopupBtn = document.querySelector('#hidePopup')

        hidePopupBtn.addEventListener('click', hidePopup)
    }
}
