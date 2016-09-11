var App = React.createClass({
  loadInstallsNumber: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.length});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateInstallsNumber: function() {
    var id = localStorage.getItem('time').toString();
    var state = localStorage.getItem('add-ons');
    var data = {
      id: id,
      state: state
    }

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        var newState = (state == 'enabled') ? 'disabled' : 'enabled';

        localStorage.setItem('add-ons', newState);

        // this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        // this.setState({data: comments});
        console.error(this.props.route.url, status, err.toString());
      }.bind(this)
    });
  },
  checkLocalStorage: function() {
    if (!localStorage.getItem('add-ons')) {
      localStorage.setItem('add-ons', 'disabled');
    }

    if (!localStorage.getItem('time')) {
      localStorage.setItem('time', Date.now());
    }
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadInstallsNumber();
    this.checkLocalStorage();
  },
  render: function() {
    return (
      <div>
        <Heading />
        <Description />
        <ToggleSwitch handleUpdate={this.updateInstallsNumber} />
        <InstallCounter data={this.state.data} />
        <AdText />
      </div>
    );
  }
});

ReactDOM.render(
  <App url="/api/installs" />,
  document.getElementById('main')
);
