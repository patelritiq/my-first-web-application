using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentApi.Data;
using StudentApi.Models;

namespace StudentApi.Controllers
{
    [ApiController] // This class handles HTTP requests.
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // This is a dependency injection.
        // We use dependency injection so services like DbContext are managed centrally by the framework.
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            return Ok(await _context.States.ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents(int? stateId)
        {
            var query = _context.Students.Include(s => s.State).AsQueryable();
            if (stateId.HasValue)
                query = query.Where(s => s.StateId == stateId);
            return Ok(await query.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            try
            {
                // Log the incoming request
                Console.WriteLine($"Received student: Name={student.Name}, Age={student.Age}, Email={student.Email}, StateId={student.StateId}");
                
                // Validate required fields
                if (string.IsNullOrEmpty(student.Name) || string.IsNullOrWhiteSpace(student.Name))
                {
                    return BadRequest("Name is required and cannot be empty");
                }
                
                if (string.IsNullOrEmpty(student.Email) || string.IsNullOrWhiteSpace(student.Email))
                {
                    return BadRequest("Email is required and cannot be empty");
                }
                
                if (student.Age <= 0 || student.Age > 150)
                {
                    return BadRequest("Age must be between 1 and 150");
                }
                
                if (student.StateId <= 0)
                {
                    return BadRequest("Valid StateId is required");
                }
                
                // Check if state exists
                var stateExists = await _context.States.AnyAsync(s => s.StateId == student.StateId);
                if (!stateExists)
                {
                    return BadRequest($"State with ID {student.StateId} does not exist");
                }

                // Clear the State navigation property to avoid issues
                student.State = null;
                
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
                
                // Return the saved student with state information
                var savedStudent = await _context.Students
                    .Include(s => s.State)
                    .FirstOrDefaultAsync(s => s.Id == student.Id);
                    
                Console.WriteLine($"Student saved successfully with ID: {savedStudent?.Id}");
                return Ok(savedStudent);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding student: {ex.Message}");
                return BadRequest($"Error adding student: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            var existing = await _context.Students.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Name = student.Name;
            existing.Age = student.Age;
            existing.Email = student.Email;
            existing.StateId = student.StateId;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
