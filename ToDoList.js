// 일정 추가 기능
function addTask() {
    var newTask = document.getElementById("task").value.trim();
    if (newTask) {
        var taskList = document.getElementById("taskList");
        var newRow = taskList.insertRow();

        newRow.insertCell(0).textContent = new Date().toLocaleDateString();
        newRow.insertCell(1).innerHTML = '<span class="task-content" onclick="editTask(this)">' + newTask + '</span>';
        newRow.insertCell(2).innerHTML = '<button onclick="deleteTask(this.parentNode.parentNode)">X</button>';
        document.getElementById("task").value = "";
    }
}

// 일정 수정 기능
function editTask(taskSpan) {
    var currentText = taskSpan.textContent;
    var newText = prompt("일정 수정:", currentText);

    if (newText !== null) {
        taskSpan.textContent = newText;
    }
}

// 일정 삭제 기능
function deleteTask(row) {
    row.remove();
}

// 할일 추가 버튼 대신 엔터 쳐도 일정 추가되는 기능
function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}