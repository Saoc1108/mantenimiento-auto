# Project "La Mosca": Gestor de Mantenimiento Automotriz
Esta aplicación nació de una necesidad práctica, no de un tutorial. Estoy restaurando un Chevrolet Corsa III 2010 y necesitaba una manera de tener registro de los arreglos y cuanto gasté en repuestos/mano de obra. El objetivo era simple: tener un control real sobre los costos y saber exactamente cuándo le toca cambio a cada componente según el kilometraje.

## Demo en Vivo
[Puedes ver la demo en vivo aqui](https://saoc1108.github.io/mantenimiento-auto/)

## El Stack
No quise reinventar la rueda, pero sí asegurar robustez. El núcleo es React 18 con TypeScript (usando Vite). Para la interfaz elegí Tailwind CSS; necesitaba iterar rápido en el diseño y asegurar que se viera bien en el celular cuando estoy en el taller. La visualización de datos corre por cuenta de Recharts, Lucide maneja la iconografía y **Vitest** se encarga de asegurar que la lógica no se rompa.

## Cómo está construido
Lo más interesante del desarrollo no fue el CRUD básico, sino la lógica de negocio detrás del mantenimiento y la calidad del código:

* **Salud del Motor:** Implementé un algoritmo que compara el kilometraje actual contra el último servicio registrado. Te avisa visualmente si el aceite o pastillas están en zona de riesgo.

* **Manejo de Datos y Tipado Estricto:** Eliminé el uso de `any`. Con TypeScript, definí interfaces estrictas (`MaintenanceAlert`, `MaintenanceRecord`) para evitar errores silenciosos con las fechas o cálculos monetarios.

* **Testing y Calidad:** Implementé **Smoke Tests** y pruebas unitarias con **Vitest**. Esto valida automáticamente que la lógica crítica (como el cálculo de costos y las alertas de kilometraje) funcione correctamente antes de subir cualquier cambio.

* **Transformación de Datos:** Implementé una lógica de agregación en tiempo de ejecución utilizando `reduce` y `map`. Esto permite procesar el historial crudo y calcular métricas dinámicas —como el gasto mensual y acumulado— antes de renderizar los gráficos.

* **Arquitectura Modular:** Para mantener el código limpio, atomicé la interfaz en componentes reutilizables (`StatusCard`, `MaintenanceList`) y extraje la lógica de persistencia y reglas de negocio a **Custom Hooks** (`useMaintenance`). Esto desacopla la vista de los datos y facilita el mantenimiento.

* **Soberanía de Datos:** Como por ahora es local-first, añadí una función para exportar e importar todo el estado en un JSON. Es mi backup manual.

## CI/CD
El despliegue es automático. Configuré un workflow en GitHub Actions que, al detectar un push en main, ejecuta los tests, compila el proyecto y actualiza la rama gh-pages. Cero intervención manual para ver los cambios en producción.


## Instalación Local
1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/Saoc1108/mantenimiento-auto.git
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Lanzar el entorno de desarrollo:
    ```bash
    npm run dev
    ```
