// Defensive checks (prevents silent crashes)
if (
  typeof maplibregl === "undefined" ||
  typeof MAPTILER_KEY === "undefined" ||
  typeof listingData === "undefined"
) {
  console.error("Map initialization failed: missing dependencies");
} else {
  // Initialize map
  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    center: [listingData.lng, listingData.lat],
    zoom: 13
  });

  // Add zoom & rotation controls
  map.addControl(new maplibregl.NavigationControl(), "top-right");

  // Create popup
  const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
    <strong>${listingData.title}</strong><br/>
    ₹${listingData.price.toLocaleString("en-IN")} / night
  `);

  // Add marker
  new maplibregl.Marker({ color: "#ff385c" })
    .setLngLat([listingData.lng, listingData.lat])
    .setPopup(popup)
    .addTo(map);
}



