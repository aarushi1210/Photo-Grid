const imageContainerEl = document.querySelector(".image-container");
const btnEl = document.querySelector(".btn");
const darkModeBtn = document.getElementById("dark-mode-toggle");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

const categories = ["nature", "tech", "animals"];

btnEl.addEventListener("click", addNewImages);
window.addEventListener("scroll", handleScroll);


addNewImages();

function addNewImages() {
  for (let i = 0; i < 10; i++) {
    const newImgEl = document.createElement("img");
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    newImgEl.classList.add("gallery-img", category);
    newImgEl.src = `https://picsum.photos/300?random=${Math.random() * 2000}`;
    newImgEl.style.opacity = "0"; // Start transparent

    newImgEl.onload = () => {
      newImgEl.style.transition = "opacity 0.5s";
      newImgEl.style.opacity = "1"; // Fade-in effect
    };

    imageContainerEl.appendChild(newImgEl);
  }

  attachLightboxEvents();
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    addNewImages();
  }
}

const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

function attachLightboxEvents() {
  document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });
}

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

document.querySelectorAll(".filter-buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    document.querySelectorAll(".gallery-img").forEach(img => {
      img.style.display = (filter === "all" || img.classList.contains(filter)) ? "block" : "none";
    });
  });
});
