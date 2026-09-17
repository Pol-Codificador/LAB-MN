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

Calcular aproximaciones precisas de integrales definidas utilizando los métodos de Trapecio Compuesto y Simpson Compuesto[cite: 3].

## 3. Caso Base

Calcular la probabilidad de un evento en una distribución normal estándar evaluando el área bajo la curva de la función campana de Gauss[cite: 3]. Este cálculo carece de solución analítica elemental, justificando el uso de integración numérica[cite: 3].

*   **Modelo Matemático:** $f(x) = e^{-x^2}$[cite: 3]
*   **Límites de Entrada Acordados:**
    *   Intervalo de integración por defecto: $[0, 1]$[cite: 3]
    *   Límite de subintervalos (n): Mínimo 2, Máximo 1000 (Simpson exige n par)[cite: 3].
    *   Tolerancia para análisis de error: $10^{-6}$[cite: 3]

## 4. Resultados de Aprendizaje

1. Visualizar geométricamente el área bajo la curva y comprender cómo la partición en subintervalos reduce el error de aproximación[cite: 3].
2. Comparar empíricamente la exactitud y velocidad de convergencia entre una aproximación lineal (Trapecio) y una cuadrática (Simpson)[cite: 3].
3. Comprender los fundamentos de la derivación numérica como herramienta transversal aplicable a otros métodos[cite: 3].
