import { api } from "./api.js";

const createPlaceObjArray = (data) => {
  const places = [];
  data.features.forEach((place) => {
    let address = place.place_name.split(",")[1];
    places.push({
      lon: place.center[1],
      lat: place.center[0],
      name: place.place_name.split(",")[0],
      address: address,
    });
  });

  return places;
};

const renderPlaceHTML = (elementId, placeList) => {
  placeList.forEach((place) => {
    const element = document.querySelector(elementId);
    const { lon, lat, name, address } = place;
    element.insertAdjacentHTML(
      "beforeend",
      `<li data-long="${lon}" data-lat="${lat}">
                        <div class="name">${name}</div>
                        <div>${address}</div>
                        </li>`
    );
  });
};

export const getPlaces = (elementId, place) => {
  fetch(
    `${api.mapbox.url}${place}.json?access_token=${api.mapbox.key}&bbox=-97.32972,49.762789,-96.951241,49.994007&proximity=-97.1535, 49.8179`
  )
    .then((response) => response.json())
    .then((data) => {
      renderPlaceHTML(elementId, createPlaceObjArray(data));
    });
};
