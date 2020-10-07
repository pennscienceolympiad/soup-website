window.addEventListener('load', () => {
    if (window.location.hash.length > 0) {
        const id = window.location.hash.substring(1).replace(/\W/g, '');
        const content = document.querySelector("#" + id + ".tab-content");
        const tab = document.querySelector(".tab[data-id='" + id + "']");
        if (content != null) {
            content.closest(".tab-contents").querySelectorAll(".tab-content").forEach(e => {
                e.classList.remove("active");
            });
            content.classList.add("active");
        }
        if (tab != null) {
            tab.closest(".tabs").querySelectorAll(".tab").forEach(e => {
                e.classList.remove("active");
            });
            tab.classList.add("active");
        }
    }
    document.querySelectorAll(".tabs .tab").forEach(e => {
        e.addEventListener("click", () => {
            e.closest(".tabs").querySelectorAll(".tab").forEach(e => {
                e.classList.remove("active");
                document.querySelector("#" + e.getAttribute("data-id")).classList.remove("active");
            });
            e.classList.add("active");
            const hash = "#" + e.getAttribute("data-id");
            document.querySelector(hash).classList.add("active");
            history.pushState(null, null, hash);
        });
    });
});