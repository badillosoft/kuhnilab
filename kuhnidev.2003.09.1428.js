// Kuhni Ambients - Developer (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useEffect, useState } from "react";

export const version = "v2003.09.1428";

export const useInputState = (input, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (input === void 0) return;
    setValue(input);
  }, [input]);

  return [value, setValue];
};

export const Container = props => {
  const { children, container, setContainer } = props;

  const [currentContainer, setCurrentContainer] = 
useInputState(container, {});

  const handler = typeof children === "function" ? children : () => 
children;

  return handler(
    currentContainer,
    new Proxy(setCurrentContainer, {
      get(target, key) {
        return newValue => {
          target({
            ...currentContainer,
            [key]: newValue
          });
          if (typeof setContainer === "function") {
            setContainer({
              ...container,
              [key]: newValue
            });
          }
        };
      }
    })
  );
};

export const ContainerArray = props => {
  const { children, containers } = props;

  const [currentDatas] = useInputState(containers, []);

  const handler = typeof children === "function" ? children : () => 
children;

  const nextContainer = (computedContainers, containers = []) => {
    if (containers.length === 0) {
      if (computedContainers.length === 0) {
        return null;
      }
      return handler(...computedContainers);
    }
    const [pair, ...nextDatas] = containers;

    const [container, setContainer] = pair instanceof Array ? pair : 
[pair];

    return (
      <Container container={container} setContainer={setContainer}>
        {(container, setContainer) =>
          nextContainer(
            [...computedContainers, [container, setContainer]],
            nextDatas
          )
        }
      </Container>
    );
  };

  return nextContainer([], currentDatas);
};

export const UI = props => {
  const { children, index } = props;

  const handler =
    typeof children === "function"
      ? children
      : () => children || <code>ui has not children</code>;

  return handler(
    new Proxy(index || {}, {
      get(target, key) {
        console.log("KEY", key);
        return target[key] || (() => <code>invalid ui {key}</code>);
      }
    })
  );
};

export const renderContainer = ([container, setContainer], handler) => (
  <Container container={container} setContainer={setContainer}>
    {handler}
  </Container>
);

export const renderContainers = (containers, handler) => (
  <Container containers={containers}>{handler}</Container>
);

