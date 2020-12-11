Motores de almacenamiento de MongoDB

- WiredTiger

- in-memory

Journal tamaño aproximado de 100 megas y cuando se supera Mongo se encarga
de su mantenimiento.

Mecanismos de compresión de datos

Por defecto

- snappy Para todas las colecciones
- prefix compressión para los índices

Opciones de compresión

- zlib
- zstd

Uso de memoria

Mongod es utilizar
    - WiredTiger internal cache
    - filesystem cache

La reserva de WiredTiger internal cache es el mayor de los siguientes valores:

    - 50% (RAM  - 1GB)

    - 256 MB

En cuanto a la compresión:

Los índices estáran comprimidos en memoria

Los dastos de colección estar comprimidos en disco pero sin compresión
cuando estén en los datos frecuentemente usados en el WiredTiger internal cache.

Cuando los datos estén en los datos frecuentemente usados pero en filesystem cache
también estarán comprimidos.

