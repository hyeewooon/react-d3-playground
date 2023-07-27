import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { axisBottom, axisRight } from 'd3-axis';
import { utcMonth, utcYear } from 'd3-time';
import { utcFormat } from 'd3-time-format';

const StyledAxes = () => {
  const size = {
    width: 928,
    height: 500,
    marginTop: 20,
    marginRight: 0,
    marginBottom: 30,
    marginLeft: 0,
  };

  const svgRef = useRef<SVGSVGElement>(null);

  const x = scaleUtc()
    .domain([new Date('2021-03-01'), new Date('2022-03-01')])
    .range([size.marginLeft, size.width - size.marginRight]);

  const y = scaleLinear()
    .domain([80, 99])
    .range([size.height - size.marginBottom, size.marginTop]);

  useEffect(() => {
    const svgElem = select(svgRef.current);

    const timeFormat = utcFormat('%b %d');

    const xScale = x.ticks(utcMonth).map(timeFormat);

    svgElem
      .append('g')
      .attr('transform', `translate(0, ${size.height - size.marginBottom})`)
      .call(axisBottom(x))
      .call((g) => g.select('.domain').remove());

    svgElem
      .append('g')
      .attr('transform', `translate(${size.marginLeft}, 0)`)
      .call(
        axisRight(y).tickSize(size.width - size.marginLeft - size.marginRight)
      )
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick:not(:first-of-type) line')
          .attr('stroke-opacity', 0.5)
          .attr('stroke-dasharray', '2,2')
      )
      .call((g) => g.selectAll('.tick text').attr('x', 4).attr('dy', -4));
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        style={{ maxWidth: '100%', height: 'auto' }}
      ></svg>
    </>
  );
};

export default StyledAxes;
