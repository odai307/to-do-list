import "./assets/styles/style.css"

import Dom from "./dom.js";

const dom = new Dom();
dom.submitProject();

dom.createProjectElement("project");

dom.renderProject();