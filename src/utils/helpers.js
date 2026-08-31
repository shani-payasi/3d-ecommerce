export const formatPrice = (n) =>
  `₹${Number(n).toLocaleString("en-IN")}`;

export const discountPercent = (oldP, newP) =>
  oldP ? Math.round(((oldP - newP) / oldP) * 100) : 0;

export const cn = (...args) => args.filter(Boolean).join(" ");
