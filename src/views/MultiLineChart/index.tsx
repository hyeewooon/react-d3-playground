import { useRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, range } from 'd3-array';
import { timeMonth, timeYear, utcMonth } from 'd3-time';
import { timeFormat, utcFormat } from 'd3-time-format';

import CustomAxis from 'views/Axis/CustomAxis';

interface DataType {
  date: string;
  price: number;
}

const data: DataType[] = [
  {
    date: '2023.01',
    price: 30000,
  },
  {
    date: '2023.02',
    price: 29000,
  },
  {
    date: '2023.03',
    price: 38000,
  },
  {
    date: '2023.04',
    price: 34000,
  },
  {
    date: '2023.05',
    price: 41000,
  },
];

const MultiLineChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const dateList = extent<DataType, Date>(data, (d) => new Date(d.date)) as [
    Date,
    Date
  ];

  const priceList = extent<DataType, number>(data, (d) => d.price) as [
    number,
    number
  ];

  // x좌표
  const xScale = scaleTime().domain(dateList).range([130, 400]);

  const formatTime = timeFormat('%Y-%m');
  const months = timeMonth
    .range(dateList[0], utcMonth.ceil(dateList[1]))
    .map((d) => formatTime(d));

  // y좌표
  const yScale = scaleLinear().domain(priceList).range([300, 100]).nice();

  const yDomain = yScale.domain();
  const yOffset = (yDomain[1] - yDomain[0]) / 3;
  const yTicks = range(yDomain[0], yDomain[1] + yOffset, yOffset);

  useEffect(() => {
    const svgElem = select(svgRef.current);

    svgElem
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#1CA885')
      .attr('stroke-width', 4)
      .attr(
        'd',
        line(
          (d: DataType) => xScale(new Date(d.date)),
          (d: DataType) => yScale(d.price)
        )
      );
  }, [xScale, yScale]);

  return (
    <>
      <svg ref={svgRef} width={500} height={500}>
        <g>
          {yTicks.map((value) => (
            <g
              key={value}
              transform={`translate(0, ${yScale(value)})`}
              style={{ dominantBaseline: 'middle' }}
            >
              <line x1={100} x2={422} stroke="#EDEDED" />
              <text
                style={{
                  fontSize: '10px',
                  textAnchor: 'middle',
                  transform: 'translateX(80px)',
                  fill: '#656565',
                }}
              >
                {parseFloat((value * 0.0001).toFixed(1)) + '억'}
              </text>
            </g>
          ))}
        </g>

        <CustomAxis
          list={months}
          range={[100, 422]}
          height={400}
          groupWidth={322 / months.length}
        />
      </svg>
    </>
  );
};

export default MultiLineChart;
