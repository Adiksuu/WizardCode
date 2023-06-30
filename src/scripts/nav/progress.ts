window.addEventListener("scroll", () => {
    const scrollTop: number =
        document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight: number =
        document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight: number = window.innerHeight;

    const percent: number = (scrollTop / (scrollHeight - windowHeight)) * 100;

    const progress: HTMLDivElement = document.querySelector("#progress");
    progress.style.width = `${Math.round(percent)}%`;
});
