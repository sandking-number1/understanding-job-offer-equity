import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from "jquery";

class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [50, 50, 89, 99, 220, 500, 55, 89],
      categories: [1,2],
      operations: [50, 300, 500]
    };
  }

  componentDidMount() {
    this.createPieCharts();
  }


  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
    const pieElementJSX = findDOMNode(this.refs.pieElement)
    $(pieElement).append("<div class='slice "+ sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;

    $(id + " ." + sliceID).css({
      "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });

    $(id + " ." + sliceID + " span").css({
      "transform"       : "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
      "background-color": color
    });
  }

  iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var
      maxSize = 179,
      sliceID = "s" + dataCount + "-" + sliceCount;

    if( sliceSize <= maxSize ) {
      this.addSlice(id, sliceSize, pieElement, offset, sliceID, color);
    } else {
      this.addSlice(id, maxSize, pieElement, offset, sliceID, color);
      this.iterateSlices(id, sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
    }
  }

  createPie(id) {
    var
      listData      = [],
      listTotal     = 0,
      offset        = 0,
      i             = 0,
      pieElement    = id + " .pie-chart__pie",
      dataElement   = id + " .pie-chart__legend",

      color         = [
        "cornflowerblue",
        "olivedrab",
        "orange",
        "tomato",
        "crimson",
        "purple",
        "turquoise",
        "forestgreen",
        "navy"
      ];
    color = this.shuffle( color );

    if (id === '.pieID--micro-skills') {
      this.state.skills.forEach(function(data) {
        // here we need to push from our state
        listData.push(data)
        // listData.push(Number($(this).html()));
      });
    }
    if (id === '.pieID--categories') {
      this.state.categories.forEach(function(data) {
        // here we need to push from our state
        listData.push(data)
        // listData.push(Number($(this).html()));
      });
    }
    if (id === '.pieID--operations') {
      this.state.operations.forEach(function(data) {
        // here we need to push from our state
        listData.push(data)
        // listData.push(Number($(this).html()));
      });
    }


    for(i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }

    for(i=0; i < listData.length; i++) {
      var size = this.sliceSize(listData[i], listTotal);
      this.iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
      offset += size;
    }
  }

  shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
      return a;
  }

  createPieCharts() {
    this.createPie('.pieID--micro-skills' );
    this.createPie('.pieID--categories' );
    this.createPie('.pieID--operations' );
  }


  render() {
      return (
        <div> HERRO</div>
      );
  }
}
export default Graph;