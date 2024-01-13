const serverURL = `http://localhost:8080/todolist/`;

// 할 일 추가
function addTask() {
    var newTask = document.getElementById("task").value.trim();
    if (newTask) {
        fetch(`${serverURL}create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newTask, date: new Date().toISOString().slice(0, 10) }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const taskList = document.getElementById("taskList");
                let newRow = taskList.insertRow();

                newRow.insertCell(0).textContent = new Date().toLocaleDateString();
                newRow.insertCell(1).innerHTML = '<p class="task-content" onclick="editTask(this,' + data.id + ')">' + newTask + '</p>';
                newRow.insertCell(2).innerHTML = '<button onclick="deleteTask(this.parentNode.parentNode,' + data.id + ')">X</button>';
                document.getElementById("task").value = "";
            })
            .catch((error) => console.error('Error:', error));
    }
}

// 할 일 수정
function editTask(task, id) {
    const originalText = task.textContent;
    let editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('value', originalText);
    editInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            const newText = editInput.value.trim();
            if (newText) {
                const existingDate = task.parentNode.previousElementSibling.getAttribute('data-date');
                fetch(`${serverURL}${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: newText, date: existingDate }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        task.textContent = newText;
                    })
                    .catch(error => console.error('Error:', error));
            }
        }
    });
    task.textContent = "";
    task.appendChild(editInput);
    editInput.focus();
}


// 할 일 삭제
function deleteTask(row, id) {
    fetch(`${serverURL}${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            row.parentNode.removeChild(row);
        })
        .catch(error => console.error('Error:', error));
}

// 할 일 추가 버튼 대신 엔터 쳐도 일정 추가되는 기능
function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}