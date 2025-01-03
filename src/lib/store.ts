/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface LocationState {
    location: string;
    result: {
        city: string; lat: number; lng: number
    } | null;
    error: string | null;
    setLocation: (location: string) => void;
    setResult: (result: { city: string; lat: number; lng: number } | null) => void;
    setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    location: "",
    result: null,
    error: null,
    setLocation: (location) => set({ location }),
    setResult: (result: { city: string; lat: number; lng: number } | null) => set({ result }),
    setError: (error) => set({ error }),
}));


interface WeatherStore {
    coordinates: { lat: string; lng: string } | null;
    weatherData: any | null;
    error: string | null;
    setCoordinates: (coords: { lat: string; lng: string }) => void;
    setWeatherData: (data: any) => void;
    setError: (message: string | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    coordinates: null,
    weatherData: null,
    error: null,
    setCoordinates: (coords) => set({ coordinates: coords }),
    setWeatherData: (data) => set({ weatherData: data }),
    setError: (message) => set({ error: message }),
}));
