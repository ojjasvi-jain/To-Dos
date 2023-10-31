// element ref

const btnRef = document.getElementsByClassName("btn")[0];
const taskWrapperRef = document.querySelector(".task_wrapper");
const inputRef = document.querySelector(".toDo-input");

// state

let todos = [
  { id: "1", task: "Writting", isDone: false },
  { id: "2", task: "drawing", isDone: false },
];

// event Listen

taskWrapperRef.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const targetId = e.target.id.split("-")[1];
    if (e.target.innerHTML === "del") {
      todos = todos.filter((todo) => todo.id !== targetId);
    }
    if (e.target.innerHTML === "done") {
      todos = todos.map((todo) => {
        if (todo.id === targetId) return { ...todo, isDone: !todo.isDone };
        else return todo;
      });
    }
    renderList(todos);
  }
});

inputRef.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (e.target.value !== "")
      todos = [
        ...todos,
        { id: String(todos.length + 1), task: e.target.value, isDone: false },
      ];

    e.target.value = "";
  }

  renderList(todos);
});

taskWrapperRef.addEventListener("dblclick", (e) => {
  console.dir(e.target.parentElement);

  if (e.target.nodeName === "P") {
    const targetId = e.target.id.split("-")[1];
    let targetText = e.target;

    if (document.getElementById(`edit-${targetId}`)) {
      editInput = document.getElementById(`edit-${targetId}`);
      editInput.classList.remove("hide");
    } else {
      editInput = document.createElement("input");
    }

    editInput.id = `edit-${targetId}`;
    e.target.after(editInput);
    editInput.focus();
    e.target.classList.add("hide");

    // editInput blur event
    editInput.addEventListener("blur", (e) => {
      targetText.innerHTML = e.target.value;
      targetText.classList.remove("hide");
      editInput.classList.add("hide");
    });
  }
});

// render list
const renderList = (todos) => {
  console.log("======== todos", todos);
  const renderList = todos.map(
    (todo) => `<div class="task_container id=${todo.id}">
   <div class="task">
     <p class="task_text ${todo.isDone ? "done" : ""}" id="task_text-${
      todo.id
    }">${todo.task}</p>
     <div class="btn_wrapper">
       <button class="btn det_btn" id='del-${todo.id}'>del</button>
       <button class="btn done_btn" id='done-${todo.id}'>done</button>
     </div>
   </div>
 </div>`
  );

  taskWrapperRef.innerHTML = renderList.join(" ");
};

//intial the project

window.addEventListener("load", () => {
  renderList(todos);
});
