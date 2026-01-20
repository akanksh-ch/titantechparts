import { type RouteConfig, index, route } from "@react-router/dev/routes";

// https://reactrouter.com/start/modes#framework
// This project uses the React Router framework (file-based routes).

export default [
  // "/" -> "/home"
  index("routes/index.tsx"),

  route("home", "routes/home.tsx"),
  route("search", "routes/search.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("orders", "routes/orders.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
