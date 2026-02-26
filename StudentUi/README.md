# StudentUi

Angular frontend for the Student Management System.

## Purpose

This UI was built as part of a .NET + Angular practice project during training. It connects to the backend API in `../StudentApi` and supports the full student CRUD workflow.

## Current Scope

- Add, edit, delete, and view students
- State selection for student records
- Client-side validation for form inputs
- API integration through Angular services

## Run Locally

1. `npm install`
2. `npm start`
3. Open `http://localhost:4200`

The project uses `proxy.conf.json` to forward `/api` calls to the backend server.

## Related Backend

See the root README in [../README.md](../README.md) for full-stack setup details, API endpoints, and project context.
