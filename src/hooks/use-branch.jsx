import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../providers/auth-provider.jsx";

export default function useBranch() {
    const { loggedInUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateBranch = (id) => {
        let branchId = id ?? searchParams.get("branchId");

        if (loggedInUser.branches.length === 0) {
            console.error("User has no branches");
            setErrorMsg("Je hebt geen speltakken");
            setIsLoading(false);
        } else if (!branchId && loggedInUser.branches.length > 0) {
            setSelectedBranch(loggedInUser.branches[0]);
        } else {
            const branch = loggedInUser.branches.find(branch => branch.id === branchId);
            if (branch) {
                setSelectedBranch(branch);
            } else {
                console.error("User is not in branch: ", branchId);
                setErrorMsg("Je hebt geen toegang tot deze speltak of deze bestaat niet.");
                setIsLoading(false);
            }
        }
    };

    return { selectedBranch, updateBranch, errorMsg, isLoading, setIsLoading };
}