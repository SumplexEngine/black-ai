// Cliente para el navegador (Client Components)
export { createClient, getSupabaseClient } from "./client";

// Cliente para el servidor (Server Components, API Routes)
export {
  createClient as createServerSupabaseClient,
  createServiceClient,
} from "./server";

// Cliente para middleware
export { updateSession } from "./middleware";
