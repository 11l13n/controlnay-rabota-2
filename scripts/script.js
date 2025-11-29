// Глобальная переменная для возврата фокуса после модалки
let lastFocusedElement = null;

document.addEventListener("DOMContentLoaded", () => {
    // ==========================
    // ШКАЛЫ НАВЫКОВ / КУРСОВ
    // ==========================
    const bars = document.querySelectorAll(".bars");
    bars.forEach(bar => {
        const level = parseInt(bar.dataset.level, 10) || 0;
        bar.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const span = document.createElement("span");
            if (i < level) {
                span.classList.add("filled");
            }
            bar.appendChild(span);
        }
    });

    // ==========================
    // ДНЕВНИК — ДОБАВЛЕНИЕ ЗАПИСИ
    // ==========================
    const addButton = document.getElementById("addEntry");
    const timeline = document.querySelector(".timeline");

    if (addButton && timeline) {
        addButton.addEventListener("click", () => {
            const text = prompt("Введите новую запись:");
            if (text && text.trim() !== "") {
                const li = document.createElement("li");
                const date = new Date().toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });
                li.innerHTML = `<strong>${date}</strong> — ${text.trim()}`;
                timeline.appendChild(li);
            }
        });
    }

    // ==========================
    // КОНТАКТНАЯ ФОРМА
    // ==========================
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const name = form.elements.name.value.trim();
            const email = form.elements.email.value.trim();
            const message = form.elements.message.value.trim();

            if (!name || !email || !message) {
                alert("Заполните все поля!");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Введите корректный email!");
                return;
            }

            alert("Сообщение успешно отправлено!");
            form.reset();
        });
    }

    // ==========================
    // ФИЛЬТРЫ ПРОЕКТОВ
    // ==========================
    const filterButtons = document.querySelectorAll(".project-filters button");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const category = btn.dataset.filter;

                filterButtons.forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });

                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");

                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    const isVisible =
                        category === "all" || cardCategory === category;

                    card.style.display = isVisible ? "block" : "none";
                });
            });
        });
    }

    // Позволяем открыть карточку по Enter/Space
    projectCards.forEach(card => {
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });
    });
});

// ==========================
// МОДАЛЬНОЕ ОКНО ПРОЕКТОВ
// ==========================
function openModal(title, tech, screenshots, live, code) {
    const modal = document.getElementById("modal");
    if (!modal) return;

    lastFocusedElement = document.activeElement;

    const titleEl = document.getElementById("modal-title");
    const techEl = document.getElementById("modal-tech");
    const screenshotsEl = document.getElementById("modal-screenshots");
    const liveEl = document.getElementById("modal-live");
    const codeEl = document.getElementById("modal-code");

    if (titleEl) titleEl.textContent = title;
    if (techEl) techEl.textContent = tech;
    if (screenshotsEl) screenshotsEl.textContent = screenshots;
    if (liveEl) liveEl.href = live || "#";
    if (codeEl) codeEl.href = code || "#";

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    const closeBtn = modal.querySelector(".close");
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

// Делаем функции доступными для inline-обработчиков в HTML
window.openModal = openModal;
window.closeModal = closeModal;

// Закрытие по клику вне модалки
document.addEventListener("click", event => {
    const modal = document.getElementById("modal");
    if (!modal) return;

    if (event.target === modal) {
        closeModal();
    }
});

// Закрытие по Esc
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});