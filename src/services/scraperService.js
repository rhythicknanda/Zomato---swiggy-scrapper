import { DISHES_DATABASE } from '../data/dishesData';

/**
 * Searches and compares food dish prices across platforms
 * @param {string} query - Dish search string
 * @param {string} category - Selected food category
 * @returns {Array} List of dishes with calculated savings and best deals
 */
export const searchAndCompareDishes = (query = '', category = 'All') => {
  let filtered = [...DISHES_DATABASE];

  if (category !== 'All') {
    filtered = filtered.filter(dish => dish.category === category);
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      dish =>
        dish.name.toLowerCase().includes(q) ||
        dish.restaurant.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q)
    );
  }

  // Calculate pricing metrics for each dish
  return filtered.map(dish => {
    const prices = [
      { platform: 'swiggy', name: 'Swiggy', bgClass: 'swiggy-bg', ...dish.platforms.swiggy },
      { platform: 'zomato', name: 'Zomato', bgClass: 'zomato-bg', ...dish.platforms.zomato },
      { platform: 'ownly', name: 'Ownly', bgClass: 'ownly-bg', ...dish.platforms.ownly }
    ];

    // Sort by final checkout price ascending
    prices.sort((a, b) => a.finalPrice - b.finalPrice);

    const cheapest = prices[0];
    const mostExpensive = prices[prices.length - 1];
    const maxSavings = mostExpensive.finalPrice - cheapest.finalPrice;

    return {
      ...dish,
      sortedPlatforms: prices,
      cheapestPlatform: cheapest,
      maxSavings
    };
  });
};

/**
 * Returns overall savings statistics for the user
 */
export const calculateTotalStats = (dishes) => {
  const totalItems = dishes.length;
  if (totalItems === 0) return { avgSavings: 0, maxPossibleSavings: 0 };

  const totalPossibleSavings = dishes.reduce((acc, dish) => acc + dish.maxSavings, 0);
  const avgSavings = Math.round(totalPossibleSavings / totalItems);

  return {
    totalItems,
    totalPossibleSavings,
    avgSavings
  };
};
