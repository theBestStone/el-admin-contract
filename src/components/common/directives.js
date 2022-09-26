import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');

        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (() => {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr];
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr];
            }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const screenWidth = document.body.clientWidth; // body当前宽度
            const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 

            const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
            const dragDomheight = dragDom.offsetHeight; // 对话框高度

            const minDragDomLeft = dragDom.offsetLeft;
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

            const minDragDomTop = dragDom.offsetTop;
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


            // 获取到的值带px 正则匹配替换
            let styL = sty(dragDom, 'left');
            let styT = sty(dragDom, 'top');

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
            } else {
                styL = +styL.replace(/\px/g, '');
                styT = +styT.replace(/\px/g, '');
            };

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft);
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop);
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }

                // 移动当前元素  
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})
Vue.directive('signDrag', {
    bind (el, binding, vnode) {
         
         if(binding.value){
            
            if(binding.value['not-allowed']){
              return false;
            }
         }
        let dragBox = el; //获取当前元素.cloneNode(true); 
        // this获取不到，所以要通过传参的方式做出来，是这个指令自带的参数
        var _self = vnode.context;
   
        // 当前元素位置
        const screenWidth = document.body.clientWidth; // body当前宽度
        const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 
        let containerArea = {
            left:0,
            top:0,
            width:0,
            height:0
        }
      
        // if (_self.editInfo.coordinatesX != "") {
        //   dragBox.style.left =
        //     parseInt(_self.editInfo.coordinatesX * (375 - 90)) + "px";
        // }
        // if (_self.editInfo.coordinatesY != "") {
        //   dragBox.style.top =
        //     parseInt(_self.editInfo.coordinatesY * (660 - 90)) + "px";
        // }
        // // 如果当前元素位置为空
        // if (_self.editInfo.coordinatesX == "") {
        //   dragBox.style.left = "0px";
        // }
        // if (_self.editInfo.coordinatesY == "") {
        //   dragBox.style.top = "0px";
        // }
        // 移动盒子
        dragBox.onmousedown = (e) => {
          e.preventDefault();
          let pdfcontainer = document.querySelector('.center-box').querySelector('.pdfcontainer').getBoundingClientRect();
          containerArea={
            left:pdfcontainer.left,
            top:pdfcontainer.top,
            width:pdfcontainer.width,
            height:pdfcontainer.height
          }
       
          
          let dragBoxCopy =  dragBox.querySelector('.drag-tool').cloneNode(true);
          
          dragBoxCopy.style.opacity =0
          dragBoxCopy.style.position = 'absolute'
          dragBoxCopy.style.zIndex = '20000'
          dragBoxCopy.style.border = '1px solid #1257ff'
          document.body.appendChild(dragBoxCopy);
          let width = dragBoxCopy.offsetWidth
          let height  = dragBoxCopy.offsetHeight
          _self.editInfo.boxWidth = width;
          _self.editInfo.boxHeight = height;
          //算出鼠标相对元素的位置
          let disX = e.clientX //- dragBoxCopy.offsetLeft;
          let disY = e.clientY //- dragBoxCopy.offsetTop;
          document.onmousemove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            e.preventDefault();
            var left = e.clientX- width/2// - disX;
            var top = e.clientY- height/2 //- disY;
           
            //移动当前元素
            dragBoxCopy.style.left = left + "px";
            dragBoxCopy.style.top = top + "px";
            dragBoxCopy.style.opacity = 1
            var x = left.toFixed(2);
            var y = top.toFixed(2);
            // 当x为0或者1都使它不能拖动
            if (left <= 0) {
              x = "0.00";
              // 使左边距离的边距为固定的，就不会拖动出去了
              dragBoxCopy.style.left = "0px";
            } else if (left >= screenWidth - 30) {
              x = screenWidth - 30;
              left = screenWidth - 30;
              dragBoxCopy.style.left = left + "px";
            }
            if (top <= 0) {
              y = "0.00";
              dragBoxCopy.style.top = "0px";
            } else if (top >= screenHeight - 30) {
              y = screenHeight - 30;
              top = screenHeight - 30;
              dragBoxCopy.style.top = top + "px";
            }
  
            _self.editInfo.coordinatesX = x;
            _self.editInfo.coordinatesY = y-containerArea.top;
         
            
            if(x-containerArea.left>0&&x-containerArea.left<containerArea.width&&y-containerArea.top>0&&y-containerArea.top<containerArea.height){
                dragBoxCopy.style.cursor = 'move'
            }else{
                dragBoxCopy.style.cursor = 'not-allowed'
            }
          };
          document.onmouseup = (e) => {
            let par = dragBoxCopy.parentElement;
           
            
              dragBoxCopy.remove();
            if(_self.editInfo.coordinatesX-containerArea.left>0&&_self.editInfo.coordinatesX-containerArea.left<containerArea.width&&_self.editInfo.coordinatesY>0&&_self.editInfo.coordinatesY<containerArea.height){
                _self.inPdf();
            }
            e.preventDefault();
            //鼠标弹起来的时候不再移动
            document.onmousemove = null;
            //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            document.onmouseup = null;
          };
        };
      }
    
})
