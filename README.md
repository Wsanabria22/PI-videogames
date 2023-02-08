# Individual Project - Henry Videogames

<p align="right">
  <img height="200" src="./videogame.png" />
</p>


## Objetivos del Proyecto  
  

Crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Agregar nuevos videojuegos

La aplicacion manejara por lo tanto informacion procedente de la API e informacion creada y almacenda en una base de datos.   
  

<br/>  


## Tecnologias y herramientas utilizadas  
<table><tr><td valign="top" width="33%">



### Frontend  
<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="75" /></a>  
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="75" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="75" /></a>  
<a href="https://www.javascript.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="75" /></a>  
<a href="https://redux.js.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/redux-original.svg" alt="Redux" height="75" /></a>  
</div>

</td><td valign="top" width="33%">



### Backend  
<div align="center">  
<a href="https://www.javascript.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="75" /></a>  
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="75" /></a>  
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="75" /></a>  
<a href="https://www.postgresql.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="75" /></a>  
</div>

</td><td valign="top" width="33%">



### DevOps  
<div align="center">  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="75" /></a>  
<a href="https://www.jestjs.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/jest.svg" alt="Jest" height="75" /></a>  
<a href="https://webpack.js.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/webpack-original.svg" alt="Webpack" height="75" /></a>  
<a href="https://mochajs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mocha.png" alt="Mocha" height="75" /></a>  
</div>

</td></tr></table>  

<br/>  


## Requisitos para ejecutarla localmente  
  

- clonar el repositorio en un directorio local
- Instalar PostgreSQL
- Crear una base de datos con nombre videojuegos
- Crear una en la pagina de la API para obtener una API Key
- Dentro de la carpeta ./api crear un archivo .env para definir las credenciales de acceso a la base de datos y la api, como se muestra a continuacion:

DB_USER=userDB
DB_PASSWORD=passwordDB
DB_HOST=localhost
API_KEY=apiKey

- Remplazar userDB y passwordDB con sus propias credenciales para conectarse a la base de datos.
- Remplazar apiKey con la API key obtenida de la pagina de la API
  
  

## Instalacion  
  

Utilice el administrador de paquetes npm para intalar los moulos de nodejs necesarios para la aplicacion en tanto para el FrontEnd en la carpeta ./client, con en el BackEnd en la carpeta ./api.
Ejecutar los siguientes comandos en cada carpeta:
- npm install
- npm start

Finalmente ingresar al navedor de internet y ejecutar la aplicaion ingresando la URL

/localhost:3000
