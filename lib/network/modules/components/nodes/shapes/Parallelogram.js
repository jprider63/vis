'use strict';

import NodeBase from '../util/NodeBase'

/**
 * A Parallelogram shape.
 *
 * @extends NodeBase
 */

class Parallelogram extends NodeBase {
  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  constructor (options, body, labelModule) {
    super(options,body,labelModule);
    this._setMargins(labelModule);
    this.angle = 60; // TODO: Get from options?
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);

      this.height = dimensions.height + this.margin.top + this.margin.bottom;
      this.width  = dimensions.width + this.margin.right + this.margin.left + 2 * this.slantWidth();
      this.radius = this.width / 2;
    }
  }

  /**
   *
   */
  slantWidth() {
    // Ensure angle is between 1 and 89.
    var a = Math.max( Math.min( this.angle, 89), 1);

    return this.height / Math.tan(a * Math.PI / 180);
  }


  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.angle = 60; // TODO: get from values?

    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    var d = ctx.parallelogram(this.left, this.top, this.width, this.height, this.slantWidth());
    console.log("here");
    console.log(d);
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    // console.log(this.boundingBox);
    // this.boundingBox.left   -= d;
    // this.boundingBox.right  += d;
    // console.log(this.boundingBox);
    this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left + this.slantWidth(),
                               this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
  }

  // updateBoundingBox(x, y, ctx, selected, hover, d) {
  //   this._updateBoundingBox(x, y, ctx, selected, hover);

  //   // this.boundingBox.left   -= d;
  //   // this.boundingBox.right  += d;
  //   console.log( d);
  //   this._addHorizontalBoundingMargin(d);
  // }
}

export default Parallelogram;
