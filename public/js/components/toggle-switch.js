var ToggleSwitch = React.createClass({
  handleToggle: function(e) {
    $(e.target).attr('disabled', true);
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
          <div className="slider"></div>
        </label>
      </div>
    );
  }
});
