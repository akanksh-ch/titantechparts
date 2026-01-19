import { type RouteConfig, index } from "@react-router/dev/routes";

// https://reactrouter.com/start/modes#framework
// We're using the framework method as adviced by the docs

export default [
    index("routes/home.tsx")
] satisfies RouteConfig;
