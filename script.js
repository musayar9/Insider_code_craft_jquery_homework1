$(function () {
  // Data kept by students
  let studentData = [
    {
      id: 1,
      firstName: "Ali",
      lastName: "Yılmaz",
      gender: "Male",
      email: "ali.yilmaz@example.com",
      classNo: 12,
      section: "A",
    },
    {
      id: 2,
      firstName: "Zeynep",
      lastName: "Kara",
      gender: "Female",
      email: "zeynep.kara@example.com",
      classNo: 11,
      section: "B",
    },
    {
      id: 3,
      firstName: "Mehmet",
      lastName: "Demir",
      gender: "Male",
      email: "mehmet.demir@example.com",
      classNo: 10,
      section: "B",
    },
  ];

  // Table body variable has been defined
  const studentTableBody = $("#studentTableBody");

  // When the page first loads, the data will be added to the table
  function renderList() {
    studentTableBody.empty();
    let studentListHtml = null;
    for (let student of studentData) {
      studentListHtml = `
                      <tr class="list-item">
                         <td>${student.firstName.toUpperCase()}</td>
                         <td>${student.lastName.toUpperCase()}</td>
                         <td>${student.email}</td>
                         <td>${student.gender}</td>
                         <td>${student.classNo}/${student.section}</td>
                        <td>  <button class="deleteBtn" data-id=${
                          student.id
                        }>Sil</button></td>
                     </tr>
                  `;
      studentTableBody.append(studentListHtml);
    }
  }

  // When the form is submitted, the new student will be added to the data
  $("#studentForm").submit(function (e) {
    e.preventDefault();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const email = $("#email").val();
    const gender = $("input[name='gender']:checked").val();
    const classNo = $("#classNo").val();
    const section = $("#section").val();
    const newStudent = {
      id: studentData.length + 1,
      firstName,
      lastName,
      gender,
      email,
      classNo,
      section,
    };

    studentData = [newStudent, ...studentData];
    // When new data is added, the data will be re-rendered
    renderList();
    $("#studentForm")[0].reset();
  });

  // Hover effect is applied to the "Add Student" button using mouseenter and mouseleave events
  $("#addStudentBtn")
    .on("mouseenter", function () {
      $(this).css({
        "background-color": "#4f39f6",
        transform: "translateY(2px)",
      });
    })
    .on("mouseleave", function () {
      $(this).css({
        "background-color": "",
        transform: "",
      });
    });

  // When any element with the class .list-item in the table is clicked, its background color will change

  studentTableBody.on("click", ".list-item", function () {
    $(this).toggleClass("changeColor");
  });

  // When the delete button in the table is clicked, the corresponding data will be deleted

  studentTableBody.on("click", ".deleteBtn", function () {
    const studentId = $(this).data("id");
    studentData = studentData.filter((student) => student.id !== studentId);
    // Re-render the table after deleting data
    renderList();
  });

  renderList();
});
