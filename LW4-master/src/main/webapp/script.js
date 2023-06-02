let usersTable = $('.table');
function User(id, name, lastName, age, email, phone) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.phone = phone;
}
function Data(action, user) {
    this.action = action;
    this.User = user;
}

function AddUser() {
    let rawName = $('#inputName').val();
    let rawLastName = $('#inputLastName').val();
    let rawAge = $('#inputAge').val();
    let rawEmail = $('#inputEmail').val();
    let rawPhone = $('#inputPhone').val();

    let user = new User(null, rawName, rawLastName, rawAge, rawEmail, rawPhone);
    let data = new Data("add", user);

    $.ajax( {
        type: 'POST',
        url: 'MainServlet',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function RefreshUsers() {
    usersTable.find('tbody').empty();
    $.ajax({
        url: 'MainServlet',
        type: "GET",
        dataType: "json",
        success: function(data) {
            $.each(data, function(i, user) {
                let row = $("<tr>");

                let tdId = document.createElement("td");
                tdId.innerText = user.id;
                row.append(tdId);

                let tdName = document.createElement("td");
                tdName.setAttribute('contenteditable', 'true');
                tdName.innerText = user.name;
                row.append(tdName);

                let tdlastName = document.createElement("td");
                tdlastName.setAttribute('contenteditable', 'true');
                tdlastName.innerText = user.lastName;
                row.append(tdlastName);

                let tdAge = document.createElement("td");
                tdAge.setAttribute('contenteditable', 'true');
                tdAge.innerText = user.age;
                row.append(tdAge);

                let tdEmail = document.createElement("td");
                tdEmail.setAttribute('contenteditable', 'true');
                tdEmail.innerText = user.email;
                row.append(tdEmail);

                let tdPhone = document.createElement("td");
                tdPhone.setAttribute('contenteditable', 'true');
                tdPhone.innerText = user.phone;
                row.append(tdPhone);

                // Кнопка редактирования
                let btnEdit = document.createElement("button");
                btnEdit.setAttribute("id", "btnEdit");
                btnEdit.setAttribute("class", "btn btn-primary mr-1");
                let imgEdit = document.createElement("img");
                imgEdit.src = "/assets/edit.png";
                btnEdit.appendChild(imgEdit);

                btnEdit.addEventListener('click', () => {
                    const row = btnEdit.parentNode.parentNode;
                    const id = row.querySelector('td:nth-child(1)').innerText;
                    const name = row.querySelector('td:nth-child(2)').innerText;
                    const lastName = row.querySelector('td:nth-child(3)').innerText;
                    const age = row.querySelector('td:nth-child(4)').innerText;
                    const email = row.querySelector('td:nth-child(5)').innerText;
                    const phone = row.querySelector('td:nth-child(6)').innerText;

                    EditUser(new User(id, name, lastName, age, email, phone));
                });

                // Кнопка удаления
                let btnDelete = document.createElement("button");
                btnDelete.setAttribute("id", "btnDelete");
                btnDelete.setAttribute("class", "btn btn-primary");
                let imgDelete = document.createElement("img");
                imgDelete.src = "/assets/delete.png";
                btnDelete.appendChild(imgDelete);

                btnDelete.addEventListener('click', () => {
                    const row = btnDelete.parentNode.parentNode;
                    const id = row.querySelector('td:nth-child(1)').innerText;
                    const name = row.querySelector('td:nth-child(2)').innerText;
                    const lastName = row.querySelector('td:nth-child(3)').innerText;
                    const age = row.querySelector('td:nth-child(4)').innerText;
                    const email = row.querySelector('td:nth-child(5)').innerText;
                    const phone = row.querySelector('td:nth-child(6)').innerText;

                    DeleteUser(new User(id, name, lastName, age, email, phone));
                })

                row.append($('<td>').append(btnEdit).append(btnDelete));

                usersTable.find('tbody').append(row);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function DeleteUser(user) {
    let data = new Data("delete", user);
    $.ajax( {
        type: 'POST',
        url: 'MainServlet',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function EditUser(user) {
    let data = new Data("edit", user);
    $.ajax( {
        type: 'POST',
        url: 'MainServlet',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}