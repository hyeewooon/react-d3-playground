import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
import { max, group } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

interface DataType {
  date: string;
  name: string;
  trade: number;
}

const data: DataType[] = [
  {
    date: '2023.07.10',
    name: 'a',
    trade: 100,
  },
  {
    date: '2023.07.11',
    name: 'a',
    trade: 1000,
  },
  {
    date: '2023.07.11',
    name: 'c',
    trade: 100,
  },
  {
    date: '2023.07.10',
    name: 'c',
    trade: 300,
  },
  {
    date: '2023.07.10',
    name: 'b',
    trade: 200,
  },
  {
    date: '2023.07.11',
    name: 'b',
    trade: 400,
  },
  {
    date: '2023.07.11',
    name: 'd',
    trade: 200,
  },
];

const GroupedBar = () => {
  const width = 300;
  const height = 500;
  const marginTop = 20;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  const svgRef = useRef<SVGSVGElement>(null);

  // date
  const groups = new Set(data.map((d) => d.date).sort());
  // name
  const subGroup = new Set(data.map((d) => d.name).sort());

  const colorPalette = scaleOrdinal<string, string>()
    .domain(subGroup)
    .range(['#b4e1a4', '#cce54c', '#e3e84b']);

  useEffect(() => {
    const svgElem = select(svgRef.current);

    const xScale = scaleBand()
      .domain(groups)
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

    const xGroupScale = scaleBand()
      .domain(subGroup)
      .rangeRound([0, xScale.bandwidth()])
      .padding(0.05);

    const yScale = scaleLinear()
      .domain([0, max(data.map((v) => v.trade)) ?? 0])
      .nice()
      .rangeRound([height - marginBottom, marginTop]);

    // add rect
    svgElem
      .append('g')
      .selectAll()
      .data(group(data, (d) => d.date))
      .join('g')
      .attr('transform', ([state]) => `translate(${xScale(state)}, 0)`)
      .selectAll()
      .data(([, d]) => d)
      .join('rect')
      .attr('x', (d) => xGroupScale(d.name) ?? 0)
      .attr('y', (d) => yScale(d.trade))
      .attr('width', xGroupScale.bandwidth())
      .attr('height', (d) => yScale(0) - yScale(d.trade))
      .attr('fill', (d) => colorPalette(d.name));

    // x axis
    svgElem
      .append('g')
      .attr('transform', `translate(0, ${height - marginBottom})`)
      .call(axisBottom(xScale).tickSizeOuter(0));

    // y axis
    svgElem
      .append('g')
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(axisLeft(yScale).ticks(null, 's'));
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></svg>
    </>
  );
};

export default GroupedBar;
