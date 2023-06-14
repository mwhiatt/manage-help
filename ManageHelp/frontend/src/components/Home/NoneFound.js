export default function NoneFound({type}) {
    return (
        <div className="workspace-details">
            <h3>No {type}s found.</h3>
            <p>Try joining or workspace by join code or creating a new workspace for your company.</p>
        </div>
    )
}