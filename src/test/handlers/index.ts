import { authHandlers } from "./auth";
import { favoritesHandlers } from "./favorites";

export const handlers = [...authHandlers, ...favoritesHandlers];
