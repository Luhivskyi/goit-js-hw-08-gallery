
import gallery from "./gallery-items.js";
const refs = {
  gallery: document.querySelector(".js-gallery"),                         // Ссилка на галерею ul
  lightbox: document.querySelector(".js-lightbox"),                       // Ссилка на модалку
  lightboxImage: document.querySelector(".lightbox__image"),               // Ссилка на img для оригінальної картинки
  lightboxOverlay: document.querySelector(".lightbox__overlay"),          // Ссилка на сірий фон (overlay/backdrop)
  btnClose: document.querySelector('[data-action="close-lightbox"]'),      //Ссилка на кнопку закриття модалки
};

// Перебираємо масив gallery для отриманняя строки-li з потрібними атрибутами для створення динамічного html

const images = gallery
  .map((img, index) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${img.original}
  >
    <img
      class="gallery__image"
      src=${img.preview}
      data-source=${img.original}
      data-index = ${index}
      alt=${img.description}
    />
  </a>
</li>`;
  })
  .reduce((acc, img) => acc + img);
refs.gallery.insertAdjacentHTML("afterbegin", images);     // Створюємо динамічно розмітку HTML, добавляємо в нашу галерею ul - створену вище розмітку
refs.gallery.addEventListener("click", onGalleryClick);    // Відкриття модалки по кліку на img
refs.btnClose.addEventListener("click", closeLightbox);    // Закриття модалки по кліку на img
refs.lightboxOverlay.addEventListener("click", closeLightbox);     // Закриття Overlay/backdrop  по кліку


//Функція відкриття модального вікна

function onGalleryClick(event) {
  event.preventDefault();                   // Забороняємо дефолтні дії, в даному випадку, перехід за посиланням, при кліці на img
  if (event.target.nodeName !== "IMG") {
    return;
  }
  openLightbox();                                        // Функція відкриття модалки
  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;
  const largeImgIndex = event.target.dataset.index;
  openLargeImg(largeImgUrl, largeImgAlt, largeImgIndex);
}

// Функція відкриття модалки

function openLightbox() {
  window.addEventListener("keydown", onEscKeyPress);         // Добавляємо addEventListener на клік по 'ESC'
  window.addEventListener("keydown", onArrowKeyPress);       // Добавляємо addEventListener на клік по стрілці
  refs.lightbox.classList.add("is-open");                    // Добавляємо клас відкриття модалки
}

// Функція закриття модалки

function closeLightbox() {
  window.removeEventListener("keydown", onEscKeyPress);         // Видаляємо removeEventListener на клік по 'ESC'
  window.removeEventListener("keydown", onArrowKeyPress);      //  Видаляємо removeEventListener на клік по стрілці
  refs.lightbox.classList.remove("is-open");                   // Видаляємо клас
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}

// Функція для відкриття img в нашій галереї

function openLargeImg(url, alt, index) {
  refs.lightboxImage.src = url;
  refs.lightboxImage.alt = alt;
  refs.lightboxImage.dataset.index = index;
}

// Функція закриття модалки по 'ESC'

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    closeLightbox();
  }
}

// Функція для гортання img в модальному вікні стрілками ArrowRight & ArrowLeft

function onArrowKeyPress(event) {
  let index = Number(refs.lightboxImage.dataset.index);
  const maxIndex = gallery.length;
  const minIndex = null;
  if (event.code === "ArrowRight" && index <= maxIndex) {
    refs.lightboxImage.src = gallery[index + 1].original;
    refs.lightboxImage.dataset.index = index + 1;
  }
  if (event.code === "ArrowLeft" && index >= minIndex) {
    refs.lightboxImage.src = gallery[index - 1].original;
    refs.lightboxImage.dataset.index = index - 1;
  }
}

