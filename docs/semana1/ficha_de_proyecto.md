# Ficha del Proyecto - Semana 1

**Institución:** Universidad Nacional de San Agustín de Arequipa (UNSA)
**Escuela:** Ingeniería de Sistemas
**Asignatura:** Laboratorio de Métodos Numéricos (Grupo A)
**Equipo:** 4

## 1. Integrantes y Acta de Roles
| Rol | Letra | Nombre |
| :--- | :---: | :--- |
| **Programador** | P | Chavez Cuno, Deivick Paul Eddi |
| **Modelador** | M | Ponce Llerena, Renato Xavier |
| **Diseñadora** | D | Carpio Coa, Massiel Evagelina |
| **Verificador** | V | Camani Chambi, Ronald Rodrigo |

## 2. Objeto de Estudio
Calcular aproximaciones precisas de integrales definidas utilizando los métodos de Trapecio Compuesto y Simpson Compuesto.

## 3. Caso Base
Determinar el volumen total de datos transferidos en un intervalo de tiempo $[0, 2]$, dada una tasa de transferencia de datos sintética expresada en MB/s.

*   **Modelo Matemático:** $r(t) = t^2 + 1$
*   **Límites de Entrada Acordados:**
    *   Intervalo de tiempo: $a = 0\text{ s}, b = 2\text{ s}$
    *   Límite de subintervalos (n): Mínimo 2, Máximo 1000 (Simpson exige n par).
    *   Referencia analítica exacta: $14/3\text{ MB} \approx 4.6667\text{ MB}$.

## 4. Resultados de Aprendizaje
1. Visualizar geométricamente el área bajo la curva y comprender cómo la partición reduce el error de aproximación.
2. Comparar empíricamente la exactitud entre una aproximación lineal (Trapecio) y una cuadrática (Simpson).
3. Comprender los fundamentos de la derivación numérica (diferencias finitas) como herramienta transversal.
