import "primeflex/primeflex.css";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { PanelMenu } from "primereact/panelmenu";
import { OverlayPanel } from "primereact/overlaypanel";
import "src/MOTCSider.css";

class MOTCSider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  OverlayMenu = React.createRef();

  renderOverlayPanel = () => {
    const { apps } = this.props;
    return (
      <OverlayPanel ref={this.OverlayMenu} showCloseIcon={true}>
        {_.map(apps, (icon) => (
          <div className="app-row" key={icon.key}>
            {_.map(icon.items, (item, i) => {
              const content = (
                <div className="app-block" key={icon.key}>
                  <div
                    className="app"
                    style={{
                      backgroundImage: `url(${item.icon})`,
                      backgroundColor: item.color,
                    }}
                  />
                  <div className="label">{item.label}</div>
                </div>
              );

              if (i % 3 === 0 && i !== 0)
                return (
                  <div key={item.key}>
                    <br />
                    {content}
                  </div>
                );
              else return <div key={item.key}>content</div>;
            })}
          </div>
        ))}
      </OverlayPanel>
    );
  };

  render() {
    const { title, width, menu } = this.props;
    return (
      <div id="MOTCSider" style={{ width }}>
        <div id="MOTCSider-title">
          <span>{title}</span>
          <span>
            <i
              className="pi pi-bars"
              onClick={(event) => this.OverlayMenu.current.toggle(event)}
            />
          </span>
        </div>
        <PanelMenu model={menu} />
        {this.renderOverlayPanel()}
      </div>
    );
  }
}

MOTCSider.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  menu: PropTypes.array,
  apps: PropTypes.array,
};

MOTCSider.defaultProps = { title: "", width: 250, menu: [], apps: [] };

export default MOTCSider;
