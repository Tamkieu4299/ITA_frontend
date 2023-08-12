import { Button } from "components/Button/Button";
import "./Header.css";

type User = {
    name: string;
};

interface HeaderProps {
    user?: User;
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
    <header>
        <div className="wrapper">
            <div>
                {user ? (
                    <>
                        <span className="welcome">
                            Welcome, <b>{user.name}</b>!
                        </span>
                        <Button size="small" onClick={onLogout} label="Log out" />
                    </>
                ) : (
                    <>
                        <Button size="small" onClick={onLogin} label="Log in" />
                        <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
                    </>
                )}
            </div>
        </div>
    </header>
);
