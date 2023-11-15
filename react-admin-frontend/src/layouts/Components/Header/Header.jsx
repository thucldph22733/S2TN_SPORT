import React from 'react';
import { FaRegUser } from 'react-icons/fa';
function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                <FaRegUser className="icon_header" />
                                Le Dang Thanh
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
