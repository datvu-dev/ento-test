var InstallCounter = React.createClass({
  render: function() {
    return (
      <div id="counter">
        <span>{this.props.data}</span>
        <i className="fa fa-thumbs-o-up"></i>
      </div>
    );
  }
});
