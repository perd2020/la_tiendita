//creo variable que me guarde lo que traigo del localstorage
productosEnCarrito = localStorage.getItem("productos-en-carrito"); 
//recuperando lo del localstorage
productosEnCarrito = JSON.parse(productosEnCarrito);

console.log(productosEnCarrito && productosEnCarrito.length >0);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        //si esta vacio
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {


    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}










// let productosEnCarrito = JSON.parse(localStorage.getItem("productosGuardados"));
// // productosEnCarrito = JSON.parse(productosEnCarrito);

// const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
// const contenedorCarritoProductos = document.querySelector("#carrito-productos");
// const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
// const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
// let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
// const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
// const contenedorTotal = document.querySelector("#total");
// const botonComprar = document.querySelector("#carrito-acciones-comprar");


// //si hay productos en el carrito
// // por las dudas que el local storage no cargue se le agreguen las clases por las dudas
// // DECIRLE QUE QUEREMOS QUE HAGA QUE MUESTRE PRODUCTOS Y ACCIONES,
// // QUE OCULTE EL MENSAJE DE CARRITO VACIO Y CARRITO COMPRADO


// function cargarProductosCarrito(){    
//     if(productosEnCarrito && productosEnCarrito.length > 0) {

//         contenedorCarritoVacio.classList.add("disabled");  //le COLOQUE la clase disabled deshabilitado para que se OCULTE
//         contenedorCarritoProductos.classList.remove("disabled");   //le REMUEVA la clase disabled deshabilitado para que se MUESTRE
//         contenedorCarritoAcciones.classList.remove("disabled");   //le REMUEVA la clase disabled deshabilitado para que se MUESTRE
//         contenedorCarritoComprado.classList.add("disabled");   //le COLOQUE la clase disabled deshabilitado para que se OCULTE

//         contenedorCarritoProductos.innerHTML ="";

//         productosEnCarrito.forEach(producto =>{
//             const div = document.createElement("div");
//             div.classList.add("carrito-producto");
//             div.innerHTML =`

//             <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
//             <div class="carrito-producto-titulo">
//                 <small>titulo</small>
//                 <h3>${producto.titulo}</h3>
//             </div>

//             <div class="carrito-producto-cantidad">
//                 <small>precios</small>
//                 <p>${producto.cantidad}</p>
//             </div>

//             <div class="carrito-producto-precio">
//             <small>precio</small>
//                 <p>${producto.precio}</p>
//             </div>

//             <div class="carrito-producto-subtotal">
//             <small>subtotal</small>
//                 <p>${producto.precio * producto.cantidad}</p>
//             </div>

//             <button class="carrito-producto-eliminar" id="${producto.id}">X</button>
//             `;

//             contenedorCarritoProductos.append(div);

//         });

//         actualizarBotonesEliminar();
//         actualizarTotal();
    
//     }else{

//         contenedorCarritoVacio.classList.remove("disabled"); 
//         contenedorCarritoProductos.classList.add("disabled");  
//         contenedorCarritoAcciones.classList.add("disabled"); 
//         contenedorCarritoComprado.classList.add("disabled");  

//     };


// }

// cargarProductosCarrito();


// //BOTONES DE BORRAR PRODUCTOS

// function actualizarBotonesEliminar() {
//     botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

//     botonesEliminar.forEach(boton => {
//         boton.addEventListener("click", eliminarDelCarrito);
//     });
// }


// function eliminarDelCarrito(e) {
//     const idBoton = e.currentTarget.id;
//     const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
//     productosEnCarrito.splice(index, 1);
//     cargarProductosCarrito();

//     saveLocalStorage();
// }

// botonVaciar.addEventListener("click", vaciarCarrito);
// function vaciarCarrito() {

//     Swal.fire({
//         title: '¿Estás seguro?',
//         icon: 'question',
//         html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
//         showCancelButton: true,
//         focusConfirm: false,
//         confirmButtonText: 'Sí',
//         cancelButtonText: 'No'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             productosEnCarrito.length = 0;
//             localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
//             cargarProductosCarrito();
//         }
//     })
// }


// function actualizarTotal() {
//     const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
//     total.innerText = `$${totalCalculado}`;
// }

// botonComprar.addEventListener("click", comprarCarrito);
// function comprarCarrito() {

//     productosEnCarrito.length = 0;
//     localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
//     contenedorCarritoVacio.classList.add("disabled");
//     contenedorCarritoProductos.classList.add("disabled");
//     contenedorCarritoAcciones.classList.add("disabled");
//     contenedorCarritoComprado.classList.remove("disabled");

// }

// const saveLocalStorage =() =>{
//     localStorage.setItem("productosGuardados", JSON.stringify(productosEnCarrito));
// }


/*

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();
*/