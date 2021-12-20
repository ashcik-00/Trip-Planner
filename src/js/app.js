import { getPlaces } from "./modules/place.js";
import { getPlans } from "./modules/planner.js";

const originListEl = document.querySelector(".origins");
const originInputEl = document.querySelector(".origin-form");
const destinationListEl = document.querySelector(".destinations");
const destinationInputEl = document.querySelector(".destination-form");
const planButtonEl = document.querySelector(".plan-trip");
const planListEl = document.querySelector(".my-trip");
let selectedOriginEl;
let selectedDestinationEl;

const saveOrigin = (e) => {
  if (e.target.nodeName !== "UL") {
    if (e.target.nodeName === "DIV") {
      if (selectedOriginEl) {
        selectedOriginEl.classList.remove("selected");
      }
      selectedOriginEl = e.target.parentElement;
      selectedOriginEl.classList.add("selected");
    } else {
      if (selectedOriginEl) {
        selectedOriginEl.classList.remove("selected");
      }
      selectedOriginEl = e.target;
      selectedOriginEl.classList.add("selected");
    }
  }
};

const saveDestination = (e) => {
  if (e.target.nodeName !== "UL") {
    if (e.target.nodeName === "DIV") {
      if (selectedDestinationEl) {
        selectedDestinationEl.classList.remove("selected");
      }
      selectedDestinationEl = e.target.parentElement;
      selectedDestinationEl.classList.add("selected");
    } else {
      if (selectedDestinationEl) {
        selectedDestinationEl.classList.remove("selected");
      }
      selectedDestinationEl = e.target;
      selectedDestinationEl.classList.add("selected");
    }
  }
};

const getOriginPlaces = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    originListEl.innerHTML = "";
    getPlaces(".origins", e.target.value);
  }
};

const getDestinationPlaces = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    destinationListEl.innerHTML = "";
    getPlaces(".destinations", e.target.value);
  }
};

const getTripPlans = (e) => {
  if (
    typeof selectedOriginEl !== "undefined" &&
    typeof selectedDestinationEl !== "undefined"
  ) {
    planListEl.innerHTML = "";
    getPlans(
      selectedOriginEl.dataset.long,
      selectedOriginEl.dataset.lat,
      selectedDestinationEl.dataset.long,
      selectedDestinationEl.dataset.lat
    );
  }
};

originListEl.addEventListener("click", saveOrigin);
destinationListEl.addEventListener("click", saveDestination);
planButtonEl.addEventListener("click", getTripPlans);
originInputEl.addEventListener("keypress", getOriginPlaces);
destinationInputEl.addEventListener("keypress", getDestinationPlaces);
