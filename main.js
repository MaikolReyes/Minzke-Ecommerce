const lista = document.querySelector('#listado')
const listaDestacados = document.querySelector('#listadoDestacados')

fetch('/catalogo.json')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((productos) => {
      const li = document.createElement('li')
      li.innerHTML = `
                  <div class="card-body">
                      <img class="card-img" src="${productos.image}">
                      <h5 class="card-title">${productos.name}</h5>
                      <p class="card-price">$${productos.price}</p>
                      <p class="stock-text">Disponibles: <span>${productos.stock} </span></p>
                      <a href="#" 
                      class="boton btn btn-dark mx-0"><i class="fa fa-shopping-cart"> </i>    Agregar Al Carrito</a>
                  </div>
      `
      lista.append(li)
    })
  })

  fetch('/catalogo-destacados.json')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((productosDestacados) => {

      const li = document.createElement('li')
      
      li.innerHTML = `
                  <div class="card-body">
                      <img class="card-img" src="${productosDestacados.image}">
                      <h5 class="card-title">${productosDestacados.name}</h5>
                      <p class="card-price">$${productosDestacados.price}</p>
                      <p class="stock-text">Disponibles: <span>${productosDestacados.stock} </span></p>
                      <a href="#" 
                      class="boton btn btn-dark mx-0"><i class="fa fa-shopping-cart"> </i>    Agregar Al Carrito</a>
                  </div>
      `
      listaDestacados.append(li)
    })
  })

  // Fin de productos con fetch

  //carrito de compras

  const clickButton = document.querySelectorAll('.boton');
const tbody = document.querySelectorAll('.tbody'); 
  let carrito = [];

  clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
  })
  
  
  function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card-body')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.card-price').textContent;
    const itemImg = item.querySelector('.card-img').src;
    
    const newItem = {
      title: itemTitle,
      precio: itemPrice,
      img: itemImg,
      cantidad: 1
    }
  
    addItemCarrito(newItem)
  }
  
  function addItemCarrito(newItem){

    const alert = document.querySelector('.alert')
  
    setTimeout( function(){
      alert.classList.add('hide')
    }, 2000)
      alert.classList.remove('hide')
  
    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
      if(carrito[i].title.trim() === newItem.title.trim()){
        carrito[i].cantidad ++;
        const inputValue = InputElemnto[i]
        inputValue.value++;
        CarritoTotal()
        return null;
      }
    }
    
    carrito.push(newItem)
    
    renderCarrito()
  } 




// const formulario = document.querySelector('#formulario');
// const boton = document.querySelector('#boton');
// const resultado = document.querySelector('#resultado')

// const filtrar = () => {
  
//  resultado.innerHTML = '';

//   const texto = formulario.value.toLowerCase();

//   for (let item of producto) {
//     let nombre = item.nombre.toLowerCase();
//     if (nombre.indexOf(texto) !== -1) {
//     resultado.innerHTML += `
//     <li>${producto.nombre} - Valor : ${producto.pri} </li>
//     `
//     }
//   }

// }


// boton.addEventListener('click', filtrar)