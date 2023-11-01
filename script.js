// element ref

const btnRef = document.getElementsByClassName("btn")[0];
const taskWrapperRef = document.querySelector(".task_wrapper");
const inputRef = document.querySelector(".toDo-input");
const selectRef = document.getElementById("page_selector");
const pageRef = document.querySelector(".page");
const todosPerPage = document.getElementById("page_selector");
// state

let todos = [
  { id: "1", task: "Writting", isDone: false },
  { id: "2", task: "drawing", isDone: false },
];

let currectPage = 1;
// event Listen

taskWrapperRef.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const targetId = e.target.id.split("-")[1];
    if (e.target.innerHTML === "del") {
      todos = todos.filter((todo, index) => String(index + 1) !== targetId);
    }
    if (e.target.innerHTML === "done") {
      todos = todos.map((todo, index) => {
        if (String(index + 1) === targetId)
          return { ...todo, isDone: !todo.isDone };
        else return todo;
      });
    }
    filterTodos(currectPage);
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

  filterTodos(currectPage);
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

selectRef.addEventListener("change", (e) => {
  const itemsPerPage = Number(e.target.value);
  const totalNoOfPages = Math.ceil(todos.length / itemsPerPage);
  let noOfPagesButton = "";

  // render total pages button
  for (let i = 1; i <= totalNoOfPages; i++) {
    noOfPagesButton += `<button class="block">${i}</button>`;
  }
  pageRef.innerHTML = noOfPagesButton;

  filterTodos();
});

pageRef.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    currectPage = Number(e.target.innerText);
    filterTodos(currectPage);
  }
});

// render list
const renderList = (todos, intialIndex = 0, lastIndex = todos.length) => {
  updateNumberOfPages();
  let renderList = "";
  lastIndex = lastIndex <= todos.length ? lastIndex : todos.length;
  for (let index = intialIndex; index < lastIndex; index++) {
    renderList += `<div class="task_container id=${index + 1}">
  <div class="task">
    <div class="text_cont">
    <div class="serial_number task_text">${index + 1}</div>
    <p class="task_text ${todos[index].isDone ? "done" : ""}" id="task_text-${
      index + 1
    }">${todos[index].task}</p> 
    </div>  
    <div class="btn_wrapper">
      <button class="btn det_btn" id='del-${index + 1}'>del</button>
      <button class="btn done_btn" id='done-${index + 1}'>done</button>
    </div>
  </div>
</div>`;
  }
  //   const renderList = todos.map(
  //     (todo, index) => `<div class="task_container id=${index + 1}">
  //    <div class="task">
  //      <div>
  //      <div class="serial_number task_text">${index + 1}</div>
  //      <p class="task_text ${todo.isDone ? "done" : ""}" id="task_text-${
  //       index + 1
  //     }">${todo.task}</p> </div>
  //      <div class="btn_wrapper">
  //        <button class="btn det_btn" id='del-${index + 1}'>del</button>
  //        <button class="btn done_btn" id='done-${index + 1}'>done</button>
  //      </div>
  //    </div>
  //  </div>`
  //   );

  taskWrapperRef.innerHTML = renderList;
};

// update number of pages button

const updateNumberOfPages = () => {
  const noOfTodosPerPage = todosPerPage.value;
  console.log("todosPerPage.value", todosPerPage.value);
  const totalNoOfPages = Math.ceil(todos.length / noOfTodosPerPage);
  let noOfPagesButton = "";

  // render total pages button
  for (let i = 1; i <= totalNoOfPages; i++) {
    noOfPagesButton += `<button class="block">${i}</button>`;
  }
  pageRef.innerHTML = noOfPagesButton;
};

const filterTodos = (pageNumber = 1) => {
  const noOfTodosPerPage = Number(todosPerPage.value);
  let startIndex = (pageNumber - 1) * noOfTodosPerPage;
  let lastIndex = startIndex + noOfTodosPerPage;
  renderList(todos, startIndex, lastIndex);
};

//intial the project

window.addEventListener("load", () => {
  filterTodos();
});
