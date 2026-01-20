# My First Web Application - Student Management System

A full-stack Student Management System built with Angular and .NET Core - my first complete web application!

## 🎯 What It Does

- **Add Students**: Create new student records with validation
- **View Students**: Browse all students in a searchable, sortable table
- **Edit Students**: Update existing student information
- **Delete Students**: Remove students with confirmation
- **Manage States**: Organize students by their states

## 🛠️ Technologies Used

- **Frontend**: Angular 18 (TypeScript, HTML, CSS)
- **Backend**: ASP.NET Core Web API (.NET 8)
- **Database**: SQL Server with Entity Framework Core
- **UI Libraries**: DataTables, Select2, jQuery

## 🏗️ Project Structure

```
my-first-web-application/
├── StudentApi/              # .NET Web API
│   ├── Controllers/         # API endpoints
│   ├── Models/             # Data models (Student, State)
│   ├── Data/               # Database context
│   └── Program.cs          # App configuration
├── StudentUi/              # Angular application
│   ├── src/app/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   └── models/         # TypeScript interfaces
│   └── package.json        # Dependencies
└── README.md              # This file
```

## 🚀 How to Run

### Prerequisites
- .NET 8 SDK
- Node.js & npm
- SQL Server
- Angular CLI

### Backend Setup
1. Navigate to `StudentApi` folder
2. Run `dotnet restore`
3. Run `dotnet ef database update`
4. Run `dotnet run`
5. API will be available at `http://localhost:5146`

### Frontend Setup
1. Navigate to `StudentUi` folder
2. Run `npm install`
3. Run `ng serve`
4. App will be available at `http://localhost:4200`

## ✨ Key Features

- **Real-time Validation**: Form validation as you type
- **Advanced Table**: Search, sort, pagination, and export options
- **Responsive Design**: Works on desktop and mobile
- **State Management**: Dropdown with search functionality
- **Error Handling**: User-friendly error messages

## 🎓 What I Learned

This being my first web application, I learned:
- Full-stack development with Angular and .NET
- RESTful API design and implementation
- Database design with Entity Framework
- Frontend-backend communication
- Modern web development practices

## 🔧 API Endpoints

- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/states` - Get all states
- 

*This is my first full-stack web application - a milestone in my development journey!*
