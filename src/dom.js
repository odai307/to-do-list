import Project from "./project";

const myProject = new Project();

export default class Dom {
    init() {
        const projectListContainer = document.querySelector('[data-project-list-container]');
        const projectInput = document.querySelector('[data-project-input]');
        const addProjectBtn = document.querySelector('[data-add-project-btn]');
        const modalTitle = document.querySelector("[data-title]");
        const modalDescription = document.querySelector("[data-description]");
        const modalDueDate = document.querySelector("[data-dueDate]");
        const modalPriority = document.querySelector("[data-priority]");
        const submitTodoBtn = document.querySelector("[data-submit-modal]");
        const addTodoBtn = document.querySelector('[data-add-todo-btn]');
        const modalForm = document.querySelector('[data-modal]');
        const closeModalBtn = document.querySelector("[data-close-modal]");
        const todoListContainer = document.querySelector("[data-todo-list-container]");

        this.render(projectListContainer, todoListContainer);

        //Event Listeners
        addProjectBtn.addEventListener("click", () => {
            handleSubmit();
        })

        projectInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleSubmit();
            }
        })

        const handleSubmit = () => {
            myProject.addProject(projectInput.value);
            this.render(projectListContainer, todoListContainer);
            projectInput.value = "";
        }

        projectListContainer.addEventListener("click", (e) => {
            if (e.target.matches("button")) {
                const projectToDelete = e.target.parentElement.querySelector("span");
                myProject.removeProject(projectToDelete.textContent);
                this.render(projectListContainer, todoListContainer);
                
            } else if (e.target.matches("span")) {
                const allSpans = projectListContainer.querySelectorAll("span");
                allSpans.forEach(span => span.classList.remove("active"));
                myProject.changeActiveProject(e.target.textContent);
                this.render(projectListContainer, todoListContainer);
            }
        })

        addTodoBtn.addEventListener("click", () => {
            modalForm.showModal();
        });

        closeModalBtn.addEventListener("click", () => {
            modalForm.close();
        });

        submitTodoBtn.addEventListener("click", () => {
            const activeProject = myProject.projectArray.find(p => p.projectName === myProject.activeProject);
            const title = modalTitle.value;
            const dueDate = modalDueDate.value;
            const description = modalDescription.value;
            const priority = modalPriority.value;

            if (!title || !dueDate || !description || !priority) {
                alert("Please fill in all fields before adding a todo");
                return;
            }
            myProject.addTodoToProject(activeProject.projectName, title, dueDate, description, priority);
            this.render(projectListContainer, todoListContainer);
            modalTitle.value = "";
            modalDueDate.value = "";
            modalDescription.value = "";
            modalPriority.value = "low";
            modalForm.close();
        })

        todoListContainer.addEventListener("click", (e) => {
            if (e.target.matches(".delete-todo-btn")) {
                const activeProject = myProject.getActiveProject().projectName;
                const todoId = e.target.parentElement.dataset.id;
                myProject.removeTodoFromProject(activeProject, parseInt(todoId));
                this.render(projectListContainer, todoListContainer);
            }
        })

    }

    render(projectListContainer, todoListContainer) {
        projectListContainer.innerHTML = "";
        for (let project of myProject.getProjects()) {
            const li = document.createElement("li");
            li.classList.add("project");
            if (project.projectName === myProject.activeProject) {
                li.classList.add("active");
            }

            const span = document.createElement("span");
            span.textContent = project.projectName;
            li.appendChild(span);

            if (project.projectName !== "Default") {
                const btn = document.createElement("button");
                btn.textContent = "X";
                btn.classList.add("delete-project-btn");
                li.appendChild(btn);
            }
            projectListContainer.appendChild(li);
        }
        todoListContainer.innerHTML = "";
        const activeProject = myProject.getActiveProject();

        for (let todo of activeProject.todos) {
            const div = document.createElement("div");
            div.classList.add("todo-item");
            div.classList.add(`${todo.priority}`);
            div.dataset.id = todo.id;

            const h3 = document.createElement("h3");
            h3.textContent = todo.name;

            const h4 = document.createElement("h4");
            h4.textContent = todo.dueDate;

            const p = document.createElement("p");
            p.textContent = todo.description;

            const delTodoBtn = document.createElement("button");
            delTodoBtn.classList.add("delete-todo-btn");
            delTodoBtn.textContent = "X";

            const checkTodoBtn = document.createElement("button");
            checkTodoBtn.classList.add("check-btn");
            checkTodoBtn.textContent = "Check"

            div.appendChild(h3);
            div.appendChild(h4);
            div.appendChild(p);
            div.appendChild(delTodoBtn);
            div.appendChild(checkTodoBtn);
            todoListContainer.appendChild(div);
        }
        
    } 
}