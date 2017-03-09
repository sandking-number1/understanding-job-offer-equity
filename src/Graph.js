import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from "jquery";
import Tooltip from './Tooltip.js'

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investorShares: 0,
      founderShares: 0,
      companyPool: 0,
    };
  }

  componentWillMount() {
    this.createLikelyDistribution();
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

    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });


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
    this.createPie('.pieID--after-cliff' );
    this.createPie('.pieID--after-full-vest' );
    this.createPie('.pieID--more-likely' );
  }


  createLikelyDistribution() {
    const options = ['Seed', 'SeriesA', 'SeriesB', 'SeriesC'];

    const totalShares = 100 / this.props.yourLikelySharePercentage * this.props.initialEmployeeShares
    const investorShares = totalShares / 2;
    const founderShares = totalShares / 4;
    const companyPool = totalShares - this.props.initialEmployeeShares - founderShares - investorShares;
    console.log('about to setState like wild ', totalShares, investorShares, founderShares)
    this.setState({
      investorShares: investorShares,
      founderShares: founderShares,
      companyPool: companyPool
    })
  }


  render() {
    return (
      <div className="wrapper">
        <div className="pie-charts">
          <div className="pieID--after-cliff pie-chart--wrapper">
            <h2>After Cliff</h2>
            <div className="pie-chart">
              <div className="pie-chart__pie"></div>
              <ul className="pie-chart__legend">
                <li><em>Rest of the Company</em><span>{this.props.initialCompanyShares}</span></li>
                <li><em>Your Shares</em><span>{Math.round(this.props.initialEmployeeShares/this.props.vestingPeriod*(this.props.cliffPeriod/12))}</span></li>
              </ul>
            </div>
          </div>
          <div className="pieID--after-full-vest pie-chart--wrapper">
            <h2>After Full Vest</h2>
            <div className="pie-chart">
              <div className="pie-chart__pie"></div>
              <ul className="pie-chart__legend">
                <li><em>Rest of the Company</em><span>{this.props.initialCompanyShares}</span></li>
                <li><em>Your Shares</em><span>{this.props.initialEmployeeShares}</span></li>
              </ul>
            </div>
          </div>
          <div className="pieID--more-likely pie-chart--wrapper">
            <h2>More Likely Scenario</h2><Tooltip />
            <div className="pie-chart">
              <div className="pie-chart__pie"></div>
              <ul className="pie-chart__legend">
                <li><em>Investors</em><span>{this.state.investorShares}</span></li>
                <li><em>Founders</em><span>{this.state.founderShares}</span></li>
                <li><em>Company Pool</em><span>{this.state.companyPool}</span></li>
                <li><em>Your Shares</em><span>{this.props.initialEmployeeShares}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Graph;