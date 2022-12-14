const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: 14.0,
    image: 'assets/images/featured1.png',
    category: 'hoodies',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.0,
    image: 'assets/images/featured2.png',
    category: 'shirts',
    quantity: 15,
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.0,
    image: 'assets/images/featured3.png',
    category: 'sweatshirts',
    quantity: 20,
  },
];

///////////////////////////////////////////////////////////
// declaracion de variables
const body = document.body;
const btnTheme = document.getElementById('theme-btn');

const cartBtnOpen = document.getElementById('cart-btn');
const cartBtnClose = document.getElementById('close-cart');
const cartContainer = document.getElementById('cart-container');

const menuBtn = document.getElementById('menu-btn');
const menuBtnClose = document.getElementById('close-menu');
const menuContainer = document.getElementById('menu-container');

const btnMenuHome = document.getElementById('menu-home');
const btnMenuProducts = document.getElementById('menu-products');

const navBarScroller = document.getElementById('navBar');
const loader = document.getElementById('loader');

const btnAddProducts = document.querySelectorAll('.btn-add-producs');
const cartItemsHolder = document.querySelector('.cart-items');

const cartCounter = document.getElementById('cart-counter');
const itemsCount = document.getElementById('items-count');
const cartTotal = document.getElementById('cart-total');

///////////////////////////////////////////////////////////
// funcion para pasar a modo oscuro y vice versa
const darkThemChange = () => {
  if (btnTheme.classList.contains('bx-moon')) {
    btnTheme.classList.replace('bx-moon', 'bx-sun');
  } else {
    btnTheme.classList.replace('bx-sun', 'bx-moon');
  }
  body.classList.toggle('dark');
};
btnTheme.addEventListener('click', e => darkThemChange());

///////////////////////////////////////////////////////////
// funcionalidad abrir y cerrar carrito
cartBtnOpen.addEventListener('click', e =>
  cartContainer.classList.remove('hiden')
);

cartBtnClose.addEventListener('click', e =>
  cartContainer.classList.add('hiden')
);

///////////////////////////////////////////////////////////
// funcionalidad abrir y cerrar menu
menuBtn.addEventListener('click', e => menuContainer.classList.remove('hiden'));

menuBtnClose.addEventListener('click', e =>
  menuContainer.classList.add('hiden')
);

///////////////////////////////////////////////////////////
// funcionalidad cerrar menu al dar click en un enlace
btnMenuHome.addEventListener('click', e =>
  menuContainer.classList.add('hiden')
);
btnMenuProducts.addEventListener('click', e =>
  menuContainer.classList.add('hiden')
);

///////////////////////////////////////////////////////////
// funcion para dar color a la barra de navegacion si se detecta un scroll
let lastscroll = 0;
const colorbarraLateralScroll = () => {
  const currentScroll = window.pageYOffset;
  lastscroll = currentScroll;
  if (lastscroll <= 10) {
    navBarScroller.classList.remove('scroller-nav');
  } else {
    navBarScroller.classList.add('scroller-nav');
  }
};

window.addEventListener('scroll', () => colorbarraLateralScroll());

///////////////////////////////////////////////////////////
//  animacion loader

const loadComponent = () => {
  setTimeout(() => {
    loader.classList.add('hide');
  }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
  loadComponent();
});

///////////////////////////////////////////////////////////
// funcionalidad llenar carrito
let cart = [];

const renderCart = function () {
  let totalSum = 0;
  let countItems = 0;
  cartItemsHolder.innerHTML = '<span></span>';
  cart.forEach(el => {
    cartItemsHolder.firstElementChild.insertAdjacentHTML(
      'afterend',
      generateMarkup(el)
    );
    totalSum += el.cartQuantity * el.price;
    countItems += el.cartQuantity;
  });
  itemsCount.textContent = `${countItems}`;
  cartTotal.textContent = `$ ${totalSum}`;
  cartCounter.textContent = `${countItems}`;
};

const generateMarkup = function (data) {
  const subtotalItem = data.price * data.cartQuantity;
  return `<article class='cart__card'><div class='cart__box'><img src='${data.image}' alt='${data.name}' class='cart__img'></div><div class='cart__details'><h3 class='cart__title'>${data.name}</h3><span class='cart__stock'>Stock: ${data.stock} | <span class='cart__price'>$ ${data.price}</span></span><span class='cart__subtotal'>Subtotal: $ ${subtotalItem}</span><div class='cart__amount'><div class='cart__amount-content'><span class='cart__amount-box minus' data-id='${data.id}'><i class='bx bx-minus'></i></span><span class='cart__amount-number'>${data.cartQuantity} units</span><span class='cart__amount-box plus' data-id='${data.id}'><i class='bx bx-plus'></i></span></div><i class='bx bx-trash-alt cart__amount-trash' data-id='${data.id}'></i></div></div></article>`;
};

// mostrar carrito si est?? en el local storage
const refreshCart = function () {
  cart = JSON.parse(window.localStorage.getItem('cart'));
  if (!cart) cart = [];
  renderCart();
};

refreshCart();

// Funcionalidad para agregar item clickeado en el objeto cart
btnAddProducts.forEach(el => {
  // agrego un eventListener a cada boton +
  el.addEventListener('click', e => {
    //identificamos el producto seleccionado
    const { id } = e.target.dataset;
    const item = items.find(el => el.id === +id);
    // reducimos la cantidad del stock
    // item.quantity--;
    // si el item no est?? en el carrito, lo agregamos
    if (!cart.find(el => el.id === item.id)) {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        cartQuantity: 1,
        stock: item.quantity,
      });
    } else {
      // Si el item si est?? en el carrito, aumentamos la cantidad en +1
      cart.forEach(el => {
        if (el.id === item.id) {
          el.cartQuantity++;
          el.stock = item.quantity;
        }
      });
    }
    // guardar datos del carrito en la memorio local
    window.localStorage.setItem('cart', JSON.stringify(cart));
    // display los elementos del carrito en
    refreshCart();
  });
});

///////////////////////////////////////////////////////////
// funcionalidad botones editar carrito

cartItemsHolder.addEventListener('click', e => {
  const el = e.target;
  if (
    el.classList.contains('minus') ||
    el.parentElement.classList.contains('minus')
  ) {
    const id = el.dataset.id ? el.dataset.id : el.parentElement.dataset.id;

    const cartItem = cart.find(item => item.id === +id);
    if (cartItem.cartQuantity > 1) {
      cartItem.cartQuantity--;
    }
    // guardar datos del carrito en la memorio local
    window.localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
  if (
    el.classList.contains('plus') ||
    el.parentElement.classList.contains('plus')
  ) {
    const id = el.dataset.id ? el.dataset.id : el.parentElement.dataset.id;

    const cartItem = cart.find(item => item.id === +id);
    if (
      cartItem.cartQuantity > 0 &&
      cartItem.cartQuantity + 1 <= cartItem.stock
    ) {
      cartItem.cartQuantity++;
    }
    // guardar datos del carrito en la memorio local
    window.localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
  if (el.classList.contains('cart__amount-trash')) {
    const { id } = el.dataset;
    cart.forEach((item, index) => {
      if (item.id === +id) {
        cart.splice(index, 1);
      }
    });
    // guardar datos del carrito en la memorio local
    window.localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});
