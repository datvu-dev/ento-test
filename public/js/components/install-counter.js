var InstallCounter = React.createClass({
  render: function() {
    return (
      <div>
        <h4>Number of installs</h4>
        <div id="counter">
          <i className="fa fa-thumbs-o-up"></i>
          <span>{this.props.data}</span>
        </div>
      </div>
    );
  }
});
