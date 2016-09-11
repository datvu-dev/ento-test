var InstallCounter = React.createClass({
  render: function() {
    return (
      <div>
        <h4>Number of installs</h4>
        <div id="counter">
          <span>{this.props.data}</span>
          <i className="fa fa-thumbs-o-up"></i>
        </div>
      </div>
    );
  }
});
