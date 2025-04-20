const API_URL = "https://api-production-f1d9.up.railway.app/api";

let items = [];
let itemToDelete = null;

function renderItems() {
  const list = $("#itemList");
  list.empty();
  items.forEach((item) => {
    const element = $(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.description}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-warning me-2 btn-edit" data-id="${item.id}">Editar</button>
          <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">Eliminar</button>
        </div>
      </li>
    `);
    list.append(element);
  });
}

async function loadItems() {
  items = await fetch(`${API_URL}/items`).then((r) => r.json());
  renderItems();
}

$(document).on("click", "#btnNuevo", function () {
  $("#itemId").val("");
  $("#itemName").val("");
  $("#itemDescription").val("");
  $("#itemModalLabel").text("Nuevo Item");
});

$("#itemForm").submit(async function (e) {
  e.preventDefault();
  const id = $("#itemId").val();
  const name = $("#itemName").val();
  const description = $("#itemDescription").val();

  if (id === "") {
    await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
  } else {
    await fetch(`${API_URL}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
  }

  loadItems();
  const modal = bootstrap.Modal.getInstance(document.getElementById("itemModal"));
  modal.hide();
});

$(document).on("click", ".btn-edit", function () {
  const id = $(this).data("id");
  const item = items.find((x) => x.id === id);
  $("#itemId").val(id);
  $("#itemName").val(item.name);
  $("#itemDescription").val(item.description);
  $("#itemModalLabel").text("Editar Item");
  new bootstrap.Modal(document.getElementById("itemModal")).show();
});

$(document).on("click", ".btn-delete", function () {
  itemToDelete = $(this).data("id");
  new bootstrap.Modal(document.getElementById("deleteModal")).show();
});

$("#confirmDelete").click(async function () {
  if (itemToDelete !== null) {
    await fetch(`${API_URL}/items/${itemToDelete}`, {
      method: "DELETE",
    });
    loadItems();
    const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
    modal.hide();
  }
});

$(document).ready(function () {
  loadItems();
});
