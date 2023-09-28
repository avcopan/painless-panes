import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <div className="navbar bg-primary text-primary-content justify-center">
            <Link className="btn btn-ghost normal-case text-xl"to="/" >
                Get Windows
            </Link>

            <Link className="btn btn-ghost normal-case text-xl" to="/projects" >
                My Projects
            </Link>
        </div>
    )
};