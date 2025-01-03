import * as React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sun, MapPin, LocateFixed } from "lucide-react";
import { useLocationStore } from "@/lib/store";
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
                                                <Link
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <LocateFixed />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        Current Location
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Use your device&apos;s location for local weather
                                                    </p>
                                                </Link>
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

                    {/* Add SignInButton and UserButton here */}
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
