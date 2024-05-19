/******* SIMULADOR INTERACTIVO *******/

const Tarea = function(nombreTarea, responsable, diaDeadline, mesDeadline){
    this.nombreTarea = nombreTarea,
    this.responsable = responsable,
    this.diaDeadline = diaDeadline,
    this.medDadline = mesDeadline
}

let tarea1 = new Tarea("Contar stock", "Maria", 13, 12);
let tarea2 = new Tarea("Asignar precios", "Melani", 15, 11);
let tarea3 = new Tarea("Hacer campañas", "Marianna", 19, 12);
let tarea4 = new Tarea("Contar vencimientos", "Maria", 19, 12);
let listaTareas = [tarea1, tarea2, tarea3, tarea4]

function creacionDeTareas(){
    let nombreTarea = prompt("Ingrese la tarea que desea agregar:").toUpperCase().trim()
    let responsable = prompt("Ingrese el nombre de la persona responsable").toUpperCase().trim()
    let diaDeadline = parseInt(prompt("Ingrese el día del mes del deadline de la tarea").trim())
    let mesDeadline = parseInt(prompt("Ingrese de manera numérica el mes del del deadline de la tarea").trim())

    if (isNaN(diaDeadline) || isNaN(mesDeadline)){
        alert("Por favor, completa los campos dia y mes de manera numerica")
        return
    }else if (responsable != "Maria".toUpperCase() && responsable != "Melani".toUpperCase() && responsable != "Marianna".toUpperCase()) {
        alert("Por favor, selecciona a una persona que trabaje en la empresa")
        return
    }

    let tarea = new Tarea(nombreTarea, responsable, diaDeadline, mesDeadline)
    listaTareas.push(tarea)
    console.table(listaTareas);
}

function buscadorDeResponsable(){
    let palabraClave = prompt("Escriba el nombre de la persona responsable para ver sus tareas asignadas").toUpperCase().trim()

    let resultado = listaTareas.filter( (x) => x.responsable.toUpperCase() === palabraClave )

    if (resultado.length > 0 ) {
        console.table(resultado);
    } else{
        alert(palabraClave + " no se encuentra en la compañía. Inténtalo de nuevo")
    }
}