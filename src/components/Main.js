require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
let imageDatas = require('../data/imageDatas.json');

class AppComponent extends React.Component {
  Constant:{
  	centerPos:{
  		left:0,
  		right:0
  	},
  	hPosRange:{				//水平方向的取值范围
  		leftSecX:[0,0],
  		rightSecX:[0,0],
  		y:[0,0]
  	},
  	vPosRange:{				//垂直方向上的取值范围
			x:[0,0],
			topY:[0,0]
  	}
  },
  
  getInitialState(){
  	return {
  		imgsArrangeArr: [
  			/*
  			{
  				pos:{
  					left:'0',
  					top:'0'
  				}
  			}*/
  		]
  	};
  };
  
  //组件加载以后，为每个图片计算其位置的范围
  componentDidMount(){
  	
  	//首先拿到舞台的大小
  	var stageDOM = React.findDOMNode(this.refs.stage),
  			stageW = stageDOM.scrollWitdh,
  			stageH = stageDOM.scrollHeight,
  			halfStageW = Math.ceil(stageW / 2),
  			halfStageH = Math.ceil(stageH / 2);
  	
  	//获取imgFigure大小
  	var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
  			imgFigureW = imgFigureDOM.scrollWidth,
  			imgFigureH = imgFigureDOM.scrollHeight,
  			halfImgW = Math.ceil(imgFigureW / 2),
  			halfImgH = Math.ceil(imgFigureH / 2);
  	
  	//计算中心图片的位置点
  	this.Constant.centerPos = {
  		left: halfStageW - halfImgW,
  		top: halfStageH - halfImgH
  	};
  	
  	//计算左侧和右侧的位置点
  	this.Constant.hPosRange.leftSecX[0] = -halfImgW;
  	this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
  	this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
  	this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
  	this.Constant.hPosRange.y[0] = -halfImgH;
  	this.Constant.hPosRange.y[1] = stageH - halfImgH;
  	
  	this.Constant.vPosRange.topY[0] = -halfImgH;
  	this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
  	this.Constant.vPosRange.x[0] = halfImgW - imgFigureW;
  	this.Constant.vPosRange.x[1] = halfImgW;
  	
  	this.reaRange(0);
  };
  
  /**
   * 重新布局所有图片
   * @param 指定重新排布哪些图片
   * 
   * */
  reaRange(centerIndex){
  	var imgsArrangeArr = this.state.imgsArrangeArr,
  			Constant = this.Constant,
  			centerPos = Constant.centerPos,
  			hPosRange = Constant.hPosRange,
  			vPosRange = Constant.vPosRange,
  			hPosRangeRightSecX = h.hPosRange.rightSecX,
  			hPosRangeLeftSecX = h.hPosRange.leftSecX,
  			hPosRangeY = hPosRange.y,
  			vPosRangeTopY = vPosRange.topY,
  			vPosRangeX = vPosRange.x,
  			
  			imgsArrangeTopArr = [],
  			topImgNum = Math.ceil(Math.random() * 2),		//取一个或者不取
  			topImgSpliceIndex = 0,
  			
  			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
  			
  			//首先居中centerIndex的图片
  			imgsArrangeCenterArr[0].pos = centerPos;
  			
  			//取出要布局上册的图片的状态信息
  			topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
  			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
  			
  			//布局位于上侧的图片
  			for(let i = 0; i < imgsArrangeTopArr.length; i++){
  				imgsArrangeTopArr[i].pos = {
  					top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
  					left: getRangeRandoe(vPosRangeX[0],vPosRangeX[1])
  				};
  			}
  			
  			//布局左右两侧的图片
  			for(let i = 0,j = imgsArrangeArr.length,k = j /2; i < j;i++){
  				let hPosRangeLORX = null;
  			
  				//前半部分布局在左边，后半部分布局在右边
  				if(i < k){
  					hPosRangeLORX = hPosRangeLeftSecX;
  				}else{
  					hPosRangeLORX = hPosRangeRightSecX;
  				}
  				//随机布局位置
  				imgsArrangeArr[i].pos = {
  					top: getRangeRandom(hPosRange[0].hPosRange[1]),
  					left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
  				}
  			}
  };
  
  /*
   * 获取区间内的一个随机值
   * 
   * */
  getRangeRandom(low,high){
  	return Math.ceil(Math.random() * (high - low));
  }
  
  
  getImageURL(imageDatasArr){
  	for(let i = 0; i < imageDatasArr.length; i++){
  		let singleImageData = imageDatasArr[i];
  		singleImageData.imageURL = require("../images/"+
  			singleImageData.fileName);
  		imageDatasArr[i] = singleImageData
  	}
  	return imageDatasArr;
  };
	
  render() {
  	imageDatas = this.getImageURL(imageDatas);
  	var controllerUnits = [],
  		imgFigures = [];

  	for(let j = 0; j< imageDatas.length; j++){
  		//首先初始化每个img的imgRangeArr
  		if(!this.state.imgsArrangeArr[j]){
  			this.state.imgsArrangeArr[j] = {
  				pos:{
  					left: 0, 
  					top: 0
  				}
  			}
  		}
  		let value = imageDatas[j];
  		imgFigures.push(<ImgFigure key={"imgFigure"+j} data={value}/>);
  	}  
    return (
      <section className="stage" ref="stage">
      	<section className="img-sec">
      		{imgFigures}
      	</section>	
      	<nav className="controller-nav">
      		{controllerUnits}
      	</nav>
      </section>
    );
  }
}

class ImgFigure extends React.Component{

	render(){
		return(
			<figure className="img-figure">
				<img src={this.props.data.imageURL}
					alt={this.props.data.title}
				/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
