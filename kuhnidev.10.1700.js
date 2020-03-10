// Kuhni Ambients - Developer (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useEffect, useState } from "react";

export const version = "v2003.10.1700";

export const useInputState = (input, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (
      input === void 0 ||
      (typeof input === "object" && Object.keys(input).length === 0)
    )
      return;
    setValue(input);
  }, [input]);

  return [value, setValue];
};

export const Container = props => {
  const { children, container, setContainer } = props;

  const handler = typeof children === "function" ? children : () => children;

  const [currentContainer, setCurrentContainer] = useInputState(container, {});

  useEffect(() => {
    if (typeof setContainer === "function") setContainer(currentContainer);
  }, [currentContainer]);

  return handler(currentContainer, setCurrentContainer);
};

export const ContainerArray = props => {
  const { children, containers } = props;

  const handler = typeof children === "function" ? children : () => children;

  const [currentContainers] = useInputState(containers, []);

  const nextContainer = (computedContainers, containers = []) => {
    if (containers.length === 0) {
      if (computedContainers.length === 0) {
        return null;
      }
      return handler(...computedContainers);
    }
    const [pair, ...nextDatas] = containers;

    const [container, setContainer] = pair instanceof Array ? pair : [pair];

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

  return nextContainer([], currentContainers);
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
        return (
          target[key] ||
          (props => (
            <div>
              <code>
                <strong>&lt;{key}</strong>{" "}
                {Object.entries(props)
                  .map(([key, value]) => {
                    if (React.isValidElement(value)) {
                      return `children={ ${value.type} }`;
                    }
                    return `${key}={ ${
                      typeof value === "function"
                        ? value
                            .toString()
                            .split("{")[0]
                            .trim()
                        : JSON.stringify(value)
                    } }`;
                  })
                  .join(" ")}{" "}
                <strong>/&gt;</strong>
              </code>
            </div>
          ))
        );
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

export const renderUI = (index, handler) => <UI index={index}>{handler}</UI>;
