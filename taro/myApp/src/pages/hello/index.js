import Taro, { Component, createVideoContext } from '@tarojs/taro';
// 引入 MovableArea, CoverView 组件
import {
  Video,
  CoverImage,
  CoverView,
  View,
  Icon,
  Text,
  Textarea,
} from '@tarojs/components';

class Hello extends Component {
  onReady() {
    console.log('ready??');
  }
  play() {
    createVideoContext('myVideo').play();
  }
  refVideo = node => (this.video = node);

  render() {
    return (
      <View>
        <Video
          id="myVideo"
          ref={this.refVideo}
          src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
        >
          <CoverView class="controls">
            <CoverView class="play" onClick={this.play}>
              <CoverImage class="img" src="src" />
            </CoverView>
          </CoverView>
        </Video>

        <Text>输入区域高度自适应，不会出现滚动条</Text>
        <Textarea
          style="background:#fff;width:100%;min-height:80px;padding:0 30rpx;"
          autoHeight
        />
        <Text>这是一个可以自动聚焦的 textarea</Text>
        <Textarea
          style="background:#fff;width:100%;height:80px;padding:0 30rpx;"
          autoFocus
        />
      </View>
    );
  }
}

export default Hello;
