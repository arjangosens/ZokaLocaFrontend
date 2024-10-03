import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.scss'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import Root from "./routes/root.jsx";
import CampsiteOverview from "./routes/campsites/campsite-overview.jsx";
import CampsiteDetails, {loader as campsiteLoader} from "./routes/campsites/campsite-details.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <CampsiteOverview/>
            },
            {
                path: "/campsites",
                children: [
                    {
                        index: true,
                        element: <CampsiteOverview/>
                    },
                    {
                        path: ":campsiteId",
                        element: <CampsiteDetails/>,
                        loader: campsiteLoader
                    }
                ]
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
