import axios from "axios";
import { useEffect, useState } from "react";

const StudentsCrud = () => {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
// http://localhost:5275/api/Students/GetStudents
    const result = await axios.get("http://localhost:5275/api/Students/GetStudents");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("http://localhost:5275/api/Students/AddStudents", {

        stname: stname,
        course: course,

      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setCourse("");


      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudents(students) {
    setName(students.stname);
    setCourse(students.course);
    setId(students.id);
  }

  async function DeleteStudents(id) {
    await axios.delete("http://localhost:5275/api/Students/DeleteStudents/" + id);
    alert("Employee deleted Successfully");
    setId("");
    setName("");
    setCourse("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch("http://localhost:5275/api/Students/UpdateStudents/" + students.find((u) => u.id === id).id || id,
        {
          id: id,
          stname: stname,
          course: course,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setCourse("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">

            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>


            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(students) {
          return (
            <tbody>
              <tr>
                <th scope="row">{students.id} </th>
                <td>{students.stname}</td>
                <td>{students.course}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudents(students)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudents(students.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

    </div>
  );
}

export default StudentsCrud