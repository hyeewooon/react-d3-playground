import { useRef, useEffect, useState } from 'react';
import { select } from 'd3-selection';

import 'd3-transition';

const AnimatedBar: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [list, setList] = useState<number[]>([]);

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

  useEffect(() => {
    const svgElem = select(svgRef.current);

    svgElem
      .selectAll('rect')
      .data(list)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('x', (_, i) => i * 70)
            .attr('y', (v) => 300 - 5 * v)
            .attr('width', 65)
            .attr('height', (v) => v * 10)
            .attr('fill', 'orange')
            .call((enter) =>
              enter
                .transition()
                .duration(500)
                .attr('y', (v) => 300 - 10 * v)
            ),
        (update) => update.attr('fill', 'blue'),
        (exit) =>
          exit.transition().attr('fill', 'red').style('opacity', 0).remove()
      );
  }, [list]);

  return (
    <>
      <svg ref={svgRef} width={700} height={300}></svg>
      <button onClick={removeData}>초기화</button>
    </>
  );
};

export default AnimatedBar;
