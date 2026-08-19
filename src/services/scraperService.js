import { REAL_SWIGGY_ZOMATO_BENGALURU_DB, BENGALURU_LOCALITIES } from '../data/dishesData';

const DISH_IMAGE_MAP = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3d5d6281313?auto=format&fit=crop&w=600&q=80",
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  momo: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80",
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

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const openPlatformAppOrWeb = (platform, item) => {
  const isMobile = isMobileDevice();

  if (platform === 'swiggy') {
    const deepLink = item.swiggyDeepLink || `swiggy://menu?query=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;
    const webUrl = item.swiggyWebUrl || `https://www.swiggy.com/city/bangalore/search?query=${encodeURIComponent(item.dishName + ' ' + item.restaurant)}`;

    if (isMobile) {
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
    window.open('https://ownly.store', '_blank');
  }
};

/**
 * Calculates Swiggy vs Zomato vs Ownly checkout prices and distance from selected locality
 */
const calculatePricing = (rawList, selectedLocality, isGoldMember) => {
  return rawList.map(item => {
    // Calculate distance relative to selected locality
    const isSameLocality = item.locality.toLowerCase().includes(selectedLocality.name.toLowerCase());
    const effectiveDistance = isSameLocality
      ? item.distanceKm
      : (parseFloat(item.distanceKm) + selectedLocality.distanceOffset).toFixed(1);

    const distanceNum = parseFloat(effectiveDistance);
    const platformFee = 6;
    const rawDeliveryFee = Math.round(25 + distanceNum * 7);

    // Swiggy
    const swiggyBase = item.basePrice;
    const swiggyPackaging = 25;
    let swiggyDelivery = isGoldMember && swiggyBase > 199 ? 0 : rawDeliveryFee;
    let swiggyDiscount = swiggyBase > 300 ? 60 : 30;
    if (isGoldMember) swiggyDiscount += 20;
    const swiggyFinal = swiggyBase + swiggyPackaging + swiggyDelivery + platformFee - swiggyDiscount;

    // Zomato
    const zomatoBase = Math.round(swiggyBase * 0.98);
    const zomatoPackaging = 20;
    let zomatoDelivery = isGoldMember && zomatoBase > 199 ? 0 : rawDeliveryFee;
    let zomatoDiscount = zomatoBase > 300 ? 70 : 40;
    if (isGoldMember) zomatoDiscount += 25;
    const zomatoFinal = zomatoBase + zomatoPackaging + zomatoDelivery + platformFee - zomatoDiscount;

    // Ownly Direct
    const ownlyBase = Math.round(swiggyBase * 0.88);
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
        deliveryTime: `${Math.round(18 + distanceNum * 3)} mins`
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
        deliveryTime: `${Math.round(20 + distanceNum * 3)} mins`
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
        deliveryTime: `${Math.round(15 + distanceNum * 2.5)} mins`
      }
    ];

    platforms.sort((a, b) => a.finalPrice - b.finalPrice);

    const cheapest = platforms[0];
    const expensive = platforms[platforms.length - 1];
    const maxSavings = expensive.finalPrice - cheapest.finalPrice;

    return {
      ...item,
      id: `${item.restaurant.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${item.dishName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${selectedLocality.id}`,
      calculatedDistance: distanceNum,
      cityName: "Bengaluru",
      sortedPlatforms: platforms,
      cheapestPlatform: cheapest,
      maxSavings
    };
  });
};

/**
 * Split Scraper Engine with Strict Distance Sorting
 */
export const searchAndCompareDishesSplit = ({
  query = 'Pizza',
  selectedLocality = BENGALURU_LOCALITIES[0],
  category = 'All',
  isVegOnly = false,
  isNonVegOnly = false,
  isGoldMember = true,
  priceRange = 'all'
}) => {
  const trimmedQuery = query.trim().toLowerCase();
  let db = [...REAL_SWIGGY_ZOMATO_BENGALURU_DB];

  if (category !== 'All') {
    db = db.filter(item => item.category === category);
  }

  if (isVegOnly) {
    db = db.filter(item => item.isVeg === true);
  } else if (isNonVegOnly) {
    db = db.filter(item => item.isVeg === false);
  }

  // Section 1: Restaurants containing query term in their NAME
  let nameMatched = db.filter(item =>
    item.restaurant.toLowerCase().includes(trimmedQuery)
  );

  // Section 2: Restaurants matching query in dishName or category (excluding name matched)
  let menuMatched = db.filter(item =>
    !item.restaurant.toLowerCase().includes(trimmedQuery) &&
    (item.dishName.toLowerCase().includes(trimmedQuery) || item.category.toLowerCase().includes(trimmedQuery))
  );

  // Dynamic fallback for custom query
  if (nameMatched.length === 0 && menuMatched.length === 0 && trimmedQuery) {
    const isNonVeg = trimmedQuery.includes('chicken') || trimmedQuery.includes('mutton') || trimmedQuery.includes('egg');
    const formattedTitle = query.charAt(0).toUpperCase() + query.slice(1);

    nameMatched = [
      {
        dishName: `${formattedTitle} Special`,
        category: category !== 'All' ? category : 'Fast Food',
        isVeg: !isNonVeg,
        restaurant: `${formattedTitle} Hut Bengaluru`,
        locality: selectedLocality.name,
        address: `100 Feet Rd, ${selectedLocality.name}, Bengaluru, Karnataka 560038`,
        rating: 4.6,
        image: getBestImage(query),
        description: `Authentic ${query} made at ${formattedTitle} Hut in ${selectedLocality.name}.`,
        basePrice: 390,
        distanceKm: 0.9
      },
      {
        dishName: `Super ${formattedTitle}`,
        category: category !== 'All' ? category : 'Fast Food',
        isVeg: !isNonVeg,
        restaurant: `The ${formattedTitle} Club`,
        locality: selectedLocality.name,
        address: `80 Feet Rd, ${selectedLocality.name}, Bengaluru, Karnataka 560095`,
        rating: 4.5,
        image: getBestImage(query),
        description: `Gourmet ${query} prepared with fresh ingredients.`,
        basePrice: 420,
        distanceKm: 2.1
      }
    ];

    menuMatched = [
      {
        dishName: `Classic ${formattedTitle}`,
        category: category !== 'All' ? category : 'Main Course',
        isVeg: !isNonVeg,
        restaurant: `Empire Restaurant`,
        locality: selectedLocality.name,
        address: `4th Block, ${selectedLocality.name}, Bengaluru, Karnataka 560034`,
        rating: 4.4,
        image: getBestImage(query),
        description: `Empire's famous signature ${query}.`,
        basePrice: 310,
        distanceKm: 1.4
      },
      {
        dishName: `Chef's Choice ${formattedTitle}`,
        category: category !== 'All' ? category : 'Main Course',
        isVeg: !isNonVeg,
        restaurant: `Truffles`,
        locality: selectedLocality.name,
        address: `5th Block, ${selectedLocality.name}, Bengaluru, Karnataka 560095`,
        rating: 4.7,
        image: getBestImage(query),
        description: `Top rated ${query} at Truffles Bengaluru.`,
        basePrice: 350,
        distanceKm: 1.6
      }
    ];
  }

  let processedNameMatched = calculatePricing(nameMatched, selectedLocality, isGoldMember);
  let processedMenuMatched = calculatePricing(menuMatched, selectedLocality, isGoldMember);

  // STRICTLY SORT BY DISTANCE (Closest to Furthest ascending)
  const sortByDistance = (arr) => arr.sort((a, b) => a.calculatedDistance - b.calculatedDistance);

  return {
    nameMatched: sortByDistance(processedNameMatched),
    menuMatched: sortByDistance(processedMenuMatched)
  };
};

export const calculateTotalStats = (nameMatched = [], menuMatched = []) => {
  const allDishes = [...nameMatched, ...menuMatched];
  const totalItems = allDishes.length;
  if (totalItems === 0) return { totalItems: 0, totalPossibleSavings: 0, avgSavings: 0 };

  const totalPossibleSavings = allDishes.reduce((acc, dish) => acc + dish.maxSavings, 0);
  const avgSavings = Math.round(totalPossibleSavings / totalItems);

  return {
    totalItems,
    totalPossibleSavings,
    avgSavings
  };
};
