var App = React.createClass({
  /*
   ** Get the latest number of installs.
  */
  loadInstallsNumber: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.length}); // assign data.
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  /*
   ** Update the number of installs.
  */
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

        // update the state of installation of add-ons.
        localStorage.setItem('add-ons', newState);
        this.setState({addonState: localStorage.getItem('add-ons')});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.route.url, status, err.toString());
      }.bind(this)
    });
  },
  /*
   ** Check local storage and assign new value if they are empty.
  */
  checkLocalStorage: function() {
    // this indicates whether add-ons are installed.
    if (!localStorage.getItem('add-ons')) {
      localStorage.setItem('add-ons', 'disabled');
    }

    // this serves as a unique id for each browser.
    if (!localStorage.getItem('time')) {
      localStorage.setItem('time', Date.now());
    }

    this.setState({addonState: localStorage.getItem('add-ons')});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadInstallsNumber();
    this.checkLocalStorage();

    // load number of installs every second.
    setInterval(this.loadInstallsNumber, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <div id="add-ons" className={this.state.addonState}>
          <Title />
          <CheckMark />
          <Description />
          <ToggleSwitch handleUpdate={this.updateInstallsNumber} />
        </div>
        <Divider />
        <div id="installs-number">
          <InstallCounter data={this.state.data} />
          <AdText />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App url="/api/installs" pollInterval={1000} />,
  document.getElementById('main')
);
