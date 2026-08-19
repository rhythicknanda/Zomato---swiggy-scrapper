export const POPULAR_CITIES = [
  { id: "delhi", name: "Delhi NCR", deliveryMultiplier: 1.0 },
  { id: "mumbai", name: "Mumbai", deliveryMultiplier: 1.15 },
  { id: "bengaluru", name: "Bengaluru", deliveryMultiplier: 1.1 },
  { id: "hyderabad", name: "Hyderabad", deliveryMultiplier: 0.95 },
  { id: "pune", name: "Pune", deliveryMultiplier: 0.9 },
  { id: "chennai", name: "Chennai", deliveryMultiplier: 0.95 },
  { id: "kolkata", name: "Kolkata", deliveryMultiplier: 0.85 },
  { id: "jaipur", name: "Jaipur", deliveryMultiplier: 0.8 },
  { id: "chandigarh", name: "Chandigarh", deliveryMultiplier: 0.85 }
];

export const INITIAL_DISHES = [
  {
    id: "paneer-butter-masala-1",
    name: "Paneer Butter Masala",
    category: "North Indian",
    isVeg: true,
    restaurant: "Haldiram's",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Cubes of fresh cottage cheese simmered in a rich tomato, butter and cashew cream gravy.",
    basePrice: 280
  },
  {
    id: "chicken-biryani-1",
    name: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    isVeg: false,
    restaurant: "Behrouz Biryani",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Fragrant basmati rice layered with juicy marinated chicken pieces cooked in authentic hyderabadi spices.",
    basePrice: 380
  },
  {
    id: "peppy-paneer-pizza-1",
    name: "Peppy Paneer Pizza (Medium)",
    category: "Pizza",
    isVeg: true,
    restaurant: "Domino's Pizza",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Chunky paneer, crisp capsicum & spicy red pepper with molten mozzarella cheese.",
    basePrice: 450
  },
  {
    id: "whopper-burger-1",
    name: "Veg Whopper Burger Combo",
    category: "Fast Food",
    isVeg: true,
    restaurant: "Burger King",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Signature flame-grilled plant patty burger with fries and cold drink.",
    basePrice: 240
  },
  {
    id: "steamed-momos-1",
    name: "Veg Steamed Momos (8 Pcs)",
    category: "Chinese",
    isVeg: true,
    restaurant: "WOW! Momo",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
    description: "Delicate dumplings filled with finely chopped vegetables and spicy chili chutney.",
    basePrice: 150
  },
  {
    id: "dal-makhani-1",
    name: "Dal Makhani with Butter Naan",
    category: "North Indian",
    isVeg: true,
    restaurant: "Bikanervala",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    description: "Slow-cooked black lentils in white butter and cream paired with hot butter garlic naan.",
    basePrice: 310
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
