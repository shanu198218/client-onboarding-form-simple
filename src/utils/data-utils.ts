import z from "zod";

export const ServicesEnum = z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]);

export const fullNameRegex = /^[A-Za-z][A-Za-z\s'\-]{1,79}$/;

export type AlertType = "error" | "success";

export const ServiceOptions = ["UI/UX", "Branding", "Web Dev", "Mobile App"] as const;

export type Service = z.infer<typeof ServicesEnum>;