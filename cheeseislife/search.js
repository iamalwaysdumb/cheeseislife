document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("results");

    if (!input || !results) return;

    let currentIndex = -1;

    input.addEventListener("input", function () {
        const searchTerm = input.value.toLowerCase();
        results.innerHTML = "";
        currentIndex = -1;

        if (searchTerm === "") {
            results.style.display = "none";
            return;
        }

        const filtered = pages.filter(page =>
            page.title.toLowerCase().includes(searchTerm) ||
            page.keywords.toLowerCase().includes(searchTerm)
        );

        if (filtered.length === 0) {
            results.style.display = "none";
            return;
        }

        filtered.forEach((page, index) => {
            const div = document.createElement("div");
            div.classList.add("result-item");

            const highlightedTitle = page.title.replace(
                new RegExp(searchTerm, "gi"),
                match => `<strong>${match}</strong>`
            );

            div.innerHTML = `<a href="${page.url}">${highlightedTitle}</a>`;
            results.appendChild(div);
        });

        results.style.display = "block";
    });

    input.addEventListener("keydown", function (e) {
        const items = results.querySelectorAll(".result-item");

        if (e.key === "ArrowDown") {
            currentIndex++;
            if (currentIndex >= items.length) currentIndex = 0;
            updateSelection(items);
        }

        if (e.key === "ArrowUp") {
            currentIndex--;
            if (currentIndex < 0) currentIndex = items.length - 1;
            updateSelection(items);
        }

        if (e.key === "Enter" && currentIndex >= 0) {
            const link = items[currentIndex].querySelector("a");
            if (link) window.location.href = link.href;
        }
    });

    function updateSelection(items) {
        items.forEach(item => item.classList.remove("active"));
        if (items[currentIndex]) {
            items[currentIndex].classList.add("active");
        }
    }

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".search-container")) {
            results.style.display = "none";
        }
    });
});