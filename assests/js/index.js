var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var submitInput = document.getElementById("submit");
var tableInput = document.getElementById("table");
var updateInput = document.getElementById("update");
var modal = new bootstrap.Modal(document.getElementById("exampleModal"));

var bookMarks = [];

if (localStorage.getItem("bookMarks") != null) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displayItems();
}

submitInput.onclick = function () {
  var nameValue = nameInput.value.trim();
  var urlValue = urlInput.value.trim();

  if (!isValidURL(urlValue)) {
    modal.show();
    return;
  }

  var dataInput = {
    name: nameValue,
    url: urlValue,
  };
  bookMarks.push(dataInput);
  displayItems();
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  clearData();
};

function isValidURL(url) {
  return /\.(com|net|org|edu|gov)$/i.test(url);
}

function displayItems() {
  var form = ``;
  for (var i = 0; i < bookMarks.length; i++) {
    form += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${bookMarks[i].name}</td>
                <td><a href="https://${
                  bookMarks[i].url
                }" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button onclick="updateRow(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                <td><button onclick="deleteRow(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`;
  }
  document.getElementById("table").innerHTML = form;
}

function deleteRow(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayItems();
}

var updatedIndex;

function updateRow(index) {
  nameInput.value = bookMarks[index].name;
  urlInput.value = bookMarks[index].url;
  updatedIndex = index;
}

updateInput.onclick = function () {
  bookMarks[updatedIndex].name = nameInput.value;
  bookMarks[updatedIndex].url = urlInput.value;
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayItems();
  clearData();
};

function clearData() {
  nameInput.value = "";
  urlInput.value = "";
}
