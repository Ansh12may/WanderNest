const autoListings = [
  {
    title: "Luxury Studio in Delhi NCR",
    description: "Modern studio apartment ideal for business travelers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Delhi",
    country: "India",
  },
  {
    title: "Heritage Stay in Jodhpur",
    description: "Experience royal Rajasthani hospitality in a heritage home.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Jodhpur",
    country: "India",
  },
  {
    title: "Hill View Apartment in Dehradun",
    description: "Quiet apartment with panoramic Himalayan foothill views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Dehradun",
    country: "India",
  },
  {
    title: "Lakefront Villa in Nainital",
    description: "Premium villa overlooking Naini Lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Nainital",
    country: "India",
  },
  {
    title: "Eco Stay in Wayanad",
    description: "Nature-friendly stay surrounded by forests and wildlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Wayanad",
    country: "India",
  },

  // ---------- REPEAT PATTERN (auto-generated style) ----------

  {
    title: "Luxury Condo in Pune",
    description: "High-rise condo with city skyline views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Pune",
    country: "India",
  },
  {
    title: "Beachside Apartment in Pondicherry",
    description: "French-style apartment near the beach promenade.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Pondicherry",
    country: "India",
  },
  {
    title: "Mountain Cabin in Tawang",
    description: "Remote cabin with breathtaking mountain scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517821099606-cef63a9bb4d6?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Tawang",
    country: "India",
  },
  {
    title: "Urban Loft in Hyderabad",
    description: "Stylish loft in the IT corridor.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Hyderabad",
    country: "India",
  },
  {
    title: "Farm Stay near Nashik",
    description: "Relaxing vineyard-side farmhouse experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Nashik",
    country: "India",
  },

  // ---------- INTERNATIONAL (few) ----------

  {
    title: "City Apartment in Singapore",
    description: "Centrally located apartment with modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Downtown Condo in Dubai Marina",
    description: "Luxury condo with marina views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Beach Villa in Sri Lanka",
    description: "Private villa overlooking the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Galle",
    country: "Sri Lanka",
  },

  {
    title: "River View Homestay in Haridwar",
    description: "Peaceful homestay overlooking the Ganga river.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1583591900414-7031eb309cb6?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Haridwar",
    country: "India",
  },
  {
    title: "Luxury Villa in Noida",
    description: "Spacious villa with private lawn and modern interiors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Noida",
    country: "India",
  },
  {
    title: "Hill Cottage in Mussoorie",
    description: "Quiet cottage with valley and mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Mussoorie",
    country: "India",
  },
  {
    title: "City Apartment in Indore",
    description: "Comfortable apartment in the cleanest city of India.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Indore",
    country: "India",
  },
  {
    title: "Lake View Villa in Bhopal",
    description: "Premium villa overlooking Upper Lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Bhopal",
    country: "India",
  },
  {
    title: "Beach Resort Stay in Gokarna",
    description: "Laid-back beach stay with sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Gokarna",
    country: "India",
  },
  {
    title: "Coffee Estate Stay in Chikmagalur",
    description: "Relax among lush coffee plantations.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Chikmagalur",
    country: "India",
  },
  {
    title: "Urban Stay in Gurugram",
    description: "Modern high-rise apartment near business hubs.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Gurugram",
    country: "India",
  },
  {
    title: "Temple Town Stay in Madurai",
    description: "Traditional stay near Meenakshi Temple.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Madurai",
    country: "India",
  },
  {
    title: "Seaside Apartment in Vizag",
    description: "Apartment with direct sea breeze and views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Visakhapatnam",
    country: "India",
  },

  /* ---- International ---- */

  {
    title: "City Condo in Kuala Lumpur",
    description: "High-rise condo near Petronas Towers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Kuala Lumpur",
    country: "Malaysia",
  },
  {
    title: "Beach Villa in Phuket",
    description: "Private beach villa with infinity pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "City Apartment in Bangkok",
    description: "Modern apartment close to nightlife and markets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Bangkok",
    country: "Thailand",
  },
  {
    title: "Mountain Stay in Pokhara",
    description: "Lake and mountain views near Annapurna range.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517821099606-cef63a9bb4d6?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Pokhara",
    country: "Nepal",
  },
  {
    title: "City Stay in Colombo",
    description: "Central apartment close to shopping districts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Colombo",
    country: "Sri Lanka",
  },
];




module.exports = { autoListings };
