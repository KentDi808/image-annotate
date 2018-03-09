import React from 'react';
import PropTypes from 'prop-types';
import { annotations } from '../data';
import { AnnotationCalloutElbow } from 'react-annotation';
import { saveSvgAsPng } from 'save-svg-as-png';

const xlinkNameSpace = 'http://www.w3.org/1999/xlink';

const annotationMap = {
	AnnotationCalloutElbow
}

export default class Main extends React.Component{
	static propsTypes = {
		height: PropTypes.number,
		width: PropTypes.number,
	}

	constructor (...args) {
		super(...args);

		this.state = {
			annotations: annotations,
			selected: {}
		}
	}

	componentDidMount () {
		this.loadImage();
	}

	onClick = () => {
		saveSvgAsPng(this.node, 'test.png');
	}

	onDragEnd = (id, props) => {
		const selected = this.state.annotations.find((annot) => {
			return id === annot.id;
		});
		if (selected) {
			selected.x = props.x;
			selected.y = props.y;
			selected.dx = props.dx;
			selected.dy = props.dy;
		}
	}

	onLoad = (one, two, three) => {
		const i = 0;
	}

	getUniqueId (string) {
		return `${string}${Date.now().toString(36).slice(2)}`;
	}

	render () {
		return (
			<div>
				<canvas
					ref={ n => this.canvas = n }
				/>
				<svg
					height={ this.props.height }
					xmlnsXlink={ xlinkNameSpace }
					width={ this.props.width }
					ref={ n => this.node = n }
				>
					<image
						width="600" 
						height="529"
						ref={ n => this.img = n }
					/>
					<g>
						{ this.renderAnnotations() }
					</g>
				</svg>
				<input type="button" onClick={ this.onClick } value="Save" />
			</div>
		)
	}

	renderAnnotations () {
		return this.state.annotations.map((annot, i) => {
			const Annotation = annotationMap[annot.type];
			const { x, y, dx, dy, note, editMode, color } = annot;
			annot.id = this.getUniqueId('annot');
			return (
				<Annotation
					key={ `annot${i}` }
					x={ x }
					y={ y }
					dx={ dx }
					dy={ dy }
					onDragEnd={ this.onDragEnd.bind(this, annot.id) }
					note={ note }
					color={ color }
					editMode={ editMode }
				/>
			)
		});
	}

	loadImage = () => {
		const { canvas } = this;
		const ctx = this.canvas.getContext('2d');
		const img = new Image();
		// img.crossOrigin = "Anonymous";
		img.addEventListener('load', () => {
			canvas.setAttribute('width', img.naturalWidth);
			canvas.setAttribute('height', img.naturalHeight)
			ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
			this.img.setAttributeNS(xlinkNameSpace, 'href', canvas.toDataURL('image/png'));
		})
		img.src = "img/mdn_logo_only_color.png";
	}
}
