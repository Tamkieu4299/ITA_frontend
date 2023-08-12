import "./LoadingFrame.css";

export const LoadingFrame = ({ context }: { context: string }) => {
    return (
        <div className="loadingFrame">
            <div className="loadingFrame__dots">
                <div className="loadingFrame__dot animate-loader"></div>
                <div className="loadingFrame__dot animate-loader animation-delay-200"></div>
                <div className="loadingFrame__dot animate-loader animation-delay-400"></div>
            </div>
            <div className="loadingFrame__text">{context}</div>
        </div>
    );
};
