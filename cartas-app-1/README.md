# Cartas App

## Descripción
Cartas App es una aplicación web que permite a los usuarios generar y clasificar tarjetas al azar. Los usuarios pueden especificar cuántas tarjetas desean generar y pueden interactuar con la aplicación a través de botones para realizar un "sorteo" y una "clasificación" de las tarjetas generadas.

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

```
cartas-app
├── src
│   ├── index.html        # Estructura HTML de la aplicación
│   ├── styles
│   │   └── main.css      # Estilos CSS para la aplicación
│   ├── scripts
│   │   ├── app.js        # Script principal de la aplicación
│   │   └── utils.js      # Funciones auxiliares y algoritmo de clasificación
│   └── types
│       └── index.d.ts    # Definiciones de tipos e interfaces
├── package.json           # Configuración de npm y dependencias
└── README.md              # Documentación del proyecto
```

## Instalación
Para instalar y ejecutar la aplicación, sigue estos pasos:

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd cartas-app
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Abre el archivo `src/index.html` en tu navegador para ver la aplicación en acción.

## Uso
- Especifica el número de tarjetas que deseas generar en el campo de entrada.
- Haz clic en el botón "Sorteo" para generar las tarjetas aleatorias.
- Haz clic en el botón "Clasificación" para ordenar las tarjetas utilizando el algoritmo de clasificación bubble.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.