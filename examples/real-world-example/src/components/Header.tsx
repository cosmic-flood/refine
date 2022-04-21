import { useGetIdentity } from "@pankod/refine-core";

import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;
export const Header: React.FC = () => {
    const { isSuccess } = useGetIdentity();

    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        conduit
                    </Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">
                                Home
                            </Link>
                        </li>
                        {!isSuccess ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Sign in
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/editor">
                                        <i className="ion-compose"></i>&nbsp;New
                                        Article
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">
                                        <i className="ion-gear-a"></i>
                                        &nbsp;Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        <i className="ion-gear-a"></i>
                                        &nbsp;Profile
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};