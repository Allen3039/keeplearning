const _container = document.createElement('div');
_container.style.cssText =
  'display:flex;width:100vw;height:100vh;align-items:center;justify-content:center;';

document.body.appendChild(_container);
const hoc = (C) => {
  return class HOC extends C {
    constructor(props) {
      super(props);
    }

    render() {
      console.log(this);
      if (this.state.loading) {
        return ReactDOM.createPortal(<div>loading</div>, _container);
      } else {
        return super.render();
      }
    }
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '还没加载好',
      loading: true,
    };
  }

  render() {
    return <div>{this.state.msg}</div>;
  }

  componentDidMount() {
    let loading = this.state.loading;
    setTimeout(() => {
      this.setState({
        loading: !loading,
        msg: '加载完辽!',
      });
    }, 3000);
  }
}
const App = hoc(Home);

ReactDOM.render(<App />, window.root);
