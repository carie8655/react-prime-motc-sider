/* eslint-disable react-hooks/exhaustive-deps */
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./MOTCSider.css";

const renderMenu = (arr, collapse, path, onCollapse, onClickMenu) => {
  return _.map(arr, (item) => {
    const items = _.get(item, "items", []);
    const open = _.find(collapse, (c) => c === item.key);

    if (items.length > 0) {
      return (
        <li
          key={Math.random() * 100}
          className={open && "active"}
          onClick={() => onCollapse(item.key)}
        >
          <div className={`main-menu-item ${open && "active"}`}>
            <div>
              <i className="icon-logout"></i>
              <span className="title">{item.label}</span>
            </div>
            <div className="main-menu-icon">
              {open ? (
                <i className="pi pi-angle-up" />
              ) : (
                <i className="pi pi-angle-down" />
              )}
            </div>
          </div>
          <ul className={`sub-menu ${open && "active"}`}>
            {renderMenu(items, collapse, path, onCollapse, onClickMenu)}
          </ul>
        </li>
      );
    } else {
      return (
        <li
          key={Math.random() * 100}
          className={open && "active"}
          onClick={() => onClickMenu(item)}
        >
          <div
            style={{ justifyContent: "flex-start" }}
            className={`main-menu-item ${
              (open || path === item.key) && "active"
            }`}
          >
            <i className="icon-logout"></i>
            <span className="title">{item.label}</span>
            <span className="arrow "></span>
          </div>
        </li>
      );
    }
  });
};

const MOTCSider = (props) => {
  const [path, setPath] = useState("");
  const [simplePath, setSimplePath] = useState("");
  const [collapse, setCollapse] = useState([]);

  useEffect(() => {
    const pathArr = window.location.pathname.split(props.routePrefix);
    const tempPath = pathArr.length > 1 ? pathArr[1] : "";

    if (window.location.pathname !== path) {
      const arr = _.chain(props.menu)
        .filter((m) => _.has(m, "items"))
        .map((m) => {
          const temp = _.filter(m.items, (i) => i.key.indexOf(tempPath) > -1);
          return temp.length > 0 ? m.key : undefined;
        })
        .filter((m) => !_.isUndefined(m))
        .value();

      setCollapse(arr);
      setPath(window.location.pathname);
      setSimplePath(tempPath);
    }
  }, [window.location.pathname, props.menu]);

  const onCollapse = (key) => {
    if (_.find(collapse, (c) => c === key)) {
      setCollapse(_.filter(collapse, (c) => c !== key));
    } else {
      setCollapse([...collapse, key]);
    }
  };

  return (
    <div id="MOTCSider">
      <div className="sider-title">{props.title}</div>
      <ul className="main-menu">
        {renderMenu(
          props.menu,
          collapse,
          simplePath,
          onCollapse,
          props.onClickMenu
        )}
      </ul>
    </div>
  );
};

MOTCSider.propTypes = {
  title: PropTypes.string,
  routePrefix: PropTypes.string,
  menu: PropTypes.array,
  onClickMenu: PropTypes.func,
};

MOTCSider.defaultProps = {
  title: "",
  routePrefix: "",
  menu: [],
  onClickMenu: (key, callback) => callback(),
};

export default MOTCSider;
