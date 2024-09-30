import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.scss'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import Root from "./routes/root.jsx";
import CampsiteOverview from "./routes/campsites/campsite-overview.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <CampsiteOverview />
            },
            {
                path: "/campsites",
                element: <CampsiteOverview />
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
