import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Game {
    id: string;
    name: string;
    posterBlob: ExternalBlob;
    trailerUrl: string;
    platforms: Array<Platform>;
    price: bigint;
    onSale: boolean;
}
export interface UserProfile {
    name: string;
}
export enum Platform {
    pc = "pc",
    xbox = "xbox",
    playstation = "playstation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGame(name: string, posterBlob: ExternalBlob, price: bigint, trailerUrl: string, platforms: Array<Platform>, onSale: boolean): Promise<string>;
    deleteGame(id: string): Promise<void>;
    getAllGames(): Promise<Array<Game>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGameById(id: string): Promise<Game>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateGame(id: string, name: string, posterBlob: ExternalBlob, price: bigint, trailerUrl: string, platforms: Array<Platform>, onSale: boolean): Promise<void>;
}
