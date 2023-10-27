import React from 'react';
import {
    AiOutlineShoppingCart,
    AiOutlineSkin,
    AiOutlineFileProtect,
    AiOutlineUsergroupAdd,
    AiOutlineBarChart,
    AiOutlineBars,
} from 'react-icons/ai';
import { CgPassword } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
function Slider() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h5>S2TN SPORT</h5>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <Link to={path_name.sell}>
                        <AiOutlineShoppingCart className="icon_slider" />
                        Bán hàng
                    </Link>
                </li>
                <li>
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <AiOutlineSkin className="icon_slider" />
                        Quản lý sản phẩm
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <Link to={path_name.product}>Danh sách sản phẩm</Link>
                        </li>
                        <li>
                            <a href="#">Home 2</a>
                        </li>
                        <li>
                            <a href="#">Home 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <AiOutlineFileProtect className="icon_slider" />
                        Quản lý đơn hàng
                    </a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <Link to={path_name.order}>Danh sách đơn hàng</Link>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <AiOutlineUsergroupAdd className="icon_slider" />
                        Quản lý người dùng
                    </a>
                    <ul className="collapse list-unstyled" id="userSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#">
                        <AiOutlineBarChart className="icon_slider" />
                        Quản lý thống kê
                    </a>
                </li>
                <li>
                    <a href="#otherSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <AiOutlineBars className="icon_slider" />
                        Quản lý khác
                    </a>
                    <ul className="collapse list-unstyled" id="otherSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <CgPassword className="icon_slider" />
                        Đổi mật khẩu
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Slider;
