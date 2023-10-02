import { Link, useMatch, useResolvedPath } from "react-router-dom";

// Navbar Functional Component
export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/pricing" className="site-title">Crypto Dashboard</Link>
            <ul>
                <CustomLink to="/pricing">Pricing History</CustomLink>
                <CustomLink to="/portfolio">My Portfolio</CustomLink>
            </ul>
        </nav>
    )
}

const CustomLink = ({to, children, ...props}) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        // If Active, add "active" class to highlight the link
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}