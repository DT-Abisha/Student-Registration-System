const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
let editRow = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const department = document.getElementById("department").value.trim();
  const course = document.getElementById("course").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validation
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain letters only");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number must be 10 digits");
    return;
  }

  if (editRow) {
    editRow.innerHTML = createRow(name, department, course, phone, email);
    editRow = null;
  } else {
    const row = document.createElement("tr");
    row.innerHTML = createRow(name, department, course, phone, email);
    table.appendChild(row);
  }

  form.reset();
});

function createRow(name, dept, course, phone, email) {
  return `
    <td>${name}</td>
    <td>${dept}</td>
    <td>${course}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>
      <button class="action-btn edit" onclick="editStudent(this)">Edit</button>
      <button class="action-btn delete" onclick="deleteStudent(this)">Delete</button>
    </td>
  `;
}

function editStudent(btn) {
  editRow = btn.parentElement.parentElement;
  const cells = editRow.children;

  document.getElementById("name").value = cells[0].innerText;
  document.getElementById("department").value = cells[1].innerText;
  document.getElementById("course").value = cells[2].innerText;
  document.getElementById("phone").value = cells[3].innerText;
  document.getElementById("email").value = cells[4].innerText;
}

function deleteStudent(btn) {
  if (confirm("Are you sure you want to delete this student record?")) {
    btn.parentElement.parentElement.remove();
  }
}
