export class searchBike {
  static findBike(zipCode, distance) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=1&location=${zipCode}&distance=${distance}&stolenness=proximity`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}