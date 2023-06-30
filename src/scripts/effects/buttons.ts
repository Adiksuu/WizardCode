window.setTimeout(() => {
    const ripples = document.querySelectorAll(".ripple");

    ripples.forEach((button) => {
        button.addEventListener("mouseenter", (e: any) => {
            let x = e.offsetX;
            let y = e.offsetY;

            let effect = document.createElement("span");
            effect.classList.add("ripple_effect");

            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;

            button.appendChild(effect);

            setTimeout(() => {
                effect.remove()
            }, 1000);
        });
    });
}, 500);
