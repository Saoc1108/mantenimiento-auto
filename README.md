# 🚗 Car Maintenance Manager - "La Mosca" Edition

Aplicación web profesional para el control técnico y financiero de mantenimientos vehiculares. Este proyecto nace de una necesidad real: gestionar la restauración y el cuidado preventivo de un **Chevrolet Chevy 2010 (Corsa III)** con motor 1.6L SFI, apodado "La Mosca".

## 🔗 Demo en Vivo
[Explorar la Aplicación](https://saoc1108.github.io/mantenimiento-auto/)

## 🛠 Stack Tecnológico
* **Core:** React 18 + TypeScript (Vite).
* **Estilos:** Tailwind CSS (Diseño responsivo y moderno).
* **Visualización de Datos:** Recharts (Gráficos analíticos de gastos).
* **Iconografía:** Lucide React.
* **CI/CD:** GitHub Actions para despliegue automatizado.

## 💡 Características Clave
1.  **Dashboard de Salud:** Algoritmo que calcula el estado de componentes críticos (aceite, filtros, bujías) basado en el kilometraje actual vs. último servicio.
2.  **Gestión Integral (CRUD):** Registro detallado de servicios con validación estricta de tipos para fechas, costos y categorías.
3.  **Análisis Financiero:** Visualización dinámica de la inversión acumulada y mensual mediante gráficos interactivos.
4.  **Soberanía de Datos:** Sistema de backup que permite exportar e importar la base de datos completa en formato JSON.

## 🧠 Retos Técnicos y Soluciones
* **Tipado Estricto en Datos Dinámicos:** Implementé interfaces de **TypeScript** para asegurar la integridad de los registros, eliminando errores en tiempo de ejecución al manejar cálculos monetarios y fechas.
* **Transformación de Datos:** Desarrollé lógica personalizada (usando `reduce` y `map`) para procesar listas de registros planos en datasets estructurados para los gráficos de **Recharts**.
* **Arquitectura Desacoplada:** Utilicé **Custom Hooks** para separar la lógica de negocio y persistencia (`LocalStorage`) de la interfaz de usuario, facilitando el mantenimiento y futuras integraciones con backend.
* **UX en Dashboards Complejos:** Logré una interfaz responsiva que adapta tablas de datos y gráficos a pantallas móviles sin sacrificar la legibilidad.

## 🚀 CI/CD y Automatización
El proyecto cuenta con un flujo de trabajo automatizado mediante **GitHub Actions**. Cada actualización en la rama `main` dispara un proceso de integración continua que compila el código en TypeScript y actualiza la versión de producción en la rama `gh-pages` de forma automática.

## ⚙️ Instalación Local
1.  Clonar el repositorio:
    ```bash
    git clone [https://github.com/Saoc1108/mantenimiento-auto.git](https://github.com/Saoc1108/mantenimiento-auto.git)
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Lanzar el entorno de desarrollo:
    ```bash
    npm run dev
    ```
