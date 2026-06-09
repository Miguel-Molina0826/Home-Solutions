// ==========================================================================
// 1. BASE DE DATOS DE PRODUCTOS (20 Artículos con Imágenes Reales)
// ==========================================================================
const productosHogar = [
    // === CATEGORÍA: COCINA ===
    { id: 1, nombre: "Sartén Antiadherente 24cm", precio: 85000, categoria: "cocina", stock: 12, imagen: "sarten.jpg.jpeg" },
    { id: 2, nombre: "Juego de Cuchillos de Cocina (6 piezas)", precio: 65000, categoria: "cocina", stock: 8, imagen: "cuchillos.jpg.jpeg" },
    { id: 3, nombre: "Licuadora de Alta Potencia", precio: 145000, categoria: "cocina", stock: 5, imagen: "licuadora.png.jpeg" },
    { id: 4, nombre: "Cafetera de Goteo Eléctrica", precio: 110000, categoria: "cocina", stock: 6, imagen: "cafetera.png.jpeg" },
    { id: 5, nombre: "Sanduchera Eléctrica Doble", precio: 75000, categoria: "cocina", stock: 10, imagen: "sanduchera.jpg.jpeg" },

    // === CATEGORÍA: ASEO / BAÑO ===
    { id: 6, nombre: "Jabón Líquido para Manos 500ml", precio: 12000, categoria: "aseo", stock: 25, imagen: "jabon.jpg.jpeg" },
    { id: 7, nombre: "Toallas de Baño de Algodón (Juego x2)", precio: 55000, categoria: "aseo", stock: 14, imagen: "toallas.jpg.jpeg" },
    { id: 8, nombre: "Organizador de Cepillos de Dientes", precio: 22000, categoria: "aseo", stock: 9, imagen: "cepillos.jpg.jpeg" },
    { id: 9, nombre: "Tapete de Baño Antideslizante", precio: 28000, categoria: "aseo", stock: 11, imagen: "tapete.jpg.jpeg" },
    { id: 10, nombre: "Dispensador Automático de Jabón", precio: 45000, categoria: "aseo", stock: 7, imagen: "dispensador.jpg.jpeg" },

    // === CATEGORÍA: ORGANIZACIÓN ===
    { id: 11, nombre: "Caja Organizadora de Plástico Grande", precio: 35000, categoria: "organizacion", stock: 20, imagen: "caja.jpg.jpeg" },
    { id: 12, nombre: "Percheros de Madera para Pared (Juego x3)", precio: 40000, categoria: "organizacion", stock: 15, imagen: "perchero.jpg.jpeg" },
    { id: 13, nombre: "Organizador de Zapatos para Clóset", precio: 48000, categoria: "organizacion", stock: 8, imagen: "zapatos.jpg.jpeg" },
    { id: 14, nombre: "Canasta de Mimbre Multiusos", precio: 32000, categoria: "organizacion", stock: 12, imagen: "canasta.jpg.jpeg" },
    { id: 15, font_weight: "bold", nombre: "Estante Modular Metálico de 4 Niveles", precio: 125000, categoria: "organizacion", stock: 4, imagen: "estante.jpg.jpeg" },

    // === CATEGORÍA: LIMPIEZA ===
    { id: 16, nombre: "Escoba de Cerdas Suaves con Mango", precio: 15000, categoria: "limpieza", stock: 18, imagen: "escobas.jpg.jpeg" },
    { id: 17, nombre: "Trapero de Microfibra con Balde Exprimidor", precio: 45000, categoria: "limpieza", stock: 10, imagen: "traperos.jpg.jpeg" },
    { id: 18, nombre: "Sacapolvos Estático Extensible", precio: 18000, categoria: "limpieza", stock: 15, imagen: "sacapolvos.jpg.jpeg" },
    { id: 19, nombre: "Recogedor de Basura con Mango Largo", precio: 12000, categoria: "limpieza", stock: 22, imagen: "recogedor.jpg.jpeg" },
    { id: 20, nombre: "Limpiavidrios Magnético de Doble Cara", precio: 38000, categoria: "limpieza", stock: 6, imagen: "limpiavidrios.jpg.jpeg" }
];

const seccionesHogar = [
    { clave: "cocina", nombre: "Cocina", descripcion: "Sartenes, electrodomésticos y utensilios avanzados.", imagen: "sarten.jpg.jpeg" },
    { clave: "aseo", nombre: "Aseo & Baño", descripcion: "Dispensadores, toallas y complementos de higiene.", imagen: "jabon.jpg.jpeg" },
    { clave: "organizacion", nombre: "Organización", descripcion: "Cajas, estantes y optimizadores de espacio.", imagen: "caja.jpg.jpeg" },
    { clave: "limpieza", nombre: "Limpieza General", descripcion: "Traperos, escobas y herramientas de mantenimiento.", imagen: "traperos.jpg.jpeg" }
];

const destacadosCarrusel = [
    { id: 3, tagCategoria: "COCINA INTERACTIVA", tituloBanner: "Licuadora de Alta Potencia", subtituloBanner: "Prepara tus recetas, jugos y batidos favoritos en segundos con la mejor eficiencia.", imagen: "licuadora.png.jpeg" },
    { id: 11, tagCategoria: "ORGANIZACIÓN INTELIGENTE", tituloBanner: "Caja Organizadora Grande", subtituloBanner: "Mantén tus habitaciones e instalaciones impecables, libres de desorden.", imagen: "caja.jpg.jpeg" },
    { id: 17, tagCategoria: "LIMPIEZA SIN ESFUERZO", tituloBanner: "Trapero de Microfibra con Balde", subtituloBanner: "Deja tus pisos relucientes y completamente secos gracias al sistema exprimidor.", imagen: "traperos.jpg.jpeg" }
];

const contenedorProductos = document.getElementById('contenedor-productos');
const buscador = document.getElementById('input-busqueda');
const selectPrecio = document.getElementById('select-precio');
const tituloSeccion = document.getElementById('titulo-seccion');
const contenedorCarrusel = document.getElementById('slider-destacados');

let carrito = JSON.parse(localStorage.getItem('carrito_hogar')) || [];

window.agregarAlCarrito = (idProducto, cantidad = 1, elementoBoton = null) => {
    const producto = productosHogar.find(p => p.id === idProducto);
    if (!producto) return;

    const existe = carrito.find(item => item.id === idProducto);
    if (existe) {
        if (existe.cantidad + cantidad <= producto.stock) {
            existe.cantidad += cantidad;
        } else {
            lanzarToast(`⚠️ ¡Ups! No hay suficiente stock de este producto.`, "#e74c3c");
            return;
        }
    } else {
        if (cantidad <= producto.stock) {
            carrito.push({ ...producto, cantidad: cantidad });
        } else {
            lanzarToast(`⚠️ ¡Ups! No hay suficiente stock de este producto.`, "#e74c3c");
            return;
        }
    }
    
    actualizarLocalStorage();
    actualizarContadorCarritoVisual();
    lanzarToast(`🛒 ¡${producto.nombre} agregado con éxito!`, "#27ae60");

    const stockVisual = document.getElementById(`stock-display-${idProducto}`);
    if (stockVisual) {
        const itemActualizado = carrito.find(item => item.id === idProducto);
        stockVisual.innerText = producto.stock - (itemActualizado ? itemActualizado.cantidad : 0);
    }

    if (document.getElementById('contenedor-items-carrito')) {
        renderizarPaginaCarrito();
    }
};

const lanzarToast = (mensaje, colorFondo) => {
    let toast = document.getElementById('toast-notificacion');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notificacion';
        toast.style = `
            position: fixed; bottom: 20px; right: 20px; 
            color: #fff; padding: 14px 24px; font-family: system-ui, sans-serif;
            border-radius: 8px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            z-index: 9999; display: none; transition: all 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.style.backgroundColor = colorFondo;
    toast.innerText = mensaje;
    toast.style.display = 'block';

    setTimeout(() => { toast.style.display = 'none'; }, 2500);
};

const actualizarLocalStorage = () => { localStorage.setItem('carrito_hogar', JSON.stringify(carrito)); };

const actualizarContadorCarritoVisual = () => {
    const contador = document.getElementById('contador-carrito');
    if (contador) contador.innerText = carrito.reduce((sum, item) => sum + item.cantidad, 0);
};

let indiceSliderActivo = 0;

const renderizarSlide = () => {
    if (!contenedorCarrusel) return;
    const item = destacadosCarrusel[indiceSliderActivo];
    const puntosHTML = destacadosCarrusel.map((_, idx) => `
        <span class="slider-punto ${idx === indiceSliderActivo ? 'punto-activo' : ''}" onclick="window.irASlide(${idx})"></span>
    `).join('');

    contenedorCarrusel.innerHTML = `
        <div class="slider-wrapper-relativo" style="position:relative; display:flex; background:#f4f4f4; border-radius:8px; overflow:hidden; padding:20px; align-items:center; min-height:220px;">
            <div class="slide-item-contenido" style="display:flex; width:100%; justify-content:space-between; align-items:center; cursor:pointer;" onclick="window.location.href='producto.html?id=${item.id}'">
                <div class="slide-texto" style="flex:1; padding-right:15px;">
                    <span style="background:#000; color:#fff; font-size:0.75rem; padding:3px 8px; border-radius:10px; font-weight:bold;">${item.tagCategoria}</span>
                    <h2 style="margin:10px 0 5px 0; font-size:1.5rem;">${item.tituloBanner}</h2>
                    <p style="margin:0; font-size:0.9rem; color:#666;">${item.subtituloBanner}</p>
                </div>
                <div class="slide-imagen" style="width:120px; height:120px; display:flex; justify-content:center;">
                    <img src="${item.imagen}" style="max-width:100%; max-height:100%; object-fit:contain;">
                </div>
            </div>
            <div class="slider-indicadores-puntos" style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); display:flex; gap:6px;">${puntosHTML}</div>
        </div>
    `;
};

if (contenedorCarrusel) {
    window.irASlide = (idx) => { indiceSliderActivo = idx; renderizarSlide(); };
    setInterval(() => { indiceSliderActivo = (indiceSliderActivo + 1) % destacadosCarrusel.length; renderizarSlide(); }, 6000);
}

const pintarSeccionesMenu = () => {
    if (!contenedorProductos) return;
    if (tituloSeccion) tituloSeccion.innerText = "Categorías Principales";
    if (contenedorCarrusel) contenedorCarrusel.style.display = "block";
    contenedorProductos.innerHTML = "";
    
    seccionesHogar.forEach(seccion => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-categoria-menu';
        tarjeta.innerHTML = `
            <div style="background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; text-align:center; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                <img src="${seccion.imagen}" style="width:70px; height:70px; object-fit:contain; margin-bottom:10px;">
                <h3 style="margin:0 0 5px 0; font-size:1.1rem;">${seccion.nombre}</h3>
                <p style="font-size:0.8rem; color:#777; margin:0 0 12px 0; min-height:32px;">${seccion.descripcion}</p>
                <button onclick="filtrarPorSeccionClick('${seccion.clave}')" style="background:#000; color:#fff; border:none; padding:7px 15px; border-radius:15px; font-size:0.85rem; cursor:pointer; font-weight:600;">Ver Catálogo</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
};

const pintarProductosDeLista = (listaProductos, tituloPersonalizado = null) => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";
    if (contenedorCarrusel) contenedorCarrusel.style.display = "none";
    
    if (tituloSeccion && tituloPersonalizado) tituloSeccion.innerHTML = tituloPersonalizado;

    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:2rem; color:#888; font-weight:500;">No se encontraron artículos con los filtros aplicados.</p>`;
        return;
    }

    listaProductos.forEach(prod => {
        const itemEnCarrito = carrito.find(item => item.id === prod.id);
        const unidadesDisponiblesVisual = prod.stock - (itemEnCarrito ? itemEnCarrito.cantidad : 0);

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        tarjeta.style = "background:#fff; border:1px solid #eee; padding:15px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.02); transition: all 0.2s ease-in-out;";
        tarjeta.innerHTML = `
            <div style="height:130px; display:flex; justify-content:center; align-items:center; margin-bottom:10px;"><img src="${prod.imagen}" style="max-height:100%; max-width:100%; object-fit:contain;"></div>
            <h3 style="font-size:1rem; margin:0 0 5px 0; font-weight:600; min-height:40px;">${prod.nombre}</h3>
            <p style="font-weight:bold; color:#111; margin:0 0 5px 0;">$${prod.precio.toLocaleString('es-CO')} COP</p>
            <p style="font-size:0.75rem; color:#888; margin:0 0 12px 0;">Stock: <span id="stock-display-${prod.id}">${unidadesDisponiblesVisual}</span> uds</p>
            <div style="display:flex; gap:8px;">
                <a href="producto.html?id=${prod.id}" style="flex:1; background:#f4f4f4; color:#333; text-align:center; padding:7px 0; border-radius:4px; text-decoration:none; font-size:0.85rem; font-weight:500;">Detalles</a>
                <button onclick="window.agregarAlCarrito(${prod.id}, 1, this)" style="background:#27ae60; color:#fff; border:none; padding:7px 12px; border-radius:4px; font-weight:bold; cursor:pointer;">+ 🛒</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
};

window.filtrarPorSeccionClick = (clave) => {
    contenedorProductos.setAttribute('data-categoria-activa', clave);
    const mues = productosHogar.filter(p => p.categoria === clave);
    const inf = seccionesHogar.find(s => s.clave === clave);
    const encabezado = `
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span>Sección: ${inf ? inf.nombre : clave.toUpperCase()}</span>
            <button onclick="window.limpiarBuscadorYRegresarMenu()" style="background:#eee; border:none; padding:6px 12px; border-radius:15px; font-size:0.8rem; cursor:pointer;">← Volver</button>
        </div>
    `;
    pintarProductosDeLista(mues, encabezado);
};

window.limpiarBuscadorYRegresarMenu = () => {
    if (buscador) buscador.value = "";
    if (selectPrecio) selectPrecio.value = "todos";
    contenedorProductos.removeAttribute('data-categoria-activa');
    pintarSeccionesMenu();
};

if (buscador) {
    buscador.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase().trim();
        if (textoBusqueda === "") {
            pintarSeccionesMenu();
            return;
        }
        const productosFiltrados = productosHogar.filter(p => 
            p.nombre.toLowerCase().includes(textoBusqueda) || p.categoria.toLowerCase().includes(textoBusqueda)
        );
        const encabezado = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <span>Resultados para: "${e.target.value}"</span>
                <button onclick="window.limpiarBuscadorYRegresarMenu()" style="background:#eee; border:none; padding:6px 12px; border-radius:15px; font-size:0.8rem; cursor:pointer;">Limpiar X</button>
            </div>
        `;
        pintarProductosDeLista(productosFiltrados, encabezado);
    });
}

if (selectPrecio) {
    selectPrecio.addEventListener('change', (e) => {
        const rango = e.target.value;
        let filtrados = productosHogar;

        if (rango === 'bajo') filtrados = productosHogar.filter(p => p.precio < 30000);
        else if (rango === 'medio') filtrados = productosHogar.filter(p => p.precio >= 30000 && p.precio <= 80000);
        else if (rango === 'alto') filtrados = productosHogar.filter(p => p.precio > 80000);

        if (rango === 'todos') {
            pintarSeccionesMenu();
        } else {
            const encabezado = `
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <span>Artículos en rango de presupuesto seleccionado</span>
                    <button onclick="window.limpiarBuscadorYRegresarMenu()" style="background:#eee; border:none; padding:6px 12px; border-radius:15px; font-size:0.8rem; cursor:pointer;">Limpiar X</button>
                </div>
            `;
            pintarProductosDeLista(filtrados, encabezado);
        }
    });
}

// ==========================================================================
// INTERFAZ DEL CARRITO DE COMPRAS (INTEGRACIÓN CÁPSULA MODULAR)
// ==========================================================================
window.cambiarCantidadCarrito = (idProducto, mod) => {
    const item = carrito.find(p => p.id === idProducto);
    if (!item) return;
    const original = productosHogar.find(p => p.id === idProducto);
    const nuevaCant = item.cantidad + mod;

    if (nuevaCant > 0 && nuevaCant <= original.stock) {
        item.cantidad = nuevaCant;
    } else if (nuevaCant <= 0) {
        window.eliminarDelCarrito(idProducto);
        return;
    } else if (nuevaCant > original.stock) {
        lanzarToast(`⚠️ ¡Ups! No hay suficiente stock de este producto.`, "#e74c3c");
        return;
    }
    actualizarLocalStorage();
    actualizarContadorCarritoVisual();
    renderizarPaginaCarrito();

    const stockVisual = document.getElementById(`stock-display-${idProducto}`);
    if (stockVisual) {
        stockVisual.innerText = original.stock - item.cantidad;
    }
};

window.eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(p => p.id !== idProducto);
    actualizarLocalStorage();
    actualizarContadorCarritoVisual();
    renderizarPaginaCarrito();

    const stockVisual = document.getElementById(`stock-display-${idProducto}`);
    if (stockVisual) {
        const original = productosHogar.find(p => p.id === idProducto);
        if (original) stockVisual.innerText = original.stock;
    }
};

const renderizarPaginaCarrito = () => {
    const contenedorItems = document.getElementById('contenedor-items-carrito');
    const lblTotal = document.getElementById('monto-total-pagar');
    const barra = document.getElementById('barra-progreso-envio');
    const txtProgreso = document.getElementById('texto-progreso-envio');

    if (!contenedorItems) return;

    const cash = carrito.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
    if (lblTotal) lblTotal.innerText = `$${cash.toLocaleString('es-CO')},00`;

    const LIMITE = 200000;
    const pct = Math.min((cash / LIMITE) * 100, 100);
    if (barra) barra.style.width = `${pct}%`;
    
    if (txtProgreso) {
        if (cash >= LIMITE) {
            txtProgreso.innerHTML = "¡Felicidades! Tu envío es completamente <strong>gratuito</strong>.";
        } else {
            txtProgreso.innerHTML = `Agrega <strong>$${(LIMITE - cash).toLocaleString('es-CO')} COP</strong> más para obtener <strong>envío gratis</strong>.`;
        }
    }

    if (carrito.length === 0) {
        contenedorItems.innerHTML = `<p style="text-align:center; padding:3rem 0; color:#888;">El carrito está vacío.</p>`;
    } else {
        contenedorItems.innerHTML = carrito.map(item => `
            <div class="item-carrito-fila" style="display:flex; padding:15px 0; border-bottom:1px solid #f0f0f0; gap:15px; align-items:center;">
                <div style="width:60px; height:60px;"><img src="${item.imagen}" style="width:100%; height:100%; object-fit:contain;"></div>
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between;">
                        <h4 style="margin:0; font-size:0.95rem;">${item.nombre}</h4>
                        <button onclick="window.eliminarDelCarrito(${item.id})" style="background:none; border:none; cursor:pointer; color:#aaa;">🗑️</button>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                        
                        <div class="contador-pildora">
                            <button class="btn-pildora" onclick="window.cambiarCantidadCarrito(${item.id}, -1)">-</button>
                            <span class="cantidad-pildora">${item.cantidad}</span>
                            <button class="btn-pildora" onclick="window.cambiarCantidadCarrito(${item.id}, 1)">+</button>
                        </div>

                        <span style="font-weight:bold; font-size:0.95rem;">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

window.procesarPagoFinal = () => {
    if (carrito.length === 0) return;
    window.location.href = "pago.html";
};

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarritoVisual();
    if (contenedorProductos) {
        if (contenedorCarrusel) renderizarSlide();
        pintarSeccionesMenu();
    }
    if (document.getElementById('contenedor-items-carrito')) renderizarPaginaCarrito();
});
// ==========================================================================
// LÓGICA DE RENDERIZADO PARA LA PÁGINA DE DETALLE (producto.html)
// ==========================================================================

const obtenerIdProductoURL = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
};

let carritoDetalle = JSON.parse(localStorage.getItem('carrito_hogar')) || [];

const renderizarDetalleProducto = () => {
    const idProducto = obtenerIdProductoURL();
    const producto = productosHogar.find(p => p.id === idProducto);
    const contenedorDetalle = document.getElementById('contenedor-detalle-producto'); 

    if (!producto || !contenedorDetalle) return;

    const itemEnCarrito = carritoDetalle.find(item => item.id === producto.id);
    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    const stockDisponibleVisual = producto.stock - cantidadEnCarrito;

    contenedorDetalle.innerHTML = `
        <div style="display: flex; gap: 40px; background: #fff; padding: 30px; border-radius: 12px; max-width: 1000px; margin: 40px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fafafa; border-radius: 8px; padding: 20px;">
                <img src="${producto.imagen}" style="max-width: 100%; max-height: 350px; object-fit: contain;">
            </div>

            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h1 style="font-size: 2rem; margin: 0 0 10px 0; color: #000;">${producto.nombre}</h1>
                <h2 style="font-size: 1.8rem; color: #27ae60; margin: 0 0 20px 0;">$${producto.precio.toLocaleString('es-CO')} COP</h2>
                
                <p style="font-weight: bold; color: #333; margin: 0 0 10px 0;">¿Por qué elegir nuestro ${producto.nombre}?</p>
                <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0; font-size: 0.95rem;">
                    Diseñado para integrarse perfectamente en tu hogar, este producto combina durabilidad y eficiencia. Hemos seleccionado materiales de alta calidad para garantizar que tu inversión perdure en el tiempo.
                </p>

                <ul style="margin: 0 0 25px 0; padding-left: 20px; color: #555; font-size: 0.95rem; line-height: 1.8;">
                    <li>Materiales resistentes a largo plazo.</li>
                    <li>Fácil mantenimiento y limpieza.</li>
                    <li>Garantía extendida de satisfacción.</li>
                </ul>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 0 0 20px 0;">

                <p style="font-size: 1rem; color: #000; margin: 0 0 15px 0; font-weight: 500;">
                    Stock disponible: <strong id="stock-dinamico-detalle">${stockDisponibleVisual}</strong> unidades
                </p>

                <div style="display: flex; align-items: center; gap: 15px; margin-top: 5px;">
                    <div class="contador-pildora" style="height: 45px; min-width: 120px;">
                        <button onclick="window.operarCantidadDetalle(-1)" class="btn-pildora">-</button>
                        <span id="contador-cantidad-detalle" class="cantidad-pildora">${cantidadEnCarrito}</span>
                        <button onclick="window.operarCantidadDetalle(1)" class="btn-pildora">+</button>
                    </div>

                    <button onclick="window.confirmarAccionCarrito()" class="btn-principal" style="flex: 1; height: 45px;">
                        Actualizar Carrito 🛒
                    </button>
                </div>
            </div>

        </div>
    `;
};

window.operarCantidadDetalle = (mod) => {
    const idProducto = obtenerIdProductoURL();
    const producto = productosHogar.find(p => p.id === idProducto);
    if (!producto) return;

    let itemEnCarrito = carritoDetalle.find(item => item.id === producto.id);
    let cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    let nuevaCantidad = cantidadActual + mod;

    if (nuevaCantidad > producto.stock) {
        alert("⚠️ Stock máximo alcanzado en inventario.");
        return;
    }
    if (nuevaCantidad < 0) return;

    if (nuevaCantidad === 0) {
        carritoDetalle = carritoDetalle.filter(item => item.id !== producto.id);
    } else {
        if (itemEnCarrito) {
            itemEnCarrito.cantidad = nuevaCantidad;
        } else {
            carritoDetalle.push({ ...producto, cantidad: nuevaCantidad });
        }
    }

    document.getElementById('contador-cantidad-detalle').innerText = nuevaCantidad;
    document.getElementById('stock-dinamico-detalle').innerText = producto.stock - nuevaCantidad;
};

window.confirmarAccionCarrito = () => {
    localStorage.setItem('carrito_hogar', JSON.stringify(carritoDetalle));
    
    const contadorGlobal = document.getElementById('contador-carrito');
    if (contadorGlobal) {
        contadorGlobal.innerText = carritoDetalle.reduce((sum, item) => sum + item.cantidad, 0);
    }
    
    alert("🛒 Cantidad en el carrito actualizada con éxito.");
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarDetalleProducto();
});