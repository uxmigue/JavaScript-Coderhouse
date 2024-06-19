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

function saveTasksToDataBase(tasks) {
    localStorage.setItem('tareas', JSON.stringify(tasks));
}

/* TRAER ARCHIVOS DE LA BASE DE DATOS LOCAL + FETCH*/

function getTasksFromDataBase() {
    fetch("./js/basededatos.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((tarea) => {
                taskContainer.innerHTML += `
                    <div class="task">
                        <p>${tarea.tarea}</p>
                        <p>Responsable: ${tarea.nombre}</p>
                        <p>Finaliza el ${tarea.diaDeadline}/${tarea.mesDeadline}</p>
                    </div>
                ` 
            })
        })


    const tasks = localStorage.getItem('tareas');
    return tasks ? JSON.parse(tasks) : [tarea1, tarea2, tarea3, tarea4];
}

/* CARGA DE TAREAS */

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

/* CARGA DEL DOCUMENTO */

document.addEventListener("DOMContentLoaded", function() {
    listaTareas = getTasksFromDataBase()
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

/* CREACIÓN DE TAREAS + USO DE LIBRERÍAS */

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

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "¡Tarea agregada exitosamente!"
      });

    let tarea = new Tarea(nombreTarea, responsable, diaDeadline, mesDeadline);
    listaTareas.push(tarea);
    saveTasksToDataBase(listaTareas);
    renderTasks();
    console.table(listaTareas);

    document.getElementById("taskForm").reset();
}

/* BUSCADOR DE RESPONSABLE + USO DE LIBRERÍAS*/

function buscadorDeResponsable() {
    const input = document.getElementById("buscador");
    const taskContainer = document.getElementById("taskContainer")
    
    const inputValue = input.value.toUpperCase()
    if(inputValue != "") {
        let resultado = listaTareas.filter((tarea) => tarea.responsable.toUpperCase() === inputValue)
        if(resultado.length === 0) {
            Swal.fire({
                icon: "error",
                title: "No hay resultados para la búsqueda",
                text: "Ingresa el nombre de un empleado de la empresa",
            });
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