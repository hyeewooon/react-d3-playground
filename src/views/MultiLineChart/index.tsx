import { useRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';

interface DataType {
  date: string;
  price: number;
}

const data: DataType[] = [
  {
    date: '2023.01',
    price: 300000000,
  },
  {
    date: '2023.02',
    price: 290000000,
  },
  {
    date: '2023.03',
    price: 320000000,
  },
  {
    date: '2023.04',
    price: 340000000,
  },
];

const MultiLineChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [min, max] = extent(data, (d) => new Date(d.date));

  const xScale = scaleTime().domain(dateList);
  const yScale = scaleLinear().domain([290000000, 340000000]).range([300, 0]);

  useEffect(() => {
    const svgElem = select(svgRef.current);

    // svgElem
    //   .append('path')
    //   .data(data)
    //   .attr('fill', 'none')
    //   .attr('stroke', '#1CA885')
    //   .attr('stroke-width', 4)
    //   .attr('d', line());
  }, []);

  return (
    <>
      <svg ref={svgRef} width={500} height={500}></svg>
    </>
  );
};

export default MultiLineChart;
