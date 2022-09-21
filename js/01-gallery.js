import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = makeImageMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

function makeImageMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `
    <div class="gallery__item">
  <a href="${original}" class="gallery__link">
    <img
     src="${preview}"
     alt="${description}"
     data-source="${original}"
     class="gallery__image" 
     />
  </a>
</div>`
    )
    .join("");
}

galleryRef.addEventListener("click", onImageClick);

function onImageClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const link = e.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${link}" width="1400 height="900">`,
    {
      onShow: onModalShow,
      onClose: onModalClose,
    }
  );
  instance.show();

  function onModalShow() {
    window.addEventListener("keydown", onEscKeyPress);
  }

  function onModalClose() {
    window.removeEventListener("keydown", onEscKeyPress);
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = "Escape";
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
      instance.close();
    }
  }
}
