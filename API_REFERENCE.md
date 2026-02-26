# API Reference - Student Management System

Base URL: `http://localhost:5000/api`

---

## Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/students/states` | Get all states | No |
| GET | `/students` | Get all students | No |
| GET | `/students?stateId={id}` | Filter students by state | No |
| POST | `/students` | Create new student | No |
| PUT | `/students/{id}` | Update student | No |
| DELETE | `/students/{id}` | Delete student | No |

---

## 1. Get All States

Retrieves the list of all Indian states (29 records).

**Endpoint**: `GET /api/students/states`

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "Andhra Pradesh"
  },
  {
    "id": 2,
    "name": "Arunachal Pradesh"
  }
  // ... 27 more states
]
```

---

## 2. Get All Students

Retrieves all student records from the database.

**Endpoint**: `GET /api/students`

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "stateId": 23,
    "stateName": "Madhya Pradesh"
  }
]
```

---

## 3. Filter Students by State

Retrieves students belonging to a specific state.

**Endpoint**: `GET /api/students?stateId={id}`

**Query Parameters**:
- `stateId` (integer, required): The ID of the state

**Example**: `GET /api/students?stateId=23`

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "stateId": 23,
    "stateName": "Madhya Pradesh"
  }
]
```

---

## 4. Create Student

Creates a new student record.

**Endpoint**: `POST /api/students`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "address": "456 Park Ave",
  "stateId": 23
}
```

**Validation Rules**:
- `name`: Required, max 100 characters
- `email`: Required, valid email format, max 100 characters
- `phone`: Required, 10 digits
- `address`: Required, max 200 characters
- `stateId`: Required, must exist in States table

**Response**: `201 Created`
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "address": "456 Park Ave",
  "stateId": 23,
  "stateName": "Madhya Pradesh"
}
```

**Error Response**: `400 Bad Request`
```json
{
  "errors": {
    "Email": ["The Email field is not a valid e-mail address."],
    "Phone": ["Phone must be 10 digits."]
  }
}
```

---

## 5. Update Student

Updates an existing student record.

**Endpoint**: `PUT /api/students/{id}`

**Path Parameters**:
- `id` (integer, required): The ID of the student to update

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "id": 1,
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "9876543210",
  "address": "789 New St",
  "stateId": 10
}
```

**Note**: The `id` in the body must match the `id` in the URL.

**Response**: `204 No Content`

**Error Responses**:

`400 Bad Request` - ID mismatch
```json
{
  "error": "ID mismatch"
}
```

`404 Not Found` - Student not found
```json
{
  "error": "Student not found"
}
```

---

## 6. Delete Student

Deletes a student record.

**Endpoint**: `DELETE /api/students/{id}`

**Path Parameters**:
- `id` (integer, required): The ID of the student to delete

**Response**: `204 No Content`

**Error Response**: `404 Not Found`
```json
{
  "error": "Student not found"
}
```

---

## Data Models

### Student Model
```typescript
{
  id: number;           // Auto-generated
  name: string;         // Required, max 100 chars
  email: string;        // Required, valid email, max 100 chars
  phone: string;        // Required, 10 digits
  address: string;      // Required, max 200 chars
  stateId: number;      // Required, foreign key
  stateName?: string;   // Read-only, populated from State table
}
```

### State Model
```typescript
{
  id: number;           // Primary key
  name: string;         // State name
}
```

---

## Indian States List (29)

1. Andhra Pradesh
2. Arunachal Pradesh
3. Assam
4. Bihar
5. Chhattisgarh
6. Goa
7. Gujarat
8. Haryana
9. Himachal Pradesh
10. Jharkhand
11. Karnataka
12. Kerala
13. Madhya Pradesh
14. Maharashtra
15. Manipur
16. Meghalaya
17. Mizoram
18. Nagaland
19. Odisha
20. Punjab
21. Rajasthan
22. Sikkim
23. Tamil Nadu
24. Telangana
25. Tripura
26. Uttar Pradesh
27. Uttarakhand
28. West Bengal
29. Delhi (NCT)

---

## Testing with cURL

### Get All States
```bash
curl -X GET http://localhost:5000/api/students/states
```

### Get All Students
```bash
curl -X GET http://localhost:5000/api/students
```

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "test@example.com",
    "phone": "9876543210",
    "address": "Test Address",
    "stateId": 23
  }'
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Updated Name",
    "email": "updated@example.com",
    "phone": "9876543210",
    "address": "Updated Address",
    "stateId": 10
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

---

## Testing with Swagger

1. Start the API: `dotnet run` in `StudentApi/` directory
2. Open browser: `http://localhost:5000/swagger`
3. Expand any endpoint
4. Click "Try it out"
5. Fill in parameters/body
6. Click "Execute"
7. View response

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Request successful, no content to return |
| 400 Bad Request | Invalid request data or validation error |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Server error |

---

## CORS Configuration

The API is configured to accept requests from any origin during development:

```csharp
AllowAnyOrigin()
AllowAnyHeader()
AllowAnyMethod()
```

**Note**: For production, restrict CORS to specific origins.
