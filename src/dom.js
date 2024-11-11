//dom.js
import Project from "./project.js";

const myProject = new Project();

export default class Dom {
    projectListContainer = document.querySelector("[data-project-list-container]")
    addProjectBtn = document.querySelector("[data-add-btn]");
    projectInput = document.querySelector("[data-project-input]");
    activeProject = "Default";


    createProjectElement(project) {
        const li = document.createElement("li");
        li.classList.add("project");

        const projectName = document.createElement("span");
        projectName.textContent = project;
        li.appendChild(projectName);

        if (project !== "Default") {
            const button = this.createDeleteButton();
            li.appendChild(button);
        }

        li.addEventListener("click", () => {
            this.activeProject = project;
            this.updateActiveProject();
        })
        return li;
    }

    createDeleteButton() {
        const button = document.createElement("button");
        button.classList.add("delete-project-btn");
        button.textContent = "X"
       
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const parent = button.parentElement;
            const firstChild = parent.firstChild.textContent
            if (firstChild === "Default") return;
            if (parent.firstChild.classList.contains("active")) {
                this.activeProject = "Default";
            }
            myProject.removeProject(firstChild);
            this.updateActiveProject();
            this.renderProject();
        })
        return button;
    }

    updateActiveProject() {
        const allProjects = this.projectListContainer.querySelectorAll(".project");
        allProjects.forEach(project => project.classList.remove("active"));

        const activeProjectElement = Array.from(allProjects).find(proj => proj.querySelector("span").textContent === this.activeProject);
        if (activeProjectElement) {
            activeProjectElement.classList.add("active");
        }
    }

    renderProject() {
        this.projectListContainer.innerHTML = "";
        for (let project of myProject.getProjects()) {
            const li = this.createProjectElement(project.name);
            this.projectListContainer.appendChild(li);
        }
        this.updateActiveProject();
    }

    handleProjectSubmission() {
        if (this.projectInput.value === "" || this.projectInput.value === null) return;
        myProject.addToProject(this.projectInput.value);
        this.projectInput.value = "";
        this.renderProject();
    }

    submitProject() {
        this.addProjectBtn.addEventListener("click", () => {
            this.handleProjectSubmission();
        })

        this.projectInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.handleProjectSubmission();
            }
        })
    }

}