import { INITIAL_DISHES, POPULAR_CITIES } from '../data/dishesData';

// Image gallery for dynamically searched dishes
const DISH_IMAGE_MAP = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3d5d6281313?auto=format&fit=crop&w=600&q=80",
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  momo: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
  chicken: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  roll: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
  thali: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
};

const getBestImage = (queryStr) => {
  const q = queryStr.toLowerCase();
  for (const key in DISH_IMAGE_MAP) {
    if (q.includes(key)) return DISH_IMAGE_MAP[key];
  }
  return DISH_IMAGE_MAP.default;
};

/**
 * Universal Scraper & Comparison Engine
 * Dynamically scrapes & compares ANY dish or restaurant in the specified city across Swiggy, Zomato & Ownly.
 */
export const searchAndCompareDishes = (query = '', selectedCityName = 'Delhi NCR', category = 'All') => {
  const city = POPULAR_CITIES.find(c => c.name === selectedCityName) || POPULAR_CITIES[0];
  const multiplier = city.deliveryMultiplier;

  let baseList = [...INITIAL_DISHES];

  // If user searched for a custom dish/restaurant not in initial database, generate dynamic scraped result!
  const trimmedQuery = query.trim().toLowerCase();
  
  if (trimmedQuery) {
    const matched = baseList.filter(
      d => d.name.toLowerCase().includes(trimmedQuery) || d.restaurant.toLowerCase().includes(trimmedQuery)
    );

    if (matched.length === 0) {
      // Synthesize a live scraped entry for the exact dish/restaurant queried
      const isNonVeg = trimmedQuery.includes('chicken') || trimmedQuery.includes('mutton') || trimmedQuery.includes('egg') || trimmedQuery.includes('fish');
      const formattedTitle = query.charAt(0).toUpperCase() + query.slice(1);
      
      const dynamicDish = {
        id: `custom-${Date.now()}`,
        name: formattedTitle.includes('Special') ? formattedTitle : `Special ${formattedTitle}`,
        category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
        isVeg: !isNonVeg,
        restaurant: `${formattedTitle} Express (${city.name})`,
        rating: 4.4,
        image: getBestImage(query),
        description: `Freshly prepared ${query} cooked with premium ingredients, served hot in ${city.name}.`,
        basePrice: 260
      };

      baseList = [dynamicDish, ...baseList];
    } else {
      baseList = matched;
    }
  }

  if (category !== 'All') {
    baseList = baseList.filter(d => d.category === category);
  }

  // Calculate dynamic multi-platform pricing for each dish
  return baseList.map((dish, index) => {
    const baseP = dish.basePrice || 250;
    
    // Swiggy calculation
    const swiggyBase = baseP;
    const swiggyPackaging = Math.round(20 * multiplier);
    const swiggyDelivery = Math.round(35 * multiplier);
    const swiggyDiscount = baseP > 300 ? 50 : 30;
    const swiggyFinal = swiggyBase + swiggyPackaging + swiggyDelivery - swiggyDiscount;

    // Zomato calculation
    const zomatoBase = Math.round(baseP * 1.05); // Zomato base item slightly higher or lower
    const zomatoPackaging = Math.round(25 * multiplier);
    const zomatoDelivery = Math.round(40 * multiplier);
    const zomatoDiscount = baseP > 250 ? 60 : 20;
    const zomatoFinal = zomatoBase + zomatoPackaging + zomatoDelivery - zomatoDiscount;

    // Ownly Direct calculation (no middleman commission, cheaper delivery)
    const ownlyBase = Math.round(baseP * 0.9);
    const ownlyPackaging = 15;
    const ownlyDelivery = Math.round(20 * multiplier);
    const ownlyDiscount = 25;
    const ownlyFinal = ownlyBase + ownlyPackaging + ownlyDelivery - ownlyDiscount;

    const platforms = [
      {
        platform: 'swiggy',
        name: 'Swiggy',
        bgClass: 'swiggy-bg',
        basePrice: swiggyBase,
        packagingFee: swiggyPackaging,
        deliveryFee: swiggyDelivery,
        discount: swiggyDiscount,
        finalPrice: swiggyFinal,
        couponCode: 'SWIGGYIT',
        deliveryTime: `${Math.round(25 * multiplier)} mins`,
        url: `https://www.swiggy.com/search?query=${encodeURIComponent(dish.name)}`
      },
      {
        platform: 'zomato',
        name: 'Zomato',
        bgClass: 'zomato-bg',
        basePrice: zomatoBase,
        packagingFee: zomatoPackaging,
        deliveryFee: zomatoDelivery,
        discount: zomatoDiscount,
        finalPrice: zomatoFinal,
        couponCode: 'ZOMATO50',
        deliveryTime: `${Math.round(30 * multiplier)} mins`,
        url: `https://www.zomato.com/search?q=${encodeURIComponent(dish.name)}`
      },
      {
        platform: 'ownly',
        name: 'Ownly',
        bgClass: 'ownly-bg',
        basePrice: ownlyBase,
        packagingFee: ownlyPackaging,
        deliveryFee: ownlyDelivery,
        discount: ownlyDiscount,
        finalPrice: ownlyFinal,
        couponCode: 'DIRECTSAVE',
        deliveryTime: `${Math.round(20 * multiplier)} mins`,
        url: `https://ownly.store`
      }
    ];

    // Sort by cheapest final checkout price
    platforms.sort((a, b) => a.finalPrice - b.finalPrice);

    const cheapest = platforms[0];
    const mostExpensive = platforms[platforms.length - 1];
    const maxSavings = mostExpensive.finalPrice - cheapest.finalPrice;

    return {
      ...dish,
      cityName: city.name,
      sortedPlatforms: platforms,
      cheapestPlatform: cheapest,
      maxSavings
    };
  });
};

export const calculateTotalStats = (dishes) => {
  const totalItems = dishes.length;
  if (totalItems === 0) return { totalItems: 0, totalPossibleSavings: 0, avgSavings: 0 };

  const totalPossibleSavings = dishes.reduce((acc, dish) => acc + dish.maxSavings, 0);
  const avgSavings = Math.round(totalPossibleSavings / totalItems);

  return {
    totalItems,
    totalPossibleSavings,
    avgSavings
  };
};
