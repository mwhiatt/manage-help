export default function NoneFound({type}) {
    let output = '';
    if (type === 'workspace') {
        output = 'Try joining or workspace by join code or creating a new workspace for your company.'
    } else if (type === 'employee') {
        output = 'Try adding employees by email or by providing them your join code.'
    }

    return (
        <div className="workspace-details">
            <h4>No {type}s found</h4>
            <p>{output}</p>
        </div>
    )
}