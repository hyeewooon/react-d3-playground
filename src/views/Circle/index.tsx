import { useState, useEffect, useRef } from 'react';
import { select } from 'd3-selection';

const Circle: React.FC = () => {
  const [list, setList] = useState<number[]>([10, 20, 5, 50, 0, 100]);

  const getData = () => {
    const timeoutId = setTimeout(() => {
      setList([0, 10, 20, 30, 40, 50]);

      clearTimeout(timeoutId);
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <svg>
        {list.map((v, i) => (
          <circle key={i} cx={i * 30} cy={100 - v} r={10}></circle>
        ))}
      </svg>
    </>
  );
};

export default Circle;
