// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg wrapper and appending SVG group to hold chart
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

};

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale)

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis)

  return xAxis
};

// function used for updating circles group with a transition to
// new circles
// function renderCircles(circlesGroup, newXScale, chosenXaxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]))

//   return circlesGroup
// };

// // function for updating circles group
// function updateToolTip(chosenXAxis, circlesGroup) {

//   if (chosenXAxis == "poverty") {
//     var label = "Poverty:"
//   } else {
//     var label = "XXX:"
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function (d) {
//       return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function (data) {
//       toolTip.show(data);
//     })
//     // onmouseout event
//     .on("mouseout", function (data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup
// }

//retrive csv data
d3.csv("data.csv", function (error, Povertydata) {
  if(error) throw error;

  // parse data (poverty, smokers, healthcare, age)
  Povertydata.forEach(function (data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.healthcare = +data.healthcare;
    data.smokes = +data.smokes;
  });


 // xlinearscale function 
  var xLinearScale = xScale(data, chosenXAxis)

  // create y scale function
var yLinearScale = d3.scaleLinear()
.domain([0,d3.max(data, d=> d.healthcare)])
.range([height, 0]);

//   //create axis function
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

// // append x axis
// var xAxis = chartGroup = d3.append("g")
// .classed("x-axis", true)
// .attr("transform", `translate(0,${height})`)
// .call(bottomAxis)

// //append y axis
// chargGroup.append("g")
// .call(leftaxis)

// //append circles

// var circlesGroup = chartGroup.selectAll("circle")
// .data(data)
// .enter()
// .append("circle")
// .attr("cx", d=>xLinearScale(d[chosenXAxis]))
// .attr("cy", d=> yLinearScale(d[healthcare]))
// .attr("r", 20)
// .attr("fill", "red")
// .attr("opacity", ".5");

// //update tooltip
// var circlesGroup = updateTiiptop(chosenXAxis, circlesGroup)

});