/******************************************************
 *  House‑Price Prediction Front‑End Script
 *  – Works on both localhost (127.0.0.1:5000) and
 *    production (https://bhp-mlproject-1.onrender.com)
 ******************************************************/

/* ----------  Utility helpers  ---------- */

function getBathValue() {
  const bathSelect = document.getElementById("bath");
  return parseInt(bathSelect.value) || -1;
}

function getBHKValue() {
  const bhkSelect = document.getElementById("bhk");
  return parseInt(bhkSelect.value) || -1;
}

/* ----------  Load locations on page load  ---------- */

function onPageLoad() {
  console.log("Page loaded – fetching location names …");

  fetch("/get_location_names")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched locations:", data);

      const uiLocations = document.getElementById("uiLocations");
      uiLocations.innerHTML = '<option value="">Select Location</option>';

      if (data && data.locations) {
        data.locations.forEach(loc => {
          const opt = document.createElement("option");
          opt.value = loc;
          opt.textContent = loc;
          uiLocations.appendChild(opt);
        });
        console.log(`Loaded ${data.locations.length} locations ✅`);
      } else {
        throw new Error("No locations data received");
      }
    })
    .catch(err => {
      console.error("Failed to load locations:", err);

      /* fallback list if API call fails */
      const fallback = [
        "Whitefield",
        "Koramangala",
        "Indiranagar",
        "Jayanagar",
        "Marathahalli"
      ];
      const uiLocations = document.getElementById("uiLocations");
      uiLocations.innerHTML = '<option value="">Select Location (Fallback)</option>';
      fallback.forEach(loc => {
        const opt = document.createElement("option");
        opt.value = loc;
        opt.textContent = loc;
        uiLocations.appendChild(opt);
      });
    });
}

/* ----------  Validate form  ---------- */

function validateForm() {
  let isValid = true;

  /* hide previous errors */
  document.querySelectorAll(".error").forEach(e => (e.style.display = "none"));

  const area = document.getElementById("area");
  if (!area.value || area.value < 100 || area.value > 10000) {
    document.getElementById("areaError").style.display = "block";
    isValid = false;
  }

  if (getBHKValue() === -1) {
    document.getElementById("bhkError").style.display = "block";
    isValid = false;
  }

  if (getBathValue() === -1) {
    document.getElementById("bathError").style.display = "block";
    isValid = false;
  }

  const location = document.getElementById("uiLocations");
  if (!location.value) {
    document.getElementById("locationError").style.display = "block";
    isValid = false;
  }

  return isValid;
}

/* ----------  Submit form & get prediction  ---------- */

function onClickEstimatePrice() {
  console.log("Estimate button clicked");

  if (!validateForm()) return;

  const sqft = parseFloat(document.getElementById("area").value);
  const bhk = getBHKValue();
  const bath = getBathValue();
  const location = document.getElementById("uiLocations").value;

  /* show loader */
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  loading.style.display = "block";
  result.style.display = "none";

  fetch("/predict_home_price", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      total_sqft: sqft,
      bhk: bhk,
      bath: bath,
      location: location
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Prediction:", data);
      loading.style.display = "none";
      result.style.display = "block";
      document.getElementById("predictedPrice").textContent =
        "₹ " + data.estimated_price + " Lakh";
    })
    .catch(err => {
      loading.style.display = "none";
      console.error("Prediction failed:", err);
      alert("Sorry – server error while predicting price.");
    });
}

/* ----------  Event listeners  ---------- */

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  onPageLoad();

  const form = document.getElementById("predictionForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      onClickEstimatePrice();
    });
  }
});

/* fallback: retry location load after short delay */
window.onload = () => {
  setTimeout(() => {
    if (document.getElementById("uiLocations").options.length <= 1) {
      console.log("Retrying location fetch …");
      onPageLoad();
    }
  }, 500);
};
