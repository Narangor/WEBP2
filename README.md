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

El sistema está compuesto por dos módulos:

### CountriesModule (interno — sin endpoints HTTP)

Gestiona la información de países con una lógica de caché local:

1. Al recibir un código Alpha-3, busca primero en la colección `countries` de MongoDB.
2. Si existe, retorna el documento local (sin llamada externa).
3. Si no existe, llama a `https://restcountries.com/v3.1/alpha/{code}`.
4. Si la API responde con error (código inválido), lanza `NotFoundException (404)`.
5. Si retorna datos, los persiste en MongoDB y retorna el país.

### TravelPlansModule (público)

Expone los endpoints CRUD. Al crear un plan, invoca `CountriesService.findOrFetch()` para validar y cachear el país destino antes de persistir el plan.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /travel-plans | Crear un nuevo plan |
| GET | /travel-plans | Listar todos los planes |
| GET | /travel-plans/:id | Detalle de un plan por ID |
| DELETE | /travel-plans/:id | Eliminar un plan |

## Ejemplos JSON para Postman

### Crear plan (POST /travel-plans)
```json
{
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
  "title": "Viaje a Colombia",
  "startDate": "2025-07-01T00:00:00.000Z",
  "endDate": "2025-07-15T00:00:00.000Z",
  "destinationCountryCode": "COL",
  "createdAt": "2026-05-13T21:37:34.545Z",
  "updatedAt": "2026-05-13T21:37:34.545Z"
}
```

### Eliminar plan (DELETE /travel-plans/:id)
No requiere body. Retorna `204 No Content`.
