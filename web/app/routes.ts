import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/button-showcase", "pages/button-showcase.tsx"),
  route("/todo", "pages/todo.tsx"),
] satisfies RouteConfig;
