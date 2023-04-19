var studentName = document.getElementById("studentName");
var studentId = document.getElementById("studentId");
var studentGender = document.getElementById("studentGender");
var dateOfBirth = document.getElementById("dateOfBirth");
var studentNationality = document.getElementById("studentNationality");
var addBtn = document.getElementById("click");
var deleteAll = document.getElementById("deleteBtn");
var data = document.getElementById("data");
var inputs = document.getElementsByClassName("inputs");
var currentIndex = 0;


if (localStorage.getItem("studentsList") == null) {
    var students = [];
} else {
    students = JSON.parse(localStorage.getItem("studentsList"));
    displayStudents();
}

deleteAll.onclick = function () {
    Swal.fire({
        title: 'Are you sure you want to delete all students?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete All!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("studentsList");
            students = [];
            data.innerHTML = "";
            Swal.fire(
                'Deleted!',
                'All students has been deleted.',
                'success'
            )
        }
    })

}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add Student") {
        addStudents();
    } else {
        updateStudent();
        addBtn.innerHTML = "Add Student";
    }
    displayStudents();
    clear();

}

function addStudents() {
    var student = {
        name: studentName.value,
        id: studentId.value,
        date: dateOfBirth.value,
        nat: studentNationality.value,
        gender: studentGender.value,
    }
    students.push(student);
    localStorage.setItem("studentsList", JSON.stringify(students));
    addBtn.setAttribute("disabled", "disabled");
    Swal.fire({
        icon: 'success',
        title: 'Student Added successfully',
        showConfirmButton: false,
        timer: 1500
    })

}
studentName.onkeyup = function () {
    if (studentName.value.charAt(0)==studentName.value.charAt(0).toUpperCase()){
        addBtn.removeAttribute("disabled");
        studentName.classList.add("is-valid");
        studentName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");

    } else {
        addBtn.setAttribute("disabled", "disabled");
        studentName.classList.add("is-invalid");
        studentName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
}

function displayStudents() {
    var res = "";
    for (var i = 0; i < students.length; i++) {
        res += `
        <tr>
        <td>${i}</td>
        <td>${students[i].name}</td>
        <td>${students[i].id}</td>
        <td>${students[i].gender}</td>
        <td>${students[i].date}</td>
        <td>${students[i].nat}</td>
        <td><button class="btn btn-outline-primary" onclick="getStudentData(${i})">Edit</button>
        <button class="btn btn-outline-danger" onclick="deleteStudent(${i})">Delete</button></td>
        </tr>
        `;
    }
    data.innerHTML = res;
}

function clear() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}

function deleteStudent(index) {
    Swal.fire({
        title: 'Are you sure you want to delete this student?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            students.splice(index, 1);
            localStorage.setItem("studentsList", JSON.stringify(students));
            displayStudents();
            Swal.fire(
                'Deleted!',
                'The Student has been deleted.',
                'success'
            )
        }
    })

}

function search(searchName) {
    var res = "";
    for (var i = 0; i < students.length; i++) {
        if (students[i].name.toUpperCase().includes(searchName.toUpperCase())) {
            res += `
        <tr>
        <td>${i}</td>
        <td>${students[i].name}</td>
        <td>${students[i].id}</td>
        <td>${students[i].gender}</td>
        <td>${students[i].date}</td>
        <td>${students[i].nat}</td>
        <td><button class="update" onclick="updateStudent(${i})">update</button></td>
        <td><button class="delete" onclick="deleteStudent(${i})">delete</button></td>
        </tr>
        `;
        }
    }
    data.innerHTML = res;
}

function getStudentData(index) {

    addBtn.removeAttribute("disabled");

    var student = students[index];
    studentName.value = student.name;
    studentId.value = student.id;
    studentGender.value = student.gender;
    dateOfBirth.value = student.date;
    studentNationality.value = student.nat;
    addBtn.innerHTML = "Edit student";
    currentIndex = index;
}

function updateStudent() {
    var student = {
        name: studentName.value,
        id: studentId.value,
        gender: studentGender.value,
        date: dateOfBirth.value,
        nat: studentNationality.value,
    };
    students[currentIndex].name = student.name;
    students[currentIndex].id = student.id;
    students[currentIndex].gender = student.gender;
    students[currentIndex].date = student.date;
    students[currentIndex].nat = student.nat;
    localStorage.setItem("studentsList", JSON.stringify(students));
}