const lista = document.querySelector('#listado')
const listaDestacados = document.querySelector('#listadoDestacados')

async function fetchProductCatalog() {
  try {
    const response = await fetch('catalogo.json', {
      method: 'GET'
    });
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
  }
}

async function renderFeaturedProducts() {
  const products = await fetchProductCatalog();

  products.slice(0, 5).forEach((productosDestacados) => {

    const li = document.createElement('li')

    li.innerHTML = `
                  <div class="card-body">
                      <img class="card-img" src="${productosDestacados.image}">
                      <h5 class="card-title">${productosDestacados.name}</h5>
                      <p class="card-price">$${productosDestacados.price}</p>
                      <p class="stock-text">Disponibles: <span>${productosDestacados.stock} </span></p>
                      <button id="${productosDestacados.id}" class="item-button btn btn-dark mx-0 addToCart"><i class="fa fa-shopping-cart"> </i>Agregar Al Carrito</button>
                  </div>
      `
    listaDestacados.append(li)
  })
}

async function renderAllProducts() {
  const products = await fetchProductCatalog();

  products.forEach((products) => {


    const li = document.createElement('li')

    li.innerHTML = `
                  <div class="card-body">
                      <img class="card-img" src="${products.image}">
                      <h5 class="card-title">${products.name}</h5>
                      <p class="card-price">$${products.price}</p>
                      <p class="stock-text">Disponibles: <span>${products.stock} </span></p>
                      <button id= "${products.id}" class="item-button btn btn-dark addToCart"><i class="fa fa-shopping-cart"></i>Agregar Al Carrito</button>
                  </div>
      `
    lista.append(li)

    const addToShoppingCartButtons = document.querySelectorAll('.addToCart');

    addToShoppingCartButtons.forEach((addToCartButton) => {
      addToCartButton.addEventListener('click', addToCartClicked);
    });

  })
}

// start shopping cart

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);


const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.card-body');

  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.card-price').textContent;
  const itemImage = item.querySelector('.card-img').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {

  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;

  });
  
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;

  // LIBRERIA SWEETALERT APLICADA
  Swal.fire({
    title: 'Eliminar Item',
    text: "Estas Seguro De Eliminar Este Item",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Tu Producto Ha Sido Eliminado Correctamente',
        'success'
      )
      buttonClicked.closest('.shoppingCartItem').remove();
      updateShoppingCartTotal();
    }
  })
}

function quantityChanged(event) {
  const input = event.target;
  //OPERADOR TERNIARIO
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
//SWEETALERT
  Swal.fire(
    'Gracias Por Tu Compra',
    'Estamos Preparando Tu Pedido',
    'success'
  )
}

renderFeaturedProducts();
renderAllProducts();