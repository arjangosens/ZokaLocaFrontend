import AuthenticatedImage from "../shared/authenticated-image.jsx";

export default function AssetCard({asset}) {
    return (
        <div className="card">
            <div className="card-header d-flex py-2 px-1">
                <h6 className="card-title text-truncate mb-0">{asset.name}</h6>
                {asset?.isThumbnail && <h6 className="mb-0 ms-auto"><span className="badge bg-primary float-end"><i
                    className="fa-solid fa-crown"></i></span></h6>}
            </div>
            <div className="card-body p-0">
                <div className="asset-card-image-container">
                    <AuthenticatedImage alt={asset.name} imageId={asset.id}
                                        placeholder="/src/assets/thumbnail-placeholder.jpg" className={"img-fluid"}/>
                </div>
            </div>
            <div className="card-footer d-flex py-2 px-1">
                <button className="btn btn-sm btn-primary flex-grow-1">Bekijk</button>
                <button className="btn btn-sm btn-outline-dark ms-2"><i className="fa-solid fa-pencil"></i></button>
                <button className="btn btn-sm btn-outline-danger ms-2"><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}