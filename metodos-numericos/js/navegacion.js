function irAModulo(numero) {
  switch (numero) {
    case 1:
      window.location.href = "modulos/modulo1-teoria-de-errores/errores.html";
      break;
    case 2:
      window.location.href =
        "modulos/modulo1-ecuaciones-no-lineales/ecuaciones-no-lineales.html";
      break;
    /*
      case 3:
        window.location.href =
          "modulos/modulo2-ecuaciones-lineales/modulo2.html";
        break;
      case 4:
        window.location.href =
          "modulos/modulo3-interpolacion-ajuste-de-curvas/modulo3.html";
        break;
      case 5:
        window.location.href =
          "modulos/modulo4-integracion-numerica/modulo4.html";
        break;
      case 6:
        window.location.href =
          "modulos/modulo5-ecuaciones-diferenciales/modulo5.html";
        break;
        */
    default:
      alert("Este módulo todavía está en construcción");
  }
}

function irA(pagina) {
  window.location.href = pagina;
}