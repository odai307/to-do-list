const Todo = (id, name, dueDate, description, priority) => {
    name = name.trim();
    dueDate = dueDate.trim();
    
    let isChecked = false;

    const toggleChecked = () => {
        isChecked = !isChecked;
    }    
    
    return {
        id,
        name,
        dueDate,
        description,
        priority,
        isChecked,
        toggleChecked
    }
}


export default Todo;