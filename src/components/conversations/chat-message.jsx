export default function ChatMessage({message}) {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between align-items-start">
                        <h6>{message.author.firstName} {message.author.lastName}</h6>
                        <small className="text-body-tertiary">{new Date(message.timestamp).toLocaleString()}</small>
                    </div>
                    {message.content}
                </div>
            </div>
        </div>
    )
}