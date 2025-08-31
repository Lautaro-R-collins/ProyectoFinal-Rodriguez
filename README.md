# Mi Tienda - E-commerce Web App

## Descripción

Mi Tienda es una aplicación web de comercio electrónico (e-commerce) desarrollada con React y Firebase. Permite navegar por un catálogo de productos, ver detalles de cada uno, agregar productos al carrito, y realizar la compra con un formulario de checkout que almacena la orden en Firestore.

---

## Tecnologías utilizadas

- **React**: Librería para construir la interfaz de usuario con componentes reutilizables y hooks.
- **React Router**: Para la navegación SPA entre páginas sin recargar.
- **Firebase Firestore**: Base de datos en la nube para almacenar productos y órdenes.
- **Context API**: Para manejar el estado global del carrito de compras.
- **React Icons**: Iconos para mejorar la interfaz (ej. carrito).
- **CSS inline y módulos** para el estilado.

---

## Funcionalidades

- Listado dinámico de productos, filtrado por categorías.
- Visualización de detalle de cada producto con información completa.
- Componente `ItemCount` para seleccionar la cantidad a agregar al carrito, con validaciones de stock.
- Carrito de compras que muestra los productos agregados, cantidad, subtotales y total.
- Capacidad de eliminar productos o vaciar el carrito.
- Formulario de checkout con validaciones para completar datos del comprador.
- Generación y almacenamiento de la orden en Firestore, mostrando el ID de la orden al finalizar la compra.
- Navegación fluida sin recargas gracias a React Router.

---

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mi-tienda.git
