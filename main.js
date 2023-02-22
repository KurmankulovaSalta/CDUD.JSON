let name1 = document.querySelector(".name");
let surname = document.querySelector(".surname");
let photo = document.querySelector(".photo");
let number = document.querySelector(".number");
let email = document.querySelector(".email");
let btnCreate = document.querySelector(".btn-create");

let list = document.querySelector(".list");

const API = "http://localhost:8000/contactBook";

let obj = {};

btnCreate.addEventListener("click", () => {
  if (
    !name1.value.trim() ||
    !surname.value.trim() ||
    !photo.value.trim() ||
    !number.value.trim() ||
    !email.value.trim()
  ) {
    alert("заполните поле");
    return;
  }
  obj = {
    name: name1.value,
    surname: surname.value,
    photo: photo.value,
    number: number.value,
    email: email.value,
  };

  name1.value = "";
  surname.value = "";
  photo.value = "";
  number.value = "";
  email.value = "";

  console.log(obj);

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  // render();
  // deleted();
  get();
});

async function get() {
  try {
    let res = await fetch(API);

    let contactBook = await res.json();

    render(contactBook);
  } catch (error) {
    // console.log(error);
    console.log(contactBook);
  }
}

get();

function render(contactBook) {
  list.innerHTML = "";
  contactBook.forEach((item) => {
    list.innerHTML += `<li class="list-group-item d-flex justify-content-between">
    <p>${item.name}</p>
    <p>${item.surname}</p>
    <p><img src=${item.photo} alt="photo" width="150"></p>
    <p>${item.number}</p>
    <p>${item.email}</p>
    <div>
        <button  onclick="deleted(${item.id})" class="btn btn-danger">delete</button>
        <button onclick="edit(${item.id})" class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
        </div>
        </li>
        `;
  });
}

get();
async function deleted(id) {
  try {
    await fetch(`${API}/${id}`, { method: "Delete" });
    get();
  } catch (error) {
    console.log(error);
  }
}
deleted();

// EDIT

let inpEdit = document.querySelector(".inp-edit");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let inpEdit4 = document.querySelector(".inp-edit4");
let saveEdit = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");

let editedObj = {};
inpEdit.addEventListener("input", (e) => {
  editedObj = {
    name: e.target.value,
  };
  console.log(editedObj);
});
let editedObj1 = {};
inpEdit1.addEventListener("input", (e) => {
  editedObj1 = {
    surname: e.target.value,
  };
});
let editedObj2 = {};
inpEdit2.addEventListener("input", (e) => {
  editedObj2 = {
    photo: e.target.value,
  };
});
let editedObj3 = {};
inpEdit3.addEventListener("input", (e) => {
  editedObj3 = {
    number: e.target.value,
  };
});
let editedObj4 = {};
inpEdit4.addEventListener("input", (e) => {
  editedObj4 = {
    email: e.target.value,
  };
});

async function edit(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();
    inpEdit.value = objToEdit.contactBook.name;
    inpEdit1.value = objToEdit.contactBook.surname;
    inpEdit2.value = objToEdit.contactBook.photo;
    inpEdit3.value = objToEdit.contactBook.number;
    inpEdit4.value = objToEdit.contactBook.email;

    console.log(objToEdit);
    saveEdit.setAttribute("id", `${id}`);
  } catch (error) {}
}

saveEdit.addEventListener("click", async (e) => {
  let id = e.target.id;
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(
        editedObj,
        editedObj1,
        editedObj2,
        editedObj3,
        editedObj4
      ),
    });
  } catch (error) {
    console.log(error);
  }
  get();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});
edit();
