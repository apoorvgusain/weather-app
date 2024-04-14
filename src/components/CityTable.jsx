const CityTable = ({ cities }) => {
  //  console.log(cities);
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>ID</th>
          <th>City Name</th>
          <th>Country</th>
          <th>Timezone</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city, index) => (
          <tr key={city.geoname_id + index}>
            <td>{index}</td>
            <td>{city.geoname_id}</td>
            <td>
              <a href={`/weather/${city.geoname_id}`}>{city.name}</a>
            </td>
            <td>{city.cou_name_en}</td>
            <td>{city.timezone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CityTable;
