import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export function loader({ params }: LoaderFunctionArgs) {
    const filename = params["*"];
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";

    // Ensure we don't have double slashes if API_BASE ends with /
    const base = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;

    // Redirect to the backend image URL
    return redirect(`${base}/images/${filename}`);
}
