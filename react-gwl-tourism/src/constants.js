const localhost='http://127.0.0.1:8000';


export const endpoint =`${localhost}`;
export const basefolderURL='http://127.0.0.1:8000/static';

export const hotelListURL= 'http://127.0.0.1:8000/hotelrooms/';
export const hotelDetailURL= id=> `${endpoint}/hotelrooms/${id}/`;
export const addtocartURL= `${endpoint}/add_to_cart/`;
export const userIDURL = `${endpoint}/user-id/`;
export const addressListURL = addressType =>
  `${endpoint}/addresses/?address_type=${addressType}`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;
export const paymentListURL = `${endpoint}/payments/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const countryListURL = `${endpoint}/countries/`;
export const orderSummaryURL= `${endpoint}/order-summary/`;

export const something="!1m18!1m12!1m3!1d3579.42597970435!2d78.1843513149829!3d26.215344983432963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6a7179fbff7%3A0x15087678ede90d4b!2sHotel%20Regency%20Square!5e0!3m2!1sen!2sin!4v1606830359310!5m2!1sen!2sin";
export const placesListURL= 'http://127.0.0.1:8000/places/';
export const restListURL= 'http://127.0.0.1:8000/retaurants/';
export const ReviewURL= 'http://127.0.0.1:8000/review/';