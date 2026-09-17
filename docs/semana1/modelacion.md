## Equipo 4 — Integración Numérica
### Semana 01 — Definición del problema y acuerdo de equipo

* **Proyecto:** Página web de Métodos Numéricos
* **Rol:** M — Matemática y modelación
* **Semana:** 01
* **Responsable:** Renato Xavier Ponce Llerena

---
## 1. Definición del problema

### 1.1 Contexto
Se plantea un caso didáctico relacionado con tráfico de datos.
La tasa sintética de transferencia de datos está definida por:
$$r(t) = t^2 + 1$$

donde $t$ representa el tiempo transcurrido. La tasa está expresada en $\text{MB/s}$ y el intervalo de análisis corresponde a $0 \le t \le 2\text{ s}$.

El objetivo es determinar el volumen total de datos transferidos durante dicho intervalo mediante integración numérica.

---

## 2. Formulación matemática
Si $r(t)$ representa una tasa de transferencia en $\text{MB/s}$, el volumen acumulado durante un intervalo de tiempo se obtiene mediante:
$$V = \int_a^b r(t)\,dt$$

Para el caso base, $a = 0$, $b = 2$ y $r(t) = t^2 + 1$. Por lo tanto:
$$\boxed{ V = \int_0^2 (t^2 + 1)\,dt }$$

---

## 3. Variables y parámetros

| Símbolo | Descripción | Unidad |
| :--- | :--- | :--- |
| $t$ | Tiempo | $\text{s}$ |
| $r(t)$ | Tasa de transferencia | $\text{MB/s}$ |
| $V$ | Volumen total transferido | $\text{MB}$ |
| $a$ | Extremo inferior del intervalo | $\text{s}$ |
| $b$ | Extremo superior del intervalo | $\text{s}$ |
| $n$ | Número de subintervalos | Adimensional |
| $h$ | Tamaño de cada subintervalo | $\text{s}$ |

El tamaño de paso para una malla uniforme se calcula mediante:
$$\boxed{ h = \frac{b-a}{n} }$$

---

## 4. Supuestos del modelo
Para el caso didáctico se consideran los siguientes supuestos:

1. La tasa de transferencia está representada por la función $r(t) = t^2 + 1$.
2. La tasa es continua dentro del intervalo de análisis.
3. El intervalo temporal inicial es $[0,2]\text{ s}$.
4. La malla utilizada por los métodos es uniforme.
5. El número de subintervalos $n$ es un entero positivo.
6. Para Simpson 1/3 compuesto, $n$ debe ser par.
7. La tasa se interpreta físicamente como una cantidad no negativa durante el caso base.
8. El resultado de integrar una tasa expresada en $\text{MB/s}$ respecto del tiempo expresado en segundos se expresa en $\text{MB}$.

Estas condiciones se derivan del caso y de las restricciones específicas establecidas para el módulo.

---

## 5. Dominio y restricciones

**Dominio del caso base:**
$$\boxed{0 \le t \le 2}$$

**Restricción para ambos métodos:**
$$\boxed{n > 0} \quad \text{y} \quad n \in \mathbb{Z}$$

**Restricción adicional para Simpson 1/3 compuesto:**
$$\boxed{n \text{ debe ser par}}$$

Por ejemplo:

| $n$ | Trapecio compuesto | Simpson compuesto |
| :---: | :---: | :---: |
| 0 | No válido | No válido |
| 1 | Válido | No válido |
| 2 | Válido | Válido |
| 3 | Válido | No válido |
| 4 | Válido | Válido |
| 8 | Válido | Válido |

La prueba específica de fallo indicada por la guía es utilizar $n = 3$ para Simpson y $n = 0$ para ambos métodos. La interfaz debe explicar la restricción correspondiente.

---

## 6. Solución de referencia mediante integración exacta
Para validar los métodos numéricos se obtiene primero una referencia independiente mediante integración analítica.

Tenemos:
$$V = \int_0^2 (t^2+1)\,dt$$

La integral indefinida es:
$$\int (t^2+1)\,dt = \frac{t^3}{3} + t$$

Evaluando entre $0$ y $2$:
$$V = \left[ \frac{t^3}{3}+t \right]_0^2$$
$$V = \left( \frac{2^3}{3}+2 \right) - \left( \frac{0^3}{3}+0 \right)$$
$$V = \frac{8}{3}+2 = \frac{8}{3}+\frac{6}{3}$$
$$\boxed{ V = \frac{14}{3}\text{ MB} }$$

Por tanto:
$$\boxed{ V \approx 4.6666666667\text{ MB} }$$

Este es el valor de referencia independiente que deberá utilizarse para comparar los resultados de Trapecio y Simpson.

---

## 7. Método del Trapecio compuesto
Para una función $f(x)$ definida en una malla uniforme, el método del Trapecio compuesto aproxima la integral mediante:
$$\boxed{ I \approx \frac{h}{2} \left[ f(x_0) + 2\sum_{i=1}^{n-1} f(x_i) + f(x_n) \right] }$$

donde $h = \frac{b-a}{n}$. Para nuestro caso $f(t) = r(t) = t^2 + 1$, por lo que:
$$\boxed{ V_T = \frac{h}{2} \left[ r(t_0) + 2\sum_{i=1}^{n-1} r(t_i) + r(t_n) \right] }$$

---

## 8. Ejemplo de referencia: Trapecio con $n=4$
Para $a = 0$, $b = 2$, $n = 4$, el tamaño de paso es:
$$h = \frac{2-0}{4} = 0.5\text{ s}$$

Los nodos son: $t_0 = 0$, $t_1 = 0.5$, $t_2 = 1$, $t_3 = 1.5$, $t_4 = 2$.

Evaluamos $r(t) = t^2+1$:

| $i$ | $t_i$ (s) | $r(t_i)$ (MB/s) | Peso |
| :---: | :---: | :---: | :---: |
| 0 | 0.0 | 1.00 | 1 |
| 1 | 0.5 | 1.25 | 2 |
| 2 | 1.0 | 2.00 | 2 |
| 3 | 1.5 | 3.25 | 2 |
| 4 | 2.0 | 5.00 | 1 |

Aplicando la fórmula:
$$V_T = \frac{0.5}{2} \left[ 1 + 2(1.25) + 2(2) + 2(3.25) + 5 \right]$$
$$V_T = 0.25 [1 + 2.5 + 4 + 6.5 + 5]$$
$$V_T = 0.25(19)$$
$$\boxed{ V_T = 4.75\text{ MB} }$$

---

## 9. Error absoluto del Trapecio con $n=4$
La referencia exacta es $V_{\text{exacto}} = \frac{14}{3}$ y el resultado del Trapecio es $V_T = 4.75$.

El error absoluto es:
$$E_a = \vert{}V_{\text{exacto}} - V_T\vert{}$$
$$E_a = \left\vert{} \frac{14}{3} - 4.75 \right\vert{}$$
$$\boxed{ E_a = \frac{1}{12}\text{ MB} }$$

Aproximadamente:
$$\boxed{ E_a \approx 0.0833333333\text{ MB} }$$

---

## 10. Método de Simpson 1/3 compuesto
El método de Simpson 1/3 compuesto utiliza:
$$\boxed{ I \approx \frac{h}{3} \left[ f(x_0) + f(x_n) + 4\sum_{\substack{i=1 \\ i\text{ impar}}}^{n-1} f(x_i) + 2\sum_{\substack{i=2 \\ i\text{ par}}}^{n-2} f(x_i) \right] }$$

La restricción fundamental para la aplicación compuesta es $\boxed{n\text{ par}}$.

Para nuestro caso:
$$\boxed{ V_S = \frac{h}{3} \left[ r(t_0) + r(t_n) + 4\sum_{\text{índices impares}} r(t_i) + 2\sum_{\text{índices pares}} r(t_i) \right] }$$

---

## 11. Ejemplo de referencia: Simpson con $n=4$
Utilizamos nuevamente $a = 0$, $b = 2$, $n = 4$ ($h = 0.5\text{ s}$).

| $i$ | $t_i$ (s) | $r(t_i)$ (MB/s) | Peso Simpson |
| :---: | :---: | :---: | :---: |
| 0 | 0.0 | 1.00 | 1 |
| 1 | 0.5 | 1.25 | 4 |
| 2 | 1.0 | 2.00 | 2 |
| 3 | 1.5 | 3.25 | 4 |
| 4 | 2.0 | 5.00 | 1 |

Aplicando Simpson:
$$V_S = \frac{0.5}{3} \left[ 1 + 5 + 4(1.25) + 2(2) + 4(3.25) \right]$$
$$V_S = \frac{0.5}{3} [6 + 5 + 4 + 13]$$
$$V_S = \frac{0.5}{3}(28) = \frac{14}{3}$$

$$\boxed{ V_S = \frac{14}{3}\text{ MB} } \quad \text{o} \quad \boxed{ V_S \approx 4.6666666667\text{ MB} }$$

---

## 12. Comparación inicial de los métodos

| Método | $n$ | Resultado (MB) | Referencia (MB) | Error absoluto (MB) |
| :--- | :---: | :---: | :---: | :---: |
| Trapecio compuesto | 4 | 4.75 | 4.6666666667 | 0.0833333333 |
| Simpson 1/3 compuesto | 4 | 4.6666666667 | 4.6666666667 | $\approx 0$ |

---

## 13. Análisis del refinamiento de la partición
El refinamiento consiste en aumentar el número de subintervalos ($n = 2 \rightarrow 4 \rightarrow 8$). Como $h = \frac{b-a}{n}$, al aumentar $n$, disminuye $h$.

Para el intervalo $[0,2]$:

| $n$ | $h$ (s) |
| :---: | :---: |
| 2 | 1.00 |
| 4 | 0.50 |
| 8 | 0.25 |
---

## 14. Unidades del resultado
La función representa una tasa ($r(t) = \text{MB/s}$) y la variable de integración representa tiempo ($dt = \text{s}$). Por lo tanto:
$$(\text{MB/s})(\text{s}) = \text{MB} \implies \boxed{ \int r(t)\,dt = \text{MB} }$$

El resultado de los métodos numéricos representa un volumen acumulado de datos, no una tasa.

---

## 15. Parámetros editables
Se propone representar la función general como:
$$\boxed{ r(t) = at^2 + bt + c }$$

| Parámetro | Descripción |
| :---: | :--- |
| $a$ | Coeficiente cuadrático |
| $b$ | Coeficiente lineal |
| $c$ | Término independiente |
| $a_t$ | Extremo inferior del intervalo |
| $b_t$ | Extremo superior del intervalo |

Para el caso base: $a = 1, b = 0, c = 1$ y $a_t = 0, b_t = 2$.
$$r(t) = 1t^2 + 0t + 1 = t^2 + 1$$

---
## 16. Ficha breve de derivación numérica
Para aproximar la derivada de una función utilizando valores equidistantes alrededor de un punto, se utiliza la diferencia central:
$$\boxed{ f'(x) \approx \frac{f(x+h) - f(x-h)}{2h} }$$

Para el caso $r(t) = t^2+1$, utilizando $t = 1$ y $h = 0.1$:
* $r(1.1) = 1.1^2 + 1 = 2.21$
* $r(0.9) = 0.9^2 + 1 = 1.81$

Aplicando diferencia central:
$$r'(1) \approx \frac{r(1.1) - r(0.9)}{2(0.1)} = \frac{2.21 - 1.81}{0.2} = \frac{0.40}{0.2}$$
$$\boxed{ r'(1) \approx 2\text{ MB/s}^2 }$$

---

## 18. Casos de prueba matemática iniciales

| ID | Método | Entrada | Resultado esperado |
| :---: | :--- | :--- | :--- |
| M-01 | Trapecio | $a=0, b=2, n=4$ | $4.75\text{ MB}$ |
| M-02 | Simpson | $a=0, b=2, n=4$ | $14/3\text{ MB}$ |
| M-03 | Trapecio | $a=0, b=2, n=2$ | Calcular y comparar con referencia |
| M-04 | Simpson | $a=0, b=2, n=2$ | Calcular y comparar con referencia |
| M-05 | Trapecio | $a=0, b=2, n=8$ | Calcular y comparar con referencia |
| M-06 | Simpson | $a=0, b=2, n=8$ | Calcular y comparar con referencia |
| M-07 | Simpson | $a=0, b=2, n=3$ | Entrada inválida |
| M-08 | Ambos | $a=0, b=2, n=0$ | Entrada inválida |

