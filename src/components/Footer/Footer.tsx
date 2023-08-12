import { useLocation } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
    const { pathname } = useLocation();
    if (pathname.includes("/auth")) return null;

    return (
        <footer className="footer">
            <div className="footer-items">
                <h3>© 2023 Copyright by </h3>
                <a className="footer-items__item" href="https://deltacognition.com/">
                    Delta Cognition
                </a>
            </div>
        </footer>
    );
};
