import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.scss'
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import Root from "./routes/root.jsx";
import CampsiteOverview from "./routes/campsites/campsite-overview.jsx";
import CampsiteDetails from "./routes/campsites/campsite-details.jsx";
import {getCampsiteByIdLoader} from "./loaders/campsite-loader.jsx";
import CreateCampsite from "./routes/campsites/create-campsite.jsx";
import EditCampsite from "./routes/campsites/edit-campsite.jsx";
import UserOverview from "./routes/users/user-overview.jsx";
import RegisterUser from "./routes/users/register-user.jsx";
import EditUser from "./routes/users/edit-user.jsx";
import {getUserByIdLoader} from "./loaders/user-loader.jsx";
import UserDetails from "./routes/users/user-details.jsx";
import BranchOverview from "./routes/branches/branch-overview.jsx";
import BranchDetails from "./routes/branches/branch-details.jsx";
import {getBranchByIdLoader} from "./loaders/branch-loader.jsx";
import EditBranch from "./routes/branches/edit-branch.jsx";

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
                        path: "create",
                        element: <CreateCampsite/>,
                    },
                    {
                        path: ":campsiteId",
                        children: [
                            {
                                index: true,
                                element: <CampsiteDetails/>,
                                loader: getCampsiteByIdLoader
                            },
                            {
                                path: "edit",
                                element: <EditCampsite/>,
                                loader: getCampsiteByIdLoader
                            }
                        ]
                    }
                ]
            },
            {
                path: "/users",
                children: [
                    {
                        index: true,
                        element: <UserOverview/>
                    },
                    {
                        path: "register",
                        element: <RegisterUser/>
                    },
                    {
                        path: ":userId",
                        children: [
                            {
                                index: true,
                                element: <UserDetails/>,
                                loader: getUserByIdLoader
                            },
                            {
                                path: "edit",
                                element: <EditUser/>,
                                loader: getUserByIdLoader
                            }
                        ]
                    }
                ]
            },
            {
                path: "/branches",
                children: [
                    {
                        index: true,
                        element: <BranchOverview/>
                    },
                    {
                        path: ":branchId",
                        children: [
                            {
                                index: true,
                                element: <BranchDetails/>,
                                loader: getBranchByIdLoader
                            },
                            {
                                path: "edit",
                                element: <EditBranch/>,
                                loader: getBranchByIdLoader
                            }
                        ]
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
