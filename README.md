# animeapp
## Sergio Renato Aldana Alvarez
## 20001908

La anime app es una aplicación que hace uso del servicio de https://jikan.moe para desplegar información de animes y manga.
De todas las consultas disponibles en esta API se utilzó la consulta ¨search¨la cual permite especificar el tipo de búsqueda y un texto. Se pueden utilizar otros parametros no utilizados por la anime app.
Ya que los dos parametros se envian en la misma consulta solamente fue necesario un fetch.
Ya que la información recibida en formato JSON para cada type es distinta se utilizaron funciones diferentes.
