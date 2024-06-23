/*Tasks Table or database*/
let tasks = [
  {
    title: "قرائة كتاب",
    date: "15/10/2024",
    isDone: false,
  },
  {
    title: "انهاء المشروع النهائي",
    date: "15/10/2024",
    isDone: true,
  },
  {
    title: "انهاء كورس الجافاسكريبت",
    date: "15/10/2024",
    isDone: false,
  },
  {
    title: "انهاء كورس الجافاسكريبت",
    date: "15/10/2024",
    isDone: true,
  },
];

function gettFromStorage() {
  let preTask = JSON.parse(localStorage.getItem("myTasks"));
  if (preTask == null) {
    tasks = [];
  } else {
    tasks = preTask;
  }
}

gettFromStorage();

/*Getting all the tasks*/
function getAllTheTasks() {
  document.getElementById("main-container").innerHTML = "";
  let index = 0;
  for (let task of tasks) {
    document.getElementById("main-container").innerHTML += `
    <div class="main-div ${task.isDone ? "completed" : ""}" id="main">
        <div class="mission-text">
            <h2>${task.title}</h2>
            <div>
                <span>${task.date}</span>
                <span class="material-symbols-outlined">calendar_month</span>
            </div>
        </div>
        <div class="icons">
            <span onclick="deleteTask(${index})" id="deleted" class="material-symbols-outlined del" style="background-color: #FF0000;">delete</span>
            ${
              task.isDone
                ? `
                        <span onclick="verifyIsNotDone(${index})" id="finished" class="material-symbols-outlined chek" style="background-color: #D10363;">
                          close
                        </span>
                `
                : `
                        <span onclick="verifyIsDone(${index})" id="finished" class="material-symbols-outlined chek" style="background-color: #059212;">
                          check
                        </span>
            `
            }
            <span onclick="updateTask(${index})" id="edited" class="material-symbols-outlined edit" style="background-color: #FFC700;">edit</span>
        </div>
    </div>
    `;
    index++;
  }
}
getAllTheTasks();

/*Showing the Modal*/
document.getElementById("button").addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

/*Creating the new Task */
document.getElementById("mission-button").addEventListener("click", () => {
  let newTask = { title: "", date: "", isDone: false };
  let newDate = new Date();
  newTask["title"] = document.getElementById("mission-input").value;
  newTask["date"] = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
  newTask["isDone"] = false;
  document.getElementById("modal").style.display = "none";
  tasks.push(newTask);
  storeTasks();
  getAllTheTasks();
});

/*Hiding the Modal*/
document.getElementById("giveup-button").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

/*Deleting Task Function*/
function deleteTask(index) {
  let confirmed = confirm("هل تريد حذف المهمة ؟");
  if (confirmed) {
    tasks.splice(index, 1);
    storeTasks();
    getAllTheTasks();
  }
}

/*Updating the Task*/
function updateTask(index) {
  let updatedTask = prompt("تعديل المهمة", tasks[index].title);
  if (updatedTask) {
    tasks[index].title = updatedTask;
    storeTasks();
    getAllTheTasks();
  }
}

/*Defining completed Tasks*/
function verifyIsDone(index) {
  let task = tasks[index];
  task.isDone = true;
  getAllTheTasks();
  storeTasks();
}

function verifyIsNotDone(index) {
  let task = tasks[index];
  task.isDone = false;
  getAllTheTasks();
  storeTasks();
}

/*Local Storage Function*/
function storeTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("myTasks", tasksString);
}
