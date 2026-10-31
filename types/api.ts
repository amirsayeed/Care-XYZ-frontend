export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  contact: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  hourlyRate: number;
  imageUrl: string;
  features: string[];
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  _id: string;
  serviceId: string;
  serviceName: string;
  duration: number;
  division: string;
  district: string;
  city: string;
  area: string;
  address: string;
  totalCost: number;
  status: BookingStatus;
  invoiceSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  name: string;
  areas: string[];
}

export interface District {
  name: string;
  cities: City[];
}

export interface Division {
  name: string;
  districts: District[];
}

export interface LocationTree {
  _id: string;
  divisions: Division[];
}

export interface Testimonial {
  _id: string;
  userName: string;
  userPhoto: string;
  rating: number;
  review: string;
  date: string;
}