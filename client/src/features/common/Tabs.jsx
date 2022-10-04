import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';


class Tabs extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Array).isRequired,
    }
  
    constructor(props) {
      super(props);
  
      this.state = {
        activeTab: this.props.children[0].props.label,
      };
    }
  
    onClickTabItem = (tab) => {
      this.setState({ activeTab: tab });
    }
    
    render() {
        const {
          onClickTabItem,
          props: {
            children,
            tabSize
          },
          state: {
            activeTab,
          }
        } = this;
    
        return (
          <div className="tabs bg-base-300">
            <ol className="tab-list">
              {children.map((child) => {
                const { label } = child.props;
    
                return (
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                    tabSize={tabSize}
                  />
                );
              })}
            </ol>
            <div className="tab-content w-full bg-base-100">
              {children.map((child) => {
                if (child.props.label !== activeTab) return null;
                return child.props.children;
              })} 
            </div>
          </div>
        );
      }
    }
    
    export default Tabs;