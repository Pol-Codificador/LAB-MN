# Ficha de Modelación Matemática
## Módulo: Teoría de Errores

---


# Aproximaciones y Teoría de Errores en Análisis Numérico

---

## 1. Introducción

En ingeniería, muchas cantidades no pueden calcularse de manera exacta o, aunque exista una expresión exacta, su evaluación mediante una computadora produce una representación aproximada. Por ello, el análisis numérico no solo busca obtener una solución, sino también determinar **qué tan cercana está esa solución al valor verdadero**.

> **Idea fundamental:** una aproximación numérica es útil cuando conocemos o podemos controlar el error asociado a ella.

---

## 2. Idea intuitiva de una aproximación

Una **aproximación** es un valor que representa a otro valor considerado como referencia, pero que no necesariamente coincide exactamente con él.

Por ejemplo:

$$\pi = 3.14159265358979\ldots$$

Si utilizamos:

$$\pi \approx 3.14$$

estamos reemplazando el valor de $\pi$ por un número más sencillo de utilizar. Esta sustitución introduce un error.

Otro ejemplo:

$$\sqrt{2}=1.41421356237\ldots$$

Si una calculadora o programa trabaja con:

$$\sqrt{2}\approx1.4142$$

el resultado es aproximado.

### ¿Por qué aproximamos?

En problemas de ingeniería aparecen aproximaciones por diferentes razones:

- La solución matemática puede no tener una forma cerrada sencilla.
- Los datos de entrada pueden ser experimentales y, por tanto, tener incertidumbre.
- Una computadora utiliza una cantidad finita de dígitos.
- Un procedimiento numérico puede detenerse antes de llegar al valor exacto.
- Una función puede reemplazarse por una expresión más sencilla.

Por tanto, el objetivo no es eliminar toda aproximación —algo que generalmente no es posible—, sino **cuantificar y controlar el error**.

---

## 3. Valor verdadero y valor aproximado

Para estudiar el error se distinguen dos valores:

- **Valor verdadero:** valor de referencia de la cantidad.
- **Valor aproximado:** valor utilizado en el cálculo.

Los representaremos como:

$$x_t = \text{valor verdadero}$$

$$x_a = \text{valor aproximado}$$

En muchas situaciones prácticas, el valor verdadero no se conoce exactamente. En esos casos puede utilizarse un valor suficientemente preciso como referencia.

### Ejemplo

Supongamos:

$$x_t=25$$

y que un procedimiento numérico produce:

$$x_a=24.8$$

La aproximación es cercana al valor verdadero, pero existe una diferencia:

$$25-24.8=0.2$$

Esa diferencia constituye el error absoluto.

---

## 4. Exactitud y precisión

Los conceptos de **exactitud** y **precisión** están relacionados, pero no significan lo mismo.

### 4.1 Exactitud

La **exactitud** indica qué tan cercano está un resultado al valor verdadero o de referencia.

Por ejemplo, si el valor verdadero es:

$$x_t=10$$

los resultados:

$$9.99,\quad 10.01,\quad 10.02$$

son bastante exactos porque están próximos a $10$.

### 4.2 Precisión

La **precisión** describe qué tan cercanos están entre sí varios resultados obtenidos repetidamente.

Supongamos que se realizan cuatro mediciones:

$$8.21,\quad 8.22,\quad 8.21,\quad 8.22$$

Los resultados están muy agrupados, por lo que existe alta precisión.

Sin embargo, si el valor verdadero fuera:

$$10$$

las mediciones serían poco exactas.

### Diferencia fundamental

- **Exactitud:** cercanía al valor verdadero.
- **Precisión:** cercanía entre resultados repetidos.

Es posible tener:

1. Alta exactitud y alta precisión.
2. Alta exactitud y baja precisión.
3. Baja exactitud y alta precisión.
4. Baja exactitud y baja precisión.

### Ejemplo conceptual

Imaginemos un objetivo de tiro:

- Los impactos agrupados alrededor del centro representan **alta precisión y alta exactitud**.
- Los impactos agrupados lejos del centro representan **alta precisión y baja exactitud**.
- Los impactos dispersos alrededor del centro pueden representar **menor precisión pero una exactitud global razonable**.

---

## 5. Error absoluto

El **error absoluto** mide la diferencia entre el valor verdadero y el valor aproximado.

Se define como:

$$E_t=x_t-x_a$$

En muchos contextos se utiliza su magnitud:

$$|E_t|=|x_t-x_a|$$

Esta última forma indica cuánto se separa la aproximación del valor verdadero sin considerar el signo.

### Ejemplo

Sea:

$$x_t=12.5$$

y:

$$x_a=12.1$$

Entonces:

$$E_t=12.5-12.1=0.4$$

Por tanto:

$$|E_t|=0.4$$

La aproximación presenta un error absoluto de **0.4 unidades**.

---

## 6. Error relativo

El error absoluto no siempre permite comparar adecuadamente errores de magnitudes diferentes.

Por ejemplo, un error de 1 metro puede ser:

- muy grande si estamos midiendo 2 metros;
- pequeño si estamos midiendo 1000 metros.

Por ello se utiliza el **error relativo**:

$$\varepsilon_t = \frac{x_t-x_a}{x_t}$$

y, en magnitud:

$$|\varepsilon_t| = \left| \frac{x_t-x_a}{x_t} \right|$$

Si se desea expresarlo como porcentaje:

$$\varepsilon_t(\%) = \left| \frac{x_t-x_a}{x_t} \right| \times 100$$

### Ejemplo

Supongamos:

$$x_t=200$$

$$x_a=198$$

Error absoluto:

$$|E_t|=|200-198|=2$$

Error relativo:

$$|\varepsilon_t|=\frac{2}{200}=0.01$$

En porcentaje:

$$|\varepsilon_t|=1\%$$

### Interpretación

El resultado tiene un error absoluto de **2 unidades**, equivalente a un error relativo del **1 %**.

---

## 7. Error porcentual

El error relativo puede expresarse directamente como porcentaje:

$$E_{\%} = \left| \frac{x_t-x_a}{x_t} \right| \times 100$$

### Ejemplo

Se sabe que:

$$x_t=50$$

y se obtiene:

$$x_a=49.2$$

Entonces:

$$|E_t|=|50-49.2|=0.8$$

$$E_{\%} = \frac{0.8}{50}(100)=1.6\%$$

Por tanto, el error porcentual es **1.6 %**.

---

## 8. Error verdadero y error aproximado

En problemas reales puede ocurrir que el valor verdadero sea desconocido.

En ese caso no podemos calcular directamente:

$$\frac{x_t-x_a}{x_t}$$

Una alternativa consiste en comparar dos aproximaciones consecutivas: $x_a^{(n)}$ y $x_a^{(n-1)}$.

El error relativo aproximado puede calcularse como:

$$\varepsilon_a = \left| \frac{x_a^{(n)}-x_a^{(n-1)}}{x_a^{(n)}} \right| \times 100$$

Este criterio es especialmente importante en métodos iterativos.

### Ejemplo

Supongamos que una secuencia produce:

$$x_a^{(n-1)}=2.51$$

$$x_a^{(n)}=2.50$$

Entonces:

$$\varepsilon_a = \left| \frac{2.50-2.51}{2.50} \right| \times 100 = 0.4\%$$

Esto indica que las dos últimas aproximaciones difieren relativamente en un 0.4 %.

---

## 9. Cifras significativas

Las **cifras significativas** representan los dígitos que contienen información relevante sobre la precisión de un número.

Por ejemplo:

$$3.142$$

tiene cuatro cifras significativas.

En cambio:

$$0.003142$$

también tiene cuatro cifras significativas porque los ceros iniciales solamente indican la posición decimal.

### Ejemplo

| Número | Cifras significativas |
|---|---:|
| 12.5 | 3 |
| 0.125 | 3 |
| 0.00125 | 3 |
| 1250. | 4 |
| 1.250 | 4 |

La cantidad de cifras significativas debe interpretarse de acuerdo con el contexto y la forma en que fue reportado el número.

---

## 10. Errores de redondeo

Las computadoras representan los números utilizando una cantidad finita de dígitos. Por esta razón, muchos números reales no pueden representarse exactamente.

Por ejemplo, si solo se permiten cuatro cifras significativas:

$$\pi=3.14159265\ldots$$

puede almacenarse como:

$$3.142$$

La diferencia entre el número original y su representación genera un **error de redondeo**.

### 10.1 Redondeo

Para redondear un número a una cantidad determinada de cifras:

1. Se conservan los dígitos requeridos.
2. Se observa el siguiente dígito.
3. Si ese dígito es menor que 5, se conserva el último dígito.
4. Si es 5 o mayor, se incrementa el último dígito conservado.

#### Ejemplo

Redondear $8.3764$ a tres cifras significativas.

Se conservan: $8.37$. El siguiente dígito es 6, por lo que se aumenta el 7:

$$\mathbf{8.38}$$

---

## 11. Truncamiento y redondeo

No deben confundirse.

### Truncamiento

Consiste simplemente en eliminar los dígitos posteriores.

Por ejemplo:

$$3.141592 \rightarrow 3.141$$

### Redondeo

Considera el siguiente dígito para decidir si se aumenta el último dígito conservado.

$$3.141592 \rightarrow 3.142$$

En general, el redondeo suele producir una representación más cercana al valor original que el truncamiento, aunque ambos introducen error.

---

## 12. Propagación de errores en operaciones

Los errores presentes en los datos pueden propagarse cuando realizamos operaciones matemáticas.

Supongamos:

$$z=x+y$$

Si $x$ y $y$ contienen errores, el resultado también puede contenerlos.

Para una primera aproximación del error absoluto:

$$\Delta z \approx \Delta x + \Delta y$$

Para una diferencia ($z=x-y$), se utiliza de forma conservadora:

$$|\Delta z| \approx |\Delta x| + |\Delta y|$$

Esto muestra una característica importante: en determinadas operaciones, pequeños errores de entrada pueden combinarse y generar un error significativo en la salida.

---

## 13. La serie de Taylor

La serie de Taylor constituye una herramienta fundamental para aproximar funciones mediante polinomios.

Si una función $f(x)$ posee suficientes derivadas alrededor de un punto $x_i$, puede expresarse como:

$$f(x)=f(x_i)+f'(x_i)(x-x_i) + \frac{f''(x_i)}{2!}(x-x_i)^2 + \frac{f'''(x_i)}{3!}(x-x_i)^3+\cdots$$

De manera general:

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_i)}{k!}(x-x_i)^k + R_n$$

donde $R_n$ representa el **término de resto o error de truncamiento**.

---

## 14. Serie de Maclaurin

Cuando el punto de expansión es $x_i=0$, la serie de Taylor recibe el nombre de **serie de Maclaurin**:

$$f(x) = f(0)+f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3+\cdots$$

Algunas series importantes son:

### Exponencial

$$e^x = 1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\frac{x^4}{4!}+\cdots$$

### Seno

$$\sin x = x-\frac{x^3}{3!}+\frac{x^5}{5!}-\frac{x^7}{7!}+\cdots$$

### Coseno

$$\cos x = 1-\frac{x^2}{2!}+\frac{x^4}{4!}-\frac{x^6}{6!}+\cdots$$

---

## 15. Ejemplo de aproximación mediante Taylor

Aproximemos $e^{0.5}$ utilizando los cuatro primeros términos de la serie:

$$e^x \approx 1+x+\frac{x^2}{2}+\frac{x^3}{6}$$

Sustituyendo:

$$e^{0.5} \approx 1+0.5+\frac{0.5^2}{2}+\frac{0.5^3}{6}$$

$$e^{0.5} \approx 1+0.5+0.125+0.0208333$$

$$\mathbf{e^{0.5} \approx 1.6458333}$$

El valor de referencia es aproximadamente:

$$e^{0.5} \approx 1.6487213$$

Por tanto, el error absoluto aproximado es:

$$|E_t| \approx |1.6487213-1.6458333|$$

$$\mathbf{|E_t| \approx 0.002888}$$

Y el error porcentual es aproximadamente:

$$E_{\%} \approx 0.175\%$$

La inclusión de más términos permite mejorar la aproximación.

---

## 16. Error de truncamiento

Cuando una serie infinita se reemplaza por una cantidad finita de términos, se produce un **error de truncamiento**.

Por ejemplo:

$$e^x = 1+x+\frac{x^2}{2!} + \frac{x^3}{3!}+\frac{x^4}{4!}+\cdots$$

Si utilizamos solamente:

$$e^x \approx 1+x+\frac{x^2}{2!}$$

todos los términos restantes se omiten:

$$\frac{x^3}{3!}+\frac{x^4}{4!}+\cdots$$

Esa parte omitida representa el error de truncamiento.

### Diferencia importante

- **Error de redondeo:** aparece porque los números se representan con una cantidad finita de dígitos.
- **Error de truncamiento:** aparece porque un procedimiento matemático infinito se reemplaza por uno finito.

---

## 17. Término de resto de Taylor

El teorema de Taylor permite representar el error mediante un término de resto.

Una forma común es el resto de Lagrange:

$$R_n = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_i)^{n+1}$$

donde $\xi$ es algún punto situado entre $x_i$ y $x$.

Por tanto:

$$f(x)=P_n(x)+R_n$$

donde:

$$P_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_i)}{k!}(x-x_i)^k$$

es el polinomio de Taylor de grado $n$.

Esta expresión es importante porque permite **estimar el error cometido al utilizar el polinomio en lugar de la función original**.

---

## 18. Ejemplo de estimación del error

Aproximemos $\sin(0.2)$ utilizando:

$$P_3(x)=x-\frac{x^3}{3!}$$

Entonces:

$$P_3(0.2)=0.2-\frac{0.2^3}{6} = 0.1986667$$

El siguiente término de la serie es $\frac{x^5}{5!}$, por lo que podemos anticipar que el error será del orden de $O(x^5)$.

Para $x=0.2$:

$$0.2^5=0.00032$$

y el factor $5! = 120$ reduce aún más este valor.

La conclusión es que, alrededor de cero, el polinomio cúbico proporciona una aproximación bastante buena para $\sin(x)$ cuando $x$ es pequeño.

---

## 19. Orden de aproximación

El **orden de aproximación** indica cómo disminuye el error cuando disminuye el tamaño de la variable o del paso utilizado.

Si $E=O(h^p)$, decimos que el método tiene **orden $p$**.

Esto significa que, para valores suficientemente pequeños de $h$, el error se comporta proporcionalmente a $h^p$.

### Ejemplo

Supongamos $E=O(h^2)$. Si reducimos $h$ a la mitad ($h_{\text{nuevo}}=\frac{h}{2}$):

$$E_{\text{nuevo}} \approx \left(\frac{1}{2}\right)^2 E = \frac{E}{4}$$

Por tanto, un método de segundo orden reduce aproximadamente el error a la cuarta parte cuando el paso se reduce a la mitad.

---

## 20. Orden de Taylor

Si se utiliza un polinomio de Taylor de grado $n$ y el primer término omitido es proporcional a $(x-x_i)^{n+1}$, entonces el error de truncamiento es de orden $O((x-x_i)^{n+1})$.

### Ejemplo

Para $e^x\approx1+x$, el primer término omitido es $\frac{x^2}{2}$.

Por ello:

$$E_t=O(x^2)$$

La aproximación lineal es de segundo orden respecto a $x$ alrededor de cero.

---

## 21. Aplicaciones de la serie de Taylor

La serie de Taylor tiene numerosas aplicaciones en métodos numéricos.

### 21.1 Aproximación de funciones

Funciones como $e^x$, $\sin x$, $\cos x$ pueden aproximarse mediante polinomios. Esto es útil cuando se requiere evaluar una función con operaciones básicas.

### 21.2 Derivación de métodos numéricos

Muchos métodos de diferenciación numérica se obtienen desarrollando funciones mediante Taylor.

Por ejemplo:

$$f(x+h) = f(x)+hf'(x) + \frac{h^2}{2}f''(x)+\cdots$$

Despejando:

$$f'(x) \approx \frac{f(x+h)-f(x)}{h}$$

Esta expresión constituye la base de la diferencia hacia adelante.

### 21.3 Análisis del error

Taylor permite determinar qué términos fueron omitidos y, por tanto, estimar el orden del error.

### 21.4 Desarrollo de algoritmos

Los desarrollos de Taylor permiten estudiar la convergencia y el comportamiento de algoritmos numéricos.

---

## 22. Aplicación: derivada mediante Taylor

Partimos de:

$$f(x+h) = f(x)+hf'(x) + \frac{h^2}{2}f''(x) + O(h^3)$$

Despejamos:

$$hf'(x) = f(x+h)-f(x) - \frac{h^2}{2}f''(x) + O(h^3)$$

Dividiendo entre $h$:

$$f'(x) = \frac{f(x+h)-f(x)}{h} - \frac{h}{2}f''(x) + O(h^2)$$

Por tanto:

$$\mathbf{f'(x) \approx \frac{f(x+h)-f(x)}{h}}$$

y el error dominante es **$O(h)$**. Es decir, la diferencia hacia adelante es una aproximación de primer orden.

---

## 23. Aplicación: diferencia central

Desarrollamos:

$$f(x+h) = f(x)+hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x)+\cdots$$

y:

$$f(x-h) = f(x)-hf'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x)+\cdots$$

Restando:

$$f(x+h)-f(x-h) = 2hf'(x)+O(h^3)$$

Entonces:

$$\mathbf{f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}}$$

El error es **$O(h^2)$**. Por eso la diferencia central suele proporcionar una aproximación de mayor orden que la diferencia hacia adelante, siempre que las demás condiciones del problema sean comparables.

---

## 24. Error numérico total

En un cálculo numérico pueden aparecer diferentes fuentes de error. Entre las principales se encuentran:

- **Error de redondeo:** surge por la representación finita de los números.
- **Error de truncamiento:** surge al sustituir un procedimiento matemático exacto o infinito por una aproximación finita.
- **Error de datos:** proviene de incertidumbres en los datos de entrada.
- **Error de formulación:** se produce cuando el modelo matemático utilizado no representa exactamente el fenómeno real.
- **Error humano o equivocación:** puede originarse por errores de programación, transcripción, unidades o planteamiento.

Por ello, el error total de un resultado numérico debe analizarse considerando la fuente correspondiente.

---

## 25. Relación entre redondeo y truncamiento

Es importante distinguir estos conceptos:

| Concepto | Causa | Ejemplo |
|---|---|---|
| Error absoluto | Diferencia entre valor verdadero y aproximado | $\|x_t-x_a\|$ |
| Error relativo | Error absoluto comparado con el valor verdadero | $\|x_t-x_a\|/\|x_t\|$ |
| Error de redondeo | Representación finita de números | $\pi \rightarrow 3.142$ |
| Error de truncamiento | Omisión de términos/procesos | $e^x \rightarrow 1+x+x^2/2$ |
| Error de datos | Incertidumbre de entrada | Medición experimental |
| Error de formulación | Modelo simplificado | Modelo físico aproximado |

---

## 26. Ejemplo integrador

Se desea aproximar $\cos(0.3)$ utilizando los tres primeros términos de Maclaurin:

$$\cos x \approx 1-\frac{x^2}{2!}+\frac{x^4}{4!}$$

Sustituyendo:

$$\cos(0.3) \approx 1-\frac{0.3^2}{2} + \frac{0.3^4}{24}$$

Calculamos:

$$0.3^2=0.09$$

$$0.3^4=0.0081$$

Entonces:

$$\cos(0.3) \approx 1-0.045+0.0003375$$

$$\mathbf{\cos(0.3) \approx 0.9553375}$$

Si tomamos como referencia $\cos(0.3) \approx 0.95533649$, el error absoluto aproximado es:

$$|E_t| \approx |0.95533649-0.9553375|$$

$$\mathbf{|E_t| \approx 1.01\times10^{-6}}$$

El error relativo porcentual es aproximadamente:

$$E_{\%} \approx \frac{1.01\times10^{-6}}{0.95533649}(100)$$

$$\mathbf{E_{\%} \approx 1.06\times10^{-4}\%}$$

Este ejemplo muestra cómo agregar términos de Taylor puede producir una aproximación con un error muy pequeño.

---

## 27. Estrategia general para resolver problemas de teoría de errores

Cuando se presente un ejercicio, se recomienda seguir este procedimiento:

1. **Identificar el valor verdadero o de referencia.**
2. **Identificar el valor aproximado.**
3. Determinar qué tipo de error se solicita.
4. Aplicar la fórmula correspondiente.
5. Mantener suficientes cifras durante los cálculos intermedios.
6. Redondear solamente al final.
7. Interpretar el resultado.
8. Si se utiliza Taylor, identificar el primer término omitido.
9. Determinar el orden del error.
10. Si es posible, comparar con el valor exacto o una aproximación de alta precisión.

---

## 28. Ejercicios propuestos

**1. Error absoluto y relativo**

El valor verdadero de una magnitud es $x_t=15.7832$ y una aproximación es $x_a=15.74$.

Calcule:
- a) Error verdadero.
- b) Error absoluto.
- c) Error relativo.
- d) Error porcentual.

---

**2. Ejercicio 2 — Redondeo**

Redondee los siguientes números a **3 cifras significativas** y **5 cifras significativas**:

- a) $38.74629$
- b) $0.004827391$
- c) $125.9958$

Calcule además el error absoluto producido en cada caso tomando como referencia el número original.

---

**3. Comparación de errores**

Dos sensores producen $x_1=98.5$ y $x_2=0.985$. Ambos presentan un error absoluto de $0.05$.

Compare sus errores relativos y explique por qué el error absoluto por sí solo no permite determinar cuál medición es relativamente más precisa.

---

**4. Aproximación mediante Taylor**

Aproxime $e^{0.4}$ utilizando:
- a) Dos términos.
- b) Tres términos.
- c) Cuatro términos.
- d) Cinco términos.

Para cada caso determine el error absoluto tomando como referencia una calculadora o software con mayor precisión.

---

**5. Serie de Maclaurin**

Utilice la serie:

$$\sin x = x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$$

para aproximar $\sin(0.5)$ utilizando hasta el término de grado 5.

Calcule el error absoluto y el error porcentual.

---
**6. Estimación del error de Taylor**

Aproxime $e^{0.8}$ mediante:

$$P_4(x) = 1+x+\frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!}$$

- a) Calcule la aproximación.
- b) Determine el error real usando el valor de referencia.
- c) Utilice el resto de Taylor para obtener una cota del error.
- d) Compare la cota con el error real.
- e) Explique por qué la cota puede ser mayor que el error real.

---

**7. Orden de aproximación**

Un método numérico produce errores aproximadamente de:

| $h$ | Error |
|---:|---:|
| 0.10 | $2.50\times10^{-3}$ |
| 0.05 | $6.25\times10^{-4}$ |
| 0.025 | $1.56\times10^{-4}$ |
| 0.0125 | $3.91\times10^{-5}$ |

Determine experimentalmente el orden de aproximación $p$ suponiendo $E \approx Ch^p$. Utilice dos pares consecutivos de valores para comprobar el resultado.

---

**8. Comparación de métodos**

Considere las aproximaciones:

$$D_1 = \frac{f(x+h)-f(x)}{h}$$

$$D_2 = \frac{f(x+h)-f(x-h)}{2h}$$

- a) Utilice Taylor para determinar el orden de cada método.
- b) Explique cuál presenta un error de truncamiento de menor orden.
- c) Para $f(x)=e^x$ en $x=1$, calcule ambas aproximaciones utilizando $h=0.1$.
- d) Repita con $h=0.05$.
- e) Compare cómo disminuye el error.

---

**9. Redondeo y propagación**

Considere $x=12.347$ y $y=8.216$. Ambos valores se redondean a tres cifras significativas.

- a) Determine los valores redondeados.
- b) Calcule el error absoluto de cada uno.
- c) Calcule $z=x+y$ utilizando los valores originales y los redondeados.
- d) Determine el error absoluto del resultado.
- e) Analice cómo se propagó el error.

---

**10. Problema integrador**

Se desea aproximar $\ln(1+x)$ alrededor de $x=0$ mediante la serie:

$$\ln(1+x) = x-\frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$$

Para $x=0.25$:

- a) Calcule la aproximación usando 2, 3, 4, 5 y 6 términos.
- b) Calcule el error absoluto en cada caso.
- c) Determine el error porcentual.
- d) Analice la rapidez con que disminuye el error.
- e) Determine qué número mínimo de términos permite alcanzar un error menor que $10^{-5}$.

---

## 29. Preguntas de autoevaluación

### Conceptuales

1. ¿Qué diferencia existe entre una aproximación y un valor exacto?
2. ¿Qué significa que un resultado tenga alta exactitud?
3. ¿Qué significa que un conjunto de mediciones tenga alta precisión?
4. ¿Puede existir alta precisión y baja exactitud? Explique mediante un ejemplo.
5. ¿Cuál es la diferencia entre error absoluto y error relativo?
6. ¿Por qué el error relativo es especialmente útil para comparar resultados de diferentes escalas?
7. ¿Qué representa el error porcentual?
8. ¿Por qué una computadora produce errores de redondeo?
9. ¿Cuál es la diferencia entre truncar y redondear?
10. ¿Por qué aumentar las cifras utilizadas en un cálculo no garantiza automáticamente que todo el problema tenga mayor exactitud?

### Serie de Taylor

11. ¿Qué representa la serie de Taylor?
12. ¿Qué diferencia existe entre la serie de Taylor y la serie de Maclaurin?
13. ¿Qué es el error de truncamiento?
14. ¿Qué representa el término de resto $R_n$?
15. ¿Por qué el primer término omitido puede utilizarse para analizar el orden del error?
16. ¿Qué significa que un método sea $O(h^2)$?
17. Si un método tiene error $O(h^2)$ y se reduce $h$ a la mitad, ¿aproximadamente qué sucede con el error?
18. ¿Por qué la diferencia central tiene un orden de aproximación mayor que la diferencia hacia adelante?
19. ¿Cómo puede utilizarse Taylor para obtener fórmulas de diferenciación numérica?
20. ¿Por qué no siempre conviene utilizar una cantidad excesivamente grande de términos en un cálculo computacional?

---

## 30. Preguntas de análisis

1. Un estudiante afirma: *"Un número con más cifras decimales siempre es más exacto"*. ¿Es correcta esta afirmación? Justifique.
2. Dos métodos producen resultados con el mismo error absoluto, pero uno trabaja con valores cercanos a 1 y otro con valores cercanos a 1000. ¿Qué información adicional debería analizarse?
3. Si al agregar términos de Taylor el error deja de disminuir significativamente, ¿qué fuentes de error podrían estar dominando el cálculo?
4. ¿Por qué existe un compromiso entre error de truncamiento y error de redondeo?
5. Explique por qué la serie de Taylor no solamente sirve para aproximar funciones, sino también para analizar y construir métodos numéricos.
---

## 31. Referencias

1. S. C. Chapra y R. P. Canale, *Métodos numéricos para ingenieros*, 7.ª ed., México: McGraw-Hill, 2015, ISBN 978-607-15-1294-9.
2. S. C. Chapra and R. P. Canale, *Numerical Methods for Engineers*, 7th ed., New York: McGraw-Hill Education, 2015, ISBN 978-0-07-339792-4.
3. McGraw Hill, “Numerical Methods for Engineers,” descripción y tabla de contenidos oficial. Disponible en: [McGraw-Hill Official Page](https://www.mheducation.com/highered/product/Numerical-Methods-for-Engineers-Chapra.html)