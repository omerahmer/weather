import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and lngitude are required" });
    }

    try {
        const gridpointResponse = await fetch(
            `https://api.weather.gov/points/${lat},${lng}`
        );

        if (!gridpointResponse.ok) {
            throw new Error("Failed to fetch grid point");
        }

        const gridpointData = await gridpointResponse.json();
        const forecastUrl = gridpointData.properties.forecast;

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error("Failed to fetch weather forecast");
        }

        const forecastData = await forecastResponse.json();

        res.status(200).json(forecastData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
}
