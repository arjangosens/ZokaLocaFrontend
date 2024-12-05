import {useLoaderData} from "react-router-dom";
import CampsiteIcon from "../../components/campsites/campsite-icon.jsx";
import {useEffect, useState} from "react";
import {backendApi} from "../../utils/backend-api.jsx";
import AssetCard from "../../components/assets/asset-card.jsx";
import CreateCampsiteAssetModal from "../../components/campsites/assets/create-campsite-asset-modal.jsx";
import EditCampsiteAssetModal from "../../components/campsites/assets/edit-campsite-asset-modal.jsx";
import DeleteCampsiteAssetModal from "../../components/campsites/assets/delete-campsite-asset-modal.jsx";
import ViewAssetModal from "../../components/assets/view-asset-modal.jsx";

export default function CampsiteAssets() {
    const {campsite} = useLoaderData();
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [isEditModalShown, setIsEditModalShown] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [isViewModalShown, setIsViewModalShown] = useState(false);

    const handleCreateModalClose = () => {
        setIsCreateModalShown(false);
    }

    const handleModalClose = () => {
        setIsCreateModalShown(false);
        setIsEditModalShown(false);
        setIsDeleteModalShown(false);
        setIsViewModalShown(false);
    }

    const showEditModal = (asset) => {
        setSelectedAsset(asset);
        setIsEditModalShown(true);
    }

    const showDeleteModal = (asset) => {
        setSelectedAsset(asset);
        setIsDeleteModalShown(true);
    }

    const showViewModal = (asset) => {
        setSelectedAsset(asset);
        setIsViewModalShown(true);
    }

    const handleAssetsChanged = () => {
        setSelectedAsset(null);
        getAssets().then();
    }

    const getAssets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await backendApi.get(`/campsites/${campsite.id}/assets`);
            setAssets(response.data);
        } catch (error) {
            console.error("Failed to fetch assets: ", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAssets().then();
    }, []);

    return (<>
        <div className="toolbar fixed-top">
            <button className="btn btn-sm btn-dark" onClick={() => setIsCreateModalShown(true)}><i
                className="fa-solid fa-plus"></i></button>
        </div>
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <div className="nav-size"></div>
                    <h1 className="page-header-margin"><CampsiteIcon
                        campsiteType={campsite.campsiteType}/> {campsite.name}</h1>
                    <h2>Afbeeldingen</h2>
                    <hr/>
                    {isLoading && <div className="spinner-border mx-auto" role="status"></div>}
                    {error && <div className="alert alert-danger">{error.message}</div>}
                    {!isLoading && assets.length === 0 &&
                        <div className="text-center text-body-tertiary">Geen afbeeldingen gevonden</div>}
                </div>
                <div className="row">
                    {assets.map((asset) => (
                        <div className="col-6 col-lg-4 col-xl-3 mb-3" key={asset.id}>
                            <AssetCard asset={asset} onEdit={showEditModal} onDelete={showDeleteModal} onView={showViewModal}/>
                        </div>
                    ))}
                </div>

            </div>
            <div className="row">
            </div>
        </div>
        <CreateCampsiteAssetModal campsite={campsite} isShown={isCreateModalShown} onClose={handleCreateModalClose}
                                  onAssetCreated={handleAssetsChanged}/>
        {selectedAsset && isEditModalShown &&
            <EditCampsiteAssetModal campsite={campsite} asset={selectedAsset} isShown={isEditModalShown}
                                    onClose={handleModalClose} onAssetUpdated={handleAssetsChanged}/>}
        {selectedAsset && isDeleteModalShown &&
            <DeleteCampsiteAssetModal campsite={campsite} asset={selectedAsset} isShown={isDeleteModalShown}
                                      onClose={handleModalClose} onDeleted={handleAssetsChanged}/>}
        {selectedAsset && isViewModalShown && <ViewAssetModal asset={selectedAsset} onClose={handleModalClose}/>}
    </>)
}