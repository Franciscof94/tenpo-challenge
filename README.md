🌟 Desafío Técnico Tenpo - Aplicación React con TypeScript
Este proyecto es una solución al desafío técnico propuesto por Tenpo, desarrollado como una aplicación web responsiva utilizando React y TypeScript. Incluye una pantalla de login con autenticación simulada, una página principal que muestra una lista de libros obtenidos de la API Gutendex, y una funcionalidad de logout, cumpliendo con todos los requisitos establecidos.

📋 Requisitos Cumplidos
La solución aborda cada uno de los puntos especificados en el desafío:

Aplicación React con TypeScript: Implementada con React y TypeScript para garantizar tipado seguro y código mantenible.
Responsividad: Diseñada para ser funcional tanto en web como en dispositivos móviles mediante el uso de Tailwind CSS.
Manejo de Estilos: Se optó por Tailwind CSS para un diseño eficiente, moderno y adaptable.
README y Documentación: Este archivo incluye instrucciones claras para instalar, ejecutar y entender la solución.
Almacenamiento del Token: El token falso se guarda en sessionStorage, una elección adecuada para persistir la sesión en memoria mientras el navegador está abierto.
Arquitectura Pública/Privada: Utiliza React Router con rutas públicas (login) y privadas (home), soportadas por un contexto de autenticación (AuthContext).
Feedback en Fetching: Se implementan indicadores de carga (loading) durante las peticiones a la API, y se configura Axios para enviar el token falso en los headers.
Visualización de la Lista: La lista de libros se muestra mediante Infinite Scroll, cargando 32 elementos por vez, optimizando rendimiento y experiencia.
Estrategia de Logout: Elimina el token de sessionStorage, actualiza el contexto y redirige al login.
Pruebas Unitarias: Se agregaron pruebas para BookCard.tsx, useAuth.ts, Spinner.tsx y ErrorRetry.tsx.
Mejora Teórica: Se propone implementar refresh tokens y paginación optimizada para mejorar seguridad y eficiencia.


✨ Características Principales

Pantalla de Login: Formulario simple con validación básica y simulación de autenticación.
Fake Login: Retorna un token falso tras un retraso simulado, almacenándolo en sessionStorage.
Pantalla Home: Conecta con Gutendex API (https://gutendex.com) para mostrar una lista de libros con Infinite Scroll.
Logout: Limpia la sesión y redirige al login.
Rutas Protegidas: Solo usuarios "autenticados" acceden a la página principal.
Diseño Responsivo: Adaptable a diferentes tamaños de pantalla.
Gestión de Estado: Uso de Context API para manejar la autenticación.


📂 Estructura del Proyecto

tenpo-challenge/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── ...
│   ├── contexts/
│   │   ├── context/
│   │   └── provider/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


🚀 Instalación y Ejecución
Prerrequisitos

Node.js (v16 o superior)
npm (o yarn/pnpm como alternativa)

Pasos

Clonar el Repositorio:git clone <URL_DEL_REPOSITORIO>
cd tenpo-challenge


Instalar Dependencias:npm install


Iniciar la Aplicación:npm run dev

La aplicación estará disponible en http://localhost:5173.


🛠 Tecnologías Utilizadas

React: Interfaz de usuario.
TypeScript: Tipado estático.
React Router DOM: Rutas públicas/privadas.
Axios: Peticiones HTTP.
Tailwind CSS: Estilos responsivos.
Vite: Desarrollo rápido.


🔑 Flujo de la Aplicación
Login

Ingreso de correo y contraseña (cualquier valor no vacío es válido).
Simulación de petición con retraso de 1 segundo, generando un token falso (fake-token-123).
Redirección a la página principal tras almacenar el token en sessionStorage.

Home

Muestra una lista de libros de Gutendex API (https://gutendex.com/books).
Carga 32 elementos por vez con Infinite Scroll, usando imágenes de la API.

Logout

Elimina el token de sessionStorage.
Actualiza el AuthContext.
Redirige al login.


📈 Estrategia de Visualización de la Lista
Infinite Scroll carga 32 elementos por vez, ofreciendo:

Eficiencia: Evita consumo excesivo de memoria.
Experiencia: Navegación fluida.
Escalabilidad: Compatible con listas grandes.

Mejora Potencial: Implementar virtualización (e.g., react-window) para optimizar aún más el rendimiento con listas extensas.

🔒 Estrategia de Logout

Elimina el token de sessionStorage.
Actualiza el AuthContext.
Redirige a /login, manteniendo el diseño público/privado.


🌐 Mejora Teórica para Llamadas al Backend

Refresh Tokens: Para sesiones seguras y prolongadas.
Paginación Optimizada: Paginación basada en cursores.
Caché del Cliente: Uso de React Query para reducir solicitudes.


📝 Notas Adicionales

Login simulado sin backend real.
Gutendex API elegida por simplicidad y paginación.
Pruebas unitarias incluidas para BookCard.tsx, useAuth.ts, Spinner.tsx y ErrorRetry.tsx.