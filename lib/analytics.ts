// Analytics helpers for tracking user interactions
export interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;

  const consent = localStorage.getItem("consent-preferences");
  if (!consent) return false;

  const preferences = JSON.parse(consent);
  return preferences.analytics === true;
}

// Track page view
export function trackPageView(url: string, title?: string) {
  if (!isAnalyticsEnabled()) return;

  if (window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_title: title,
      page_location: url,
    });
  }
}

// Track custom event
export function trackEvent(event: AnalyticsEvent) {
  if (!isAnalyticsEnabled()) return;

  if (window.gtag) {
    window.gtag("event", event.event, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }
}

// E-commerce tracking events
export function trackAddToCart(
  productId: string,
  productName: string,
  price: number,
  currency = "ARS"
) {
  trackEvent({
    event: "add_to_cart",
    category: "ecommerce",
    action: "add_to_cart",
    label: productName,
    custom_parameters: {
      currency,
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackRemoveFromCart(
  productId: string,
  productName: string,
  price: number,
  currency = "ARS"
) {
  trackEvent({
    event: "remove_from_cart",
    category: "ecommerce",
    action: "remove_from_cart",
    label: productName,
    custom_parameters: {
      currency,
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackViewItem(
  productId: string,
  productName: string,
  price: number,
  currency = "ARS"
) {
  trackEvent({
    event: "view_item",
    category: "ecommerce",
    action: "view_item",
    label: productName,
    custom_parameters: {
      currency,
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity: 1,
        },
      ],
    },
  });
}

export function trackViewItemList(
  itemListId: string,
  itemListName: string,
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
  }>
) {
  trackEvent({
    event: "view_item_list",
    category: "ecommerce",
    action: "view_item_list",
    label: itemListName,
    custom_parameters: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items,
    },
  });
}

export function trackBeginCheckout(
  value: number,
  currency = "ARS",
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) {
  trackEvent({
    event: "begin_checkout",
    category: "ecommerce",
    action: "begin_checkout",
    custom_parameters: {
      currency,
      value,
      items,
    },
  });
}

export function trackPurchase(
  transactionId: string,
  value: number,
  currency = "ARS",
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) {
  trackEvent({
    event: "purchase",
    category: "ecommerce",
    action: "purchase",
    custom_parameters: {
      transaction_id: transactionId,
      currency,
      value,
      items,
    },
  });
}

// UI interaction tracking
export function trackFilterApplied(filterType: string, filterValue: string) {
  trackEvent({
    event: "filter_applied",
    category: "ui_interaction",
    action: "filter",
    label: `${filterType}: ${filterValue}`,
  });
}

export function trackSearch(searchTerm: string, resultsCount: number) {
  trackEvent({
    event: "search",
    category: "ui_interaction",
    action: "search",
    label: searchTerm,
    value: resultsCount,
  });
}

export function trackButtonClick(buttonName: string, location: string) {
  trackEvent({
    event: "button_click",
    category: "ui_interaction",
    action: "click",
    label: `${buttonName} (${location})`,
  });
}

// Performance tracking
export function trackPageLoadTime(loadTime: number) {
  trackEvent({
    event: "page_load_time",
    category: "performance",
    action: "timing",
    value: Math.round(loadTime),
  });
}

export function trackImageLoadError(imageUrl: string) {
  trackEvent({
    event: "image_load_error",
    category: "error",
    action: "image_error",
    label: imageUrl,
  });
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}



