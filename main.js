/******* ALGORITMO CON CONDICIONALES *******/

function ingresoBoliche(){
    let edad = parseInt(prompt("Indique su edad, por favor:"));

    if(edad < 18 && edad >= 10){
        alert("Lo siento, solo ingresan los mayores de edad")
    } else if(edad < 10){
        alert("Ponele onda, dale")
    }else if(edad >= 10 && edad >= 18 && edad < 100){
        alert("¡Bienvenido, genio del mal!")
    } else if(edad >= 100){
        alert("Te zarpaste, crAckk")
    }else{
        alert("Estamos chistositxs 🤡")
    }
}





/******* ALGORITMO CON BUCLES *******/

function pronostico(){
    let horarioSalida = prompt ("¿En qué horario quisieras salir hoy? (Mañana, tarde o noche)").toLowerCase()

    switch (horarioSalida) {
        case "mañana":
            alert("La " + horarioSalida + " está calurosa. ¡Musculosa y shorts es la mejor opción!")
            break;
        case "tarde":
            alert("La " + horarioSalida + " está más fresca, con un buzo vas re bien")
            break;
        case "noche":
            alert("En la " + horarioSalida + " va a llover fuerte, mejor no salgas")
            break;
        default:
            alert("Por favor, define un horario correcto")
            break;
    }
}





/******* SIMULADOR INTERACTIVO *******/

function solicitarTurno(){
    function despedida(){
        alert("¡Genial, vuelve pronto!")
    }

    let nombre = prompt("¡Bienvenidx! ¿Cuál es tu nombre?")
    if (nombre == '' || nombre == null){
        nombre = prompt("Por favor, ingresa tu nombre")
        agendarTurno()
    }else{
        agendarTurno()
    }
    
    function agendarTurno(){
        let turno = confirm("¿Quisieras sacar un turno, "+ nombre+ "?")
        if(turno == true){
            agendarDia()
        }
        else{
            despedida()
        }
    }

    function agendarDia(){
        let eleccionDia = prompt("¡Genial! ¿Qué día de la semana quisieras agendar?").toLowerCase()

        switch (eleccionDia) {
            case "lunes":
                agendarHorario()
                break;
            case "martes":
                agendarHorario()
                break;
            case "miercoles":
                alert("¡Lo sentimos! No tenemos turnos disponible para el " + eleccionDia)
                agendarTurno()
                break;
            case "jueves":
                agendarHorario()
                break;
            case "viernes":
                alert("¡Lo sentimos! No tenemos turnos disponible para el " + eleccionDia)
                agendarTurno()
                break;
            case "sabado":
                alert("¡Lo sentimos! No atendemos los fines de semana")
                agendarTurno()
                break;
            case "domingo":
                alert("¡Lo sentimos! No atendemos los fines de semana")
                agendarTurno()
                break;    
            default:
                alert("Por favor, define un día correcto")
                agendarTurno()
                break;
        }

        function agendarHorario(){

            function confirmacionTurno(){
                let confirmacion = confirm("¡Perfecto! ¿Confirmas el turno para el " + eleccionDia +" a las " + eleccionHorario + " horas?")
                if(confirmacion == true){
                    alert("Genial, te esperamos ¡Muchas gracias!")
                }
                else{
                    agendarTurno()
                }
            }
    
            let eleccionHorario = parseInt(prompt("Muy bien, cada turno demora una hora, atendemos de 9 a 18, elige un horario, por favor."))
            switch(eleccionHorario){
                case 9:
                    confirmacionTurno()
                    break;
                case 10:
                    confirmacionTurno()
                    break;
                case 11:
                    confirmacionTurno()
                    break;
                case 12:
                    alert("Lo sentimos, este horario está ocupado")
                    agendarTurno()
                    break;
                case 13:
                    confirmacionTurno()
                    break;
                case 14:
                    confirmacionTurno()
                    break;
                case 15:
                    alert("Lo sentimos, este horario está ocupado")
                    agendarTurno()
                    break;
                case 16:
                    alert("Lo sentimos, este horario está ocupado")
                    agendarTurno()
                    break;
                case 17:
                    confirmacionTurno()
                    break;
                case 18:
                    alert("Lo sentimos, este horario está ocupado")
                    agendarTurno()
                    break;
                default:
                    alert("Por favor, define un horario correcto")
                    agendarTurno()
                    break;
            }
            
        }

    }



    

    

}

