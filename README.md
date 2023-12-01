# Invera ToDo-List Challenge (Python/Django Jr-SSr)

## Tecnologías y librerías:

- Django y Django Rest Framework para la REST API
- djoser y rest_framework_simplejwt: djoser provee varias vistas/rutas creadas por defecto para registrar, loguear, resetear el password, etc y simplejwt me permite crear y administrar los tokens de dichos usuarios para su autenticación

## Cómo usar la aplicación

- 1. Clonar la aplicación utilizando en la terminal el comando >git clone https://github.com/alejoDiDiego/todo-challenge
- 2. En "todo-challenge/backend" ejecutar el entorno virtual con el comando >venv\Scripts\activate (en Windows) o >source env/bin/activate (en Linux o Mac)
- 3. Ejecutar el siguiente comando >python manage.py runserver

## Enpoints

### Guest (sin estar autenticado)

#### Registrarse:

- Tipo de request: POST

- Endpoint: http://127.0.0.1:8000/api/auth/users/

- Body: {
  "email": {Not null y un email valido},
  "name": {Not null},
  "password": {Contraseña Not null de más de 8 caracteres, mayusculas, minusculas y números y letras},
  "re_password": {Repetir contraseña Not null}
  }

- Return: usuario

#### Login:

- Tipo de request: POST

- Endpoint: http://127.0.0.1:8000/api/auth/jwt/create/

- Body: {
  "email": {Not null},
  "password": {Not null}
  }

- Return: usuario

#### Verificar Token (si es valido o no):

- Tipo de request: POST

- Endpoint: http://127.0.0.1:8000/api/auth/jwt/verify/

- Body: {
  "token": {Not null}
  }

- Return: objeto vacio, pero peticion 200 Ok

### Auth (necesita estar autenticado)

Necesita Headers con el siguiente formato:

Key: Authorization, Value: "JWT {token}"

#### Todas las tareas del usuario:

- Tipo de request: GET

- Body: nada

- Endpoints:

##### http://127.0.0.1:8000/api/tasks/

- Return: todas las tareas del usuario logueado

##### http://127.0.0.1:8000/api/tasks/?date={YYYY-MM-DD}

- Return: todas las tareas de la fecha seleccionada del usuario logueado

##### http://127.0.0.1:8000/api/tasks/?title={caracteres}

- Return: todas las tareas que tengan un título igual o parecido al de la query del usuario logueado

##### http://127.0.0.1:8000/api/tasks/?date={YYYY-MM-DD}&title={caracteres}

- Return: todas las tareas de la fecha seleccionada y que tengan un titulo igual o parecido del usuario logueado

#### Una tarea del usuario:

- Tipo de request: GET

- Body: nada

- Endpoints: http://127.0.0.1:8000/api/tasks/{id}/

- Return: la tarea seleccionada del usuario logueado

#### Crear tarea:

- Tipo de request: POST

- Body: {
  "title": {Not null},
  "description": {Not null}
  }

- Endpoints: http://127.0.0.1:8000/api/tasks/

- Return: la tarea creada

#### Editar (finalizar) tarea:

- Tipo de request: PUT/PATCH

- Body (no todos los campos son necesarios, solo los que se van a modificar): {
  "title": {Nulleable},
  "description": {Nulleable},
  "is_finished": {Nulleable}
  }

- Endpoints: http://127.0.0.1:8000/api/tasks/{id}/

- Return: la tarea editada

#### Eliminar tarea:

- Tipo de request: DELETE

- Body: none

- Endpoints: http://127.0.0.1:8000/api/tasks/{id}/

- Return: mensaje que la tarea fue eliminada

#### Informacion del usuario:

- Tipo de request: GET

- Body: none

- Endpoints: http://127.0.0.1:8000/api/auth/users/me/

- Return: informacion del usuario
