import { COMPREHENSIVE_RESTAURANTS_DB, POPULAR_CITIES } from '../data/dishesData';

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
 * Returns all restaurants in the city serving the searched dish or matching the filter options.
 */
export const searchAndCompareDishes = ({
  query = '',
  selectedCityName = 'Delhi NCR',
  category = 'All',
  isVegOnly = false,
  isNonVegOnly = false,
  isGoldMember = true,
  sortBy = 'cheapest', // cheapest, rating, deliveryTime, savings
  priceRange = 'all' // all, under250, 250to450, above450
}) => {
  const city = POPULAR_CITIES.find(c => c.name === selectedCityName) || POPULAR_CITIES[0];
  const multiplier = city.deliveryMultiplier;

  let matchedList = [...COMPREHENSIVE_RESTAURANTS_DB];
  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery) {
    // Check if matching predefined dish or restaurant
    const filtered = matchedList.filter(
      item =>
        item.dishName.toLowerCase().includes(trimmedQuery) ||
        item.restaurant.toLowerCase().includes(trimmedQuery) ||
        item.category.toLowerCase().includes(trimmedQuery)
    );

    if (filtered.length > 0) {
      matchedList = filtered;
    } else {
      // Generate 5 dynamic restaurants in this city serving this custom searched dish!
      const isNonVeg = trimmedQuery.includes('chicken') || trimmedQuery.includes('mutton') || trimmedQuery.includes('egg') || trimmedQuery.includes('fish') || trimmedQuery.includes('meat');
      const formattedTitle = query.charAt(0).toUpperCase() + query.slice(1);
      
      const dynamicRestaurants = [
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `${formattedTitle} Imperial`,
          locality: city.localities[0] || 'Central Area',
          rating: 4.7,
          image: getBestImage(query),
          description: `Signature authentic ${query} cooked with exotic spices & fresh ingredients.`,
          basePrice: 380,
          distanceKm: 2.5
        },
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `Royal ${formattedTitle} Kitchen`,
          locality: city.localities[1] || 'Main Hub',
          rating: 4.5,
          image: getBestImage(query),
          description: `Traditional style slow-cooked ${query} served hot with side dips.`,
          basePrice: 320,
          distanceKm: 3.8
        },
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `The ${formattedTitle} Co.`,
          locality: city.localities[2] || 'High Street',
          rating: 4.3,
          image: getBestImage(query),
          description: `Modern fusion ${query} crafted by top culinary chefs.`,
          basePrice: 420,
          distanceKm: 1.9
        },
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `Express ${formattedTitle} Corner`,
          locality: city.localities[3] || 'Market Place',
          rating: 4.2,
          image: getBestImage(query),
          description: `Budget friendly delicious ${query} delivered extra fast.`,
          basePrice: 240,
          distanceKm: 4.2
        }
      ];

      matchedList = dynamicRestaurants;
    }
  }

  // Filter by Category
  if (category !== 'All') {
    matchedList = matchedList.filter(item => item.category === category);
  }

  // Filter Veg / Non-Veg
  if (isVegOnly) {
    matchedList = matchedList.filter(item => item.isVeg === true);
  } else if (isNonVegOnly) {
    matchedList = matchedList.filter(item => item.isVeg === false);
  }

  // Calculate detailed multi-platform checkout prices
  let processed = matchedList.map(item => {
    const baseP = item.basePrice;

    // Platform convenience fee (Swiggy ₹6, Zomato ₹6)
    const platformFee = 6;

    // Distance based delivery fee
    const rawDeliveryFee = Math.round((25 + item.distanceKm * 6) * multiplier);

    // Swiggy Pricing
    const swiggyBase = baseP;
    const swiggyPackaging = Math.round(25 * multiplier);
    let swiggyDelivery = isGoldMember && baseP > 199 ? 0 : rawDeliveryFee;
    let swiggyDiscount = baseP > 350 ? 60 : 30;
    if (isGoldMember) swiggyDiscount += 20; // Extra Gold discount
    const swiggyFinal = swiggyBase + swiggyPackaging + swiggyDelivery + platformFee - swiggyDiscount;

    // Zomato Pricing
    const zomatoBase = Math.round(baseP * 0.98); // Zomato base competition pricing
    const zomatoPackaging = Math.round(20 * multiplier);
    let zomatoDelivery = isGoldMember && baseP > 199 ? 0 : rawDeliveryFee;
    let zomatoDiscount = baseP > 300 ? 70 : 40;
    if (isGoldMember) zomatoDiscount += 25; // Extra Zomato Gold discount
    const zomatoFinal = zomatoBase + zomatoPackaging + zomatoDelivery + platformFee - zomatoDiscount;

    // Ownly / Direct Restaurant Pricing (No platform commission, zero convenience fee!)
    const ownlyBase = Math.round(baseP * 0.88); // 12% lower base price (direct)
    const ownlyPackaging = 15;
    const ownlyDelivery = Math.round(rawDeliveryFee * 0.7); // Direct delivery cheaper
    const ownlyDiscount = 35;
    const ownlyFinal = ownlyBase + ownlyPackaging + ownlyDelivery - ownlyDiscount;

    const platforms = [
      {
        platform: 'swiggy',
        name: 'Swiggy',
        bgClass: 'swiggy-bg',
        basePrice: swiggyBase,
        packagingFee: swiggyPackaging,
        deliveryFee: swiggyDelivery,
        platformFee: platformFee,
        discount: swiggyDiscount,
        finalPrice: Math.max(50, swiggyFinal),
        couponCode: isGoldMember ? 'SWIGGYONE' : 'SWIGGYIT',
        deliveryTime: `${Math.round(20 + item.distanceKm * 3)} mins`,
        url: `https://www.swiggy.com/search?query=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`
      },
      {
        platform: 'zomato',
        name: 'Zomato',
        bgClass: 'zomato-bg',
        basePrice: zomatoBase,
        packagingFee: zomatoPackaging,
        deliveryFee: zomatoDelivery,
        platformFee: platformFee,
        discount: zomatoDiscount,
        finalPrice: Math.max(50, zomatoFinal),
        couponCode: isGoldMember ? 'ZOMATOGOLD' : 'ZOMATO50',
        deliveryTime: `${Math.round(22 + item.distanceKm * 3)} mins`,
        url: `https://www.zomato.com/search?q=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`
      },
      {
        platform: 'ownly',
        name: 'Ownly Direct',
        bgClass: 'ownly-bg',
        basePrice: ownlyBase,
        packagingFee: ownlyPackaging,
        deliveryFee: ownlyDelivery,
        platformFee: 0,
        discount: ownlyDiscount,
        finalPrice: Math.max(50, ownlyFinal),
        couponCode: 'DIRECTDEAL',
        deliveryTime: `${Math.round(18 + item.distanceKm * 2.5)} mins`,
        url: `https://ownly.store`
      }
    ];

    // Sort platforms by final checkout price ascending
    platforms.sort((a, b) => a.finalPrice - b.finalPrice);

    const cheapest = platforms[0];
    const expensive = platforms[platforms.length - 1];
    const maxSavings = expensive.finalPrice - cheapest.finalPrice;

    return {
      ...item,
      id: `${item.restaurant.toLowerCase().replace(/\s+/g, '-')}-${item.dishName.toLowerCase().replace(/\s+/g, '-')}`,
      cityName: city.name,
      sortedPlatforms: platforms,
      cheapestPlatform: cheapest,
      maxSavings
    };
  });

  // Price range filter
  if (priceRange === 'under250') {
    processed = processed.filter(item => item.cheapestPlatform.finalPrice <= 250);
  } else if (priceRange === '250to450') {
    processed = processed.filter(item => item.cheapestPlatform.finalPrice > 250 && item.cheapestPlatform.finalPrice <= 450);
  } else if (priceRange === 'above450') {
    processed = processed.filter(item => item.cheapestPlatform.finalPrice > 450);
  }

  // Sorting logic
  if (sortBy === 'cheapest') {
    processed.sort((a, b) => a.cheapestPlatform.finalPrice - b.cheapestPlatform.finalPrice);
  } else if (sortBy === 'rating') {
    processed.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'deliveryTime') {
    processed.sort((a, b) => parseInt(a.cheapestPlatform.deliveryTime) - parseInt(b.cheapestPlatform.deliveryTime));
  } else if (sortBy === 'savings') {
    processed.sort((a, b) => b.maxSavings - a.maxSavings);
  }

  return processed;
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
