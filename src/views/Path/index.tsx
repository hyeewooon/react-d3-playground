import { path, type Path } from 'd3-path';

const DrawPath = () => {
  function draw(context: Path) {
    context.moveTo(30, 30);
    context.lineTo(130, 30);

    return context;
  }

  return (
    <>
      <svg width={500} height={500}>
        <g>
          <path d={`${draw(path())}`} stroke="blue" strokeWidth={2} />
        </g>
      </svg>
    </>
  );
};

export default DrawPath;
