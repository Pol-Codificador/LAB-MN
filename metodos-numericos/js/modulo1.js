/* ========================================
   NAVEGACIÓN DEL MÓDULO
======================================== */

function irA(pagina) {
    window.location.href = pagina;
}


/* ========================================
   CALCULADORA
======================================== */

let expresionActual = "";


/* ========================================
   AGREGAR ELEMENTO
======================================== */

function agregar(valor) {
    expresionActual += valor;
    actualizarPantalla();
}


/* ========================================
   ACTUALIZAR PANTALLA
======================================== */

function actualizarPantalla() {

    const expresion =
        document.getElementById("expresion");

    if (expresion) {
        expresion.textContent =
            expresionActual || "0";
    }
}


/* ========================================
   BORRAR ÚLTIMO
======================================== */

function borrarUltimo() {

    expresionActual =
        expresionActual.slice(0, -1);

    actualizarPantalla();
}


/* ========================================
   LIMPIAR
======================================== */

function limpiar() {

    expresionActual = "";

    const expresion =
        document.getElementById("expresion");

    const resultado =
        document.getElementById("resultado");

    if (expresion) {
        expresion.textContent = "0";
    }

    if (resultado) {
        resultado.textContent = "0";
    }
}


/* ========================================
   CALCULAR
======================================== */

function calcular() {

    try {

        let expresion = expresionActual;

        /* -----------------------------
           POTENCIAS
        ----------------------------- */

        expresion =
            expresion.replace(/\^/g, "**");


        /* -----------------------------
           PI
        ----------------------------- */

        expresion =
            expresion.replace(/π/g, "Math.PI");


        /* -----------------------------
           E
        ----------------------------- */

        expresion =
            expresion.replace(/\be\b/g, "Math.E");


        /* -----------------------------
           RAÍZ
        ----------------------------- */

        expresion =
            expresion.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );


        /* -----------------------------
           LOGARITMO NATURAL
        ----------------------------- */

        expresion =
            expresion.replace(
                /ln\(/g,
                "Math.log("
            );


        /* -----------------------------
           LOGARITMO BASE 10
        ----------------------------- */

        expresion =
            expresion.replace(
                /log\(/g,
                "Math.log10("
            );


        /* -----------------------------
           SENO
        ----------------------------- */

        expresion =
            expresion.replace(
                /sin\(/g,
                "Math.sin("
            );


        /* -----------------------------
           COSENO
        ----------------------------- */

        expresion =
            expresion.replace(
                /cos\(/g,
                "Math.cos("
            );


        /* -----------------------------
           TANGENTE
        ----------------------------- */

        expresion =
            expresion.replace(
                /tan\(/g,
                "Math.tan("
            );


        /* =================================
           OBTENER VARIABLES
        ================================= */

        const campoX =
            document.getElementById("valorX");

        const campoA =
            document.getElementById("valorA");

        const campoB =
            document.getElementById("valorB");


        const x =
            campoX && campoX.value !== ""
                ? Number(campoX.value)
                : 0;

        const a =
            campoA && campoA.value !== ""
                ? Number(campoA.value)
                : 0;

        const b =
            campoB && campoB.value !== ""
                ? Number(campoB.value)
                : 0;


        /* =================================
           EVALUAR EXPRESIÓN
        ================================= */

        const resultadoCalculado =
            Function(
                "x",
                "a",
                "b",
                `"use strict";
                return (${expresion})`
            )(x, a, b);


        /* =================================
           COMPROBAR RESULTADO
        ================================= */

        if (
            typeof resultadoCalculado !== "number" ||
            !Number.isFinite(resultadoCalculado)
        ) {
            throw new Error();
        }


        /* =================================
           MOSTRAR RESULTADO
        ================================= */

        const resultado =
            document.getElementById("resultado");

        if (resultado) {
            resultado.textContent =
                resultadoCalculado;
        }

    } catch (error) {

        const resultado =
            document.getElementById("resultado");

        if (resultado) {
            resultado.textContent =
                "Error";
        }
    }
}


/* ========================================
   EVALUAR FUNCIÓN f(x)
======================================== */

function evaluarFuncion() {

    const funcion =
        document.getElementById("funcion");

    const resultadoFuncion =
        document.getElementById("resultadoFuncion");

    const campoX =
        document.getElementById("valorX");

    const campoA =
        document.getElementById("valorA");

    const campoB =
        document.getElementById("valorB");


    if (!funcion || !resultadoFuncion) {
        return;
    }


    let expresion =
        funcion.value.trim();


    if (expresion === "") {

        resultadoFuncion.textContent =
            "Escribe una función.";

        return;
    }


    const x =
        campoX && campoX.value !== ""
            ? Number(campoX.value)
            : 0;

    const a =
        campoA && campoA.value !== ""
            ? Number(campoA.value)
            : 0;

    const b =
        campoB && campoB.value !== ""
            ? Number(campoB.value)
            : 0;


    try {

        /* Convertir símbolos matemáticos */

        expresion =
            expresion.replace(/\^/g, "**");

        expresion =
            expresion.replace(
                /π/g,
                "Math.PI"
            );

        expresion =
            expresion.replace(
                /\be\b/g,
                "Math.E"
            );

        expresion =
            expresion.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );

        expresion =
            expresion.replace(
                /ln\(/g,
                "Math.log("
            );

        expresion =
            expresion.replace(
                /log\(/g,
                "Math.log10("
            );

        expresion =
            expresion.replace(
                /sin\(/g,
                "Math.sin("
            );

        expresion =
            expresion.replace(
                /cos\(/g,
                "Math.cos("
            );

        expresion =
            expresion.replace(
                /tan\(/g,
                "Math.tan("
            );


        const resultado =
            Function(
                "x",
                "a",
                "b",
                `"use strict";
                 return (${expresion})`
            )(x, a, b);


        if (
            typeof resultado !== "number" ||
            !Number.isFinite(resultado)
        ) {
            throw new Error();
        }


        resultadoFuncion.textContent =
            "f(" + x + ") = " +
            Number(resultado.toFixed(10));

    } catch (error) {

        resultadoFuncion.textContent =
            "Error en la función";
    }
}


/* ========================================
   GRÁFICA DE f(x)
======================================== */

let graficaFuncion = null;


function graficarFuncion() {

    const campoFuncion =
        document.getElementById("funcion");

    if (!campoFuncion) {
        return;
    }


    let expresion =
        campoFuncion.value.trim();


    /* ================================
       COMPROBAR FUNCIÓN
    ================================= */

    if (expresion === "") {

        alert("Escribe una función primero.");

        return;
    }


    /* ================================
       CONVERTIR EXPRESIÓN
    ================================= */

    expresion =
        expresion.replace(/\^/g, "**");

    expresion =
        expresion.replace(
            /π/g,
            "Math.PI"
        );

    expresion =
        expresion.replace(
            /\be\b/g,
            "Math.E"
        );

    expresion =
        expresion.replace(
            /sqrt\(/g,
            "Math.sqrt("
        );

    expresion =
        expresion.replace(
            /ln\(/g,
            "Math.log("
        );

    expresion =
        expresion.replace(
            /log\(/g,
            "Math.log10("
        );

    expresion =
        expresion.replace(
            /sin\(/g,
            "Math.sin("
        );

    expresion =
        expresion.replace(
            /cos\(/g,
            "Math.cos("
        );

    expresion =
        expresion.replace(
            /tan\(/g,
            "Math.tan("
        );


    /* ================================
       CREAR FUNCIÓN
    ================================= */

    let funcion;

    try {

        funcion =
            new Function(
                "x",
                "return " + expresion
            );


        /* Probar la función */

        const prueba =
            funcion(1);

        if (
            typeof prueba !== "number" ||
            !Number.isFinite(prueba)
        ) {
            throw new Error();
        }

    } catch (error) {

        alert(
            "La función ingresada no es válida."
        );

        return;
    }


    /* ================================
       CREAR PUNTOS
    ================================= */

    const valoresX = [];
    const valoresY = [];


    for (
        let x = -10;
        x <= 10;
        x += 0.1
    ) {

        let y;

        try {
            y = funcion(x);
        } catch (error) {
            y = null;
        }


        valoresX.push(
            Number(x.toFixed(2))
        );


        if (
            typeof y === "number" &&
            Number.isFinite(y) &&
            Math.abs(y) < 1000
        ) {

            valoresY.push(y);

        } else {

            valoresY.push(null);
        }
    }


    /* ================================
       MOSTRAR VENTANA DE GRÁFICA
    ================================= */

    const modal =
        document.getElementById("modalGrafica");

    const nombreFuncion =
        document.getElementById(
            "nombreFuncionGrafica"
        );


    if (modal) {
        modal.style.display = "flex";
    }


    if (nombreFuncion) {

        nombreFuncion.textContent =
            "f(x) = " +
            campoFuncion.value;
    }


    /* ================================
       OBTENER CANVAS
    ================================= */

    const canvas =
        document.getElementById(
            "graficaFuncion"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    /* ================================
       ELIMINAR GRÁFICA ANTERIOR
    ================================= */

    if (graficaFuncion !== null) {

        graficaFuncion.destroy();
    }


    /* ================================
       CREAR GRÁFICA
    ================================= */

    graficaFuncion =
        new Chart(
            ctx,
            {

                type: "line",

                data: {

                    labels: valoresX,

                    datasets: [

                        {

                            label:
                                "f(x) = " +
                                campoFuncion.value,

                            data: valoresY,

                            borderWidth: 2,

                            pointRadius: 0,

                            tension: 0.1
                        }
                    ]
                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,


                    scales: {

                        x: {

                            title: {

                                display: true,

                                text: "x"
                            }
                        },


                        y: {

                            title: {

                                display: true,

                                text: "f(x)"
                            }
                        }
                    },


                    plugins: {

                        legend: {

                            display: true
                        }
                    }
                }
            }
        );
}


/* ========================================
   CERRAR GRÁFICA
======================================== */

function cerrarGrafica() {

    const modal =
        document.getElementById(
            "modalGrafica"
        );


    if (modal) {

        modal.style.display =
            "none";
    }
}


/* ========================================
   SELECCIÓN DEL MÉTODO NUMÉRICO
======================================== */

const selectorMetodo =
    document.getElementById("metodo");

const valoresBiseccion =
    document.getElementById(
        "valoresBiseccion"
    );

const valoresNewton =
    document.getElementById(
        "valoresNewton"
    );


if (selectorMetodo) {

    selectorMetodo.addEventListener(
        "change",
        function () {

            if (
                selectorMetodo.value ===
                "biseccion"
            ) {

                if (valoresBiseccion) {
                    valoresBiseccion.style.display =
                        "block";
                }

                if (valoresNewton) {
                    valoresNewton.style.display =
                        "none";
                }

            }

            else if (
                selectorMetodo.value ===
                "newton"
            ) {

                if (valoresBiseccion) {
                    valoresBiseccion.style.display =
                        "none";
                }

                if (valoresNewton) {
                    valoresNewton.style.display =
                        "block";
                }
            }
        }
    );
}


/* ========================================
   EJECUTAR MÉTODO SELECCIONADO
======================================== */

function resolverMetodo() {

    const metodo =
        document.getElementById(
            "metodo"
        ).value;


    if (metodo === "biseccion") {

        resolverBiseccion();
    }


    if (metodo === "newton") {

        resolverNewton();
    }
}


/* ========================================
   MÉTODO DE BISECCIÓN
======================================== */

function resolverBiseccion() {

    /* ----------------------------------------
       OBTENER DATOS
    ---------------------------------------- */

    const campoFuncion =
        document.getElementById(
            "funcion"
        );

    const campoA =
        document.getElementById(
            "valorA"
        );

    const campoB =
        document.getElementById(
            "valorB"
        );

    const campoTolerancia =
        document.getElementById(
            "tolerancia"
        );

    const campoIteraciones =
        document.getElementById(
            "iteraciones"
        );

    const resultadoMetodo =
        document.getElementById(
            "resultadoMetodo"
        );


    /* ----------------------------------------
       COMPROBAR QUE EXISTAN LOS CAMPOS
    ---------------------------------------- */

    if (
        !campoFuncion ||
        !campoA ||
        !campoB ||
        !campoTolerancia ||
        !campoIteraciones ||
        !resultadoMetodo
    ) {

        return;
    }


    /* ----------------------------------------
       OBTENER VALORES
    ---------------------------------------- */

    const expresionOriginal =
        campoFuncion.value.trim();

    const aInicial =
        Number(campoA.value);

    const bInicial =
        Number(campoB.value);

    const tolerancia =
        Number(campoTolerancia.value);

    const maxIteraciones =
        Number(campoIteraciones.value);


    /* ----------------------------------------
       VALIDAR FUNCIÓN
    ---------------------------------------- */

    if (expresionOriginal === "") {

        resultadoMetodo.textContent =
            "Escribe una función f(x).";

        return;
    }


    /* ----------------------------------------
       VALIDAR a Y b
    ---------------------------------------- */

    if (
        !Number.isFinite(aInicial) ||
        !Number.isFinite(bInicial)
    ) {

        resultadoMetodo.textContent =
            "Ingresa valores válidos para a y b.";

        return;
    }


    /* ----------------------------------------
       VALIDAR TOLERANCIA
    ---------------------------------------- */

    if (
        !Number.isFinite(tolerancia) ||
        tolerancia <= 0
    ) {

        resultadoMetodo.textContent =
            "La tolerancia debe ser mayor que 0.";

        return;
    }


    /* ----------------------------------------
       VALIDAR ITERACIONES
    ---------------------------------------- */

    if (
        !Number.isInteger(maxIteraciones) ||
        maxIteraciones <= 0
    ) {

        resultadoMetodo.textContent =
            "Las iteraciones deben ser un número entero mayor que 0.";

        return;
    }


    /* ----------------------------------------
       CONVERTIR FUNCIÓN
    ---------------------------------------- */

    let expresion =
        expresionOriginal;


    expresion =
        expresion.replace(
            /\^/g,
            "**"
        );


    expresion =
        expresion.replace(
            /π/g,
            "Math.PI"
        );


    expresion =
        expresion.replace(
            /\be\b/g,
            "Math.E"
        );


    expresion =
        expresion.replace(
            /sqrt\(/g,
            "Math.sqrt("
        );


    expresion =
        expresion.replace(
            /ln\(/g,
            "Math.log("
        );


    expresion =
        expresion.replace(
            /log\(/g,
            "Math.log10("
        );


    expresion =
        expresion.replace(
            /sin\(/g,
            "Math.sin("
        );


    expresion =
        expresion.replace(
            /cos\(/g,
            "Math.cos("
        );


    expresion =
        expresion.replace(
            /tan\(/g,
            "Math.tan("
        );


    /* ----------------------------------------
       CREAR FUNCIÓN f(x)
    ---------------------------------------- */

    let funcion;

    try {

        funcion =
            new Function(
                "x",
                "return " + expresion
            );


        const prueba =
            funcion(aInicial);


        if (
            typeof prueba !== "number" ||
            !Number.isFinite(prueba)
        ) {

            throw new Error();
        }

    } catch (error) {

        resultadoMetodo.textContent =
            "La función ingresada no es válida.";

        return;
    }


    /* ----------------------------------------
       EVALUAR EXTREMOS
    ---------------------------------------- */

    let a =
        aInicial;

    let b =
        bInicial;

    let fa;

    let fb;


    try {

        fa =
            funcion(a);

        fb =
            funcion(b);

    } catch (error) {

        resultadoMetodo.textContent =
            "No se pudo evaluar la función.";

        return;
    }


    /* ----------------------------------------
       COMPROBAR CAMBIO DE SIGNO
    ---------------------------------------- */

    if (fa === 0) {

        resultadoMetodo.innerHTML =
            "Raíz encontrada: x = " +
            a;

        return;
    }


    if (fb === 0) {

        resultadoMetodo.innerHTML =
            "Raíz encontrada: x = " +
            b;

        return;
    }


    if (fa * fb > 0) {

        resultadoMetodo.innerHTML =
            "No existe cambio de signo entre a y b.";

        return;
    }


    /* ----------------------------------------
       BISECCIÓN
    ---------------------------------------- */

    let m = 0;

    let fm = 0;

    let error = 0;

    let raizEncontrada = false;

    let iteracionRealizada = 0;


    /* ----------------------------------------
       GUARDAR ITERACIONES
    ---------------------------------------- */

    const iteraciones = [];


    for (
        let i = 1;
        i <= maxIteraciones;
        i++
    ) {

        /* Punto medio */

        m =
            (a + b) / 2;


        /* Evaluar función */

        fm =
            funcion(m);


        /* Error aproximado */

        error =
            Math.abs(b - a) / 2;


        iteracionRealizada =
            i;


        /* ------------------------------------
           GUARDAR DATOS DE LA ITERACIÓN
        ------------------------------------ */

        iteraciones.push({

            numero: i,

            a: a,

            b: b,

            m: m,

            fm: fm,

            error: error

        });


        /* ------------------------------------
           COMPROBAR CONVERGENCIA
        ------------------------------------ */

        if (
            Math.abs(fm) < tolerancia ||
            error < tolerancia
        ) {

            raizEncontrada =
                true;

            break;
        }


        /* ------------------------------------
           ACTUALIZAR INTERVALO
        ------------------------------------ */

        if (fa * fm < 0) {

            b =
                m;

            fb =
                fm;

        } else {

            a =
                m;

            fa =
                fm;
        }
    }


    /* ----------------------------------------
       MOSTRAR TABLA DE ITERACIONES
    ---------------------------------------- */

    const tablaBiseccion =
        document.getElementById(
            "tablaBiseccion"
        );


    if (tablaBiseccion) {

        let html = `

            <h3>Tabla de Bisección</h3>

            <table>

                <thead>

                    <tr>

                        <th>Iteración</th>

                        <th>a</th>

                        <th>b</th>

                        <th>m</th>

                        <th>f(m)</th>

                        <th>Error</th>

                    </tr>

                </thead>

                <tbody>

        `;


        iteraciones.forEach(
            function(iteracion) {

                html += `

                    <tr>

                        <td>
                            ${iteracion.numero}
                        </td>

                        <td>
                            ${iteracion.a.toFixed(6)}
                        </td>

                        <td>
                            ${iteracion.b.toFixed(6)}
                        </td>

                        <td>
                            ${iteracion.m.toFixed(6)}
                        </td>

                        <td>
                            ${iteracion.fm.toFixed(6)}
                        </td>

                        <td>
                            ${iteracion.error.toFixed(6)}
                        </td>

                    </tr>

                `;
            }
        );


        html += `

                </tbody>

            </table>

        `;


        tablaBiseccion.innerHTML =
            html;
    }


    /* ----------------------------------------
       MOSTRAR RESULTADO
    ---------------------------------------- */

    if (raizEncontrada) {

        resultadoMetodo.innerHTML =

            "Método: Bisección<br>" +

            "Raíz aproximada: x = " +

            m.toFixed(10) +

            "<br>" +

            "f(x) = " +

            fm.toFixed(10) +

            "<br>" +

            "Iteraciones: " +

            iteracionRealizada;

    } else {

        resultadoMetodo.innerHTML =

            "Método: Bisección<br>" +

            "No se alcanzó la tolerancia solicitada.<br>" +

            "Última aproximación: x = " +

            m.toFixed(10) +

            "<br>" +

            "Iteraciones realizadas: " +

            iteracionRealizada;
    }
}