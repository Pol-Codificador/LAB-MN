## Semana 01 — Definición del problema y acuerdo de equipo

**Módulo:** Integración Numérica
**Semana:** 01
**Responsable:** Renato Xavier Ponce Llerena

---

# 1. Caso matemático seleccionado

El caso base establecido para el módulo de Integración Numérica es calcular el área bajo la curva de la campana de Gauss (distribución normal estándar), la cual carece de una antiderivada elemental.

La función a integrar es:

$$
f(x)=e^{-x^2}
$$

El objetivo del módulo será aproximar el valor de la integral definida en un intervalo $[a, b]$:

$$
I = \int_{a}^{b} e^{-x^2} dx
$$

El documento del laboratorio establece como métodos mínimos para este módulo **Regla del Trapecio Compuesto** y **Regla de Simpson Compuesto**, utilizando inicialmente el intervalo $[0, 1]$ con un número base de $n=10$ subintervalos.

---

# 2. Variables del problema

| Variable | Descripción                                        | Tipo                 |
| -------- | -------------------------------------------------- | -------------------- |
| x        | Variable independiente (Adimensional)              | Variable             |
| f(x)     | Función de densidad de probabilidad                | Función              |
| a, b     | Límites inferior y superior de integración         | Parámetros de entrada|
| n        | Número de subintervalos                            | Parámetro de control |
| h        | Tamaño del paso $(b-a)/n$                          | Variable calculada   |

La función central utilizada por los algoritmos será:

$$
\boxed{f(x)=e^{-x^2}}
$$

---

# 3. Supuestos

Para el desarrollo inicial del caso se consideran los siguientes supuestos:

1. La función $f(x)$ es continua y evaluable en el intervalo cerrado $[a, b]$.
2. El intervalo inicial de estudio será $[0, 1]$.
3. El número de subintervalos $n$ será un entero positivo mayor a 0.
4. **Condición estricta:** Para la Regla de Simpson 1/3 compuesto, el número de subintervalos $n$ debe ser obligatoriamente un número **par**.
5. La tolerancia para el análisis del error analítico será $\varepsilon = 10^{-6}$.
6. El límite máximo de subintervalos por defecto será $n_{max} = 1000$ para evitar desbordamientos de memoria en el navegador.

---

# 4. Verificación del tamaño de paso (h)

Para aplicar los métodos de cuadratura, se divide el intervalo $[a, b]$ en $n$ partes iguales. Para el caso inicial con $a=0$, $b=1$ y $n=2$:

$$
h = \frac{b-a}{n}
$$

$$
h = \frac{1-0}{2} = 0.5
$$

Los nodos a evaluar serán: $x_0 = 0$, $x_1 = 0.5$, $x_2 = 1$.

---

# 5. Primera prueba iterativa: Regla del Trapecio (n=2)

Fórmula del Trapecio compuesto para $n=2$:

$$
I \approx \frac{h}{2} [f(x_0) + 2f(x_1) + f(x_2)]
$$

Evaluando los nodos en $f(x) = e^{-x^2}$:

$$
f(0) = e^0 = 1
$$
$$
f(0.5) = e^{-0.25} \approx 0.77880078
$$
$$
f(1) = e^{-1} \approx 0.36787944
$$

Aplicando la fórmula:

$$
I \approx \frac{0.5}{2} [1 + 2(0.77880078) + 0.36787944]
$$
$$
\boxed{I_{trapecio} \approx 0.731370}
$$

---

# 6. Primera prueba iterativa: Regla de Simpson 1/3 (n=2)

Fórmula de Simpson 1/3 para $n=2$:

$$
I \approx \frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)]
$$

Utilizando las mismas evaluaciones de la función:

$$
I \approx \frac{0.5}{3} [1 + 4(0.77880078) + 0.36787944]
$$
$$
\boxed{I_{simpson} \approx 0.747180}
$$

---

# 7. Valor de referencia analítico

Para verificar el error de truncamiento de las aproximaciones numéricas, se utilizará el valor de alta precisión de la integral en $[0, 1]$:

$$
\boxed{I_{real} \approx 0.74682413}
$$

Esta referencia permitirá calcular el error verdadero absoluto y relativo de los algoritmos de Trapecio y Simpson a medida que se aumenta el valor de $n$.

---

# 8. Criterios de ejecución

A diferencia de los métodos de búsqueda de raíces, la integración numérica convencional no utiliza un "criterio de parada" iterativo basado en tolerancias dinámicas, sino que se ejecuta a través de un número fijo de subintervalos $n$. 

El algoritmo deberá:
* Iterar a través del bucle for exactamente $n-1$ veces para calcular las sumatorias internas.
* Registrar el tamaño del paso $h$ utilizado.
* Mostrar el área total aproximada tras evaluar todos los nodos.

---

# 9. Situaciones que deben detectarse (Fallos)

Los algoritmos deberán contemplar condiciones de error explícitas:

### Regla de Simpson
Debe detectarse y bloquear la ejecución si el usuario ingresa un valor de $n$ impar (ej. $n=5$), ya que la fórmula requiere pares de subintervalos.

### Errores generales
Debe detectarse cuando:
* $n \le 0$ (imposible dividir un intervalo en partes negativas o nulas).
* $a \ge b$ (se debe alertar si los límites están invertidos o son iguales, donde el área sería 0).
* Valores de entrada vacíos o no numéricos.

---

# 10. Restricciones iniciales del caso

| Parámetro                   |            Valor |
| --------------------------- | ---------------: |
| Función objetivo            |        $e^{-x^2}$|
| Límite inferior (a)         |                0 |
| Límite superior (b)         |                1 |
| Subintervalos prueba (n)    |               10 |
| Tolerancia de error         |         0.000001 |
| Área de referencia          |       0.74682413 |

---

# 11. Pruebas matemáticas iniciales

Se proponen las siguientes pruebas para verificar la implementación en la calculadora web:

| ID   | Prueba                                   | Resultado esperado         |
| ---- | ---------------------------------------- | -------------------------- |
| M-01 | $f(0)$                                   | 1                          |
| M-02 | $f(1)$                                   | $\approx 0.367879$         |
| M-03 | Trapecio Compuesto ($a=0, b=1, n=2$)     | $\approx 0.731370$         |
| M-04 | Simpson Compuesto ($a=0, b=1, n=2$)      | $\approx 0.747180$         |
| M-05 | Validación Simpson con $n=5$             | Error: 'n' debe ser par    |
| M-06 | Límite $a=b=1$                           | Área = 0                   |
| M-07 | Entrada inválida ($n=-2$)                | Error: n debe ser positivo |
