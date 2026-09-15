import { type MiddlewareFunction } from "react-router"

// Client-side timing middleware
export const timingMiddleware: MiddlewareFunction = async ({ context }, next) => {
    const start = performance.now();
    await next();
    const duration = performance.now() - start;
    console.log(`Navigation took ${duration}ms`);
}