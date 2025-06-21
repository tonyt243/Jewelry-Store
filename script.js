//Favorite function for products
function toggleFavorite(element) {
  if (element.classList.contains("favorited")) {
    element.classList.remove("favorited");
    element.textContent = "🤍"; // Unfavorited
  } else {
    element.classList.add("favorited");
    element.textContent = "❤️"; // Favorited
  }
}

//Images carousel
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

//Add items to cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

function addToCart(productName, price) {
  const item = cart.find(i => i.name === productName);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name: productName, price, qty: 1 });
  }
  updateCart();
}


//Update cart
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} - $${item.price * item.qty}`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = total;

  localStorage.setItem('cart', JSON.stringify(cart));
}

//Toggle on/off cart
function toggleCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.classList.toggle('hidden');
}

//Clear cart
function clearCart() {
  cart = [];
  updateCart();
}

//Click-to-zoom function for business card
document.addEventListener('DOMContentLoaded', () => {
  const contactCardImg = document.getElementById('contactCardImg');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  contactCardImg.addEventListener('click', () => {
    lightboxImg.src = contactCardImg.src;
    lightbox.style.display = 'flex';
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
});

