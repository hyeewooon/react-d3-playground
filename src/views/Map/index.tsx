import { useEffect } from 'react';
import { geoMercator, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Polygon, MultiPolygon } from 'geojson';

import data from '../../static/korea_202302.json';

interface DataType extends Topology<{ counties: GeometryCollection }> {}

function getGeoJsonData(): Feature[] {
  const geojson = feature(
    data as DataType,
    data.objects.counties as GeometryCollection
  ).features;

  console.log(
    feature(data as DataType, data.objects.counties as GeometryCollection)
  );

  return geojson;
}

const Map = () => {
  const geoData = getGeoJsonData();

  useEffect(() => {
    console.log(geoData);
  }, [geoData]);

  return (
    <>
      <div>hi</div>
    </>
  );
};

export default Map;
