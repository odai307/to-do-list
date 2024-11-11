//proect.js

export default class Project {
     #projectArray = []
     #defaultProject = "Default";

     constructor() {
        this.addToProject(this.#defaultProject);
     }

     addToProject(project) {
        if (this.#projectArray.some(p => p.name === project) || project === "" || project === null) return;
        this.#projectArray.push({name: project, todos:[]})
    }

     removeProject(project) {
        const findIndex = this.#projectArray.findIndex(item => item.name === project);
        if (findIndex !== -1) {
            this.#projectArray.splice(findIndex, 1);
        }
    }

     getProjects() {
        return [... this.#projectArray]
    }

}