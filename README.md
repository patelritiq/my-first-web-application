# My First Web Application - Student Management System

[![.NET](https://img.shields.io/badge/.NET-10.0-blueviolet.svg)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-21-red.svg)](https://angular.dev/)
[![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-blue.svg)](https://www.microsoft.com/sql-server)
[![Entity Framework](https://img.shields.io/badge/EF%20Core-ORM-purple.svg)](https://docs.microsoft.com/ef/core/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack student management system built with ASP.NET Core Web API and Angular to learn and understand end-to-end web development, REST API design, and database-driven application architecture.

---

## Project Statistics 📊

- **5 REST API endpoints** (CRUD + filtering)
- **Full-stack architecture** (Frontend + Backend + Database)
- **Entity Framework Core migrations** for schema management
- **DataTables integration** for scalable data handling

---

## Project Overview 🎯

This project represents my journey into full-stack development, built during professional training as a Graduate Engineer Trainee. It demonstrates a complete student management workflow connecting Angular forms, REST APIs, and SQL Server database operations in a single cohesive system.

### Development Context
- Built as a hands-on learning project to master .NET and Angular
- Focused on understanding full-stack development patterns and best practices
- Demonstrates practical implementation of CRUD operations, API integration, and relational database design
- Foundation for building more complex enterprise applications

### What I Learned
- Building RESTful APIs with ASP.NET Core Web API
- Frontend development with Angular 21 and TypeScript
- Database design and Entity Framework Core migrations
- API-frontend integration and state management
- Form validation on both client and server side
- CORS configuration and API security basics

---

## Key Features ✨

- Complete CRUD operations for student records
- State-based filtering through API query parameters
- Frontend and backend validation for data integrity
- Separated API and UI codebases for maintainability
- Swagger documentation for API testing
- DataTables for efficient data display and pagination
- Select2 dropdowns for better UX

---

## Real-World Applications 🚀

While built as a learning project, this architecture pattern can be adapted for:

- Small schools and coaching institutes for digitizing student records
- Educational institutions needing basic student information systems
- Foundation for larger admin portals with role-based access
- Reference implementation for similar CRUD-based applications
- Starting point for enterprise-level student management systems

---

## Architecture & Design 🏗️

### Scalability Considerations
The chosen stack (Angular + ASP.NET Core + SQL Server) with DataTables integration supports future scaling through:
- API pagination and query optimization
- Database indexing for faster lookups
- Caching strategies for frequently accessed data
- Load balancing and horizontal scaling
- Cloud deployment options (Azure, AWS)

### Technology Stack

**Frontend**
- Angular 21 with TypeScript
- HTML5, CSS3
- jQuery, Select2 (UI components)
- DataTables (data display)

**Backend**
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core (ORM)
- Swagger/OpenAPI (documentation)

**Database**
- SQL Server
- 2 models (Student, State)
- EF Core migrations

---

## API Endpoints 🔌

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/states` | Fetch all Indian states (29 records) |
| GET | `/api/students` | Retrieve all student records |
| GET | `/api/students?stateId={id}` | Filter students by state |
| POST | `/api/students` | Create new student record |
| PUT | `/api/students/{id}` | Update existing student |
| DELETE | `/api/students/{id}` | Remove student record |

---

## Project Structure 📁

```text
my-first-web-application/
├── StudentApi/                 # Backend (.NET Web API)
│   ├── Controllers/           # API controllers
│   │   └── StudentsController.cs
│   ├── Data/                  # Database context
│   ├── Models/                # Entity models
│   │   ├── Student.cs
│   │   └── State.cs
│   ├── Migrations/            # EF Core migrations
│   ├── Program.cs             # Application entry point
│   └── StudentApi.csproj      # Project configuration
│
├── StudentUi/                 # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # UI components
│   │   │   ├── services/     # API services
│   │   │   └── models/       # TypeScript models
│   │   └── assets/           # Static files
│   ├── angular.json
│   ├── package.json
│   └── proxy.conf.json       # API proxy config
│
├── .gitignore
├── LICENSE
├── SETUP.md
├── API_REFRENCE.md
└── README.md
```

---

## Local Setup 🛠️

### Quick Start

For detailed setup instructions, see [SETUP.md](SETUP.md)

For API documentation, see [API_REFERENCE.md](API_REFERENCE.md)

### Prerequisites
- .NET 10 SDK
- Node.js (v18+) and npm
- SQL Server (LocalDB or Express)

### Backend Setup

1. Navigate to API directory:
   ```bash
   cd StudentApi
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Update database connection string in `appsettings.json` if needed

4. Apply migrations:
   ```bash
   dotnet ef database update
   ```

5. Run the API:
   ```bash
   dotnet run
   ```
   API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to UI directory:
   ```bash
   cd StudentUi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```
   Application will open at `http://localhost:4200`

### Access Swagger Documentation
Once the API is running, visit: `http://localhost:5000/swagger`

---

## Current Limitations 🚧

- No authentication or authorization implemented
- No production deployment configuration
- No audit logging for data changes
- No advanced reporting or analytics
- No file upload functionality
- No email notifications

---

## Future Enhancements 🔮

- [ ] JWT-based authentication and role-based access control
- [ ] Server-side pagination for large datasets
- [ ] Advanced filtering and search capabilities
- [ ] Audit trail for all CRUD operations
- [ ] Import/export functionality (CSV, Excel)
- [ ] Student photo upload and management
- [ ] Email notifications for important events
- [ ] Analytics dashboard with charts
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Unit and integration tests

---

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author 👨‍💻

**Ritik Pratap Singh Patel**  
Web Developer 

*Built with dedication to learn and master full-stack development* 🚀

---

## Acknowledgments 🙏

This project was developed during professional training to gain hands-on experience with modern web development technologies and best practices.

---

## Documentation 📚

- [SETUP.md](SETUP.md) - Detailed setup and installation guide
- [API_REFERENCE.md](API_REFERENCE.md) - Complete API documentation with examples
- Swagger UI - Available at `http://localhost:5000/swagger` when API is running
