import { useMemo } from 'react';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import { max, group } from 'd3-array';

import RangeAxis from 'views/Axis/RangeAxis';
import CustomAxis from 'views/Axis/CustomAxis';

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

const ReactGroupedBar: React.FC = () => {
  const width = 300;
  const height = 500;
  const marginTop = 20;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // date
  const groups = useMemo(() => {
    const set = new Set(data.map((d) => d.date));
    return Array.from(set).sort();
  }, []);
  // name
  const subGroup = useMemo(() => {
    const set = new Set(data.map((d) => d.name));
    return Array.from(set).sort();
  }, []);

  const dateMap = group(data, (d) => d.date);

  const colorPalette = scaleOrdinal<string, string>()
    .domain(subGroup)
    .range(['#b4e1a4', '#cce54c', '#e3e84b', '#ddcf56']);

  const xScale = scaleBand()
    .domain(groups)
    .rangeRound([marginLeft, width - marginRight])
    .paddingInner(0.1);

  const bandScale = scaleBand()
    .domain(subGroup)
    .rangeRound([0, xScale.bandwidth()])
    .padding(0.05);

  const yScale = scaleLinear()
    .domain([0, max(data.map((v) => v.trade)) ?? 0])
    .nice()
    .rangeRound([height - marginBottom, marginTop]);

  return (
    <svg width={width} height={height}>
      <g>
        {groups.map((v, i) => (
          <g key={v} transform={`translate(${xScale(v)}, 0)`}>
            {dateMap.get(groups[i])?.map((v, i) => (
              <rect
                key={v.name}
                x={bandScale(v.name)}
                y={yScale(v.trade)}
                width={bandScale.bandwidth()}
                height={yScale(0) - yScale(v.trade)}
                fill={colorPalette(v.name)}
              ></rect>
            ))}
          </g>
        ))}
      </g>

      <RangeAxis
        domain={[0, max(data.map((v) => v.trade)) ?? 0]}
        range={[height - marginBottom, marginTop]}
      />

      <CustomAxis
        list={groups}
        range={[marginLeft, width]}
        height={height - marginBottom}
        groupWidth={xScale.bandwidth()}
      />
    </svg>
  );
};

export default ReactGroupedBar;
