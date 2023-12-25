// Import CSS styles and necessary constants and utilities
import "./style/style.css";
import "./style/reset.css";

import { ID_LENGTH } from "./constants";
import { getRandomString } from "./utils";

// Object storing DOM elements
const navElement = {
  home: document.getElementById("home") as HTMLAnchorElement,
  completed: document.getElementById("completed") as HTMLAnchorElement,
  remaining: document.getElementById("remaining") as HTMLAnchorElement,
};

const domElement = {
  taskInputField: document.getElementById(
    "task-input-field"
  ) as HTMLInputElement,
  taskInputContainer: document.getElementById(
    "task-input-container"
  ) as HTMLFormElement,
  searchInputField: document.getElementById("task-search") as HTMLInputElement,
  searchInputContainer: document.getElementById(
    "search-container"
  ) as HTMLElement,
  taskContainer: document.getElementById("todo-list") as HTMLUListElement,
  emptyListContainer: document.getElementById("empty-list") as HTMLElement,
  addBtn: document.getElementById("addTask") as HTMLButtonElement,
};

// Arrays to store tasks
let taskListArray: ITask[] = [];
let remainingTaskArray: ITask[] = [];
let completedTaskArray: ITask[] = [];

// Flags to track tab clicks
let clickedAllTab: boolean = true;
let clickedCompletedTab: boolean = false;
let clickedRemainingTab: boolean = false;

// Event listeners for home navbar and render all the task list
navElement.home?.addEventListener("click", () => {
  {
    handleNavClick(navElement.home);
    renderTaskList();
  }
});

// Event listeners for completed navbar and render all the completed task list
navElement.completed?.addEventListener("click", () => {
  handleNavClick(navElement.completed);
  renderCompletedTask();
});

// Event listeners for remaining navbar and render all the remaining task list
navElement.remaining?.addEventListener("click", () => {
  handleNavClick(navElement.remaining);
  renderRemainingTask();
});

//  Event listeners for search bar to show border affect when clicked
domElement.searchInputField?.addEventListener("focus", () => {
  domElement.searchInputContainer.style.border = "2px solid rgb(61, 153, 252)";
});
domElement.searchInputField?.addEventListener("blur", () => {
  domElement.searchInputContainer.style.border = "none";
});

//  Event listeners for task input bar to show border affect when clicked
domElement.taskInputField?.addEventListener("focus", () => {
  domElement.taskInputContainer.style.borderBottom =
    "2px solid rgb(61, 153, 252)";
});
domElement.taskInputField?.addEventListener("blur", () => {
  domElement.taskInputContainer.style.border = "none";
});

// Event listeners to add the task
domElement.addBtn.addEventListener("click", addTask);
domElement.taskInputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    debugger;
    addTask();
  }
});

interface ITask {
  taskId: string;
  taskName: string;
  taskCompleted: boolean;
}

// Funtion to handel navbar event listeners
function handleNavClick(clickedElement: HTMLAnchorElement) {
  const tabs = Object.values(navElement);
  tabs.forEach((tab) => {
    if (tab === clickedElement) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  if (clickedElement === navElement.home) {
    renderTaskList();
  } else if (clickedElement === navElement.completed) {
    renderCompletedTask();
  } else if (clickedElement === navElement.remaining) {
    renderRemainingTask();
  }
}

// Function to filter tasks based on the search input value
function applySearchFilter(value: string, tasks: ITask[]) {
  clearContent();
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredTasks.length > 0) {
    domElement.emptyListContainer.style.display = "none";
  } else {
    domElement.emptyListContainer.style.display = "flex";
  }

  for (let index = 0; index < filteredTasks.length; index++) {
    createElement(filteredTasks[index]);
  }
}

// Event listener for the search input field to filter tasks
domElement.searchInputField.addEventListener("input", (e: Event) => {
  if (e.target == null) return;
  const value: string = (e.target as HTMLInputElement).value;

  if (clickedAllTab) {
    applySearchFilter(value, taskListArray);
  } else if (clickedCompletedTab) {
    applySearchFilter(value, completedTaskArray);
  } else if (clickedRemainingTab) {
    applySearchFilter(value, remainingTaskArray);
  }
});

// Function to add a new task
function addTask(): void {
  const taskName: string = domElement.taskInputField.value;
  if (
    domElement.taskInputField?.value == "" ||
    domElement.taskInputField?.value == null
  )
    return;
  domElement.taskInputField.value = "";
  var todoObject: ITask = {
    taskId: getRandomString(ID_LENGTH),
    taskName: taskName,
    taskCompleted: false,
  };
  taskListArray.push(todoObject);

  if (!todoObject.taskCompleted) {
    remainingTaskArray.push(todoObject);
  }

  if (clickedRemainingTab) {
    renderRemainingTask();
  }

  if (!clickedAllTab) return;
  renderTaskList();
}

// function to render all the tasks in the home navbar
function renderTaskList(): void {
  debugger;
  // Flags to track completed task is clicked
  clickedCompletedTab = false;
  clickedRemainingTab = false;
  clickedAllTab = true;

  clearContent();

  if (taskListArray.length > 0) {
    domElement.emptyListContainer.style.display = "none";
  }
  for (let index = 0; index < taskListArray.length; index++) {
    createElement(taskListArray[index]);
  }
}

// Function to render completed task in the completed navbar
function renderCompletedTask(): void {
  // Flags to track completed task is clicked
  debugger;
  clickedCompletedTab = true;
  clickedAllTab = false;
  clickedRemainingTab = false;

  clearContent();

  if (completedTaskArray.length <= 0) {
    domElement.emptyListContainer.style.display = "flex";
  } else {
    domElement.emptyListContainer.style.display = "none";
  }

  for (let index = 0; index < completedTaskArray.length; index++) {
    console.log(completedTaskArray[index]);
    createElement(completedTaskArray[index]);
  }
}

function renderRemainingTask(): void {
  // Flags to track completed task is clicked
  clickedRemainingTab = true;
  clickedAllTab = false;
  clickedCompletedTab = false;

  clearContent();

  if (remainingTaskArray.length <= 0) {
    domElement.emptyListContainer.style.display = "flex";
  } else {
    domElement.emptyListContainer.style.display = "none";
  }
  for (let index = 0; index < remainingTaskArray.length; index++) {
    createElement(remainingTaskArray[index]);
  }
}

// Function to clear the task container
function clearContent(): void {
  domElement.taskContainer.innerHTML = "";
}

// Function to create HTML elements for tasks
function createElement(task: ITask): void {
  // creates li.task > p.task-contents > input(checkbox).checkbox
  debugger;
  const dynamicLi = document.createElement("li");
  dynamicLi.classList.add("task");

  const myPara = document.createElement("p");
  myPara.classList.add("task-contents");
  myPara.textContent = task.taskName;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");

  domElement.taskContainer?.appendChild(dynamicLi);

  appendMultipleChildToParent(dynamicLi, myPara, checkBox);

  checkBox.addEventListener("click", checkTaskStatus);
  checkBox.setAttribute("taskId", task.taskId);

  // toggle to set the value of checkbox to checked
  if (task.taskCompleted) {
    checkBox.checked = true;
    document.querySelectorAll(".task-contents")?.forEach((task) => {
      task.classList.add("task-completed");
      // console.log(task);
    });
  } else {
    checkBox.checked = false;
    document.querySelectorAll(".task-contents")?.forEach((task) => {
      task.classList.remove("task-completed");
    });
  }
}

// Function to append multiple child elements to a parent
function appendMultipleChildToParent(
  parent: HTMLElement,
  ...children: HTMLElement[]
): void {
  children.forEach((child) => {
    parent.appendChild(child);
  });
}

// Function to handle the task status change (checked/unchecked)
function checkTaskStatus(event: Event): void {
  const target = event.target as HTMLInputElement;
  const taskId: string | null = target.getAttribute("taskId");

  if (taskId) {
    const taskObj = taskListArray.find((m) => m.taskId === taskId);

    if (taskObj) {
      taskObj.taskCompleted = target.checked;

      const taskContents =
        target.parentElement?.querySelector(".task-contents");

      if (taskContents) {
        if (taskObj.taskCompleted) {
          taskContents.classList.add("task-completed");
        } else {
          taskContents.classList.remove("task-completed");
        }
      }

      // Adds or removes task from the array based on task completed or remaining
      if (taskObj.taskCompleted) {
        completedTaskArray.push(taskObj);
        removeCheckedTaskFromRemaining(taskObj);
      } else {
        remainingTaskArray.push(taskObj);
        removeUncheckedTaskFromCompleted(taskObj);
      }
    }
  }
}

// Functions to remove unchecked tasks from completed arrays
function removeUncheckedTaskFromCompleted(taskObj: ITask): void {
  const index = completedTaskArray.findIndex(
    (task) => task.taskId === taskObj.taskId
  );
  if (index !== -1) {
    completedTaskArray.splice(index, 1);
    if (clickedCompletedTab) {
      renderCompletedTask();
    }
  }
}

// Functions to remove checked tasks from remaining arrays
function removeCheckedTaskFromRemaining(taskObj: ITask) {
  const index = remainingTaskArray.findIndex(
    (task) => task.taskId === taskObj.taskId
  );
  if (index !== -1) {
    remainingTaskArray.splice(index, 1);
    if (clickedRemainingTab) {
      renderRemainingTask();
    }
  }
}
