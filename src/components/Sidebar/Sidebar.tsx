import "./Sidebar.css";
import { useState } from "react";
import { ModelBox } from "../ModelBox/ModelBox";
import descArray from "../../constants/modalDescription.json";
import { PAGE_URL } from "constants/configs";

export function Sidebar() {
    const [showModal, setShowModal] = useState(false);

    const [modalContent, setModalContent] = useState(0);

    const handleQuestionMark = (modalIndex: number) => {
        setModalContent(modalIndex);
        setShowModal(true);
    };

    const sideBarList = [
        { title: "Create Video", href: PAGE_URL.STUDIO_CREATE },
        { title: "Preview", href: PAGE_URL.STUDIO_PREVIEW },
        { title: "Final", href: PAGE_URL.STUDIO_FINAL }
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar__list">
                {sideBarList.map((item, idx) => (
                    <li className="sidebar__list__item" key={idx}>
                        <a href={item.href} className="list__item__link">
                            <h2>{item.title}</h2>
                        </a>
                        <button
                            className="list__desc__button"
                            type="button"
                            onClick={() => handleQuestionMark(idx)}
                        >
                            ?
                        </button>
                    </li>
                ))}
            </ul>
            {showModal ? (
                <>
                    <div className="sidebar__modelbox">
                        <div className="sidebar__modelbox__container">
                            <div className="sidebar__modelbox__items">
                                <ModelBox descArray={descArray[modalContent]} />
                                <div className="sidebar__modelbox__buttons">
                                    <button
                                        className="sidebar__modelbox__button"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar__modelbox__fade"></div>
                </>
            ) : null}
        </div>
    );
}
