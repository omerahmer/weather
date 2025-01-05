"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { useWeatherStore } from "@/lib/store";
import WeatherCharts from "./WeatherCharts";
import { Thermometer, Droplet, CloudRain, Wind } from "lucide-react";

export default function WeatherDisplay() {
    const { weatherData, coordinates } = useWeatherStore();

    if (!weatherData) {
        return (
            <div>
                <h2 className="text-center text-xl m-4">
                    Enter a city name to fetch weather data.
                </h2>
                <p className="text-center">
                    {coordinates && `Using coordinates: ${coordinates.lat}, ${coordinates.lng}`}
                </p>
            </div>
        );
    }

    const { periods } = weatherData.properties;

    interface Period {
        name: string;
        temperature: number;
        probabilityOfPrecipitation?: precipitationPoint;
        humidity?: number;
        windSpeed: string; // Adjusted to match the API's format
        windDirection: string;
    }

    type precipitationPoint = {
        value: number,
    }

    const formattedData = periods.map((period: Period) => ({
        name: period.name,
        temperature: period.temperature,
        precipitation: period.probabilityOfPrecipitation?.value ?? 0,
        humidity: period.humidity ?? 0,
        windSpeed: parseInt(period.windSpeed) || 0, // Extracting numerical value from "X mph"
        windDirection: period.windDirection,
    }));

    return (
        <div className="space-y-8 p-8">
            {/* Main Weather Data Points */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Temperature Card */}
                <Card
                    className="text-white flex items-center justify-between pt-6 pr-6 pl-6 pb-2"
                    style={{
                        backgroundColor: "hsl(222.2, 84%, 4.9%)",
                        borderRadius: "8px",
                        borderColor: "hsl(217.2, 32.6%, 17.5%)",
                    }}
                >
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-lg">Temperature</CardTitle>
                        <CardContent className="pl-0">
                            <p className="text-2xl font-bold">
                                {formattedData[0].temperature}° Fahrenheit
                            </p>
                        </CardContent>
                    </div>
                    <Thermometer className="w-12 h-12 text-red-500 pb-2" />
                </Card>

                {/* Precipitation Card */}
                <Card
                    className="text-white flex items-center justify-between pt-6 pr-6 pl-6 pb-2"
                    style={{
                        backgroundColor: "hsl(222.2, 84%, 4.9%)",
                        borderRadius: "8px",
                        borderColor: "hsl(217.2, 32.6%, 17.5%)",
                    }}
                >
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-lg">Precipitation</CardTitle>
                        <CardContent className="pl-0">
                            <p className="text-2xl font-bold">
                                {formattedData[0].precipitation}% chance
                            </p>
                        </CardContent>
                    </div>
                    <CloudRain className="w-12 h-12 text-blue-500 pb-2" />
                </Card>

                {/* Humidity Card */}
                <Card
                    className="text-white flex items-center justify-between pt-6 pr-6 pl-6 pb-2"
                    style={{
                        backgroundColor: "hsl(222.2, 84%, 4.9%)",
                        borderRadius: "8px",
                        borderColor: "hsl(217.2, 32.6%, 17.5%)",
                    }}
                >
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-lg">Humidity</CardTitle>
                        <CardContent className="pl-0">
                            <p className="text-2xl font-bold">
                                {formattedData[0].humidity}%
                            </p>
                        </CardContent>
                    </div>
                    <Droplet className="w-12 h-12 text-blue-400 pb-2" />
                </Card>

                {/* Wind Speed Card */}
                <Card
                    className="text-white flex items-center justify-between pt-6 pr-6 pl-6 pb-2"
                    style={{
                        backgroundColor: "hsl(222.2, 84%, 4.9%)",
                        borderRadius: "8px",
                        borderColor: "hsl(217.2, 32.6%, 17.5%)",
                    }}
                >
                    <div className="flex flex-col space-y-1">
                        <CardTitle className="text-lg">Wind Speed</CardTitle>
                        <CardContent className="pl-0">
                            <p className="text-2xl font-bold">
                                {formattedData[0].windSpeed} mph
                            </p>
                        </CardContent>
                    </div>
                    <Wind className="w-12 h-12 text-gray-500 pb-2" />
                </Card>
            </div>

            {/* Weather Charts */}
            <WeatherCharts data={formattedData} />
        </div>
    );
}
