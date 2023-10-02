function verTienda() {
  alert("Bienvenidos a nuestro Minimarket Sotelifran");
// Objeto que almacena los precios de los productos por categoría
// Objeto que almacena los precios de los productos por categoría
const precios = {
  carnes: {
    pollo: { precio: 2990, unidad: "kg" },
    cerdo: { precio: 5900, unidad: "kg" },
    vacuno: { precio: 9900, unidad: "kg" },
  },
  lacteos: {
    leche: { precio: 1500, unidad: "unidad" },
    yogurt: { precio: 300, unidad: "unidad" },
  },
  ferreteria: {
    pintura: { precio: 4000, unidad: "unidad" },
    lijas: { precio: 200, unidad: "unidad" },
    tornillos: { precio: 30, unidad: "unidad" },
  },
  despensa: {
    arroz: { precio: 1200, unidad: "kg" },
    tallarines: { precio: 900, unidad: "kg" },
    cafe: { precio: 5500, unidad: "kg" },
    azucar: { precio: 1000, unidad: "kg" },
  },
};

// Objeto que almacena el carrito de compras
const carrito = [];

// Objeto que almacena la boleta de compra
const boleta = {
  items: [],
  totalCompra: 0,
};

 // Función principal que controla el flujo del programa
 function main() {
 
  while (true) {
    const accion = prompt("¿Qué quieres hacer?\n1. Comprar\n2. Ver Boleta\n3. Pagar\n4. Salir");

    switch (accion) {
      case "1":
        comprar();
        break;
      case "2":
        mostrarBoleta();
        break;
      case "3":
        pagar();
        break;
      case "4":
        alert("Gracias por visitar la tienda. ¡Hasta luego!");
        return;
      default:
        alert("Opción no válida.");
        break;
    }
  }
}

// Función para mostrar los productos disponibles en una categoría
function mostrarProductos(categoria) {
  const productos = precios[categoria];
  let mensaje = `Productos disponibles en la categoría ${categoria}:\n`;

  for (const producto in productos) {
    mensaje += `${producto} (${productos[producto].unidad})\n`;
  }

  alert(mensaje);
}

// Función que permite realizar una compra al usuario
function comprar() {
  const categoria = prompt("Selecciona una categoría:\ncarnes, lacteos, ferreteria, despensa");

  if (!precios[categoria]) {
    alert("Categoría no válida.");
    return;
  }

  mostrarProductos(categoria);

  const producto = prompt(`Selecciona un producto de ${categoria}:`);
  const cantidad = parseFloat(prompt(`Cantidad de ${producto}:`));

  agregarAlCarrito(producto, cantidad, categoria);
}

  // Función para pagar y reiniciar la boleta y el carrito
  function pagar() {
      if (boleta.items.length === 0) {
        alert("La boleta de compra está vacía.");
        return;
      }
    
      alert("Procesando pago...");
      mostrarBoleta(); // Mostrar la boleta nuevamente antes de finalizar
    
      // Aquí puedes agregar cualquier lógica de procesamiento de pago adicional que necesites
    
      // Reiniciar la boleta y el carrito
      boleta.items = [];
      boleta.totalCompra = 0;
      carrito.length = 0;
    
      alert("¡Gracias por su compra!");
    }
    
// Función para agregar un producto al carrito y a la boleta
function agregarAlCarrito(producto, cantidad, categoria) {
  const precioTotal = calcularPrecioTotal(producto, cantidad, categoria);

  if (precioTotal === 0) {
    alert("Producto no válido.");
    return;
  }

  carrito.push({ producto, cantidad, precioTotal, categoria }); // Almacena el producto en el carrito

  // Agregar el producto a la boleta
  boleta.items.push({ producto, cantidad, precioTotal, categoria });
  boleta.totalCompra += precioTotal;

  alert(`Se agregó al carrito: ${cantidad} ${producto} (${precios[categoria][producto].unidad})`);
}

// Función para calcular el precio total con parámetros -- producto y cantidad
function calcularPrecioTotal(producto, cantidad, categoria) {
  if (!precios[categoria] || !precios[categoria][producto]) {
    return 0; // Producto no encontrado
  }

  const precioUnitario = precios[categoria][producto].precio;
  return precioUnitario * cantidad;
}

// Función para mostrar la boleta de compra
function mostrarBoleta() {
  if (boleta.items.length === 0) {
    alert("La boleta de compra está vacía.");
    return;
  }

  let resumen = "Boleta de compra:\n";
  boleta.items.forEach((item) => {
    resumen += `${item.cantidad} ${item.producto} (${precios[item.categoria][item.producto].unidad}) - Precio total: $${item.precioTotal}\n`;
  });

  resumen += `Total a pagar: $${boleta.totalCompra}`;
  alert(resumen);
}

// Iniciar la aplicación
main();
};