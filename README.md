🚗 Car Maintenance Manager - Project "La Mosca"
Aplicación web profesional para el control de mantenimientos preventivos y correctivos. Desarrollada originalmente como una solución real para el seguimiento técnico de un Chevrolet Corsa 2010, enfocada en la integridad de datos y la visualización de costos.

🛠️ Stack Tecnológico
Core: React 18 + TypeScript (Vite)

Estilos: Tailwind CSS

Gestión de Estado: Custom Hooks (Logic-UI separation)

Visualización: Recharts

Iconografía: Lucide React

Persistencia: LocalStorage con sistema de Backup (JSON)

💡 Características Clave
Dashboard de Salud: Algoritmo que calcula el estado de componentes críticos basándose en el kilometraje actual vs. último servicio.

Gestión de Registros (CRUD): Interfaz robusta para el ingreso de servicios, repuestos y costos con validación de tipos estricta.

Análisis Financiero: Gráficos dinámicos para el seguimiento de la inversión mensual en el vehículo.

Soberanía de Datos: Sistema de exportación e importación de base de datos en formato JSON para respaldos locales.

🧠 Retos Técnicos y Aprendizaje
Durante el desarrollo, enfrenté desafíos que me permitieron profundizar en mis habilidades como desarrollador:

Tipado Complejo con TypeScript: Diseñé interfaces que garantizan la consistencia de los datos en toda la aplicación, evitando errores comunes al manejar fechas y valores monetarios.

Procesamiento de Datos en Tiempo Real: Implementé funciones de agregación (usando reduce y map) para transformar listas de registros en datasets estructurados para visualizaciones gráficas de alto rendimiento.

Arquitectura Desacoplada: Utilicé Custom Hooks para separar la lógica de negocio (operaciones de datos) de los componentes de la interfaz, facilitando el mantenimiento y futuras migraciones a un backend real (Supabase/Firebase).

UX Responsiva en Dashboards: Logré una interfaz que adapta tablas de datos complejas a pantallas móviles sin perder la facilidad de uso, utilizando utilidades avanzadas de Tailwind CSS.
