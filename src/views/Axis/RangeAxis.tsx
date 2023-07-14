import { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';
import { path, type Path } from 'd3-path';

interface Settings {
  domain: [number, number];
  range: [number, number];
}

const RangeAxis: React.FC<Settings> = ({ domain, range }) => {
  const yTicks = useMemo(() => {
    const yScale = scaleLinear().domain(domain).range(range);

    return yScale.ticks().map((v: number) => ({
      value: v,
      yOffset: yScale(v),
    }));
  }, [domain, range]);

  const drawPath = (context: Path) => {
    context.moveTo(40, range[0]);
    context.lineTo(40, range[1]);

    return context;
  };

  return (
    <>
      <g>
        <path d={`${drawPath(path())}`} stroke="black" />

        {yTicks.map(({ value, yOffset }) => (
          <g
            key={value}
            transform={`translate(0, ${yOffset})`}
            style={{ dominantBaseline: 'middle' }}
          >
            <line x1={40} x2={34} stroke="black" />
            <text
              style={{
                fontSize: '10px',
                textAnchor: 'middle',
                transform: 'translateX(20px)',
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </>
  );
};

export default RangeAxis;
