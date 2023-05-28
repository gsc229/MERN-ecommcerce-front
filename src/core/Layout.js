import React from "react";
import Menu from "./Menu";
import "../styles.css";
const Layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => {
  return (
    <div className="layout-wrapper">
      <Menu children={children} />
      <div className="layout-container">
        <div className="jumbotron">
          <div>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
          </div>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
