import { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';

const AnimatedBarWithSpring = () => {
  const [list, setList] = useState<number[]>([]);

  let key = 0;

  const config = {
    duration: 500,
  };

  const transitions = useTransition(list, {
    from: {
      y: 5,
      opacity: 1,
    },
    enter: {
      fill: 'orange',
      y: 0,
      config,
    },
    update: { fill: 'blue', config },
    leave: { opacity: 0, config },
    keys: () => key++,
  });

  const removeData = () => {
    setList([]);
  };

  useEffect(() => {
    setList([1, 10, 2, 7, 7, 10]);

    const timeoutId = setTimeout(() => {
      const addedData = [1, 2, 3];
      setList((prev) => [...prev, ...addedData]);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <svg width={700} height={300}>
        {transitions((style, item, _, index) => {
          return (
            <animated.rect
              style={style}
              height={item * 10}
              width={65}
              x={index * 70}
              y={300 - 10 * item}
            >
              {item}
            </animated.rect>
          );
        })}
      </svg>
      <button onClick={removeData}>초기화</button>
    </>
  );
};

export default AnimatedBarWithSpring;
