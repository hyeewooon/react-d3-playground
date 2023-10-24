import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, Polygon, MultiPolygon } from "geojson";

import data from "../../static/korea_202302.json";

interface DataType extends Topology<{ counties: GeometryCollection }> {}

const Map: React.FC = () => {
  const ref = useRef(null);

  const getGeoJsonData = () => {
    const geojson = feature(
      data as DataType,
      data.objects.counties as GeometryCollection
    ).features;

    return geojson;
  };

  const printGeo = () => {
    const svgElem = select(ref.current);

    const width = 500;
    const height = 500;

    const geoData = getGeoJsonData();

    const projection = geoMercator().scale(1).translate([0, 0]);
    const path = geoPath().projection(projection);
    const bounds = path.bounds(geoData as any);

    console.log(bounds);

    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = 0.9 / Math.max(dx / width, dy / height);
    const translate: [number, number] = [
      width / 2 - scale * x,
      height / 2 - scale * y,
    ];

    projection.scale(scale).translate(translate);

    // const map = svgElem.append("g");
  };

  useEffect(() => {
    printGeo();
  }, []);

  return <div>{/* <svg ref={ref} width={500} height={500}></svg> */}</div>;
};

export default Map;
