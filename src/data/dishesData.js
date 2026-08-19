export const POPULAR_CITIES = [
  { id: "delhi", name: "Delhi NCR", deliveryMultiplier: 1.0, localities: ["Connaught Place", "Pandara Road", "Saket", "Daryaganj", "Rajouri Garden"] },
  { id: "mumbai", name: "Mumbai", deliveryMultiplier: 1.15, localities: ["Bandra", "Andheri West", "Juhu", "Powai", "Colaba"] },
  { id: "bengaluru", name: "Bengaluru", deliveryMultiplier: 1.1, localities: ["Indiranagar", "Koramangala", "HSR Layout", "MG Road", "Whitefield"] },
  { id: "hyderabad", name: "Hyderabad", deliveryMultiplier: 0.95, localities: ["Banjara Hills", "Gachibowli", "Jubilee Hills", "Charminar", "Secunderabad"] },
  { id: "pune", name: "Pune", deliveryMultiplier: 0.9, localities: ["Koregaon Park", "Viman Nagar", "Kothrud", "FC Road"] },
  { id: "chennai", name: "Chennai", deliveryMultiplier: 0.95, localities: ["T. Nagar", "Nungambakkam", "Adyar", "Velachery"] },
  { id: "kolkata", name: "Kolkata", deliveryMultiplier: 0.85, localities: ["Park Street", "Salt Lake", "Ballygunge", "New Town"] },
  { id: "jaipur", name: "Jaipur", deliveryMultiplier: 0.8, localities: ["C-Scheme", "Malviya Nagar", "Raja Park"] },
  { id: "chandigarh", name: "Chandigarh", deliveryMultiplier: 0.85, localities: ["Sector 17", "Sector 35", "Elante Mall"] }
];

export const COMPREHENSIVE_RESTAURANTS_DB = [
  // BUTTER CHICKEN & NORTH INDIAN (Delhi & National)
  {
    dishName: "Butter Chicken",
    category: "North Indian",
    isVeg: false,
    restaurant: "Gulati Restaurant",
    locality: "Pandara Road",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Legendary tender chicken tikka in rich cashew tomato butter gravy.",
    basePrice: 480,
    distanceKm: 3.2
  },
  {
    dishName: "Butter Chicken",
    category: "North Indian",
    isVeg: false,
    restaurant: "Moti Mahal Delux",
    locality: "Daryaganj",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Original recipe butter chicken invented in 1947, creamy & mildly spicy.",
    basePrice: 420,
    distanceKm: 4.5
  },
  {
    dishName: "Butter Chicken",
    category: "North Indian",
    isVeg: false,
    restaurant: "Havemore",
    locality: "Pandara Road",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Iconic North Indian butter chicken rich in pure white butter & spices.",
    basePrice: 510,
    distanceKm: 3.5
  },
  {
    dishName: "Butter Chicken",
    category: "North Indian",
    isVeg: false,
    restaurant: "Kake Da Hotel",
    locality: "Connaught Place",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Dhaba style spicy butter chicken packed with authentic flavors.",
    basePrice: 350,
    distanceKm: 2.1
  },
  {
    dishName: "Butter Chicken",
    category: "North Indian",
    isVeg: false,
    restaurant: "Punjab Grill",
    locality: "Saket / CyberHub",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Gourmet Murgh Makhani garnished with fresh coriander and ginger juliennes.",
    basePrice: 560,
    distanceKm: 5.8
  },

  // BIRYANI LISTINGS
  {
    dishName: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Bawarchi Biryani",
    locality: "RTC X Roads / City Center",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Authentic Dum Biryani with juicy chicken leg piece & fragrant basmati rice.",
    basePrice: 340,
    distanceKm: 2.8
  },
  {
    dishName: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Paradise Biryani",
    locality: "Secunderabad / Banjara Hills",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "World famous Hyderabadi biryani served with Mirchi Ka Salan & Raita.",
    basePrice: 370,
    distanceKm: 4.1
  },
  {
    dishName: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Behrouz Biryani",
    locality: "Koramangala / Indiranagar",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Royal recipe biryani spiced with saffron, cardamom and secret royal herbs.",
    basePrice: 395,
    distanceKm: 3.0
  },
  {
    dishName: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Biryani By Kilo (BBK)",
    locality: "HSR Layout / CP",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Freshly cooked individual Handi Biryani dum-cooked upon your order.",
    basePrice: 425,
    distanceKm: 3.6
  },
  {
    dishName: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Shah Ghouse Hotel",
    locality: "Charminar / Gachibowli",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Local Hyderabad favorite spicy chicken biryani loaded with masala.",
    basePrice: 320,
    distanceKm: 5.2
  },

  // PIZZA LISTINGS
  {
    dishName: "Paneer Pizza",
    category: "Pizza",
    isVeg: true,
    restaurant: "Domino's Pizza",
    locality: "Central City Outlet",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Peppy Paneer medium pizza loaded with spicy paneer, red paprika and 100% mozzarella.",
    basePrice: 459,
    distanceKm: 1.8
  },
  {
    dishName: "Paneer Pizza",
    category: "Pizza",
    isVeg: true,
    restaurant: "Pizza Hut",
    locality: "Express Outlet",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Pan Pizza with spiced cottage cheese cubes, green capsicum & onion.",
    basePrice: 429,
    distanceKm: 2.4
  },
  {
    dishName: "Paneer Pizza",
    category: "Pizza",
    isVeg: true,
    restaurant: "La Pino'z Pizza",
    locality: "High Street",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Korma Paneer special giant slice with customized cheese blend.",
    basePrice: 379,
    distanceKm: 3.1
  },
  {
    dishName: "Paneer Pizza",
    category: "Pizza",
    isVeg: true,
    restaurant: "Ovenstory Pizza",
    locality: "Cloud Kitchen",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "4-Cheese Margherita Paneer Supreme with signature Peri Peri cheese base.",
    basePrice: 399,
    distanceKm: 2.9
  },

  // BURGER LISTINGS
  {
    dishName: "Burger Combo",
    category: "Fast Food",
    isVeg: true,
    restaurant: "Burger King",
    locality: "Mall Outlet",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Veg Whopper with crispy patty, mayo, lettuce, tomatoes + Fries & Drink.",
    basePrice: 249,
    distanceKm: 2.0
  },
  {
    dishName: "Burger Combo",
    category: "Fast Food",
    isVeg: true,
    restaurant: "McDonald's",
    locality: "Drive-Thru",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "McSpicy Paneer Burger Meal with medium peri peri fries & Coke.",
    basePrice: 275,
    distanceKm: 1.5
  },
  {
    dishName: "Burger Combo",
    category: "Fast Food",
    isVeg: true,
    restaurant: "Boss Burger",
    locality: "Cloud Kitchen",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Gourmet Truffle Mushroom & Cheese Burger with seasoned wedges.",
    basePrice: 349,
    distanceKm: 3.8
  },

  // PANEER BUTTER MASALA (VEG)
  {
    dishName: "Paneer Butter Masala",
    category: "North Indian",
    isVeg: true,
    restaurant: "Haldiram's",
    locality: "Main Market",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Soft cottage cheese in mildly sweet & tangy rich tomato gravy.",
    basePrice: 280,
    distanceKm: 2.2
  },
  {
    dishName: "Paneer Butter Masala",
    category: "North Indian",
    isVeg: true,
    restaurant: "Bikanervala",
    locality: "City Center",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Rich Punjabi style Shahi Paneer Butter Masala made with pure ghee.",
    basePrice: 295,
    distanceKm: 2.7
  },
  {
    dishName: "Paneer Butter Masala",
    category: "North Indian",
    isVeg: true,
    restaurant: "Sagar Ratna",
    locality: "Commercial Hub",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Creamy butter paneer gravy cooked with aromatic spices.",
    basePrice: 270,
    distanceKm: 1.9
  }
];

export const CATEGORIES = [
  "All",
  "North Indian",
  "Biryani",
  "Pizza",
  "Fast Food",
  "Chinese",
  "Desserts"
];
