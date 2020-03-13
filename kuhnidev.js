// Kuhni Ambients - Developer (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useEffect, useState } from "react";

export const version = "v2003.12.2351";

export const changelog =
  "Se agregó el componente Monitor y la variable de changelog";

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

export const Monitor = props => {
  const { data, title } = props;

  const [showMonitor, setShowMonitor] = useState(false);

  return (
    <div>
      <div className="d-flex align-items-center text-right mb-3">
        <div className="flex-grow-1 mx-3 border-top" />
        <span className="text-secondary">
          Monitor{title ? `: ${title}` : ` ${version}`}
        </span>
        <div className="flex-grow-1 mx-3 border-top" />
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => setShowMonitor(!showMonitor)}
        >
          <i
            className={
              showMonitor
                ? "fas fa-chevron-circle-up"
                : "fas fa-chevron-circle-down"
            }
          />
        </span>
      </div>
      <div hidden={!showMonitor} className="border mb-3 p-3">
        <code>
          {JSON.stringify(data, null, "~")
            .split("\n")
            .map((line, index) => (
              <div key={`monitor-line-${index}`}>
                {line.split("").map((part, index) => {
                  return (
                    <span key={`part-${index}`}>
                      {part === "~" ? <>&nbsp;&nbsp;&nbsp;</> : part}
                    </span>
                  );
                })}
                <br />
              </div>
            ))}
        </code>
      </div>
    </div>
  );
};

export const ContainerArray = () => {
  return (
    <code>
      <strong>ContainerArray</strong> has been deprecated
    </code>
  );
};

export const renderContainer = () => (
  <code>
    <strong>renderContainer</strong> has been deprecated
  </code>
);

export const renderContainers = () => (
  <code>
    <strong>renderContainers</strong> has been deprecated
  </code>
);

export const renderUI = () => (
  <code>
    <strong>renderUI</strong> has been deprecated
  </code>
);
