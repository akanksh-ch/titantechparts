import { redirect } from "react-router";

export const loader = () => redirect("/home");

export default function Index() {
  return null;
}
