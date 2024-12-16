import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../providers/auth-provider.jsx";

export default function useBranchId() {
    const { loggedInUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateBranchId = (id) => {
        let branchId = id ?? searchParams.get("branchId");

        if (loggedInUser.branches.length === 0) {
            console.error("User has no branches");
            branchId = null;
            setErrorMsg("Je hebt geen speltakken");
            setIsLoading(false);
        } else if (!branchId && loggedInUser.branches.length > 0) {
            branchId = loggedInUser.branches[0].id;
        } else if (!loggedInUser.branches.some(branch => branch.id === branchId)) {
            console.error("User is not in branch: ", branchId);
            setErrorMsg("Je hebt geen toegang tot deze speltak of deze bestaat niet.");
            branchId = null;
            setIsLoading(false);
        }

        setSelectedBranchId(branchId);
    };

    return { selectedBranchId, updateBranchId, errorMsg, isLoading, setIsLoading };
}