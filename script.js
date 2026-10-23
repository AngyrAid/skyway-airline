// Понятные интерактивные элементы для учебного проекта SkyWay
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "Закрыть" : "Меню";
    });
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "Меню";
      });
    });
  }

  const dateInput = document.querySelector("#flight-date");
  if (dateInput) {
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = today;
    dateInput.value = today;
  }

  const fromCity = document.querySelector("#from-city");
  const toCity = document.querySelector("#to-city");
  const swapButton = document.querySelector("#swap-cities");
  if (fromCity && toCity && swapButton) {
    swapButton.addEventListener("click", function () {
      const previousCity = fromCity.value;
      fromCity.value = toCity.value;
      toCity.value = previousCity;
    });
  }

  const flightForm = document.querySelector("#flight-form");
  const flightMessage = document.querySelector("#flight-message");
  if (flightForm && flightMessage) {
    flightForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (fromCity.value === toCity.value) {
        flightMessage.textContent = "Выберите разные города отправления и прибытия.";
        return;
      }
      flightMessage.textContent = "Демонстрационный поиск: " + fromCity.value + " → " + toCity.value +
        ". Реальное бронирование на учебном сайте недоступно.";
    });
  }

  const newsletterForm = document.querySelector("#newsletter-form");
  const newsletterMessage = document.querySelector("#newsletter-message");
  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      newsletterMessage.textContent = "Спасибо! Это демонстрационная форма: данные не отправлены.";
      newsletterForm.reset();
    });
  }

  const contactForm = document.querySelector("#contact-form");
  const contactMessage = document.querySelector("#contact-form-message");
  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      contactMessage.textContent = "Форма проверена! Сообщение не отправлено на сервер.";
      contactForm.reset();
    });
  }
});
