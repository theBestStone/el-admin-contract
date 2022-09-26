<template>
    <div>
        <!-- <button @click="send">发消息</button> -->
    </div>
</template>

<script>
import { messagews, rooms } from '../../api/ws.js';
 
export default {
    data() {
        return {
            path: '',
            socket: '',
            websock: null, //建立的连接
            lockReconnect: false, //是否真正建立连接
            timeout: 10 * 1000, //20秒一次心跳
            timeoutObj: null, //心跳心跳倒计时
            serverTimeoutObj: null, //心跳倒计时
            timeoutnum: null //断开 重连倒计时
        };
    },
    created() {
        // //页面刚进入时开启长连接
        // this.initWebSocket();
        window.addEventListener('beforeunload', e => this.closed(e));
    },
    beforeDestroy() {
        //页面销毁时关闭长连接
        // this.closed();
        window.removeEventListener('beforeunload', e => this.closed(e));
    },
    methods: {
        closed() {
            if (this.websock) {
                this.websock.close();
            }
            clearTimeout(this.timeoutnum);
            clearTimeout(this.serverTimeoutObj);
            clearTimeout(this.timeoutObj)
            // if (this.websock.readyState === 1) {
            //   this.websocketsend([{}]) // 用于关闭ws连接
            // }
        },
        isWho(type, obj) {
            if (type == 'message') {
                this.path = messagews();
            } else if (type == 'room') {
                this.path = rooms(obj);
            }
            this.initWebSocket();
        },
        initWebSocket() {
            //建立连接
            //初始化weosocket
            //   const wsuri = "ws://localhost:9998/echo";
            //建立连接
            this.websock = new WebSocket(this.path);
            //连接成功
            this.websock.onopen = this.websocketonopen;

            //连接错误
            this.websock.onerror = this.websocketonerror;
            //接收信息
            this.websock.onmessage = this.websocketonmessage;
            //连接关闭
            this.websock.onclose = this.websocketclose;
        },

        reconnect() {
            //重新连接
            console.log('重新连接')
            var that = this;
            if (that.lockReconnect) {
                return;
            }
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function() {
                //新连接
                that.initWebSocket();
                that.lockReconnect = false;
            }, 5000);
        },
        reset() {
            //重置心跳
            var that = this;
            //清除时间
            clearTimeout(that.timeoutObj);
            clearTimeout(that.serverTimeoutObj);

            //重启心跳
            that.start();
        },
        start() {
            //开启心跳

            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);

            self.timeoutObj = setTimeout(function() {
                //这里发送一个心跳，后端收到后，返回一个心跳消息

                if (self.websock.readyState == 1) {
                    //如果连接正常
                    self.websock.send('heart');
                } else {
                    //否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    self.websock.close();
                }, self.timeout);
            }, self.timeout);
        },
        websocketonopen() {
            //连接成功事件
            this.websocketsend('heart');
            //提示成功
            //   console.log("连接成功");
            //开启心跳
            this.start();
        },
        websocketonerror(e) {
            //连接失败事件
            //错误
            console.log('WebSocket连接发生错误');
            //重连
            // this.reconnect();
        },
        websocketclose(e) {
            //连接关闭事件
            //提示关闭
            console.log('链接关闭',e, 'this.websoket2');
            //重连
            // console.log("lian")
            this.$emit('onclose');

            // this.reconnect();
        },
        websocketonmessage(event) {
            //接收服务器推送的信息
            //打印收到服务器的内容
            console.log('data2', event.data);
            let data = event.data;
            //收到服务器信息，心跳重置
            this.$emit('onmessage', data);
            this.reset();
        },
        websocketsend(msg) {
            //向服务器发送信息
            this.websock.send(msg);
        }
    }
};
</script>

<style></style>
