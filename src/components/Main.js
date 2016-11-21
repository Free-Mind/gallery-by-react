require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
let imageDatas = require('../data/imageDatas.json');

class AppComponent extends React.Component {
  
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
  		let value = imageDatas[j];
  		imgFigures.push(<ImgFigure key={j} data={value}/>);
  	}  
    return (
      <section className="stage">
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
