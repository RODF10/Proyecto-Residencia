
# Encuetas Geriatria

Este proyecto automatiza las capturas de los resltados de las encuestas de geatria, obteniendo ciertos puntajes, los cuales interpreta mostrando ciertos mensajes hechos por el diagnostico de la encuesta. 

# Descripcion
El proyecto fue enfocado en cierto establecimiento medico, donde hacer las encuesta es un poco tardoso, tomando tiempo del diagnostico y calculao el puntaje para dar cierta observacion a un paciente, para solucionar el probelma, se automatizo la caprtua del diagnostico mediante una aplicacion web, tomando las encuesta ya hechas para dar el puntaje, escribiendo o seleccionando los puntos que observen del paciente.

## Link del Proyecto en GitHub
Angular: [Project](https://github.com/RODF10/Proyecto-Residencia/tree/test-Rodolfo)

Laravel: [Project](https://github.com/RODF10/Backend_Proyecto/tree/master)


# Instalacion del Proyecto

Antes de empezar, se necesita instalar Angular, NodeJS, Laravel, PHP y Xampp para su buen funcionamiento del proyecto.

## 🚀 Requisitos previos  
- [Node.js](https://nodejs.org/) (versión recomendada: LTS)  
- [Angular CLI](https://angular.io/cli)  
- [XAMPP](https://www.apachefriends.org/es/index.html) (para MySQL y Apache)  
- [Composer](https://getcomposer.org/) (para Laravel)  
- [Git](https://git-scm.com/) (opcional, pero recomendado)

1. **Descargar e instalar Node.js** desde su página oficial.  
2. Verificar la instalación ejecutando en la terminal:  
   ```sh
   node -v  # Verifica la versión de Node.js  
   npm -v   # Verifica la versión de npm  
   ```
3. Instalacion del Angular CLI
```bash
  npm install angular
```
### Complementos de Angular (Necesario para su funcionamiento y vista)
- [Compresor de Imagenes NGX](https://github.com/dfa1234/ngx-image-compress.git) (GitHub Oficial)
- [SweetAlert2](https://sweetalert2.github.io/#download) (Página Oficial)
- [Archivo PDF](https://github.com/parallax/jsPDF) (GitHub Oficial)
- [Angular Material](https://material.angular.io/guide/getting-started) (Página Oficial)
```sh
    npm install bootstrap # Conjunto de estilos Boostrap
```
Luego, agregarlo en angular.json dentro de "styles" y "scripts" (Ubicado dentro del proyecto)
```bash
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```
Resto de complementos de Angular
```sh
npm install ngx-image-compress # Compresor Imagen
npm install sweetalert2 # Alerta Personalizada
npm install jspdf # Creador File PDF
ng add @angular/material # Estructura Angular
```
En FormsModule y ReactiveFormsModule (para formularios), se deben importar en app.module.ts:
```sh
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
```
4. 🛠 Instalación y Configuración de XAMPP y Laravel

Paso 1: Descargar e instalar XAMPP desde su sitio oficial:  
👉 https://www.apachefriends.org/es/index.html

Ejecuta el instalador y sigue las instrucciones:
- Selecciona los componentes Apache, MySQL y PHP (los demás son opcionales).
- Instala XAMPP en la ruta recomendada (C:\xampp en Windows o /opt/lampp en Linux).
- Abre XAMPP Control Panel y asegúrate de iniciar los servicios Apache y MySQL.
Crear una Nueva Base de Datos en phpMyAdmin
- En phpMyAdmin, haz clic en "Nueva" (panel izquierdo).
- Ingresa un nombre para la base de datos (Base de Datos: proyecto_vgi).
- Selecciona utf8mb4_general_ci como collation.
- Haz clic en "Crear".
Importar el Archivo .sql en phpMyAdmin
- Descarga la base de datos en [OneDrive](https://itescamedu-my.sharepoint.com/:f:/g/personal/7001_itescam_edu_mx/EvRnZ0VhiP1KiC49R8nB0WYBJmbsWIoR07n7UGJLw8xbFA?e=tDnoha)
- Ve a la pestaña "Importar".
- Haz clic en "Seleccionar archivo" y busca el archivo SQL en donde lo descargo.
- Asegúrate de que el formato sea SQL.
- Haz clic en "Continuar" para importar la base de datos.
Si todo está bien, phpMyAdmin mostrará un mensaje de éxito y las tablas aparecerán en la base de datos.

### Instalacion y Configuracion del Laravel
1. Instalar Composer
Descarga Composer desde su página oficial:  
👉 https://getcomposer.org/
2. Instalar Laravel Global
```sh
composer global require laravel/installer # Instalacion Global
composer create-project --prefer-dist laravel/laravel mi_proyecto # ⚠️ Reemplaza mi_proyecto con el nombre de tu proyecto.
# Clonar Proyecto Existente
git clone https://github.com/usuario/proyecto.git # Cambiar por el link del Proyecto
cd proyecto
composer install
```
Después de crear/clonar el proyecto, en la consola derebas escribir la ruta del proyecto:
```sb
cd mi_proyecto #Ubicacion del Proyecto
```
Ten en encuenta que tienes que seleccionar en el buscador del explorador, estando dentro de la carpeta del proyecto para acceder rapido escribiendo **CMD** en el explorador para entrar a la consola.
![Vista Previa](src/assets/Captura%20de%20pantalla.png)

Edita el archivo .env y configura la base de datos con los valores de XAMPP:
```sb
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=proyecto_vgi  # Nombre de la base de datos creada en phpMyAdmin
DB_USERNAME=root
DB_PASSWORD=  # Déjalo vacío si no estableciste una contraseña en MySQL
```
Comando Utiles de LaravelComandos Útiles de Laravel
```sb
php artisan serve  # Inicia el servidor de desarrollo
php artisan migrate  # Ejecuta migraciones de la base de datos
php artisan make:model Nombre -m  # Crea un modelo con migración
php artisan make:controller NombreController  # Crea un controlador
php artisan cache:clear  # Limpia la caché de la aplicación
```
Una vez instalado y configurado se puede iniciar el Xampp, Laravel y angular    
En en XAMPP debera estar funcionando PHP y MySQL    
Corre Angular y Laravel
```bash
ng serve # Correr Aplicación Angular
php artisan serve # Correr Servidor Laravel
```
