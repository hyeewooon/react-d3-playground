import React, { useEffect, useRef, useState } from 'react';

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [list, setList] = useState<number[]>([12, 5, 6, 6, 9, 10]);

  return (
    <>
      <svg width={700} height={300}>
        {list.map((v, i) => (
          <rect
            key={i}
            x={i * 70}
            y={300 - 10 * v}
            width={65}
            height={v * 10}
            fill="orange"
          />
        ))}
      </svg>
    </>
  );
};

export default BarChart;
