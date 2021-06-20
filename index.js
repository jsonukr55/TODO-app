function addTask() {
  console.log("Updating List...");
  var task = {};
  task.title = document.getElementById("title").value;
  task.description = document.getElementById("description").value;
  var items = getItemFromLocalStorage();
  items.push(task);
  setItemsToLocalStorage(items);
  refreshTaskGrid();
}

function setItemsToLocalStorage(items) {
  localStorage.setItem("items",JSON.stringify(items));
}

function getItemFromLocalStorage() {
  var items = JSON.parse(localStorage.getItem("items"));
  if (items == null) {
    items = [];
  }
  return items;
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function refreshTaskGrid() {
  var items = getItemFromLocalStorage();
  // table fill up
  let tableBody = document.getElementById("tableBody");
  let str = "";
  items.forEach((task, index) => {
    str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${task.title}</td>
        <td>${task.description}</td> 
        <td><button class="btn" onclick="deleteItems(${index})">Remove</button></td> 
        </tr>`;
  });
  tableBody.innerHTML = str;
}

function deleteItems(itemIndex) {
  console.log("Delete", itemIndex);
  itemStr = localStorage.getItem("items")
  items = JSON.parse(itemStr);
  items.splice(itemIndex, 1);
  localStorage.setItem("items", JSON.stringify(items));
  refreshTaskGrid();
}

function clearStorage() {
  if (confirm("Do you areally want to clear?")) {
    console.log("Clearing the storage");
    setItemsToLocalStorage([]);
    refreshTaskGrid();
  }
}
