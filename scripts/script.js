document.addEventListener("DOMContentLoaded", () => {
    // Навыки — деления
    const bars = document.querySelectorAll(".bars");
    bars.forEach(bar => {
        const level = parseInt(bar.dataset.level) || 0;
        for (let i = 0; i < 5; i++) {
            const span = document.createElement("span");
            if (i < level) span.classList.add("filled");
            bar.appendChild(span);
        }
    });

    const addButton = document.getElementById("addEntry");
    const timeline = document.querySelector(".timeline");
    if (addButton) {
        addButton.addEventListener("click", () => {
            const text = prompt("Введите новую запись:");
            if (text && text.trim() !== "") {
                const li = document.createElement("li");
                const date = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
                li.innerHTML = `<strong>${date}</strong> — ${text}`;
                timeline.appendChild(li);
            }
        });
    }

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const name = form.elements.name.value.trim();
            const email = form.elements.email.value.trim();
            const message = form.elements.message.value.trim();

            if (!name || !email || !message) return alert("Заполните все поля!");
            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailPattern.test(email)) return alert("Введите корректный email!");
            alert("Сообщение успешно отправлено!");
            form.reset();
        });
    }

    const filterButtons = document.querySelectorAll(".project-filters button");
    const projectCards = document.querySelectorAll(".project-card");
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const category = btn.dataset.filter;
                projectCards.forEach(card => {
                    card.style.display =
                        category === "all" || card.dataset.category === category ? "block" : "none";
                });
            });
        });
    }
});

function openModal(title, tech, screenshots, live, code) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-tech").textContent = tech;
    document.getElementById("modal-screenshots").textContent = screenshots;
    document.getElementById("modal-live").href = live;
    document.getElementById("modal-code").href = code;
    modal.style.display = "flex";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
window.onclick = e => {
    const modal = document.getElementById("modal");
    if (e.target === modal) closeModal();
};