# Parcial 2

## Nicolás Arango Ramos - 202220342

API REST en NestJS para la gestión de planes de viaje con integración de datos geográficos desde RestCountries.

## Instalación

```bash
npm install
```

Crear archivo `.env` en la raíz:
```
MONGODB_URI=mongodb+srv://narangor:123@cluster0.avze3ez.mongodb.net/travel-plans
```

## Ejecución

```bash
npm run start:dev
```

La API corre en `http://localhost:3000`.

## Arquitectura y flujo de caché

### CountriesModule (interno — sin endpoints HTTP)

Gestiona la información de países con una lógica de caché local:

1. Al recibir un código Alpha-3, busca primero en la colección `countries` de MongoDB.
2. Si existe, retorna el documento local (sin llamada externa).
3. Si no existe, llama a `https://restcountries.com/v3.1/alpha/{code}`.
4. Si la API responde con error (código inválido), lanza `NotFoundException (404)`.
5. Si retorna datos, los persiste en MongoDB y retorna el país.

### TravelPlansModule

see xponen los endpoints CRUD. Al crear un plan, ivoca `CountriesService.findOrFetch()` para validar y cachear el pais destino, y `UsersService.findOne()` para verificar que el usario exista antes de persistir el plan

### UsersModule

Gestiona los porpietarios de los planes de viaje. Expone endpoints para crear y consultar usuarios. `UsersService` se exporta y se inyecta en `TravelPlansModule` para validar la propiedad al crear planes

### AuditMiddleware

Intercepta todas las rutas de `travel-plans` y `users`. Extrae el header `x-user-id` e imprime en consola:
```
[User: <id>] accedió a <ruta> - <método>
```
Si el header no está presente muestra `[User: ANONYMOUS]`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /users | Crear un usuario |
| GET | /users/:id | Obtener usuario por ID |
| POST | /travel-plans | Crear un nuevo plan |
| GET | /travel-plans | Listar todos los planes |
| GET | /travel-plans/:id | Detalle de un plan (incluye gastos) |
| DELETE | /travel-plans/:id | Eliminar un plan |
| POST | /travel-plans/:id/expenses | Agregar un gasto a un plan existente |

## Ejemplos JSON para Postman

### Crear usuario (POST /users) -> como manejamos mongoDB no es necesario agregar un id porque se creara un _id automaticamente al crear el objeto
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

### Crear plan (POST /travel-plans) -> se debe utilizar el _id obtenido de la coleccion user
```json
{
  "userId": "664f1a2b3c4d5e6f7a8b9c0d",
  "title": "Viaje a Colombia",
  "startDate": "2025-07-01",
  "endDate": "2025-07-15",
  "destinationCountryCode": "COL"
}
```

Respuesta exitosa (201):
```json
{
  "_id": "6a04ef1e8ba3f146c4917969",
  "userId": "664f1a2b3c4d5e6f7a8b9c0d",
  "title": "Viaje a Colombia",
  "startDate": "2025-07-01T00:00:00.000Z",
  "endDate": "2025-07-15T00:00:00.000Z",
  "destinationCountryCode": "COL",
  "expenses": [],
  "createdAt": "2026-05-13T21:37:34.545Z",
  "updatedAt": "2026-05-13T21:37:34.545Z"
}
```

### Agregar gasto (POST /travel-plans/:id/expenses)
```json
{
  "description": "Vuelo ida y vuelta",
  "amount": 850.00,
  "category": "Transporte"
}
```

retorna el plan completo con el nuevo gasto incluido en el array `expenses`:
```json
{
  "_id": "6a0539fd909a19afda22bd83",
  "userId": "664f1a2b3c4d5e6f7a8b9c0d",
  "title": "Viaje a Colombia",
  "startDate": "2025-07-01T00:00:00.000Z",
  "endDate": "2025-07-15T00:00:00.000Z",
  "destinationCountryCode": "COL",
  "expenses": [
    {
      "_id": "6a0540aa909a19afda22bd90",
      "description": "Vuelo ida y vuelta",
      "amount": 850,
      "category": "Transporte"
    }
  ],
  "createdAt": "2026-05-14T02:57:01.292Z",
  "updatedAt": "2026-05-14T02:59:12.015Z"
}
```

### Eliminar plan (DELETE /travel-plans/:id)
No requiere body. Retorna `204`

## cambios  para gastos

Los gastos se almacenan como subdocumentos dentro del documento `TravelPlan` en MongoDB, en el array `expenses`. No se usa una colección ni tabla adicional. Para agregar un gasto individual sin sobre scribir los existentes, el servicio usa `$push` de MongoDB:

```ts
await this.travelPlanModel.findByIdAndUpdate(
  planId,
  { $push: { expenses: dto } },
  { new: true },
).exec();
```

usando $push añade el nuevo objeto al final del array. La opción { new: true } hace que Mongoose devuelva el documento ya actualizado con el gasto incluido. El esquema de Expense se define con @Schema de Mongoose y se embebe directamente en TravelPlanSchema mediante @Prop({ type: [ExpenseSchema], default: [] })
