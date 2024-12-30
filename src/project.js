import Todo from "./todo";

export default class Project {
    constructor() {
        this.projectArray = [];
        this.activeProject = "Default";
        this.load();
        this.addProject("Default");
    }

    addProject(project) {
        project = project.trim();
        if (this.projectArray.some(p => p.projectName === project) || project === "") return;
        const newProject = {
            projectName: project,
            todos: []
        }
        this.projectArray.push(newProject);
        this.save();
    }

    removeProject(project) {
        project = project.trim();
        if (project === "Default") return;
        const projectToRemove = this.projectArray.find(p => p.projectName === project);
        if (projectToRemove) {
            if (projectToRemove.projectName === this.activeProject) {
                this.activeProject = "Default";
            }
            this.projectArray = this.projectArray.filter(p => p.projectName !== project);
            this.save();
        }
    }

    getProjects() {
        return this.projectArray;
    }

    save() {
        const savedData = {
            projectArray: this.projectArray,
            activeProject: this.activeProject
        }
        localStorage.setItem("project", JSON.stringify(savedData));
    }

    load() {
        const savedProjects = localStorage.getItem("project");
        if (savedProjects) {
            const parsedData = JSON.parse(savedProjects);
            this.projectArray = parsedData.projectArray || [];
            this.activeProject = parsedData.activeProject;
        }
        
    }

    changeActiveProject(project) {
        project = project.trim();
        const newActiveProject = this.projectArray.find(p => p.projectName === project);
        if (newActiveProject) {
            this.activeProject = project;
            this.save();
        }
    }

    getActiveProject() {
        const activeProject = this.projectArray.find(p => p.projectName === this.activeProject);
        return activeProject;
    }

    addTodoToProject(projectName, name, dueDate, description, priority) {
        name = name.trim();
        const project = this.projectArray.find(p => p.projectName === projectName);
        if (project) {
            const id = Date.now();
            const newTodo = Todo(id, name, dueDate, description, priority);
            project.todos.push(newTodo);
            this.save();
        }
    }

    removeTodoFromProject(projectName, id) {
        const project = this.projectArray.find(p => p.projectName === projectName);
        if (project) {
           project.todos = project.todos.filter(todo => todo.id !== id);
           this.save();
        }
    }
}