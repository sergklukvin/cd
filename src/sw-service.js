export default class ServiseApi {
  dataUrl =
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1';
  key = '&api_key=DQNlQlc2PQmVH3ZMULq945tvpICd0TCDLLMdMrp4';

  async getPhotos(rover, sol, cam) {
    return await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${cam}${this.key}`
    )
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err.message));
  }
}
