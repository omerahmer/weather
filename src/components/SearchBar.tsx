"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocationStore, useWeatherStore } from "@/lib/store";

const formSchema = z.object({
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
});

export default function SearchBar() {
    const { setCoordinates, setWeatherData, setError } = useWeatherStore();
    const { setLocation } = useLocationStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { city: "" },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { city } = values;

        try {
            const coordinatesResponse = await fetch(`/api/getCoords?city=${encodeURIComponent(city)}`);

            setLocation(city);

            if (!coordinatesResponse.ok) throw new Error("Failed to fetch coordinates");

            const { lat, lng } = await coordinatesResponse.json();
            console.log("Coordinates received:", { lat, lng });

            if (!lat || !lng) throw new Error("Invalid coordinates returned");

            setCoordinates({ lat, lng });

            const weatherResponse = await fetch(`/api/getWeather?lat=${lat}&lng=${lng}`);
            if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");

            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
        } catch (error: unknown) {
            if (error instanceof Error) setError(error.message);
            else setError("An unexpected error occurred");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <Input placeholder="Enter city name..." {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Search</Button>
            </form>
        </Form>
    );
}
