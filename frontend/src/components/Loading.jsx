const Loading = () => {
    return (
        <div>
            <div className="loadingIndic">Loading</div>
            <div className="loadingExplanation">This may take up to 30 seconds.<p>My API is slow to start because its host platform spins down with inactivity. It will be much faster after this!</p></div>
        </div>
    )
}

export default Loading;