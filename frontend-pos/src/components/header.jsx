import React from "react";

const Header = ({ currPage }) => {
    return (
        <div className="header">
            <img src="/logo-los-campos.jpg" alt="Tortillería y comidad caseras Los Campos" className="header-logo" />
            <span className="header-foo">{currPage}</span>

        </div>
    );
};

export default Header;
