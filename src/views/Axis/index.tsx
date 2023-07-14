import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';

const Axis = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElem = select(svgRef.current);
    const xScale = scaleLinear().domain([0, 100]).range([10, 300]);
    const xAxis = axisBottom(xScale);

    svgElem.append('g').call(xAxis);
  }, []);

  return (
    <>
      <svg ref={svgRef} width={500} height={500}></svg>
    </>
  );
};

export default Axis;
