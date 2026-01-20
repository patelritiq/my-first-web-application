import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../services/student';  // ← Path to service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student, State } from '../../models/student.interface';

declare var $: any;

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})


export class StudentComponent implements OnInit, OnDestroy {
  
  private dataTable: any;

  students = signal<Student[]>([]);
  newStudent = signal<Partial<Student>>({ name: '', age: undefined, email: '', stateId: 0 });
  editingId = signal<number | null>(null);
  isEditing = computed(() => this.editingId() !== null);

  // Error signals for validation
  ageError = signal<string | null>(null);
  nameError = signal<string | null>(null);
  emailError = signal<string | null>(null);
  stateError = signal<string | null>(null);

  states = signal<State[]>([]);
  selectedStateId = signal<number | null>(null);

  // Table visibility control
  showStudentsTable = signal<boolean>(false);

  constructor(private studentService: StudentService) { }

  clearErrors() {
    this.nameError.set(null);
    this.emailError.set(null);
    this.ageError.set(null);
    this.stateError.set(null);
  }

  editStudent(student: any) {
    this.editingId.set(student.id);
    this.newStudent.set({
      name: student.name,
      age: student.age,
      email: student.email,
      stateId: student.stateId
    });
    this.selectedStateId.set(student.stateId);
    this.setSelect2Value(student.stateId);
    this.clearErrors();
  }

  ngOnInit() {
    this.studentService.getStates().subscribe({ 
      next: (data) => {
        this.states.set(data);
        // Initialize Select2 after states are loaded
        setTimeout(() => this.initializeSelect2(), 300);
      },
      error: (err) => console.error('States load error:', err)
    });
  }

  initializeSelect2() {
    if (typeof $ === 'undefined') {
      console.error('jQuery not loaded');
      return;
    }
    
    const $select = $('#stateSelect');
    
    if ($select.length === 0) {
      console.error('Select element not found');
      return;
    }
    
    // Check if select2 function exists
    if (typeof $select.select2 !== 'function') {
      console.error('Select2 not loaded');
      return;
    }
    
    // Destroy existing Select2 if any
    if ($select.hasClass('select2-hidden-accessible')) {
      $select.select2('destroy');
    }
    
    // Initialize Select2 with search always visible
    $select.select2({
      placeholder: 'Search and select a state...',
      allowClear: true,
      width: '100%',
      minimumResultsForSearch: 0,
      dropdownParent: $select.parent()
    });
    
    // Handle Select2 change event
    $select.on('select2:select', (e: any) => {
      const selectedValue = e.params.data.id;
      this.updateState(+selectedValue || null);
    });
    
    $select.on('select2:clear', () => {
      this.updateState(null);
    });
  }

  setSelect2Value(value: number | null) {
    if (typeof $ !== 'undefined' && $('#stateSelect').hasClass('select2-hidden-accessible')) {
      $('#stateSelect').val(value || '0').trigger('change.select2');
    }
  }

  showStudents() {
    this.showStudentsTable.set(true);
    
    // Load students data if not already loaded
    if (this.students().length === 0) {
      this.loadStudents();
    }
    
    // Initialize DataTable after showing the div and loading data
    setTimeout(() => {
      this.initializeDataTable();
    }, 200);
  }

  resetPage() {
    // Hide the table
    this.showStudentsTable.set(false);
    
    // Reset the form
    this.resetForm();
    
    // Destroy DataTable if it exists
    if (this.dataTable) {
      this.dataTable.destroy(true);
      this.dataTable = null;
    }
  }

  ngOnDestroy() {
    if (this.dataTable) {
      this.dataTable.destroy(true);
    }
  }

  initializeDataTable() {
    // Check if jQuery and DataTables are available
    if (typeof $ === 'undefined' || !$.fn.DataTable) {
      console.error('jQuery or DataTables not loaded');
      return;
    }

    // Destroy existing table if it exists
    if ($.fn.DataTable.isDataTable('#studentsTable')) {
      $('#studentsTable').DataTable().destroy();
    }

    // Get current data
    const data = this.students();

    try {
      this.dataTable = $('#studentsTable').DataTable({
        data: data,
        dom: '<"dt-top-row"lfB>rt<"dt-bottom-row"ip>',
        buttons: [
          'copy', 'csv', 'print'
        ],
        columns: [
          { 
            title: 'S.No.',
            data: null,
            render: function(_data: any, _type: any, _row: any, meta: any) {
              return meta.row + 1;
            },
            orderable: true,
            searchable: false,
            width: '60px'
          },
          { title: 'Name', data: 'name', width: '200px'},
          { title: 'Age', data: 'age', width: '60px' },
          { title: 'Email', data: 'email', width: '250px' },
          { 
            title: 'State', 
            data: null,
            width: '160px',
            render: function(_data: any, _type: any, row: any) {
              return row.state ? row.state.stateName : 'N/A';
            }
          },
          {
            title: 'Actions',
            data: null,
            render: function(_data: any, _type: any, row: any) {
              return '<div class="action-buttons">' +
                     '<button class="btn-edit" data-id="' + row.id + '">Edit</button> ' +
                     '<button class="btn-delete" data-id="' + row.id + '">Delete</button>' +
                     '</div>';
            },
            orderable: false,
            searchable: false,
            width: '180px'
          }
        ],
        pageLength: 10,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        order: [[1, 'asc']],
        searching: true,
        ordering: true,
        paging: true,
        info: true,
        language: {
          search: "Filter:",
          lengthMenu: "Show _MENU_ entries",
          info: "Showing page _PAGE_ of _PAGES_",
          infoEmpty: "No students found",
          infoFiltered: "(filtered from _MAX_ total students)",
          zeroRecords: "No matching students found",
          emptyTable: "No students available",
          paginate: {
            next: "Next",
            previous: "Previous"
          }
        }
      });

      // Apply custom styling after DataTable initialization
      setTimeout(() => {
        this.applyCustomDataTableStyling();
      }, 100);

      // Add event handlers
      $('#studentsTable tbody').on('click', '.btn-edit', (e: any) => {
        const id = parseInt($(e.target).data('id'));
        const student = this.students().find(s => s.id === id);
        if (student) {
          this.editStudent(student);
        }
      });

      $('#studentsTable tbody').on('click', '.btn-delete', (e: any) => {
        const id = parseInt($(e.target).data('id'));
        if (confirm('Are you sure you want to delete this student?')) {
          this.deleteStudent(id);
        }
      });

    } catch (error) {
      console.error('Error initializing DataTable:', error);
    }
  }

  applyCustomDataTableStyling() {
    const $wrapper = $('#studentsTable_wrapper');
    
    // Style the top row - length on left, filter on right
    $wrapper.find('.dt-top-row').css({
      'display': 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      'margin-bottom': '15px',
      'padding': '10px 0',
      'flex-wrap': 'wrap',
      'gap': '10px'
    });
    
    // Style the bottom row - info on left, pagination on right
    $wrapper.find('.dt-bottom-row').css({
      'display': 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
      'margin-top': '15px',
      'padding': '10px 0',
      'flex-wrap': 'wrap',
      'gap': '10px'
    });
    
    // Style the length control (Show entries)
    const $length = $wrapper.find('.dataTables_length');
    $length.css({
      'margin': '0'
    });
    
    $length.find('label').css({
      'color': '#374151',
      'font-size': '14px',
      'font-weight': '500',
      'margin': '0',
      'display': 'flex',
      'align-items': 'center',
      'gap': '5px'
    });
    
    $length.find('select').css({
      'padding': '6px 8px',
      'border': '1px solid #d1d5db',
      'border-radius': '4px',
      'background': '#ffffff',
      'color': '#1f2937',
      'margin': '0 5px'
    });
    
    // Style the filter (Search box) - ensure it's on the right
    const $filter = $wrapper.find('.dataTables_filter');
    $filter.css({
      'margin': '0',
      'margin-left': 'auto'
    });
    
    $filter.find('label').css({
      'display': 'flex',
      'align-items': 'center',
      'gap': '8px',
      'font-weight': '500',
      'color': '#374151',
      'font-size': '14px',
      'margin': '0'
    });
    
    $filter.find('input').css({
      'width': '200px',
      'padding': '8px 12px',
      'border': '1px solid #d1d5db',
      'border-radius': '6px',
      'background': '#ffffff',
      'color': '#1f2937',
      'font-size': '14px',
      'outline': 'none',
      'margin': '0'
    });
    
    // Style the info section (bottom left)
    const $info = $wrapper.find('.dataTables_info');
    $info.css({
      'color': '#6b7280',
      'font-size': '14px',
      'font-weight': '500',
      'margin': '0'
    });
    
    // Style the pagination (bottom right)
    const $paginate = $wrapper.find('.dataTables_paginate');
    $paginate.css({
      'margin': '0',
      'margin-left': 'auto'
    });
    
    // Style pagination buttons
    $paginate.find('.paginate_button').css({
      'padding': '6px 12px',
      'margin': '0 2px',
      'border': '1px solid #d1d5db',
      'border-radius': '4px',
      'background': '#ffffff',
      'color': '#374151',
      'text-decoration': 'none',
      'cursor': 'pointer'
    });
    
    // Style buttons container
    $wrapper.find('.dt-buttons').css({
      'margin': '0 10px'
    });
    
    $wrapper.find('.dt-buttons .dt-button').css({
      'padding': '6px 12px',
      'border': '1px solid #d1d5db',
      'border-radius': '4px',
      'background': '#ffffff',
      'color': '#374151',
      'font-size': '14px',
      'cursor': 'pointer',
      'margin-right': '5px'
    });
    
    // Add strong border around the entire table
    $('#studentsTable').css({
      'border': '3px solid #374151',
      'border-radius': '8px',
      'overflow': 'hidden',
      'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)'
    });
    
    // Style table headers with stronger border
    $('#studentsTable thead th').css({
      'background-color': '#f3f4f6',
      'color': '#1f2937',
      'font-weight': '600',
      'border-bottom': '3px solid #374151',
      'border-right': '1px solid #d1d5db'
    });
    
    // Style table cells
    $('#studentsTable tbody td').css({
      'border-right': '1px solid #d1d5db',
      'border-bottom': '1px solid #d1d5db'
    });
    
    // Add focus effect for search input
    $filter.find('input').on('focus', (e: any) => {
      $(e.target).css({
        'border-color': '#10b981',
        'box-shadow': '0 0 0 3px rgba(16, 185, 129, 0.1)'
      });
    }).on('blur', (e: any) => {
      $(e.target).css({
        'border-color': '#d1d5db',
        'box-shadow': 'none'
      });
    });
  }


  resetForm() {
    this.newStudent.set({ name: '', age: undefined, email: '', stateId: 0});
    this.editingId.set(null); 
    this.selectedStateId.set(null);
    this.setSelect2Value(null);
    this.clearErrors();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        
        // Update DataTable if it exists, otherwise it will be initialized with this data
        if (this.dataTable) {
          this.updateDataTable(data);
        }
      },  
      error: (err) => console.error('Load error:', err)
    });
  }

  updateDataTable(data: Student[]) {
    if (this.dataTable) {
      this.dataTable.clear();
      this.dataTable.rows.add(data);
      this.dataTable.draw();
    }
  }

  saveStudent() {
    // Trigger validation for all fields
    this.updateName(this.newStudent().name || '');
    this.updateEmail(this.newStudent().email || '');
    this.updateState(this.selectedStateId());
    
    const currentAge = this.newStudent().age;
    if (currentAge !== undefined && currentAge !== null) {
      this.updateAge(currentAge.toString());
    } else {
      this.ageError.set('Age is required');
    }

    // Check for any validation errors
    if (this.nameError() || this.emailError() || this.ageError() || this.stateError()) {
      return;
    }

    const payload: Student = {
      name: this.newStudent().name || '',
      age: this.newStudent().age || 0,
      email: this.newStudent().email || '',
      stateId: this.selectedStateId()!
    };

    if (this.isEditing()) {
      this.studentService.updateStudent(this.editingId()!, payload).subscribe({
        next: () => {
          alert('Student updated successfully!');
          this.resetForm();
          this.loadStudents();
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this.studentService.addStudent(payload).subscribe({
        next: () => {
          alert('Student added successfully!');
          this.resetForm();
          this.loadStudents();
        },
        error: (err) => console.error('Add error:', err)
      });
    }
  }



  deleteStudent(id: number) {
    if (!id) {
      console.error('No ID found!');
      return;
    }
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        alert('Student deleted successfully!');
        this.loadStudents();
      },
      error: (err) => console.error('Delete error:', err)
    });
  }

  updateName(name: string) {
    this.newStudent.update(current => ({ ...current, name }));
    
    // Validate name
    if (!name || name.trim().length === 0) {
      this.nameError.set('Name is required');
    } else if (name.trim().length < 2) {
      this.nameError.set('Name must be at least 2 characters');
    } else {
      this.nameError.set(null);
    }
  }

  updateAge(age: string) {
    const value = Number(age);

    if (!age || age.trim() === '') {
      this.ageError.set('Age is required');
      this.newStudent.update(current => ({ ...current, age: undefined }));
      return;
    }

    if (isNaN(value)) {
      this.ageError.set('Age must be a number!');
      return;
    }

    if (!Number.isInteger(value)) {
      this.ageError.set('Age must be a whole number!');
      return;
    }

    if (value < 1 || value > 150) {
      this.ageError.set('Please enter a realistic age! (1-150)');
    } else {
      this.ageError.set(null);
    }

    this.newStudent.update(current => ({ ...current, age: value }));
  }

  updateEmail(email: string) {
    this.newStudent.update(current => ({ ...current, email }));
    
    // Validate email
    if (!email || email.trim().length === 0) {
      this.emailError.set('Email is required');
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.emailError.set('Please enter a valid email address');
      } else {
        this.emailError.set(null);
      }
    }
  }

  updateState(stateId: number | null) {
    this.selectedStateId.set(stateId);
    
    // Validate state selection
    if (!stateId || stateId === 0) {
      this.stateError.set('Please select a state');
    } else {
      this.stateError.set(null);
    }
  }
  
}
