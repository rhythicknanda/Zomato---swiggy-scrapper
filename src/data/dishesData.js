export const DISHES_DATABASE = [
  {
    id: "paneer-butter-masala-1",
    name: "Paneer Butter Masala",
    category: "North Indian",
    isVeg: true,
    restaurant: "Haldiram's",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    description: "Cubes of fresh cottage cheese simmered in a rich tomato, butter and cashew cream gravy.",
    platforms: {
      swiggy: {
        basePrice: 280,
        packagingFee: 25,
        deliveryFee: 35,
        discount: 50,
        finalPrice: 290,
        couponCode: "SWIGGYIT",
        deliveryTime: "30 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 295,
        packagingFee: 30,
        deliveryFee: 40,
        discount: 20,
        finalPrice: 345,
        couponCode: "ZOMATO50",
        deliveryTime: "35 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 260,
        packagingFee: 15,
        deliveryFee: 0,
        discount: 30,
        finalPrice: 245,
        couponCode: "OWNLYDIRECT",
        deliveryTime: "25 mins",
        url: "https://ownly.store"
      }
    }
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
    platforms: {
      swiggy: {
        basePrice: 390,
        packagingFee: 35,
        deliveryFee: 45,
        discount: 80,
        finalPrice: 390,
        couponCode: "WELCOME20",
        deliveryTime: "28 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 380,
        packagingFee: 35,
        deliveryFee: 50,
        discount: 100,
        finalPrice: 365,
        couponCode: "BIRYANIFEST",
        deliveryTime: "32 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 350,
        packagingFee: 20,
        deliveryFee: 25,
        discount: 50,
        finalPrice: 345,
        couponCode: "BEHROUZDIRECT",
        deliveryTime: "25 mins",
        url: "https://ownly.store"
      }
    }
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
    platforms: {
      swiggy: {
        basePrice: 459,
        packagingFee: 20,
        deliveryFee: 40,
        discount: 60,
        finalPrice: 459,
        couponCode: "PIZZAMANIA",
        deliveryTime: "25 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 459,
        packagingFee: 20,
        deliveryFee: 40,
        discount: 120,
        finalPrice: 399,
        couponCode: "DOMINOSZOM",
        deliveryTime: "22 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 420,
        packagingFee: 0,
        deliveryFee: 0,
        discount: 40,
        finalPrice: 380,
        couponCode: "DOMINOSAPP",
        deliveryTime: "20 mins",
        url: "https://ownly.store"
      }
    }
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
    platforms: {
      swiggy: {
        basePrice: 249,
        packagingFee: 20,
        deliveryFee: 35,
        discount: 40,
        finalPrice: 264,
        couponCode: "WHOPPERLOVE",
        deliveryTime: "30 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 249,
        packagingFee: 25,
        deliveryFee: 35,
        discount: 60,
        finalPrice: 249,
        couponCode: "BKDEAL",
        deliveryTime: "28 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 229,
        packagingFee: 10,
        deliveryFee: 15,
        discount: 30,
        finalPrice: 224,
        couponCode: "BKDIRECT",
        deliveryTime: "24 mins",
        url: "https://ownly.store"
      }
    }
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
    platforms: {
      swiggy: {
        basePrice: 160,
        packagingFee: 15,
        deliveryFee: 30,
        discount: 30,
        finalPrice: 175,
        couponCode: "MOMOMANIA",
        deliveryTime: "20 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 170,
        packagingFee: 20,
        deliveryFee: 35,
        discount: 50,
        finalPrice: 175,
        couponCode: "WOWZOMATO",
        deliveryTime: "24 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 140,
        packagingFee: 10,
        deliveryFee: 0,
        discount: 20,
        finalPrice: 130,
        couponCode: "WOWDIRECT",
        deliveryTime: "18 mins",
        url: "https://ownly.store"
      }
    }
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
    platforms: {
      swiggy: {
        basePrice: 320,
        packagingFee: 25,
        deliveryFee: 35,
        discount: 70,
        finalPrice: 310,
        couponCode: "SWIGGYDELIGHT",
        deliveryTime: "30 mins",
        url: "https://www.swiggy.com"
      },
      zomato: {
        basePrice: 310,
        packagingFee: 25,
        deliveryFee: 40,
        discount: 40,
        finalPrice: 335,
        couponCode: "ZOMATOGOLD",
        deliveryTime: "32 mins",
        url: "https://www.zomato.com"
      },
      ownly: {
        basePrice: 280,
        packagingFee: 15,
        deliveryFee: 20,
        discount: 30,
        finalPrice: 285,
        couponCode: "BIKANERDIRECT",
        deliveryTime: "25 mins",
        url: "https://ownly.store"
      }
    }
  }
];

export const CATEGORIES = [
  "All",
  "North Indian",
  "Biryani",
  "Pizza",
  "Fast Food",
  "Chinese"
];
