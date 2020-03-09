// Kuhni Ambients - Developer (C) 2020
// Main Developer: Alan Badillo Salas
// Contact: badillo.soft@hotmail.com (@badillosoft on SM)
// Support: kuhnidev@gmail.com
// Github (dev): https://github.com/badillosoft/kuhni-ambient
// Github (prod): https://github.com/kuhnidev/kuhni-ambient
// MIT LICENSE

import React, { useEffect, useState } from "react";

export const version = "v2003.05.1834";

export const useInputState = (input, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (input === void 0) return;
    setValue(input);
  }, [input]);

  return [value, setValue];
};

export const Container = props => {
  const { children, data, setData } = props;

  const [container, setContainer] = useInputState(data, {});

  const handler = typeof children === "function" ? children : () => 
children;

  return handler(
    container,
    new Proxy(setContainer, {
      get(target, key) {
        return newValue => {
          target({
            ...container,
            [key]: newValue
          });
          if (typeof setData === "function") {
            setData({
              ...data,
              [key]: newValue
            });
          }
        };
      }
    })
  );
};

export const ContainerArray = props => {
  const { children, datas } = props;

  const handler = typeof children === "function" ? children : () => 
children;

  const nextContainer = (containers, datas) => {
    if (datas.length === 0) {
      return handler(...containers);
    }
    const [pair, ...nextDatas] = datas;

    const [data, setData] = pair instanceof Array ? pair : [pair];

    return (
      <Container data={data} setData={setData}>
        {(container, setContainer) =>
          nextContainer([...containers, [container, setContainer]], 
nextDatas)
        }
      </Container>
    );
  };

  return nextContainer([], datas);
};

