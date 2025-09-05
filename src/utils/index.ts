export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export const getPriceTag = (price: number): string => {
  if (price < 5000) return 'Budget';
  if (price >= 5000 && price <= 20000) return 'Mid-range';
  return 'Premium';
};

export const getPriceTagColor = (price: number): string => {
  if (price < 5000) return '#28a745'; // Green for budget
  if (price >= 5000 && price <= 20000) return '#ffc107'; // Yellow for mid-range
  return '#dc3545'; // Red for premium
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
