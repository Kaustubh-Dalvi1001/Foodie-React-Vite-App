export const LOGO_URL =
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/95/18/60/logo.jpg?w=500&h=-1&s=1";

export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const FOOD_ITEM_IMG =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

export const ALL_RESTOS_API =
  "https://www.swiggy.com/mapi/restaurants/list/v5?lat=18.52110&lng=73.85020&collection=83631&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&carousel=true&third_party_vendor=1";

export const MENU_API = (restoId) =>
  `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.52110&lng=73.85020&restaurantId=${restoId}&query=Pizza&submitAction=ENTER&source=collection`;

862315;
