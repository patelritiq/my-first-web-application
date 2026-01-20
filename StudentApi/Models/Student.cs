
//Student model represents the structure of the Student table in the database.

namespace StudentApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Email { get; set; } = string.Empty;
        public int StateId { get; set; }
        public State? State { get; set; }
    }
}
