var ToggleSwitch = React.createClass({
  handleToggle: function() {
    this.props.handleUpdate();
  },
  getInitialState: function() {
    var enabled = false;

    if (localStorage.getItem('add-ons') == 'enabled') {
      enabled = true;
    }

    return {checked: enabled};
  },
  render: function() {
    return (
      <div>
        <label className="switch">
          <input type="checkbox" onChange={this.handleToggle} defaultChecked={this.state.checked} />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
});
