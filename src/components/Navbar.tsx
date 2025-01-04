import * as React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sun, MapPin, LocateFixed } from "lucide-react";
import { useWeatherStore, useLocationStore } from "@/lib/store";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import InputForm from "./SearchBar";

export default function Navbar() {
    const city = useLocationStore((state) => state.location);
    const { setCoordinates, setWeatherData, setError } = useWeatherStore();
    const { setLocation } = useLocationStore();
    const [loading, setLoading] = React.useState(false);

    async function handleLocate() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Device location:", { latitude, longitude });

                try {
                    setCoordinates({ lat: latitude.toString(), lng: longitude.toString() });

                    // Fetch city name using reverse geocoding
                    const locationResponse = await fetch(
                        `/api/getLocation?lat=${latitude}&lng=${longitude}`
                    );
                    if (!locationResponse.ok) throw new Error("Failed to fetch location data");
                    const locationData = await locationResponse.json();
                    const fetchedCity = locationData.city + ", " + locationData.state || "Unknown City";
                    setLocation(fetchedCity);

                    // Fetch weather data
                    const weatherResponse = await fetch(
                        `/api/getWeather?lat=${latitude}&lng=${longitude}`
                    );
                    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
                    const weatherData = await weatherResponse.json();
                    setWeatherData(weatherData);
                } catch (error: unknown) {
                    if (error instanceof Error) setError(error.message);
                    else setError("An unexpected error occurred");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setError("Failed to fetch device location.");
                setLoading(false);
            }
        );
    }

    return (
        <div>
            <div className="flex h-16 items-center px-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem className="hidden md:flex">
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <Sun className="mr-2 w-6 h-6" />
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Weather
                                    </h4>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="ml-auto flex items-center space-x-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <LocateFixed className="mr-2 w-6 h-6" />
                                    <span className="hidden sm:inline text-base">Locate</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <button
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    onClick={handleLocate}
                                                    disabled={loading}
                                                >
                                                    <LocateFixed />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Current Location
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        {loading
                                                            ? "Locating..."
                                                            : "Use your device's location for local weather"}
                                                    </p>
                                                </button>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden sm:flex items-center space-x-2 w-40">
                        <MapPin className="w-6 h-6" />
                        <p className="text-base">{city || "Unknown City"}</p>
                    </div>
                    <InputForm />

                    {/* SignInButton and UserButton */}
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}
