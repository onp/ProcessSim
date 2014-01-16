var solData = numeric.dopri(0,20,[2,0],function(t,y) { return [y[1], (1-y[0]*y[0])*y[1]-y[0]]; })
console.log(solData)

$(function(){

    var xScale = d3.scale.linear()
        .domain(d3.extent(solData.x))
        .range([40,860])
        
    solData.y = numeric.transpose(solData.y)
        
    console.log(d3.extent(solData.y[0]))
        
    var yScale = d3.scale.linear()
        .domain(d3.extent(solData.y[0]))
        .range([560,40])
        
    var lineFunc = d3.svg.line()
        .x(function(d,i) { return xScale(solData.x[i])})
        .y(function(d) { return yScale(d)})
        
    var dataPoints = []
    for(var i=0;i<solData.x.length;i++){
        dataPoints[i] = {"x":solData.x[i],
                         "y":solData.y[0][i]
                        }
    }
    
    var lineData = solData.y;
    console.log(lineData);
    
    xAxis = d3.svg.axis().scale(xScale);
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    
    var line = d3.select("svg#plot").selectAll("path.sol")
        .data(lineData)
        .enter().append("svg:path")
            .attr("class", "sol")
            .attr("d", function(d){return lineFunc(d)});
    
    var points = d3.select("svg#plot").selectAll("circle")
        .data(dataPoints)
        .enter().append("circle")
            .attr("r",2)
            .attr("cx",function(d){return xScale(d.x)})
            .attr("cy",function(d){return yScale(d.y)})
            
    d3.select("svg#plot")
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 560 + ")")
        .call(xAxis);
        
    d3.select("svg#plot")
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 40 + ",0)")
        .call(yAxis);
    


})
