# kuhnilab

Kuhni Lab &copy; 2020

Departamento de Innovación

## **Uso de Contenedores**

**Demo: https://codesandbox.io/s/uso-de-contenedores-zthls**

### **Contenedor Simple &lt;Container /&gt;**

Se utiliza cuándo se desea usar un único contenedor independiente.

> `container` - [Opcional] Recibe el objeto que será usado como contenedor.

> `setContainer` - [Opcional] Recibe la función que actualizará al objeto cada que cambie.

> `children` - [heredada] Recibe el cuerpo del componente, si es una función, accederá al contenedor enlazado como primer parámetro y al ajustador como segundo parámetro.

```
<Container container={ ... } setContainer={ ... }>
  {
    (bindContainer, setBindContainer) => {
      // Devuelve la interfaz con acceso a los contenedores
      // enlazados, puede precomputarlos aquí.
      return (
        <input 
          value={ bindContainer.username } 
          onChange={ 
            event => {
              setBindContainer.username(
                event.target.value
              );
            }
          }
        />
      );
    }
  }
</Container>
```

### **Arreglo de Contenedores &lt;ContainerArray /&gt;**

Se utiliza cuándo se desean usar múltiples contenedores al mismo tiempo, para evitar anidadción.

> `containers` - [Opcional] Recibe el arreglo de contenedores, cada contenedor es descrito como una pareja de del contenedor y su ajustador, o sólo el contenedor si se desea sólo lectura.

> `children` - [heredada] Recibe el cuerpo del componente, si es una función, accederá a los contenedores enlazados en el mismo orden que fueron definidos, cada contenedor es un arreglo que contiene la pareja del contenedor enlazado y su ajustador enlazado (Si es sólo lectura simulará el ajuste, pero sólo lo hará local).

```
<ContainerArray 
  containers={[
    [containerA, setContainerA],
    [containerB, setContainerB],
    containerC, // sólo lectura
  ]}
>
  {
    (
      [bindContainerA, setBindContainerA], 
      [bindContainerB, setBindContainerB],
      [bindContainerC, setBindContainerC]
    ) => {
      // Devuelve la interfaz con acceso a los contenedores
      // enlazados, puede precomputarlos aquí.
      return (
        <div>
          <input 
            value={ bindContainerA.username } 
            onChange={ 
              event => {
                setBindContainerA.username(
                  event.target.value
                );
              }
            }
          />
          <input 
            value={ bindContainerB.username } 
            onChange={ 
              event => {
                setBindContainerB.username(
                  event.target.value
                );
              }
            }
          />
          <input 
            value={ bindContainerC.username } 
            onChange={ 
              event => {
                setBindContainerC.username(
                  event.target.value
                  );
              }
            }
          />
        </div>
      );
    }
  }
</ContainerArray>
```
## **Uso de Interfaces**

**Demo: https://codesandbox.io/s/uso-de-interfaces-gfujz**

### **Interfaces indexadas &lt;UI /&gt;**

Se utiliza cuándo necesitamos indexar múltiples componentes, pero utilizar componentes que aún no estén indexados, simulando que ya están configurados.

> `container` - [Opcional] Recibe el objeto que será usado como contenedor.

> `setContainer` - [Opcional] Recibe la función que actualizará al objeto cada que cambie.

> `children` - [heredada] Recibe el cuerpo del componente, si es una función, accederá al contenedor enlazado como primer parámetro y al ajustador como segundo parámetro.

```
<Container container={ ... } setContainer={ ... }>
  {
    (bindContainer, setBindContainer) => {
      // Devuelve la interfaz con acceso a los contenedores
      // enlazados, puede precomputarlos aquí.
      return (
        <input 
          value={ bindContainer.username } 
          onChange={ 
            event => {
              setBindContainer.username(
                event.target.value
              );
            }
          }
        />
      );
    }
  }
</Container>
```
