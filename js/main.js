const contenedorProductos = document.querySelector("#contenedor-productos");//shopcontent en el video
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".btnAgregarProducto"); //con let para luego poder redefinirlo
const numerito = document.querySelectorAll(".numerito");
const verCarrito=document.getElementById("verCarrito");//icono carrito en el header
const modalContainer=document.getElementById("modal-container");//div del contenedor del modal del carrito


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));

let carrito= JSON.parse(localStorage.getItem("carrito")) || [];

/*traigo mis productos desde el archivo productos.JSON con una funcion asincrona que espera la respuesta
creo la respuesta y async trabaja con await
productos en lugar de data
  */

fetch("./productos.json")
    .then(response => {
    if (response.ok)
        return response.text();

    throw new Error(response.status);
    })
    .then(data => {
        const producto=JSON.parse(data);
        Object.entries(producto).forEach(([key, value]) => {
            // console.log(value)
            
            
            // console.log(key)
            // console.log(producto)
        });

        function cargarProductos(productosElegidos) {

            contenedorProductos.innerHTML = "";
        
            productosElegidos.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-descripcion">${producto.descripcion}</p>
                        <p class="producto-precio">$${producto.precio}</p>
                        </div>
                        `;                        
                    contenedorProductos.append(div);
                        
 /*-----------BOTON COMPRAR----------------------------------------------------------------------------------------
                    TUVE QUE CREAr aparte el boton de comprar 
                    <button class="btnAgregarProducto" id="${producto.id}">Agregar</button>
                    darle funcionalidad al boton de comprar video="creando un carrito de com``pras
                    con DOM y Eventos" min.20:27

                    *despues le doy un evento y que guarde en un array lo que elegi
                    *me muestra cada vez que eligo toda la lista
                     */ 

                    let comprar = document.createElement("button"); 
                    comprar.innerText="comprar";
                    comprar.classList="comprar btnAgregarProducto";

                    div.append(comprar);
                    // darle evento alguardar en carrito
                    comprar.addEventListener("click", () =>{
                        carrito.push(
                        {
                        id: producto.id,
                        img: producto.imagen,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        })
                        console.log(carrito);
                        saveLocal();
                    });
            });
        };
        //carga productos en la pagina despues de crear los div
        cargarProductos(producto); 
        
        //quiero que me carge primero esto luego de crear la pagina
        botonesCategorias.forEach(boton => {
            boton.addEventListener("click", (e) => {
        
                botonesCategorias.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");
                // console.log(boton)
        
                if (e.currentTarget.id != "todos") {
                    const productoCategoria = producto.find(producto => producto.categoria.id === e.currentTarget.id);
                    tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                    const productosBoton = producto.filter(producto => producto.categoria.id === e.currentTarget.id);
                    // console.log(productosBoton)
                    cargarProductos(productosBoton);
                } else {
                    tituloPrincipal.innerText = "Todos los productos";
                    cargarProductos(producto);
                }
        
            })
        });
/**------------------------------cargando productos al carrito------------------------------------------------------------------------- */
        //aca se va a aguardar lo que eliga y luego lo subire al LS SI NO HAY NADA
        // Y SI HAY QUE ME MUESTRE 1º LO QUE ESTE EN EL LS
        // let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
        

        

/*GUARDANDO EN EL LOCAL STORAGE NUESTRO CARRITO------------------------------------------------------------------------------------------
            guardando los productos elegidos en el local storage SOLO RECIBE STRING
            set item/guarda ("palabra que represente lo que vamos a guardar"key, lo que estoy guardando = JSON.stringify(carrito))
            lo meto dentro de una funcion para poder usarlo despues
        */
    
            function saveLocal(){
                localStorage.setItem("carrito",JSON.stringify(carrito));
            }

        /*OBTENIENDO LO QUE TENGO EN EL LOCAL STORAGE
        get item/obtiene
        CONVIRTIRNDOLA A JSON CON JSON.parse del local storage obtene esta key
        lo voy a usar para que recupere y guarde en el array carrito

        JSON.parse(localStorage.getItem("carrito"));
        */

// --------------------------fin guardando en el LS----------------------------------------------------------------------------



/*-------------------------VER CARRITO PINTARCARRITO--------------------------------------------------------------------------------
            *primero me traje el icono de carrito verCarrito
            *le asigno un evento = evento que quiero que escuche y despues la funcion que quiero que realice
            *
        */
        verCarrito.addEventListener("click", () => {
            console.log("holaaaa carrito")
            const modalHeader = document.createElement("div");
            modalHeader.className="modal-header";
            modalHeader.innerHTML=`
            <h1 class="title-modal">carrito</h1>
            <img class="carrito-producto-imagen" src="${carrito.img}" alt="producto">
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${carrito.nombre}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>20</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>precio</small>
                        <p>${carrito.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>20</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill">x</i></button> 
            
            
            `;

            modalContainer.append(modalHeader);
        })


    /*------------eliminar producto del carrito-----------------
        TAMBIEN HAY ELIMINARLO EN EL LS
    */
        // const eliminarProducto = () => {
        //     const foundId =carrito.find((element) => element.id);

        //     carrito=carrito.filter((carritoId) => {
        //         return carrito !== foundId;
        //     });
        //     pintarCarrito();
        //     saveLocal();
        //     carritoCounter();
        // }






    //---------------- CONTADOR NUMERITO DEL CARRITO---------
    

    // const carritoCounter = () => {
    //     cantidadCarrito.style.display ="block";

    //     const carritoLength =carrito.length;//cuanto elementos tengo en el carrito
    //     // la guardo en el LS

    //     localStorage.setItem("carritoLength",JSON.stringify(carritoLength));
    //     // LO RECUPERO Y LO AGREGO AL NUMERITO
    //     cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"));
    // };
    // carritoCounter();

/**------------------------------fin de cargando productos al carrito-------------------- */




    })
    .catch(err => {
        console.error("ERROR: ", err.message)
    });



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    