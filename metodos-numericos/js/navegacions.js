
function ingresarModulo(numeroModulo) {

    switch (numeroModulo) {

        case 1:
            // El Módulo 1 ya está disponible
            window.location.href = "modulo1.html";
            break;


        case 2:
            mostrarMensaje(
                "El Módulo 2 todavía está en construcción."
            );
            break;


        case 3:
            mostrarMensaje(
                "El Módulo 3 todavía está en construcción."
            );
            break;


        case 4:
            mostrarMensaje(
                "El Módulo 4 todavía está en construcción."
            );
            break;


        case 5:
            mostrarMensaje(
                "El Módulo 5 todavía está en construcción."
            );
            break;


        default:
            mostrarMensaje(
                "El módulo seleccionado no existe."
            );

    }

}


function mostrarMensaje(mensaje) {

    alert(mensaje);

}