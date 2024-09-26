import { DateTime } from "luxon";

export type CharacterStatus = "Alive" | "Dead" | "Unknown";

export type CharacterGender = "Male" | "Female" | "Other";

export interface CharacterProps {
    id: string;
    name: string;
    status: CharacterStatus;
    species: string;
    gender: "";
    createdAt: DateTime;
}
