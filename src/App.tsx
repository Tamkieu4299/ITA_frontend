import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import Loader from "components/Loader";
import Routers from "routers";

export const App = () => {
    return (
        <div className="app">
            <Loader />
            <header className="app__header">
                <Navbar />
            </header>
            <div className="app__main">
                <Routers />
            </div>
            <footer className="app__footer">
                <Footer />
            </footer>
        </div>
    );
};
