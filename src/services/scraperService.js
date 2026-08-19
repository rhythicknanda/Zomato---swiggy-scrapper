import { BENGALURU_RESTAURANTS_DB, BENGALURU_LOCALITIES } from '../data/dishesData';

const DISH_IMAGE_MAP = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3d5d6281313?auto=format&fit=crop&w=600&q=80",
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  momo: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
  chicken: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
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
 * Detects if user is browsing on a mobile device (Android / iOS)
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Handles mobile deep-linking to Swiggy / Zomato app or web fallback
 */
export const openPlatformAppOrWeb = (platform, item) => {
  const isMobile = isMobileDevice();

  if (platform === 'swiggy') {
    const deepLink = item.swiggyDeepLink || `swiggy://menu?query=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;
    const webUrl = item.swiggyWebUrl || `https://www.swiggy.com/city/bangalore/search?query=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;

    if (isMobile) {
      // Attempt app deep link first, fallback to web URL
      window.location.href = deepLink;
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 800);
    } else {
      window.open(webUrl, '_blank');
    }
  } else if (platform === 'zomato') {
    const deepLink = item.zomatoDeepLink || `zomato://search?q=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;
    const webUrl = item.zomatoWebUrl || `https://www.zomato.com/bangalore/search?q=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;

    if (isMobile) {
      window.location.href = deepLink;
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 800);
    } else {
      window.open(webUrl, '_blank');
    }
  } else {
    // Ownly Direct
    window.open('https://ownly.store', '_blank');
  }
};

/**
 * Bengaluru Specific Scraper Engine
 */
export const searchAndCompareDishes = ({
  query = '',
  selectedLocality = BENGALURU_LOCALITIES[0],
  category = 'All',
  isVegOnly = false,
  isNonVegOnly = false,
  isGoldMember = true,
  sortBy = 'cheapest',
  priceRange = 'all'
}) => {
  let matchedList = [...BENGALURU_RESTAURANTS_DB];
  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery) {
    const filtered = matchedList.filter(
      item =>
        item.dishName.toLowerCase().includes(trimmedQuery) ||
        item.restaurant.toLowerCase().includes(trimmedQuery) ||
        item.category.toLowerCase().includes(trimmedQuery) ||
        item.locality.toLowerCase().includes(trimmedQuery)
    );

    if (filtered.length > 0) {
      matchedList = filtered;
    } else {
      // Dynamically generate Bengaluru restaurants serving custom searched dish!
      const isNonVeg = trimmedQuery.includes('chicken') || trimmedQuery.includes('mutton') || trimmedQuery.includes('egg') || trimmedQuery.includes('fish');
      const formattedTitle = query.charAt(0).toUpperCase() + query.slice(1);
      
      matchedList = [
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `${formattedTitle} Special Bengaluru`,
          locality: selectedLocality.name,
          address: `100 Feet Rd, near Metro Station, ${selectedLocality.name}, Bengaluru, Karnataka 560038`,
          rating: 4.7,
          image: getBestImage(query),
          description: `Authentic freshly made ${query} prepared with aromatic spices in ${selectedLocality.name}.`,
          basePrice: 320,
          distanceKm: (1.2 + selectedLocality.distanceOffset).toFixed(1)
        },
        {
          dishName: formattedTitle,
          category: category !== 'All' ? category : (isNonVeg ? 'Main Course' : 'North Indian'),
          isVeg: !isNonVeg,
          restaurant: `Empire ${formattedTitle} Corner`,
          locality: selectedLocality.name,
          address: `80 Feet Rd, Block 4, ${selectedLocality.name}, Bengaluru, Karnataka 560095`,
          rating: 4.5,
          image: getBestImage(query),
          description: `Famous Bengaluru style ${query} packed hot with extra gravy.`,
          basePrice: 290,
          distanceKm: (1.8 + selectedLocality.distanceOffset).toFixed(1)
        }
      ];
    }
  }

  // Category filter
  if (category !== 'All') {
    matchedList = matchedList.filter(item => item.category === category);
  }

  // Dietary filter
  if (isVegOnly) {
    matchedList = matchedList.filter(item => item.isVeg === true);
  } else if (isNonVegOnly) {
    matchedList = matchedList.filter(item => item.isVeg === false);
  }

  // Process checkout pricing & distance calculations for Bengaluru
  let processed = matchedList.map(item => {
    const baseP = item.basePrice;
    const distanceKm = parseFloat(item.distanceKm) || 2.0;

    const platformFee = 6;
    const rawDeliveryFee = Math.round(25 + distanceKm * 7);

    // Swiggy
    const swiggyBase = baseP;
    const swiggyPackaging = 25;
    let swiggyDelivery = isGoldMember && baseP > 199 ? 0 : rawDeliveryFee;
    let swiggyDiscount = baseP > 300 ? 60 : 30;
    if (isGoldMember) swiggyDiscount += 20;
    const swiggyFinal = swiggyBase + swiggyPackaging + swiggyDelivery + platformFee - swiggyDiscount;

    // Zomato
    const zomatoBase = Math.round(baseP * 0.98);
    const zomatoPackaging = 20;
    let zomatoDelivery = isGoldMember && baseP > 199 ? 0 : rawDeliveryFee;
    let zomatoDiscount = baseP > 300 ? 70 : 40;
    if (isGoldMember) zomatoDiscount += 25;
    const zomatoFinal = zomatoBase + zomatoPackaging + zomatoDelivery + platformFee - zomatoDiscount;

    // Ownly Direct
    const ownlyBase = Math.round(baseP * 0.88);
    const ownlyPackaging = 15;
    const ownlyDelivery = Math.round(rawDeliveryFee * 0.65);
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
        finalPrice: Math.max(40, swiggyFinal),
        couponCode: isGoldMember ? 'SWIGGYONE' : 'SWIGGYIT',
        deliveryTime: `${Math.round(18 + distanceKm * 3)} mins`
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
        finalPrice: Math.max(40, zomatoFinal),
        couponCode: isGoldMember ? 'ZOMATOGOLD' : 'ZOMATO50',
        deliveryTime: `${Math.round(20 + distanceKm * 3)} mins`
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
        finalPrice: Math.max(40, ownlyFinal),
        couponCode: 'DIRECTDEAL',
        deliveryTime: `${Math.round(15 + distanceKm * 2.5)} mins`
      }
    ];

    platforms.sort((a, b) => a.finalPrice - b.finalPrice);

    const cheapest = platforms[0];
    const expensive = platforms[platforms.length - 1];
    const maxSavings = expensive.finalPrice - cheapest.finalPrice;

    return {
      ...item,
      id: `${item.restaurant.toLowerCase().replace(/\s+/g, '-')}-${item.dishName.toLowerCase().replace(/\s+/g, '-')}`,
      cityName: "Bengaluru",
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

  // Sorting
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
