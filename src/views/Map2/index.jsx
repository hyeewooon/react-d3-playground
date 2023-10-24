import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

// import data from "../../static/korea_202302.json";
import data from "../../static/korea.json";

const Map = () => {
  const ref = useRef(null);

  const printGeo = () => {
    const svgElem = select(ref.current);

    const width = 500;
    const height = 500;

    const geoData = feature(data, data.objects["korea-topo"]);

    const projection = geoMercator().scale(1).translate([0, 0]);
    const path = geoPath().projection(projection);
    const bounds = path.bounds(geoData);

    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.9 / Math.max(dx / width, dy / height);
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    projection.scale(scale).translate(translate);

    const map = svgElem.append("g");

    map
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "#e9e9e9")
      .attr("stroke", "#1CA885");
  };

  useEffect(() => {
    printGeo();
  }, []);

  return (
    <>
      <svg ref={ref} width={500} height={500}></svg>
    </>
  );
};

export default Map;
