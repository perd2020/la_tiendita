
const  productosEnCarrito =JSON.parse(localStorage.getItem("productos-en-carrito")); 
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
let contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");



function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length>0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled"); 
        
        contenedorCarritoProductos.innerHTML="";  
            
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
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill">x</i></button>
            `;    
            contenedorCarritoProductos.append(div);
        });
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        //si esta vacio
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar()//ACTUALICE DENTRO DE LA CARGA DEL CARRITO
}
cargarProductosCarrito();//RECARGA LO QUE HAY EN EL LS




function actualizarBotonesEliminar() {//IGUAL A BOTONES AGREGAR
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");//ME TRAJE EL BOTON DEL DOM
    botonesEliminar.forEach(boton => boton.addEventListener("click", eliminarDelCarrito));//LE DOY UN EVENTO
};

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id; //TRAE el id del producto en donde hice click
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);   
    
    productosEnCarrito.splice(index,1); //BORRA EL OBJETO
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); //GUARDA CAMBIOS EN EL LS SOBREESCRIBE 
    cargarProductosCarrito();  //RECARGA EL CARRITO CON LA ACTUALIZACION
}



botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length=0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    
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








