//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function largestHistogramCanvas(dom, dataInp) {

            var s_index = 0;
            var e_index = 0;
            var lg_height = 0;
            var delay = 200;

            function largest_histogram(hist) {

                var stack = [];
                var max_area = 0;
                var i = 0;

                while (i < hist.length) {
                    if (stack.length === 0 ||
                        hist[i] >= hist[stack[stack.length-1]]) {
                        stack.push(i);
                        i += 1;
                    } else {
                        var p = stack.pop();
                        var new_area = 
                            hist[p] * (stack.length ?
                                i - stack[stack.length-1] - 1 : i);
                        if (new_area > max_area) {
                            max_area = new_area;
                            e_index = i - 1;
                            s_index
                                = stack.length && stack[stack.length-1] + 1;
                            lg_height = hist[p];
                        }
                    }
                }

                while (stack.length) {
                    var p = stack.pop();
                    var new_area = 
                        hist[p] * (stack.length ?
                            i - stack[stack.length-1] - 1 : i);
                    if (new_area > max_area) {
                        max_area = new_area;
                        e_index = i - 1;
                        s_index
                            = stack.length && stack[stack.length-1] + 1;
                        lg_height = hist[p];
                    }
                }
                return max_area;
            }

            var color = {
                blue: "#65A1CF",
                orange: "#FAAB00",
            };
            var attr = {
                rect: {
                    'stroke': color.orange,
                    'stroke-width': 0,
                    'fill': color.blue
                },
                text: {
                    "stroke": color.blue, 
                    "font-size": 20,
                    'font-family': "Verdana"
                },
            };
            var paper_width = 333;
            var text_height = 40;
            var highest = Math.max.apply(null, dataInp);
            var cellSize = Math.min(
                Math.min(30, paper_width / highest), 
                Math.min(30, paper_width / dataInp.length)
            );
            var paper = Raphael(dom, 
                paper_width,
                cellSize * highest + text_height,
                0, 0);
            var left_margin
                = (paper_width - dataInp.length * cellSize) / 2;

            for(var i=0; i < dataInp.length; i += 1) {
                paper.rect(
                    i * cellSize + left_margin, 
                    cellSize * (highest - dataInp[i]) + text_height, 
                    cellSize,
                    cellSize * dataInp[i]
                ).attr(attr.rect).attr("fill", color.blue);
            }

            // largest
            largest_histogram(dataInp);
            var largest = paper.rect(
                s_index * cellSize + left_margin, 
                cellSize * (highest - lg_height) + text_height, 
                cellSize * (e_index - s_index + 1), 
                cellSize * lg_height
            ).attr(attr.rect);

            largest.animate({
                'fill': color.orange}, delay * 3 * 1.5);

            // text
            var attrText = {
                "stroke": color.blue, 
                "font-size": 20,
                'font-family': "Verdana",
            };
            var t = '[' + s_index + ': ' + (e_index + 1)
                    + '] * ' + lg_height;
            var letters
                = paper.text(paper_width / 2, 20, t).attr(attrText);
        }

        var io = new extIO({
            functions: {
                js: '',
                python: 'largest_histogram'
            },
            multipleArguments: true,
            animation: function($expl, data){
                largestHistogramCanvas(
                    $expl[0],
                    data.in)
            }
        });
        io.start();
    }
);
