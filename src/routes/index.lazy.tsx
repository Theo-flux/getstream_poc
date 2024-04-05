import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../pages";

export const Route = createLazyFileRoute("/")({
  component: () => <Home />,
});
