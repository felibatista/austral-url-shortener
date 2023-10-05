### Challange:
Nos piden realizar un acortador de urls. El valor de los acortadores de URL es mucho mayor que tener una URL corta. Pueden proporcionar información excelente sobre los clics que salen de un sitio, por ejemplo hacia afiliados, o los clics en un boletín de noticias.

Este ejercicio es típico de entrevistas avanzadas en las FAANG (https://kuczma.dev/articles/scale/system-design-1/) vamos a hacer nuestra propia versión adaptada.

### Requisitos: 
La aplicación debe ser una [ASP.NET](http://ASP.NET) Core Web API.
Se debe usar una bases de datos SQL (SQLlite).

### Un Url Shortener público funcionaría así:

Un visitante cualquiera llega a la página principal. Pega una URL y recibe una URL corta en nuestro sitio. Por ejemplo, http://localhost:4500/xY30pQ.

Cuando se envía, la URL se guarda en la base de datos y se genera una cadena. La cadena tiene 6 caracteres de a-zA-Z0-9. los mismos que usa bitly. (esto proporciona (26+26+10)****6 = 62****6 = 56.800.235.584 posibilidades) Suficiente para nuestro ejemplo.
Si llega una solicitud de esa URL "corta", se redirige a la URL original.
