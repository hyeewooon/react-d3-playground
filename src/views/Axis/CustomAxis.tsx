interface Settings {
  list: (number | string)[];
  range: number[];
  height: number;
  groupWidth: number;
}

const CustomAxis: React.FC<Settings> = ({
  list,
  range,
  height,
  groupWidth,
}) => {
  return (
    <g>
      <path
        d={['M', range[0], height, 'H', range[1]].join(' ')}
        stroke="black"
      />

      {list.map((value, index) => (
        <g
          key={value}
          transform={`translate(${groupWidth * (index + 1)}, ${height})`}
          style={{ dominantBaseline: 'middle' }}
        >
          <line y1={0} y2={6} stroke="black" />
          <text
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(14px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

export default CustomAxis;
