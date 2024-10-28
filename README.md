# Prueba Técnica: Podcast

Creación de una mini-aplicación para escuchar podcasts musicales.

Este es un proyecto de ejemplo de una aplicación web creada con React y Vite. Esta guía proporciona instrucciones sobre cómo clonar el repositorio y ejecutar la aplicación en diferentes entornos.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (se instala junto con Node.js)

## Instalación

Para descargar y poner en marcha el proyecto, sige los siguientes pasos:

1. Clonar el repositorio:

```bash
git clone https://github.com/ezedelriodev/Podcasts.git
```

2. Navega hasta el directorio del proyecto:

```bash
cd podcast
```

3. Antes de ejecutar la aplicación, instala las dependencias necesarias. Puedes hacerlo con el siguiente comando:

```bash
npm install
```

4. Si lo deseas, puedes ejecutar los test:

```bash
npm run test
```

5. Para iniciar la aplicación en modo desarrollo, donde los assets no están minimizados, ejecuta:
```bash
npm run dev
```
Esto abrirá la aplicación en tu navegador en http://localhost:5173 (o el puerto que se indique en la consola).

6. Para construir la aplicación para producción, donde los assets están concatenados y minimizados, ejecuta:
```bash
npm run build
```
Esto generará los archivos de producción en el directorio dist.

7. Después de construir la aplicación, puedes servirla utilizando:
```bash
npm run serve

