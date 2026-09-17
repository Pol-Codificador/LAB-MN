## Semana 01 — Definición del problema y acuerdo de equipo

**Módulo:** Ecuaciones no lineales y errores
**Semana:** 01
**Responsable:** Renato Xavier Ponce Llerena

---

# 1. Caso matemático seleccionado

El caso base establecido para el módulo es:

$$
g(x)=x^3-x
$$

Se desea encontrar el valor de \(x\) que produce una respuesta objetivo igual a:

$$
g(x)=2
$$

Por lo tanto, el problema puede expresarse como una ecuación no lineal:

$$
x^3-x=2
$$

Llevando todos los términos a un lado:

$$
\boxed{f(x)=x^3-x-2=0}
$$

El objetivo del módulo será utilizar métodos numéricos para aproximar la raíz de esta ecuación y analizar el comportamiento de la convergencia.

El documento del laboratorio establece como métodos mínimos para este módulo **Bisección** y **Newton**, utilizando inicialmente el intervalo [1,2] para Bisección y x<sub>0</sub> = 1.5 como aproximación inicial para Newton.

---

# 2. Variables del problema

| Variable | Descripción                                        | Tipo                 |
| -------- | -------------------------------------------------- | -------------------- |
| x    | Variable cuyo valor permite satisfacer la ecuación | Variable de decisión |
| g(x) | Función original del problema                      | Función              |
| f(x) | Función transformada para búsqueda de la raíz      | Función              |
| 2    | Respuesta objetivo                                 | Constante            |

La función utilizada por los algoritmos será:

$$
f(x)=x^3-x-2
$$

Su derivada, necesaria para el método de Newton, es:

$$
\boxed{f'(x)=3x^2-1}
$$

---

# 3. Supuestos

Para el desarrollo inicial del caso se consideran los siguientes supuestos:

1. La función f(x) = x<sup>3</sup> - x - 2 es evaluable para los valores utilizados durante las iteraciones.
2. Se busca una raíz real de la ecuación.
3. El intervalo inicial para Bisección es [1,2].
4. Para Newton se utilizará inicialmente x<sub>0</sub> = 1.5.
5. La tolerancia inicial será:

$$
\varepsilon=0.000001
$$

6. El número máximo de iteraciones será:

$$
N_{\max}=100
$$

7. Los resultados obtenidos mediante los métodos numéricos serán aproximaciones y deberán verificarse mediante el valor del residuo.

Estas condiciones corresponden al caso base definido para el módulo.

---

# 4. Verificación del intervalo inicial

Para aplicar Bisección se debe comprobar que exista cambio de signo:

$$
f(1)=1^3-1-2
$$

$$
f(1)=-2
$$

Mientras que:

$$
f(2)=2^3-2-2
$$

$$
f(2)=4
$$

Por lo tanto:

$$
f(1)<0
$$

y

$$
f(2)>0
$$

Se cumple:

$$
f(1)f(2)<0
$$

Por tanto, el intervalo inicial:

$$
\boxed{[1,2]}
$$

es adecuado para iniciar el método de Bisección.

---

# 5. Primera iteración de Bisección

El punto medio inicial es:

$$
x_r=\frac{x_l+x_u}{2}
$$

Con:

$$
x_l=1,\qquad x_u=2
$$

se obtiene:

$$
x_r=\frac{1+2}{2}=1.5
$$

Evaluando:

$$
f(1.5)=1.5^3-1.5-2
$$

$$
\boxed{f(1.5)=-0.125}
$$

Como:

$$
f(1.5)<0
$$

y:

$$
f(2)>0
$$

el nuevo intervalo es:

$$
\boxed{[1.5,2]}
$$

Este resultado constituye una prueba inicial que puede ser utilizada para verificar la implementación del algoritmo.

---

# 6. Primera iteración de Newton

El método de Newton utiliza:

$$
x_{i+1}=x_i-\frac{f(x_i)}{f'(x_i)}
$$

Para el problema:

$$
f(x)=x^3-x-2
$$

y:

$$
f'(x)=3x^2-1
$$

se utiliza:

$$
x_0=1.5
$$

Primero:

$$
f(1.5)=-0.125
$$

y:

$$
f'(1.5)=3(1.5)^2-1
$$

$$
f'(1.5)=5.75
$$

Entonces:

$$
x_1=1.5-\frac{-0.125}{5.75}
$$

$$
\boxed{x_1\approx1.5217391304}
$$

Este valor puede utilizarse como prueba de la implementación inicial del método de Newton.

---

# 7. Valor de referencia

Para verificar los resultados obtenidos mediante los métodos numéricos, se utilizará como referencia:

$$
\boxed{x\approx1.5213797068}
$$

La referencia permitirá diferenciar entre:

* aproximación numérica;
* residuo de la función;
* error de la aproximación;
* cumplimiento de la tolerancia.

Se proporciona este valor como raíz de referencia para el caso base.

---

# 8. Criterios de parada

Para la implementación de los métodos se deberán considerar criterios de parada explícitos.

### Bisección

Se puede utilizar como condición de parada el tamaño del intervalo o la cota del error del punto medio:

$$
E_a\leq\frac{x_u-x_l}{2}
$$

y/o la tolerancia establecida:

$$
E_a<\varepsilon
$$

con:

$$
\varepsilon=10^{-6}
$$

También deberá registrarse el valor del residuo:

$$
|f(x_r)|
$$

### Newton

Para Newton se debe registrar:

* aproximación actual \(x_i\);
* valor de \(f(x_i)\);
* cambio entre aproximaciones:

$$
|x_{i+1}-x_i|
$$

* residuo:

$$
|f(x_i)|
$$

La implementación no deberá considerar que existe convergencia únicamente porque se alcanzó el número máximo de iteraciones.

---

# 9. Situaciones que deben detectarse

Los algoritmos deberán contemplar condiciones de error o fallo.

### Bisección

Debe detectarse cuando:

$$
f(x_l)f(x_u)>0
$$

Esto significa que no se ha verificado el cambio de signo requerido para iniciar el método.

### Newton

Debe detectarse cuando:

$$
f'(x_i)=0
$$

o cuando la derivada sea demasiado pequeña para realizar de forma segura la división.

También deberán controlarse:

* valores no finitos;
* número máximo de iteraciones;
* ausencia de cumplimiento de la tolerancia.

Estas condiciones están especificadas en el caso técnico del módulo.

---

# 10. Restricciones iniciales del caso

| Parámetro                   |            Valor |
| --------------------------- | ---------------: |
| Función                     |      x<sup>3</sup> - x - 2 |
| Intervalo Bisección         |        [1,2] |
| Aproximación inicial Newton |          1.5 |
| Tolerancia                  |     0.000001 |
| Máximo de iteraciones       |          100 |
| Raíz de referencia          | 1.5213797068 |

Estas restricciones corresponden al caso base de la Semana 01 y podrán modificarse posteriormente para realizar pruebas adicionales.

---

# 11. Pruebas matemáticas iniciales

Se proponen las siguientes pruebas para verificar posteriormente la implementación:

| ID   | Prueba                                   | Resultado esperado         |
| ---- | ---------------------------------------- | -------------------------- |
| M-01 | f(1)                                 | -2                     |
| M-02 | f(2)                                 | 4                      |
| M-03 | f(1.5)                               | -0.125                 |
| M-04 | Primera iteración Newton con x<sub>0</sub>=1.5 | x<sub>1</sub> ≈ 1.5217391304 |
| M-05 | Bisección en [1,2]                   | Intervalo válido           |
| M-06 | Bisección en [2,3]                   | Error: sin cambio de signo |
| M-07 | Newton para f(x) = x<sup>3</sup>-1, x<sub>0</sub> = 0    | Error: derivada cero       |

Las pruebas M-06 y M-07 corresponden a los escenarios de fallo indicados para el módulo.
