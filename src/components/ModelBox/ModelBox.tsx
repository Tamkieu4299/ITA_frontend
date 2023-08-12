import "./ModelBox.css";
import { ParagraphModel } from "../../types/paragraphModel";

export const ModelBox = ({ descArray }: { descArray: ParagraphModel }) => {
    return (
        <>
            <div className="modelbox">
                {descArray ? (
                    <div className="modelbox__container">
                        <div className="modelbox__title">{descArray.title}</div>
                        {descArray.content.map((p) => (
                            <>
                                <div className="modelbox__heading">{p?.heading}</div>
                                <div className="modelbox__paragraph">{p?.paragraph}</div>
                            </>
                        ))}
                    </div>
                ) : (
                    <div className="modelbox__paragraph">No context to display</div>
                )}
            </div>
        </>
    );
};
