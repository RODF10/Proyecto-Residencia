
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
Edita el archivo .env (Dentro del Proyecto) y configura la base de datos con los valores de XAMPP:
![Vista Previa](main/src/assets/Captura%20de%20pantalla.png)
