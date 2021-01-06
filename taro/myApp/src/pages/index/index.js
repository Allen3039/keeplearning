import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd } from '../../actions/counter';

import './index.less';

@connect(
  ({ counter }) => ({
    counter,
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    },
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onShareAppMessage() {
    console.log('右上角');
  }
  navToHello() {
    Taro.navigateTo({
      url: '/pages/hello/index',
    });
  }
  render() {
    let numbers = [1, 2, 3, 4];
    // numbers.map((number) => {
    //   let isOdd = false
    //   if (number % 2) {
    //     isOdd = true
    //   }
    //   return isOdd && <Custom />
    // })
    return (
      <View className="index">
        <Button className="add_btn" onClick={this.props.add}>
          +
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </Button>

        <Button onClick={this.navToHello}>go hello</Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
          {numbers.map(number => {
            let isOdd = false;
            if (number % 2) {
              isOdd = true;
            }
            return isOdd && <Text>{number}</Text>;
          })}
        </View>
      </View>
    );
  }
}

export default Index;
