// Открытие и закрытие мобильного меню
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню" : "Открыть меню"
    );
  });

  // На телефоне меню закрывается после выбора раздела
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
    });
  });
}

// Подстановка сегодняшней даты как минимальной даты вылета
const dateInput = document.querySelector('input[name="date"]');

if (dateInput) {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  dateInput.min = localDate;
}

// Кнопка меняет местами выбранные города
const swapButton = document.querySelector("#swap-cities");
const citySelects = document.querySelectorAll(
  '.flight-form select[name="from"], .flight-form select[name="to"]'
);

if (swapButton && citySelects.length === 2) {
  swapButton.addEventListener("click", () => {
    const firstCity = citySelects[0].value;
    citySelects[0].value = citySelects[1].value;
    citySelects[1].value = firstCity;
  });
}

// Поиск рейса работает как демонстрация и не обращается к серверу
const flightForm = document.querySelector("#flight-form");
const flightMessage = document.querySelector("#flight-message");

if (flightForm && flightMessage) {
  flightForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(flightForm);
    const from = formData.get("from");
    const to = formData.get("to");
    const date = formData.get("date");
    const passengers = formData.get("passengers");

    if (from === to) {
      flightMessage.textContent =
        "Выберите разные города отправления и прибытия.";
      return;
    }

    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
      "ru-RU",
      { day: "numeric", month: "long", year: "numeric" }
    );

    flightMessage.textContent =
      `Демо-поиск: ${from} → ${to}, ${formattedDate}, пассажиров: ${passengers}. Реальное бронирование недоступно.`;
  });
}

// Форма подписки показывает сообщение, но не отправляет данные
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterMessage = document.querySelector("#newsletter-message");

if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterMessage.textContent =
      "Спасибо! Это демонстрация: адрес электронной почты не сохранён.";
    newsletterForm.reset();
  });
}
