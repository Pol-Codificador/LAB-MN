
# Ficha de Modelación Matemática
## Módulo: Ecuaciones No Lineales — Bisección y Newton-Raphson

---

## 1. Objetivo del módulo

Diseñar un módulo que determine un parámetro de configuración a partir de una ecuación no lineal, comparando el método de Bisección y el método de Newton-Raphson, y que sea capaz de explicar —con criterios verificables— cuándo cada método converge y cuándo no.

---


## 2. Teoría transversal de errores

### 2.1 Error absoluto y relativo

Si $x^{*}$ es el valor exacto (o de referencia) y $x_n$ la aproximación en la iteración $n$:

- Error absoluto: $E_a = |x^{*} - x_n|$
- Error relativo: $E_r = \dfrac{|x^{*}-x_n|}{|x^{*}|}$ (indefinido si $x^{*}=0$; en ese caso usar error absoluto)

En la práctica $x^{*}$ es desconocido, por lo que se usan **estimadores** del error:

- Estimador de paso: $|x_{n+1}-x_n|$ (o su versión relativa $|x_{n+1}-x_n|/|x_{n+1}|$).
- **Residuo**: $|f(x_n)|$ — mide qué tan cerca está $f$ de anularse, **no** es lo mismo que el error de la raíz. Un residuo pequeño no siempre implica un error pequeño (por ejemplo, si $f'$ es muy pequeña cerca de la raíz, un residuo chico puede corresponder a un $x_n$ todavía lejano del cero real).
- En bisección existe una **cota de error garantizada**: al cerrar el intervalo $[a_n,b_n]$, el punto medio $c_n$ satisface

$$|c_n - x^{*}| \le \frac{b_n-a_n}{2} = \frac{b_0-a_0}{2^{\,n+1}}$$

Esta cota es la que se debe mostrar junto al punto medio en cada iteración de bisección.

### 2.2 Tolerancia y criterios de parada (concepto general)

La tolerancia $\varepsilon$ define cuándo una aproximación se considera "suficientemente buena". Un criterio de parada combina típicamente:

1. Un criterio de precisión (paso pequeño o cota de error pequeña),
2. Opcionalmente, un criterio de residuo (función cerca de cero),
3. Un límite de iteraciones **como salvaguarda**, nunca como prueba de convergencia.

> **Regla explícita:** alcanzar el máximo de iteraciones **no** implica que el método convergió. Si se llega a $N$ sin cumplir el criterio de tolerancia, el resultado debe reportarse como *"no convergió en N iteraciones"*, mostrando el último residuo y la última cota de error.

### 2.3 Derivación numérica

Cuando no se dispone de $f'(x)$ en forma analítica, se puede aproximar mediante diferencias finitas:

- Diferencia progresiva: $f'(x)\approx \dfrac{f(x+h)-f(x)}{h}$ (error $O(h)$)
- Diferencia centrada: $f'(x)\approx \dfrac{f(x+h)-f(x-h)}{2h}$ (error $O(h^2)$, más precisa)

Para este módulo, $f'(x)=3x^2-1$ se conoce analíticamente y **debe** usarse tal cual en Newton; la diferenciación numérica se documenta como alternativa de respaldo (por ejemplo, si en el futuro se cambia $f$ por una función sin derivada conocida en forma cerrada), no como método principal.

---

## 3. Método de Bisección

### 3.1 Fundamento y supuestos
- $f$ continua en $[a,b]$.
- $f(a)\cdot f(b) < 0$ (cambio de signo).
- Garantiza convergencia a una raíz si los supuestos se cumplen (convergencia global, orden **lineal**, se reduce el intervalo a la mitad en cada paso).

### 3.2 Fórmulas
Punto medio: $c = \dfrac{a+b}{2}$

Actualización del intervalo:
- Si $f(a)\cdot f(c) < 0$: la raíz está en $[a,c]$ → $b \leftarrow c$
- Si $f(a)\cdot f(c) > 0$: la raíz está en $[c,b]$ → $a \leftarrow c$
- Si $f(c) = 0$: $c$ es la raíz (parada inmediata)

Cota de error en la iteración $n$: $\dfrac{b_0-a_0}{2^{\,n+1}}$

### 3.3 Criterio de parada
Detener cuando $\dfrac{b_n-a_n}{2} < \varepsilon$ (cota de error del punto medio) **o** $f(c_n)=0$ exactamente. Si se alcanza $N=100$ sin cumplir esto, marcar como no convergido.

### 3.4 Limitaciones
- Requiere conocer un intervalo con cambio de signo (no siempre trivial de encontrar).
- No detecta raíces de multiplicidad par (el signo no cambia alrededor de ellas), aunque exista una raíz real.
- Convergencia lineal: comparativamente lenta frente a Newton cuando este converge bien.
- Solo garantiza **una** raíz dentro del intervalo si $f$ es monótona ahí; si hay varias raíces con cambios de signo múltiples, converge a alguna de ellas, no necesariamente a una en particular.

---

## 4. Método de Newton-Raphson

### 4.1 Fundamento y supuestos
- $f$ derivable en un entorno de la raíz.
- $f'(x_n) \ne 0$ en cada iteración (y no "demasiado pequeña", numéricamente).
- $x_0$ suficientemente cercano a la raíz para garantizar convergencia (no es global como bisección).
- Si la raíz es simple ($f'(x^{*})\ne0$) y $x_0$ está en la cuenca de convergencia, el orden de convergencia es **cuadrático**.

### 4.2 Fórmulas
Iteración: $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$

Para el caso base, $f'(x)=3x^2-1$, de modo que

$$x_{n+1} = x_n - \frac{x_n^3 - x_n - 2}{3x_n^2 - 1}$$

Residuo en la iteración $n$: $|f(x_n)|$. Cambio entre iteraciones: $|x_{n+1}-x_n|$.

### 4.4 Criterio de parada
Detener cuando $|f(x_n)| < \varepsilon$ **o** $|x_{n+1}-x_n| < \varepsilon$ (se recomienda exigir ambos o al menos reportar ambos valores, porque no son equivalentes: ver Sección 4.1). Antes de cada paso, verificar que $f'(x_n)$ sea finita y de magnitud no despreciable (p. ej. $|f'(x_n)| > 10^{-12}$); si no, detener con error explícito en vez de dividir. Si se alcanza $N=100$ sin cumplir el criterio de tolerancia, marcar como no convergido.

### 4.5 Limitaciones
- No garantiza convergencia global; depende críticamente de $x_0$.
- Falla si $f'(x_n)=0$ en algún paso (división por cero) o si es muy pequeña (paso gigante, posible divergencia).
- Puede oscilar, divergir, o converger a una raíz distinta de la esperada.
- Cerca de raíces múltiples, el orden de convergencia se degrada a lineal (ver Sección 9.4).
- Requiere poder evaluar $f'(x)$ (analítica o numéricamente).

---

## 5. Caso aplicado de partida

Se modela una respuesta normalizada mediante

$$g(x) = x^3 - x$$

Se busca el valor positivo de $x$ que produce una respuesta objetivo $b$. Esto equivale a hallar la raíz de

$$f(x) = g(x) - b = x^3 - x - b$$

Para el **caso base**, el objetivo es $b = 2$:

$$f(x) = x^3 - x - 2$$

### 5.1 Justificación del intervalo inicial

Se evalúa $f$ en los extremos candidatos:

| $x$ | $f(x)=x^3-x-2$ |
|---|---|
| 1 | $1-1-2=-2$ |
| 2 | $8-2-2=4$ |

Como $f(1)\cdot f(2) = (-2)(4) = -8 < 0$, por el **Teorema de Bolzano** (f continua en $[1,2]$, cambio de signo en los extremos) existe al menos una raíz en $(1,2)$. Además, $f'(x) = 3x^2-1$ no cambia de signo en $(1,2)$ salvo en $x=1/\sqrt3\approx0.577$ (fuera del intervalo), por lo que $f$ es estrictamente creciente en $[1,2]$ y la raíz en ese intervalo es **única**. Este es el intervalo que debe usarse en bisección para el caso base.

---

## 5. Supuestos y parámetros del módulo

**Supuestos matemáticos:**
- $f$ es continua en el dominio de trabajo (requerido por Bolzano para bisección).
- $f$ es derivable, y se conoce (o se puede derivar) $f'(x)$ para Newton.
- Se trabaja en aritmética de punto flotante de doble precisión; valores no finitos (`NaN`, `±Inf`) son evidencia de error numérico, no de convergencia.
- El objetivo $b$ y el punto inicial $x_0$ son parámetros configurables del módulo, no constantes fijas del código.

**Parámetros por defecto (caso base):**

| Parámetro | Valor |
|---|---|
| Función | $f(x)=x^3-x-2$ |
| Intervalo de bisección | $[a_0,b_0]=[1,2]$ |
| Punto inicial de Newton | $x_0 = 1.5$ |
| Tolerancia $\varepsilon$ | $1\times10^{-6}$ |
| Máximo de iteraciones $N$ | 100 |

---

## 6. Detección de fallos y casos degenerados

El módulo debe detectar explícitamente, sin afirmar convergencia en ningún caso:

1. **Intervalo sin cambio de signo** (bisección): $f(a)\cdot f(b) \ge 0$ → abortar antes de iterar.
2. **Derivada nula o demasiado pequeña** (Newton): $|f'(x_n)|$ por debajo de un umbral (o exactamente 0) → abortar el paso, no dividir.
3. **Valores no finitos**: si $x_n$, $f(x_n)$ o $f'(x_n)$ resultan `NaN` o `±Inf` → abortar y reportarlo.
4. **Agotamiento del límite de iteraciones**: llegar a $N$ sin cumplir tolerancia → reportar "no convergió", nunca como éxito.

### 6.1 Pruebas de fallo específicas

**(a) Bisección con intervalo mal elegido — $f(x)=x^3-x-2$ en $[2,3]$:**

$$f(2)=8-2-2=4 \qquad f(3)=27-3-2=22$$

$f(2)\cdot f(3) = 88 > 0$ → **no hay cambio de signo**. El módulo debe rechazar este intervalo antes de iterar y explicar por qué (no basta con "no se encontró raíz"; debe indicar que el supuesto de Bolzano no se cumple en $[2,3]$, aunque sí exista una raíz real fuera de ese intervalo).

**(b) Newton con derivada nula al inicio — modelo alternativo $f(x)=x^3-1$, $x_0=0$:**

$$f'(x) = 3x^2 \quad\Rightarrow\quad f'(0) = 0$$

En el primer paso, $x_1 = 0 - \dfrac{f(0)}{f'(0)} = 0 - \dfrac{-1}{0}$ es una división por cero. El módulo debe detectar $f'(x_0)=0$ **antes** de intentar la división y detener con el mensaje de "derivada nula", no dejar que el error se propague como `Inf`/`NaN`.

---

## 7. Ejemplo resuelto paso a paso — Bisección

Función: $f(x)=x^3-x-2$, intervalo $[1,2]$, $\varepsilon=10^{-6}$.

| n | a | b | c=(a+b)/2 | f( c ) | cota de error (b−a)/2 |
|---|---|---|---|---|---|
| 0 | 1.000000 | 2.000000 | 1.500000 | −0.125000 | 0.500000 |
| 1 | 1.500000 | 2.000000 | 1.750000 | 1.609375 | 0.250000 |
| 2 | 1.500000 | 1.750000 | 1.625000 | 0.666016 | 0.125000 |
| 3 | 1.500000 | 1.625000 | 1.562500 | 0.252197 | 0.062500 |
| 4 | 1.500000 | 1.562500 | 1.531250 | 0.059641 | 0.031250 |
| 5 | 1.500000 | 1.531250 | 1.515625 | −0.032682 | 0.015625 |
| … | … | … | … | … | … |

El proceso continúa reduciendo el intervalo a la mitad en cada paso; para alcanzar $\varepsilon=10^{-6}$ partiendo de un intervalo de longitud 1 se necesitan aproximadamente $\lceil \log_2(1/10^{-6}) \rceil = 20$ iteraciones. El resultado converge a

$$x^{*} \approx 1.5213797068$$

---

## 8. Ejemplo resuelto paso a paso — Newton

Función: $f(x)=x^3-x-2$, $f'(x)=3x^2-1$, $x_0=1.5$, $\varepsilon=10^{-6}$.

**Iteración 0 → 1:**
$$f(1.5) = 3.375 - 1.5 - 2 = -0.125 \qquad f'(1.5) = 3(2.25)-1 = 5.75$$
$$x_1 = 1.5 - \frac{-0.125}{5.75} = 1.5 + 0.0217391304 = 1.5217391304$$

**Iteración 1 → 2:**
$$f(1.5217391304) \approx 0.002138 \qquad f'(1.5217391304) \approx 5.947073$$
$$x_2 = 1.5217391304 - \frac{0.002138}{5.947073} \approx 1.5213797$$

**Iteración 2 → 3:** el residuo ya es del orden de $10^{-6}$–$10^{-7}$; $x_3$ prácticamente no cambia frente a $x_2$ (ilustra la convergencia cuadrática: el número de dígitos correctos aproximadamente se duplica en cada paso).

| n | $x_n$ | $f(x_n)$ (residuo) | $\lvert x_{n+1}-x_n\rvert$ (cambio) |
|---|---|---|---|
| 0 | 1.5000000000 | −0.125000 | 0.0217391304 |
| 1 | 1.5217391304 | 0.002138 | 0.0003594 |
| 2 | 1.5213797... | ≈ $10^{-6}$–$10^{-7}$ | ≈ $10^{-7}$ |

Converge a $x^{*}\approx 1.5213797068$ en solo 3–4 iteraciones, frente a las ~20 que necesita bisección: esa es la comparación cuantitativa que debe mostrar el módulo.

---

## 9. Caso aplicado comparativo (Bisección vs. Newton)

Reutilizando el caso base ($f(x)=x^3-x-2$, raíz de referencia $x^{*}\approx1.5213797068$):

| Criterio | Bisección $[1,2]$ | Newton $x_0=1.5$ |
|---|---|---|
| Iteraciones hasta $\varepsilon=10^{-6}$ | ≈ 20 | 3–4 |
| Orden de convergencia | Lineal (garantizado) | Cuadrático (si converge) |
| Garantía de convergencia | Sí, si $f(a)f(b)<0$ | No, depende de $x_0$ y de $f'$ |
| Información usada por paso | Solo signo de $f$ | Valor y derivada de $f$ |
| Robustez ante mal condicionamiento | Alta | Baja (falla si $f'\approx0$) |

**Interpretación:** Newton converge mucho más rápido cuando el punto inicial está en su cuenca de convergencia y la derivada no se anula, pero bisección es la opción robusta que garantiza hallar la raíz si existe cambio de signo, a costa de más iteraciones. El módulo debe destacar que "más rápido" (menos iteraciones) no es sinónimo de "más confiable"; ambos criterios deben reportarse por separado.

---

## 10. Análisis de sensibilidad: variación del objetivo $b$ y del punto inicial

### 10.1 Variando el objetivo $b$ en $f(x)=x^3-x-b$ (Newton, $x_0=1.5$)

| $b$ (objetivo) | Raíz aproximada | Iteraciones aprox. hasta $10^{-6}$ |
|---|---|---|
| 2 | 1.5213797068 | 3–4 |
| 3 | 1.6716959 | 4–5 |
| 5 | 1.9041609 | 4–6 |

*(Valores calculados analíticamente para contraste; el código debe validarlos con su propia ejecución, no sustituyen la corrida numérica real.)*

### 10.2 Variando el punto inicial $x_0$ (Newton, $b=2$ fijo)

| $x_0$ | $x_1$ | Comentario |
|---|---|---|
| 1.5 | 1.5217391304 | Convergencia rápida (dentro de la cuenca, cerca de la raíz) |
| 2.0 | $2-4/11=1.636364$ | Converge, pero necesita 1–2 iteraciones más que desde 1.5 |
| 0 (en $f(x)=x^3-1$) | división por cero | Caso de fallo: $f'(0)=0$ |

**Conclusión esperada del módulo:** al variar $b$ y $x_0$ se debe comparar número de iteraciones, residuo final y robustez, evitando reportar el residuo como si fuera el error de la raíz (son magnitudes distintas).

---

## 11. Especificación de los gráficos requeridos

**Gráfico 1 — Función del problema:** $f(x)=x^3-x-2$ para $x\in[1,2]$ (o un rango algo mayor para dar contexto). Debe marcarse el cruce por cero (la raíz $x^{*}\approx1.5213797068$) y, opcionalmente, el intervalo sombreado. Explicar por qué el cambio de signo garantiza la existencia de la raíz ahí.

**Gráfico 2 — Comparación de convergencia:** eje horizontal: número de iteración $n$. Eje vertical: error/residuo en escala logarítmica . Dos series: Bisección y Newton, sobre el caso base. Debe evidenciar visualmente la caída lineal (bisección) frente a la caída cuadrática (Newton).

---

## 12. Valores de referencia para verificación del código

| Dato | Valor |
|---|---|
| Función caso base | $f(x)=x^3-x-2$ |
| Raíz de referencia | $x^{*}\approx 1.5213797068$ |
| Bisección, intervalo inicial | $[1,2]$ |
| Bisección, primer punto medio | $c_0=1.5$, $f(1.5)=-0.125$ |
| Bisección, intervalo tras iter. 0 | $[1.5,\,2]$ |
| Newton, punto inicial | $x_0=1.5$ |
| Newton, primer paso | $x_1=1.5217391304$ |
| Tolerancia | $10^{-6}$ |
| Máximo de iteraciones | 100 |
| Fallo bisección (sin cambio de signo) | intervalo $[2,3]$ sobre $f(x)=x^3-x-2$ |
| Fallo Newton (derivada nula) | $f(x)=x^3-1$, $x_0=0$, $f'(0)=0$ |

---

## 13. Ejercicios propuestos

**Intermedio 1.** Usando bisección con $f(x)=x^3-x-3$ en $[1,2]$ y $\varepsilon=10^{-6}$, encontrar la raíz.
*Solución verificada:* $x^{*}\approx 1.6716959$ (accesible mediante botón/enlace de solución, no visible por defecto).

**Intermedio 2.** Usando Newton con $f(x)=x^3-x-2$, $x_0=2$, comparar el número de iteraciones necesarias frente a partir de $x_0=1.5$.
*Solución verificada:* $x_1=2-4/11\approx1.636364$; converge en 1–2 iteraciones adicionales respecto a $x_0=1.5$, hacia $x^{*}\approx1.5213797068$.

**Difícil 1.** Comparar bisección (intervalo $[2,3]$) y Newton ($x_0=2$) para $f(x)=x^3-2x-5$ (ejemplo clásico de Chapra y Canale).
*Solución verificada:* $x^{*}\approx 2.0945514815$; con Newton, $x_1=2.1$, $x_2\approx2.094568$, convergencia muy rápida; con bisección se requieren del orden de 20 iteraciones para la misma tolerancia.

**Difícil 2.** Analizar la convergencia de Newton para $f(x)=x^3-3x+2=(x-1)^2(x+2)$ partiendo de $x_0=1.5$ (cerca de la raíz doble $x=1$) y explicar por qué el orden de convergencia deja de ser cuadrático.
*Solución verificada:* $x_1=1.266667$, $x_2\approx1.138689$, …; la convergencia se vuelve **lineal** (no cuadrática) por tratarse de una raíz de multiplicidad 2, ya que $f'(1)=0$ también.

---

## 14. Preguntas de autoevaluación

1. **(Selección múltiple)** ¿Qué condición es necesaria para aplicar bisección en $[a,b]$?
   a) $f$ convexa — b) $f$ continua y $f(a)\cdot f(b)<0$ — c) $f$ diferenciable y $f'(a)\ne0$ — d) $f$ monótona en todo su dominio  
   **Respuesta:** b. *Bolzano exige continuidad y cambio de signo en los extremos; no exige derivabilidad ni convexidad.*

2. **(Selección múltiple)** Cerca de una raíz simple, el orden de convergencia típico de Newton-Raphson es:
   a) Lineal — b) Cuadrático — c) Cúbico — d) No converge  
   **Respuesta:** b. *El número de dígitos correctos se duplica aproximadamente en cada iteración cuando $f'(x^{*})\ne0$.*

3. **(Verdadero/Falso)** Bisección puede no detectar una raíz real si esta tiene multiplicidad par dentro del intervalo.  
**Respuesta:** Verdadero. *En una raíz de multiplicidad par, $f$ no cambia de signo alrededor de ella, por lo que el criterio de Bolzano no la detecta aunque exista.*

4. **(Verdadero/Falso)** Si un método alcanza el número máximo de iteraciones, se puede afirmar que convergió.  
**Respuesta:** Falso. *Alcanzar el límite de iteraciones es una salvaguarda, no una prueba de convergencia; debe reportarse como "no convergió" junto con el último residuo y cota de error.*

5. **(Respuesta numérica con tolerancia)** Para $f(x)=x^3-x-2$ en $[1,2]$, el primer punto medio de bisección es ______ (tolerancia ±0.0001).  
**Respuesta:** 1.5. *Es el punto medio de $[1,2]$; además $f(1.5)=-0.125$.*

6. **(Respuesta numérica con tolerancia)** Con Newton, $x_0=1.5$, sobre $f(x)=x^3-x-2$, el valor de $x_1$ es ______ (tolerancia ±0.000001).  
**Respuesta:** 1.5217391304. *Se obtiene de $x_1=1.5-f(1.5)/f'(1.5)=1.5-(-0.125)/5.75$.*

---

## 15. Referencia bibliográfica

Chapra, S. C. y Canale, R. P. — *Métodos numéricos para ingenieros*. (Capítulos de raíces de ecuaciones: bisección, Newton-Raphson, falsa posición y secante).
