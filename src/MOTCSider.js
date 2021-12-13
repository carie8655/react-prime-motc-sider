import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./MOTCSider.css";

const renderMenu = (arr, collapse, path, onClickMenu) => {
  return _.map(arr, (item) => {
    const items = _.get(item, "items", []);
    const open = _.find(collapse, (c) => c === item.key);

    if (items.length > 0) {
      return (
        <li
          key={Math.random() * 100}
          className={open && "active"}
          onClick={() => onClickMenu(item.key)}
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
            {renderMenu(items, collapse, path, onClickMenu)}
          </ul>
        </li>
      );
    } else {
      return (
        <li
          key={Math.random() * 100}
          className={open && "active"}
          onClick={() => onClickMenu(item.key)}
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
  const [menu, setMenu] = useState([]);
  const [path, setPath] = useState("");
  const [collapse, setCollapse] = useState([]);

  useEffect(() => {
    if (props.menu !== menu || props.path !== path) {
      const arr = _.chain(props.menu)
        .filter((m) => _.has(m, "items"))
        .map((m) => {
          const temp = _.filter(m.items, (i) => i.key.indexOf(props.path) > -1);
          return temp.length > 0 ? m.key : undefined;
        })
        .filter((m) => !_.isUndefined(m))
        .value();

      setCollapse(arr);
      setMenu(props.menu);
      setPath(props.path);
    }
  }, [props.path, props.menu, menu, path, collapse]);

  const onClickMenu = (key) => {
    if (_.find(collapse, (c) => c === key)) {
      const callback = () => setCollapse(_.filter(collapse, (c) => c !== key));
      props.onClickMenu(key, callback);
    } else {
      const callback = () => setCollapse([...collapse, key]);
      props.onClickMenu(key, callback);
    }
  };

  return (
    <div id="MOTCSider">
      <div className="sider-title">{props.title}</div>
      <ul className="main-menu">
        {renderMenu(menu, collapse, props.path, onClickMenu)}
      </ul>
    </div>
  );
};

MOTCSider.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  menu: PropTypes.array,
  onClickMenu: PropTypes.func,
};

MOTCSider.defaultProps = {
  title: "",
  path: "",
  menu: [],
  onClickMenu: (key, callback) => callback(),
};

export default MOTCSider;
