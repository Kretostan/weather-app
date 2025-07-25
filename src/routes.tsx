import { createBrowserRouter } from "react-router";

import Root from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> }
        ]
    }
]);

export default router;