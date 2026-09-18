export interface ListingPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Living room' | 'Bedroom' | 'Jacuzzi & Pool' | 'Kitchen & Dining' | 'Bathroom' | 'Balcony & Views';
  description?: string;
  isHero?: boolean;
}

export interface AmenityItem {
  id: string;
  name: string;
  description?: string;
  iconName: string;
  category: string;
  isPopular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    yearsOnAirbnb: number;
    rating?: number;
  };
  rating: number;
  date: string;
  comment: string;
  stayDuration?: string;
}

export interface HostInfo {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  rating: number;
  reviewCount: number;
  responseRate: string;
  responseTime: string;
  bio: string;
  coHosts?: Array<{ name: string; avatar?: string; initials?: string }>;
  work?: string;
  education?: string;
  born?: string;
  funFact?: string;
  favoriteSong?: string;
}

export interface NearbyStay {
  id: string;
  title: string;
  price: number;
  currencySymbol: string;
  rating: number;
  imageUrl: string;
}

export interface ListingDetails {
  id: string;
  title: string;
  type: string;
  location: {
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  stats: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  rating: {
    overall: number;
    reviewCount: number;
    categories: {
      cleanliness: number;
      accuracy: number;
      communication: number;
      location: number;
      checkIn: number;
      value: number;
    };
  };
  price: {
    basePrice: number;
    currency: string;
    currencySymbol: string;
    cleaningFee: number;
    serviceFee: number;
    discountPercentage?: number;
  };
  photos: ListingPhoto[];
  host: HostInfo;
  description: {
    summary: string;
    space: string;
    guestAccess: string;
    otherNotes: string;
  };
  sleepingArrangements: Array<{
    id: string;
    room: string;
    bedType: string;
    bedCount: number;
    description: string;
    image?: string;
  }>;
  amenities: AmenityItem[];
  reviews: ReviewItem[];
  rules: {
    checkIn: string;
    checkout: string;
    rulesList: string[];
  };
  safety: {
    items: string[];
  };
  cancellationPolicy: {
    summary: string;
    details: string;
  };
  nearbyStays?: NearbyStay[];
}

export interface BookingState {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
}
