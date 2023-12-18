using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StudentsController: ControllerBase
	{
        private readonly StudentsDbContext _studentsDbContext;
        public StudentsController(StudentsDbContext studentsDbContext)
        {
            _studentsDbContext = studentsDbContext;
        }

        [HttpGet]
        [Route("GetStudents")]
        public async Task<IEnumerable<Students>> GetStudents()
        {
            return await _studentsDbContext.Students.ToListAsync();
        }
        [HttpPost]
        [Route("AddStudents")]
        public async Task<Students> AddStudents(Students objStudents)
        {
            _studentsDbContext.Students.Add(objStudents);
            await _studentsDbContext.SaveChangesAsync();
            return objStudents;
        }
        [HttpPatch]
        [Route("UpdateStudents/{id}")]
        public async Task<Students> UpdateStudents(Students objStudents)
        {
            _studentsDbContext.Entry(objStudents).State = EntityState.Modified;
            await _studentsDbContext.SaveChangesAsync();
            return objStudents;
        }
        [HttpDelete]
        [Route("DeleteStudents/{id}")]
        public bool DeleteStudents(int id)
        {
            bool a = false;
            var students = _studentsDbContext.Students.Find(id);
            if (students != null)
            {
                a = true;
                _studentsDbContext.Entry(students).State = EntityState.Deleted;
                _studentsDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}

