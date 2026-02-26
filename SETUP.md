# Setup Guide - Student Management System

This guide provides detailed instructions for setting up and running the Student Management System locally.

---

## Prerequisites

### Required Software

1. **.NET 10 SDK**
   - Download: https://dotnet.microsoft.com/download/dotnet/10.0
   - Verify installation: `dotnet --version`

2. **Node.js (v18 or higher)**
   - Download: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

3. **SQL Server**
   - Options:
     - SQL Server Express (free): https://www.microsoft.com/sql-server/sql-server-downloads
     - SQL Server LocalDB (included with Visual Studio)
     - SQL Server Developer Edition (free)
   - Verify installation: Check SQL Server Management Studio or Azure Data Studio

4. **Code Editor (Optional but Recommended)**
   - Visual Studio 2022 (Community Edition is free)
   - Visual Studio Code with C# and Angular extensions

---

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pateltitiq/my-first-web-application.git
cd my-first-web-application
```

### 2. Backend Setup (StudentApi)

#### 2.1 Navigate to API Directory
```bash
cd StudentApi
```

#### 2.2 Configure Database Connection

Open `appsettings.json` and update the connection string if needed:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=StudentManagementDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

For SQL Server Express, use:
```json
"DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=StudentManagementDb;Trusted_Connection=true;MultipleActiveResultSets=true"
```

#### 2.3 Restore Dependencies
```bash
dotnet restore
```

#### 2.4 Apply Database Migrations
```bash
dotnet ef database update
```

This will:
- Create the database
- Create tables (Students, States)
- Seed initial data (29 Indian states)

#### 2.5 Run the API
```bash
dotnet run
```

The API will start at: `http://localhost:5000`

#### 2.6 Test the API
Open browser and visit: `http://localhost:5000/swagger`

You should see the Swagger UI with all API endpoints.

---

### 3. Frontend Setup (StudentUi)

#### 3.1 Navigate to UI Directory
```bash
cd ../StudentUi
```

#### 3.2 Install Dependencies
```bash
npm install
```

This will install:
- Angular 21
- TypeScript
- jQuery, Select2
- DataTables
- Other dependencies

#### 3.3 Configure API Proxy (Already Done)

The `proxy.conf.json` file is already configured to proxy API requests to `http://localhost:5000`.

#### 3.4 Start Development Server
```bash
npm start
```

The application will open automatically at: `http://localhost:4200`

---

## Verification

### Backend Verification

1. API is running: `http://localhost:5000`
2. Swagger UI accessible: `http://localhost:5000/swagger`
3. Test endpoint: `GET http://localhost:5000/api/students/states`
   - Should return 29 Indian states

### Frontend Verification

1. Application loads: `http://localhost:4200`
2. State dropdown populated with 29 states
3. Can add, view, edit, and delete student records

---

## Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to SQL Server

**Solutions**:
- Verify SQL Server is running
- Check connection string in `appsettings.json`
- Try using SQL Server Management Studio to connect manually
- For LocalDB: `sqllocaldb start mssqllocaldb`

### Migration Issues

**Problem**: `dotnet ef` command not found

**Solution**:
```bash
dotnet tool install --global dotnet-ef
```

**Problem**: Migration fails

**Solution**:
```bash
# Delete existing database and recreate
dotnet ef database drop
dotnet ef database update
```

### Frontend Issues

**Problem**: `npm install` fails

**Solutions**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Try using `npm install --legacy-peer-deps`

**Problem**: CORS errors in browser console

**Solution**:
- Ensure backend is running on `http://localhost:5000`
- Check `proxy.conf.json` configuration
- Verify CORS policy in `Program.cs`

### Port Conflicts

**Problem**: Port 5000 or 4200 already in use

**Solutions**:

For Backend:
```bash
dotnet run --urls "http://localhost:5001"
```
(Update proxy.conf.json accordingly)

For Frontend:
```bash
ng serve --port 4201
```

---

## Development Workflow

### Making Changes

1. **Backend Changes**:
   - Modify code in `StudentApi/`
   - API auto-reloads with `dotnet watch run`

2. **Frontend Changes**:
   - Modify code in `StudentUi/src/`
   - Angular auto-reloads (hot reload enabled)

3. **Database Changes**:
   - Modify models in `StudentApi/Models/`
   - Create migration: `dotnet ef migrations add MigrationName`
   - Apply migration: `dotnet ef database update`

---

## Building for Production

### Backend
```bash
cd StudentApi
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd StudentUi
npm run build
```

Output will be in `StudentUi/dist/` directory.

---

## Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core/)
- [Angular Documentation](https://angular.dev/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [SQL Server Documentation](https://docs.microsoft.com/sql/)

---

## Need Help?

If you encounter issues not covered here, please check:
1. Console logs (browser and terminal)
2. API Swagger documentation
3. Database connection in SQL Server Management Studio
