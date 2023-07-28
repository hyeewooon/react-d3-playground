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
        stroke="#EDEDED"
      />

      <g transform={`translate(${range[0]}, 0)`}>
        {list.map((value, index) => (
          <g
            key={value}
            transform={`translate(${
              groupWidth * (index + 1) - groupWidth / 2
            }, ${height})`}
            style={{ dominantBaseline: 'middle' }}
          >
            {/* <line y1={0} y2={6} stroke="black" /> */}
            <text
              style={{
                fontSize: '14px',
                fontWeight: '400',
                textAnchor: 'middle',
                transform: 'translateY(14px)',
                fill: '#656565',
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
};

export default CustomAxis;
