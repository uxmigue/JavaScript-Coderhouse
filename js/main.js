// /******* SIMULADOR INTERACTIVO *******/

const Tarea = function(nombreTarea, responsable, diaDeadline, mesDeadline) {
    this.nombreTarea = nombreTarea,
    this.responsable = responsable,
    this.diaDeadline = diaDeadline,
    this.mesDeadline = mesDeadline
}

const tarea1 = new Tarea("Contar stock", "Maria", 13, 12);
const tarea2 = new Tarea("Asignar precios", "Melani", 15, 11);
const tarea3 = new Tarea("Hacer campañas", "Marianna", 19, 12);
const tarea4 = new Tarea("Contar vencimientos", "Maria", 19, 12);
let listaTareas;

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tareas', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tareas');
    return tasks ? JSON.parse(tasks) : [tarea1, tarea2, tarea3, tarea4];
}

function renderTasks() {
    const taskContainer = document.getElementById("taskContainer")
    taskContainer.innerHTML = ""
    
    listaTareas.forEach(tarea => {
        taskContainer.innerHTML += `
            <div class="task">
                <p>${tarea.nombreTarea}</p>
                <p>Responsable: ${tarea.responsable}</p>
                <p>Finaliza el ${tarea.diaDeadline}/${tarea.mesDeadline}</p>
            </div>
        ` 
    })
}

document.addEventListener("DOMContentLoaded", function() {
    listaTareas = getTasksFromLocalStorage()
    renderTasks()
    
    const searchBtn = document.getElementById("btnBuscar")
    searchBtn.addEventListener("click", buscadorDeResponsable)
        
    const input = document.getElementById("buscador")
    input.addEventListener("input", (event) => {
        resetInput(event)
    })


    const taskForm = document.getElementById("taskForm")
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        creacionDeTareas();
    });
});

function creacionDeTareas() {
    const nombreTarea = document.getElementById("nombreTarea").value.toUpperCase().trim();
    const responsable = document.getElementById("responsable").value.toUpperCase().trim();
    const diaDeadline = parseInt(document.getElementById("diaDeadline").value.trim());
    const mesDeadline = parseInt(document.getElementById("mesDeadline").value.trim());

    if (isNaN(diaDeadline) || isNaN(mesDeadline)) {
        alert("Por favor, completa los campos día y mes de manera numérica");
        return;
    } else if (responsable != "MARIA" && responsable != "MELANI" && responsable != "MARIANNA") {
        alert("Por favor, selecciona a una persona que trabaje en la empresa");
        return;
    }

    let tarea = new Tarea(nombreTarea, responsable, diaDeadline, mesDeadline);
    listaTareas.push(tarea);
    saveTasksToLocalStorage(listaTareas);
    renderTasks();
    console.table(listaTareas);

    document.getElementById("taskForm").reset();
}

function buscadorDeResponsable() {
    const input = document.getElementById("buscador");
    const taskContainer = document.getElementById("taskContainer")
    
    const inputValue = input.value.toUpperCase()
    if(inputValue != "") {
        let resultado = listaTareas.filter((tarea) => tarea.responsable.toUpperCase() === inputValue)
        if(resultado.length === 0) {
            taskContainer.innerHTML = `
            <div>
                <p>No hay resultados para la búsqueda</p>
            </div>
        `
        } else {
            taskContainer.innerHTML = ""
        
            resultado.forEach(tarea => {
                taskContainer.innerHTML += `
                    <div class="task">
                        <p>${tarea.nombreTarea}</p>
                        <p>Responsable: ${tarea.responsable}</p>
                        <p>Finaliza el ${tarea.diaDeadline}/${tarea.mesDeadline}</p>
                    </div>
                ` 
            })
        }
        
    }
}

function resetInput(event) {
    const inputValue = event.target.value;
    const taskContainer = document.getElementById("taskContainer")

    if(inputValue === "") {
        taskContainer.innerHTML = ""

        listaTareas.forEach(tarea => {
            taskContainer.innerHTML += `
                <div class="task">
                    <p>${tarea.nombreTarea}</p>
                    <p>Responsable: ${tarea.responsable}</p>
                    <p>Finaliza el ${tarea.diaDeadline}/${tarea.mesDeadline}</p>
                </div>
            ` 
        })
    }
}
