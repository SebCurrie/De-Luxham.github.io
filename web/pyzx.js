

define(['d3'], function(d3) {

    //require(['pyodid'], function(pyodid) {
        languagePluginLoader.then(function ()  {
        pyodide.runPython('print("python is a go!")');
        });  
    //})

    pythonCode = `
      def do_work(*args):
          import pyzx as zx
          print("pyzx imported")
          graph = zx.generate.cliffords(3, 3)
          print(graph)
          print("HELLO WORLD")
      
      

      import micropip
      micropip.install('pyzx').then(do_work)`
      languagePluginLoader.then(() => {
        return pyodide.loadPackage(['micropip'])
      }).then(() => {
        pyodide.runPython(pythonCode);
      })
      pythonCodenetx = `
      def do_work(*args):
          import networkx
          print("network imported")
          
      
      

      import micropip
      micropip.install('networkx').then(do_work)`
      languagePluginLoader.then(() => {
        return pyodide.loadPackage(['micropip'])
      }).then(() => {
        pyodide.runPython(pythonCodenetx);
      })

    // styling functions
    function nodeColor(t) {
        if (t == 0) return "black";
        else if (t == 1) return "green";
        else if (t == 2) return "red";
        else if (t == 3) return "yellow";
        else if (t == 4) return "blue";
    }

    function edgeColor(t) {
        if (t == 1) return "black";
        else if (t == 2) return "#08f";
    }

    function nodeStyle(selected) {
        return selected ? "stroke-width: 2px; stroke: #00f" : "stroke-width: 1.5px";
    }

    return {
    showGraph: function(tag, graph, width, height, node_size, connectivity) {

        arq_gen_code = `import random
ibmq_16_melbourne = {
            "qubits":{
            0:{"fideliy":4.905E-4},
            1:{"fideliy":1.064E-3},
            2:{"fideliy":5.315E-4},
            3:{"fideliy":5.906E-4},
            4:{"fideliy":6.344E-4},
            5:{"fideliy":2.217E-3},
            6:{"fideliy":1.510E-3},
            7:{"fideliy":1.989E-3},
            8:{"fideliy":9.986E-4},
            9:{"fideliy":2.149E-3},
            10:{"fideliy":2.632E-3},
            11:{"fideliy":9.882E-4},
            12:{"fideliy":1.399E-3},
            13:{"fideliy":1.662E-3},
            14:{"fideliy":7.760E-4}
            },
        
            "connections":[
            {"source":0, "target":1, "fidelity":1.922E-2},
            {"source":1, "target":2, "fidelity":1.501E-2},
            {"source":2, "target":3, "fidelity":2.366E-2},
            {"source":3, "target":4, "fidelity":1.669E-2},
            {"source":4, "target":5, "fidelity":2.899E-2},
            {"source":5, "target":6, "fidelity":5.361E-2},
            {"source":0, "target":14, "fidelity":3.452E-2},
            {"source":1, "target":13, "fidelity":4.366E-2},
            {"source":2, "target":12, "fidelity":7.133E-2},
            {"source":3, "target":11, "fidelity":4.214E-2},
            {"source":4, "target":10, "fidelity":3.960E-2},
            {"source":5, "target":9, "fidelity":3.976E-2},
            {"source":6, "target":8, "fidelity":6.480E-2},
            {"source":7, "target":8, "fidelity":5.661E-2},
            {"source":8, "target":9, "fidelity":5.160E-2},
            {"source":9, "target":10, "fidelity":4.849E-2},
            {"source":10, "target":11, "fidelity":3.428E-2},
            {"source":11, "target":12, "fidelity":2.444E-2},
            {"source":12, "target":13, "fidelity":2.808E-2},
            {"source":13, "target":14, "fidelity":3.452E-2}]}
def arq(qubits=[0,1,2,3,4],device = ibmq_16_melbourne):

    our_arq = {
        "qubits":{},
        "connections":{}
    }
        
    for qubit in qubits:
        our_arq["qubits"][qubit] =device["qubits"][qubit]
        
    templist = []
    for item in device["connections"]:
        if item["source"] in qubits and item["target"] in qubits:
            templist.append(item)
    our_arq["connections"] = templist
            
    return our_arq       
        
        
def choose_qubits(n=5,arq=ibmq_16_melbourne):
            
    if len(arq["qubits"]) < n:
        print("There aren't enough qubits on this architecture for this value of n.")
            
    else:
        qubits = []
        start = random.randint(0,len(arq["qubits"])-1)
        qubits.append(start)
        
        while len(qubits) < n:
            templist = []
            for item in arq["connections"]:
                if item["source"] in qubits and item["target"] not in qubits:
                    templist.append(item["target"])
        
                if item["target"] in qubits and item["source"] not in qubits:
                    templist.append(item["source"])
        
            r = random.randint(0,len(templist)-1)
            qubits.append(templist[r])
        
        return qubits
arq(choose_qubits(n=3))`
        
        var conn_placeholder;

        languagePluginLoader.then(() => {
            conn_placeholder = pyodide.runPython(arq_gen_code);
            console.log(conn_placeholder);
        }).then(() => {


    
        //Basic connectivity example
        connectivity = {connections:[{source:0,target:1,fidelity:1.599E-2,t:1,index:0},{source:1,target:2,fidelity:9.855E-3,t:1,index:1},{source:0,target:2,fidelity:4.855E-3,t:1,index:2}]};
        //connectivity = conn_placeholder;
        //calculate min max fidelities for colour coding
        var max_colour = Math.max.apply(Math, connectivity.connections.map(function(o) { return o.fidelity; }));
        var min_colour = Math.min.apply(Math, connectivity.connections.map(function(o) { return o.fidelity; }));

        //function def to map fidelitleys to colour scale 100-200 for now
        function colour_scale(x) {
            return "rgb(0,0,"+((x-min_colour)/(max_colour-min_colour)*256).toString() +")"
        }
        
        //string to store the rules applied
        var rule_string = "[]";
        
        var ntab = {};
        //hard coded option for node size 
        node_size = 9
        scale = 1;
        auto_hbox = false;
        show_labels = true;
        
        graph.nodes.forEach(function(d) {
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
        });

        var spiders_and_boundaries = graph.nodes.filter(function(d) {
            return d.t != 3;
        });

        graph.links.forEach(function(d) {
            var s = ntab[d.source];
            var t = ntab[d.target];
            d.source = s;
            d.target = t;
            s.nhd.push(t);
            t.nhd.push(s);
        });

        var shiftKey;
        
        //New var added for force simulation
        var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
        .id(function(d) { return d.id; }).strength(0.03))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(width / 2, height / 2))
    

        
        // SETUP SVG ITEMS

        var svg = d3.select(tag)
            //.attr("tabindex", 1)
            .on("keydown.brush", function() {shiftKey = d3.event.shiftKey || d3.event.metaKey;})
            .on("keyup.brush", function() {shiftKey = d3.event.shiftKey || d3.event.metaKey;})
            //.each(function() { this.focus(); })
            .append("svg")
            .attr("style", "max-width: none; max-height: none")
            .attr("width", width + 100)
            .attr("height", height + 500);
            //added offset to dimensions of canvas


        //Set up connectivity graph inbetween these lines
        //Connectivity Graph
        //This section generates a directed graph underneath the input qubits 
        //It shows the connectivity between the qubits
        
        var num_qubits = (graph.nodes.filter(function(d) {return d.t == 0;}).length)/2;
        var qnodes = []

        for (let i = 0; i < num_qubits; i++) {
            qnodes.push({name:i, x:graph.nodes[i].x, y:graph.nodes[i].y, t:4,empty:false, phase:'', selecetd:false, previouslySelected:false, index:i, vy:0, vx:0});
        }

        //updates the connectivity object with node object data
        for (let i = 0; i < connectivity.connections.length; i++) {

            // connectivity.connections[i].source = graph.nodes[connectivity.connections[i].source];
            // connectivity.connections[i].target = graph.nodes[connectivity.connections[i].target];
            connectivity.connections[i].source = qnodes[connectivity.connections[i].source];
            connectivity.connections[i].target = qnodes[connectivity.connections[i].target];
        }

        var connectivity_graph = {nodes: qnodes,links:connectivity.connections};
        console.log(connectivity_graph);
        // build the arrow.
        svg.append("svg:defs").selectAll("marker")
           .data(["end"])      // Different link/path types can be defined here
           .enter().append("svg:marker")    // This section adds in the arrows
           .attr("id", String)
           .attr("viewBox", "0 -5 10 10")
           .attr("refX", 15)
           .attr("refY", -1.5)
           .attr("markerWidth", 6)
           .attr("markerHeight", 6)
           .attr("orient", "auto")
           .append("svg:path")
           .attr("d", "M0,-5L10,0L0,5");
        
           //x offset variable for drawing curves for connectivity graph
       var x_off = -100;
       var clink  = svg.append("g")
       .attr("class", "link")
       .selectAll("line")
       .data(connectivity_graph.links)
       .enter().append("path")
       .attr("stroke", function(d) {return colour_scale(d.fidelity)})
       .attr("style", "stroke-width: 1.5px")
       //.attr("marker-end", "url(#end)")
       .attr("d",function(d) {
           console.log("M" + d.source.x + "," + d.source.y  + ","+"Q" + (d.source.x+d.target.x)/2 + x_off + "," + (d.source.y+d.target.y)/2 + "," + d.target.x + "," +d.target.y);
           return "M" + d.source.x + "," + d.source.y + ","+ "Q" + ((parseFloat(d.source.x)+parseFloat(d.target.x)/2) + parseFloat(x_off)).toString() + "," + (d.source.y+d.target.y)/2 + "," + d.target.x + "," +d.target.y
       })
       .attr("fill", "none");

       
       var cnode = svg.append("g")
           .attr("class", "node")
           .selectAll("g")
           .data(connectivity_graph.nodes)
           .enter().append("g")
           .attr("transform", function(d) {
               return "translate(" + d.x + "," + d.y +")";
           });

       cnode.append("circle")
           .attr("r", function(d) {
              return 0.75*node_size;
           })
           .attr("fill", function(d) { return nodeColor(d.t); })
           .attr("stroke", "black");


        //End of connectivity graph setup

        var link = svg.append("g")
            .attr("class", "link")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke", function(d) { return edgeColor(d.t); })
            .attr("style", "stroke-width: 1.5px")
            .attr("class", "link").on("click", function(d) { console.log("clicked");});

        //added new attribute name, type and nhd
        
        var node = svg.append("g")
            .attr("class", "node")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y +")";
            });

        node.filter(function(d) { return d.t != 3; })
            .append("circle")
            .attr("r", function(d) {
               if (d.t == 0) return 0.5 * node_size;
               else return node_size;
            })
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        var hbox = node.filter(function(d) { return d.t == 3; });

        hbox.append("rect")
            .attr("x", -0.75 * node_size).attr("y", -0.75 * node_size)
            .attr("width", node_size * 1.5).attr("height", node_size * 1.5)
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        node.filter(function(d) { return d.phase != ''; })
            .append("text")
            .attr("y", 0.7 * node_size + 14)
            .text(function (d) { return d.phase })
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-family", "monospace")
            .attr("fill", "#00d");

        if (show_labels) {
            node.append("text")
                .attr("y", -0.7 * node_size - 5)
                .text(function (d) { return d.name; })
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .attr("font-family", "monospace")
                .attr("fill", "#ccc");
        }

        
        
       

    

    
        //New variables added between these lines
        //dimension variables have offsets, hard coded for now but that may change
        var width = svg.attr("width"),
            height = svg.attr("height")+1,
            radius = node_size;

        var node_count = graph.nodes.length,
            link_count = graph.links.length;
        
        
        
        //variable to hold slice graphic
        var slice = svg.append("g")
            .attr("class", "link")
            .append("line")
            .attr("stroke", "black")
            .attr("style", "stroke-width: 1.5px")
            .attr("id", "slice");

        //Trying Slice implementation without graphic
        var slice_nog = {x1:null, y1: null, x2: null, y2:null};
            
        var rule_applied = false;
        

        
        //End of new variables
        
        //New functions added between these lines
        
        //graph update
        function update() {
        
        console.log("graph updated");
        
        

            
            svg.selectAll("g").remove();

            clink  = svg.append("g")
                .attr("class", "link")
                .selectAll("line")
                .data(connectivity_graph.links)
                .enter().append("line")
                .attr("stroke", "black")
                .attr("style", "stroke-width: 1.5px")
                .attr("marker-end", "url(#end)");
         
                
                 cnode = svg.append("g")
                    .attr("class", "node")
                    .selectAll("g")
                    .data(connectivity_graph.nodes)
                    .enter().append("g")
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y +")";
                    });
         
                cnode.append("circle")
                    .attr("r", function(d) {
                       return 0.75*node_size;
                    })
                    .attr("fill", function(d) { return nodeColor(d.t); })
                    .attr("stroke", "black");
         
                    clink.attr("x1", function(d) { return d.source.x; })
                 .attr("y1", function(d) { return d.source.y; })
                 .attr("x2", function(d) { return d.target.x; })
                 .attr("y2", function(d) { return d.target.y; }); 
            
            
            
            
            link = svg.append("g")
            .attr("class", "link").selectAll("line").data(graph.links).enter().append("line")
            .attr("stroke", function(d) { return edgeColor(d.t); })
            .attr("style", "stroke-width: 1.5px");
            
            node = svg.append("g")
                .attr("class", "node")
                .selectAll("g")
                .data(graph.nodes)
                .enter()
                .append("g")
                .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y +")";
            });
            
            

        

        node.filter(function(d) { return d.t != 3; })
            .append("circle")
            .attr("r", function(d) {
               if (d.t == 0) return 0.5 * node_size;
               else return node_size;
            })
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

         hbox = node.filter(function(d) { return d.t == 3; });

        hbox.append("rect")
            .attr("x", -0.75 * node_size).attr("y", -0.75 * node_size)
            .attr("width", node_size * 1.5).attr("height", node_size * 1.5)
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        node.filter(function(d) { return d.phase != ''; })
            .append("text")
            .attr("y", 0.7 * node_size + 14)
            .text(function (d) { return d.phase })
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-family", "monospace")
            .attr("fill", "#00d");

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
            
        if (show_labels) {
            node.append("text")
                .attr("y", -0.7 * node_size - 5)
                .text(function (d) { return d.name; })
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .attr("font-family", "monospace")
                .attr("fill", "#ccc");
                }
        
        simulation
                .nodes(graph.nodes.filter(function(d) {return d.t != 0;}))
                .on("tick", ticked);
      
        simulation.force("link")
                .links(graph.links);     
              
            
            console.log(connectivity_graph);
            console.log(graph);
            
            //BIG ASS TEST CODE TEMPOARY BETWEEN THESE LINES
            
            node.on("mousedown", function(d) {
                /*if (shiftKey) {
                    d3.select(this).select(":first-child").attr("style", nodeStyle(d.selected = !d.selected));
                    d3.event.stopImmediatePropagation();
                } else if (!d.selected) {
                    node.select(":first-child").attr("style", function(p) { return nodeStyle(p.selected = d === p); });*/
                    
                    //New stuff for when a node is selected
                
                    d.selected = true;
                    
                    console.log(graph.nodes.filter(function(d) {return d.selected;})[0]);
                    
                    simulation.alphaTarget(0.1).restart();
                    
                //}
            })
            .call(d3.drag().on("drag", function(d) {
                var dx = d3.event.dx;
                var dy = d3.event.dy;
                // node.filter(function(d) { return d.selected; })
                //     .attr("cx", function(d) { return d.x += dx; })
                //     .attr("cy", function(d) { return d.y += dy; });
            
                //added this thing for the force stuf
                simulation.alphaTarget(0.1).restart();
                
                console.log(rule_applied);
                
                if (rule_applied == false) {
                
                    node.filter(function(d) { return d.selected; })
                    .attr("transform", function(d) {
                        d.x += dx;
                        d.y += dy;
                        return "translate(" + d.x + "," + d.y +")";
                    });

                    update_hboxes();

                    link.filter(function(d) { return d.source.selected ||
                                            (auto_hbox && d.source.t == 3); })
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; });

                    link.filter(function(d) { return d.target.selected ||
                                            (auto_hbox && d.target.t == 3); })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                // text.filter(function(d) { return d.selected; })
                //     .attr("x", function(d) { return d.x; })
                //     .attr("y", function(d) { return d.y + 0.7 * node_size + 14; });
                
                //New stuff added to check for collison
                
                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                    
                    //checks for nodes connected of teh same type and by a type 0 edge
                    var connected_same_type_nodes = selected_node.nhd.filter(function(d) {return (selected_node.t == d.t) && (connected_by_type0edge(selected_node,d));});
                
                //apply fusion rule when checks passed
                    var to_fuse = false;
                    var dead_node = {};
                    
                    
                    connected_same_type_nodes.forEach(function(d) {if (collided(d,selected_node)) {
                        to_fuse = true;
                        dead_node = d; 
                    
                    }});
                    
                    
                
                    if (to_fuse == true) {
                        rule_applied = true;
                        console.log(rule_applied);
                        fusion(selected_node,dead_node);
                        to_fuse = false;
                        graph.nodes.forEach(function(d) {d.selected = false;});
                        
                        update();
                        console.log(graph);
                    
                     }

                     //implementation of rule that fuses spiders with one edge to qubit nodes that are empty
                var to_recombine = false;
                var recomb_node = {};
                //first check if selected node has one edge and collides with a qnode that is also empty
                if (selected_node.nhd.length == 1) {
                    qnodes.forEach(function(d) {if (collided(d,selected_node) && d.empty == true){
                        to_recombine = true;
                        recomb_node = d;
                    }})
                }

                //now implement recombination
                if (to_recombine == true) {
                    rule_applied = true;
                    selected_node.t = 0;
                    d.name = selected_node.name;
                    d.empty = false;
                    update();
                    to_recombine = false;

                }
                
                }
                
                
            
                
                 
                    
            
                
                
                 
                
            }).on("end", function() {console.log("mouseup");
                graph.nodes.forEach(function(d) {d.selected = false;}); 
                rule_applied = false;}));


                var timer = 0;
                var delay = 200;
                var prevent = false;
                node.on("click", function(d) {
                    timer = setTimeout(function() {
                        if (!prevent) {
                            d.selected = true;
        
                            var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                            //Implementation of removing ids
                            if ((selected_node.t == 1 || selected_node.t == 2) && selected_node.nhd.length == 2) {
                                console.log("remove id");
                                remove_node(selected_node);
                                update();
                                d.selected = false;
                
                            }
                
                            //Implementation of changing qubit to red spider
                            if (selected_node.t == 0) {
                                if (comb_red == true) {
                                    selected_node.t = 2;
                                    comb_red = false;
                                }
                                else if (comb_red == false) {
                                    selected_node.t = 1;
                                    comb_red = true;
                                }
                                //change connectivity to empty status (used to verify if spider can reconnect to qubit node)
                                qnodes.filter(function(d) {return d.name == selected_node.name}).forEach(function(d){d.empty = true})
                                console.log(qnodes)
                                update();
                                d.selected = false;
                
                            }
                        }
                        prevent = false;
                      }, delay);
        
                }).on("dblclick", function(d) {
                    console.log("complement rule");
                    clearTimeout(timer);
                    prevent = true;

                    d.selected = true;
        
                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
        
                    //chnage colour of node
                    if (selected_node.t == 1) {
                        selected_node.t = 2;
                    }
                    else if (selected_node.t == 2) {
                        selected_node.t = 1;
                    }
                    //change connecting link types
                    var connected_links = graph.links.filter(function(l) {return single_link(l,d);});
                    
                    connected_links.forEach(function(l) {
                        if (l.t == 1) {
                            l.t = 2;
                        }
                        else if (l.t == 2) {
                            l.t = 1;  
                        }
                    })

                    update();
                    console.log(graph)
                
                });

                link.on("mousedown", function(d) {
                    console.log("A link was clicked it was");
                    console.log(d);
                    if (ins_red) {
                        //red id
                        rule_applied = true;
                        add_red_id(d);
                        update();
                        rule_applied = false;
                        ins_red = false
        
                    } else {
                        //green id
                        rule_applied = true;
                        add_green_id(d);
                        update();
                        rule_applied = false;
                        ins_red = true
                    }
                
        
        
        
                });
            
            //END OF BIG ASS TEST
            
            console.log(rule_string);
            
            pythonCode2 = `
            import sys
            import numpy as np
            import random, math, os
            import pyzx as zx
            from fractions import Fraction
            import webbrowser
            import time
            import csv
            
            
            
            #this takes a list as arguement, shape depends on the rule being implemented, but the first element 
            #of each row should be the rule to be implemented.
            
            def Implement_Rules(data):
            
                #temporarily hardcoding graph object in
                qubit_amount = 3
                depth = 4
                random.seed(1337)
                graph = zx.generate.cliffords(qubit_amount, depth)
            
                for i in range(len(data)):
                        print(type(data[i][0]),data[i][0])
                        if data[i][0]=="s":                     #If rule to perform is spider
                            zx.rules.apply_rule(graph, zx.rules.spider, [[int(data[i][1]),int(data[i][2])]], check_isolated_vertices=True)
                            #display(zx.draw(graph,labels=True))
                            print(graph)
                            
                        if data[i][0]=="u":  
                            neighbours=[]                   #If rule to perform is unspider
                            data[i][1]=int(data[i][1])          #target node
                            data[i][2]=Fraction(data[i][2])          #targets phase 
                            data[i][3]=int(data[i][3])          # Qubit/row index - where to position on graph
                            data[i][4]=int(data[i][4])          #Column index (row in pyzx) where to position on graph
                            
                            for j in range(5, len(data[i])):       #Neeed to loop over every nearest neighbour to cast it to integer
                                                                    #start at the nearest neighbour entries
                                neighbours.append(int(data[i][j])) 
                            zx.rules.unspider(graph, [data[i][1], tuple(neighbours),data[i][2] ], data[i][4] , data[i][3] )
                            #display(zx.draw(graph,labels=True))
                            print(graph)
            
            
                #The rules called here were written by me, and require lots more testing and rewriting
                #=============================================================================
                        if data[i][0]=="i":                     
                            neighbours=[]
                            neighbours.append(int(data[i][1]))
                            neighbours.append(int(data[i][2]))  
                            zx.rules.add_identity(graph,tuple(neighbours),data[i][3])
                            #display(zx.draw(graph,labels=True))
                            print(graph)
            
            
                        if data[i][0]=="ri":
                            neighbours=[]
                            neighbours.append(int(data[i][2]))
                            neighbours.append(int(data[i][3]))
                            zx.rules.remove_identity(graph,int(data[i][1]),tuple(neighbours))
                            #display(zx.draw(graph,labels=True))
                            print(graph)
            
            
                
            
                #G_OUT=zx.draw(graph,labels=True)
                #G_OUT.savefig("data/graph.png", format="png")
                html2 ="""<h2>New pyzx graph</h2>
                
                <img src="./data/graph.png" alt="New Circuit" width="500" height="333">
                </body>
                </html>
                """
                
                #p = open(r"circuits.html", "w")
                #p.write(html2)
                #p.close()
                #url = os.getcwd()+'/' + 'circuits.html'
                #webbrowser.open(url,2)
                #==================
                print(graph)
                circ_dat =zx.extract.extract_circuit(graph,optimize_czs=False, optimize_cnots=0).to_basic_gates()
                stats = circ_dat.stats()
                qasm = circ_dat.to_qasm()
                output = {'qasm':qasm,'stats':stats}
                return output
            Implement_Rules(`.concat(rule_string,')')
            
            
                // languagePluginLoader.then(function ()  {
                // console.log(pyodide.runPython('import sys'));
                // console.log(pyodide.runPython(`print('hello world')`));
                // pyodide.remotePath
                // pyodide.remotePath = "https://de-luxham.github.io/"
                // pyodide.runPythonAsync('import Implementer\n')
                // console.log('Implementer imported')
                //pyodide.runPython('Implement_Rules('.concat(rule_string,')'))

                // }); 
                pyodide.loadPackage('matplotlib').then(() => {
                    var qasm,stats,x
                    x = pyodide.runPython(pythonCode2)
                    qasm = x.qasm;
                    stats = x.stats;
                    console.log(qasm);
                    console.log(stats);
                    var circuit = new QuantumCircuit();
                    circuit.importQASM(qasm, function(errors) {
                        console.log(errors);
                    });
                    // Assuming we have <div id="drawing"></div> somewhere in HTML
                    var circ_container = document.getElementById("circuit");
                    var score_container = document.getElementById("score");
                    // SVG is returned as string
                    var svg = circuit.exportSVG(true);

                    // add SVG into container
                    circ_container.innerHTML = svg;

                    score_container.innerHTML = stats;
                  });
                // languagePluginLoader.then(() => {
                //     pyodide.runPython(pythonCode2);
                //   })
        
            
        
        }
        
        //returns true if nodes have collided
        function collided(node1,node2) {
            return 2*radius >= Math.abs(Math.sqrt(Math.pow(node1.x-node2.x,2)+Math.pow(node1.y-node2.y,2)));
        }
        function connected_by_type0edge(node1,node2) {
            //get links connecting nodes
            var connecting_links
            connecting_links = graph.links.filter(function(d) {return (is_link(d,node1,node2)); });
            var type0 = true
            connecting_links.forEach(function(d) {if (d.t == 2){type0 = false}})
            return type0
        }
        //Get index of link that connects two nodes
        function i_link(n1,n2) {
            
            var i =-1;
            
            graph.links.forEach(function(d, index) {
                if (((d.source.name.localeCompare(n1.name) == 0) && (d.target.name.localeCompare(n2.name) == 0)) || ((d.source.name.localeCompare(n2.name) == 0) && (d.target.name.localeCompare(n1.name) == 0))) {
                    return i = index;
                
                }
            } );
            return i;
        }
        
        //does a link connect two nodes
        function is_link(l,n1,n2) {
            return (((l.source.name.localeCompare(n1.name) == 0) && (l.target.name.localeCompare(n2.name) == 0)) || ((l.source.name.localeCompare(n2.name) == 0) && (l.target.name.localeCompare(n1.name) == 0)));
        }
        //does a link connect to a node

        function single_link(l,n) {
            return ((l.source.name.localeCompare(n.name) == 0) || (l.target.name.localeCompare(n.name) == 0))
        }
        
        //Get index of node
        function i_node(n) {
        
            var i = -1;
            
            graph.nodes.forEach(function(d,index) {
                if (d.name.localeCompare(n.name) == 0) {
                    i = index;
                }
             });
             return i;
        }

        //remove ids rule
        function remove_node(selected_node) {

            //removes link between node and first member of nhd
            graph.links = graph.links.filter(function(d) {return !(is_link(d,selected_node,selected_node.nhd[0])); });

            //set links whose target/source is selected node and its second neigbour to the first neighbour
            graph.links.forEach(function(d) {
                if (d.target.name.localeCompare(selected_node.name) == 0) {
                    d.target = selected_node.nhd[0];
                
                }
                if (d.source.name.localeCompare(selected_node.name) == 0) {
                    d.source = selected_node.nhd[0];
                
                }
                
            
            });

            //remove id node
            
            graph.nodes = graph.nodes.filter(function(d) {return d.name != selected_node.name});
        
            
            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });

            console.log(ntab);
            console.log(graph.nodes);
            console.log(graph.links);

            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
        });


            
        }
        
        //fusion rule
        function fusion(selected_node,dead_node) {
        
            console.log("fusion applied");
            
            //remove connecting link
            graph.links = graph.links.filter(function(d) {return !(is_link(d,selected_node,dead_node)); });
            //set links whose target is deadnode to selecetd node
            graph.links.forEach(function(d) {
                if (d.target.name.localeCompare(dead_node.name) == 0) {
                    d.target = selected_node;
                
                }
                if (d.source.name.localeCompare(dead_node.name) == 0) {
                    d.source = selected_node;
                
                }
                
            
            });
            
            //remove dead node
            
            graph.nodes = graph.nodes.filter(function(d) {return d.name != dead_node.name});
            
            console.log(graph);
            
             ntab = {};
            
             graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });

            console.log(ntab);
            console.log(graph.nodes);
            console.log(graph.links);

            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
        });
            
        //code to updat the applied rules string with the fusion rule applied
        var fuse_string = "";
        //case if this is the first rule applied 
        if (rule_string.length == 2){
            
            rule_string = "[[".concat("\"s\"",",",selected_node.name,",",dead_node.name,"]]");
            
        } else {
            rule_string = rule_string.slice(0,-1);
            fuse_string = ",[".concat("\"s\"",",",selected_node.name,",",dead_node.name,"]]");
            rule_string = rule_string.concat(fuse_string);
        }
            
        }
        
        //split rule
        
        function split(sliced_node, s_line) {

            //Gradient of slice
            var m = (s_line.y2 - s_line.y1)/(s_line.x2 - s_line.x1);
            
            //increment the total node count
            node_count++;

            //Add new node to list of nodes, Can do this by copying slcied node appending then changing its values
            var new_node = {name:node_count.toString(), x:sliced_node.x+3, y:sliced_node.y+3, t:sliced_node.t, phase:sliced_node.phase, selecetd:false, previouslySelected:false, index:node_count, vy:0, vx:0};



            graph.nodes.push(new_node);


            //change the connections of existing links

            graph.links.forEach(function(d) {
                if ((d.target.name.localeCompare(sliced_node.name) == 0) && (d.source.y > m*(d.source.x - s_line.x1) +s_line.y1)) {
                    d.target = new_node;
                
                }
                if ((d.source.name.localeCompare(sliced_node.name) == 0) && (d.target.y > m*(d.target.x - s_line.x1) +s_line.y1)) {
                    d.source = new_node;
                
                }
                
             console.log("in links for each loop")
            });

            //create new link connecting the sliced node and the new one

            //increment the link counter
            link_count++;
            
            var new_link = {source: sliced_node , target: new_node, t:1, index: link_count};

            

            //add this link to the links array
            graph.links.push(new_link);

            //re update neighbour connections

            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });


            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
            
            });
        }

        //add red identity 
        function add_red_id(link) {
            //get midpoint of the link to place the new node
            var mid_ptx,mid_pty;
            mid_ptx = (link.source.x + link.target.x)/2;
            mid_pty = (link.source.y + link.target.y)/2;

            //increment the total node count
            node_count++;

            //new node to be added
            var new_node = {name:node_count.toString(), x:mid_ptx, y:mid_pty, t:2, phase:"", selecetd:false, previouslySelected:false, index:node_count, vy:0, vx:0};
            
            //add node to the list of nodes
            graph.nodes.push(new_node);

            //update the links new target
            var placeholder_node = link.target;

            link.target = new_node;

            //increment the link counter
            link_count++;
            
            var new_link = {source: placeholder_node, target: new_node, t:1, index: link_count};

            

            //add this link to the links array
            graph.links.push(new_link);

            //re update neighbour connections

            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });


            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
            
            });




        }
        //add green identity 
        function add_green_id(link) {
            //get midpoint of the link to place the new node
            var mid_ptx,mid_pty;
            mid_ptx = (link.source.x + link.target.x)/2;
            mid_pty = (link.source.y + link.target.y)/2;

            //increment the total node count
            node_count++;

            //new node to be added
            var new_node = {name:node_count.toString(), x:mid_ptx, y:mid_pty, t:1, phase:"", selecetd:false, previouslySelected:false, index:node_count, vy:0, vx:0};
            
            //add node to the list of nodes
            graph.nodes.push(new_node);

            //update the links new target
            var placeholder_node = link.target;

            link.target = new_node;

            //increment the link counter
            link_count++;
            
            var new_link = {source: placeholder_node, target: new_node, t:1, index: link_count};

            

            //add this link to the links array
            graph.links.push(new_link);

            //re update neighbour connections

            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });


            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
            
            });




        }
        
        //checks if slice region contains circle
        //more generally checks if point is contained in box defined by sline
        function in_box(circle, s_line) {
            return (((circle.cx >= s_line.x1 && circle.cx <= s_line.x2) || (circle.cx >= s_line.x2 && circle.cx <= s_line.x1)) && ((circle.cy >= s_line.y1 && circle.cy <= s_line.y2) || (circle.cy >= s_line.y2 && circle.cy <= s_line.y1)));
            }
            
        function cuts_circle(circle, s_line) {
            var m = (s_line.y2 - s_line.y1)/(s_line.x2 - s_line.x1);
            var D = Math.pow(2*m*(-m*s_line.x1 + s_line.y2 - circle.cy)-2*circle.cx,2)-4*(Math.pow(m,2)+1)*(Math.pow(circle.cx,2)+Math.pow(-m*s_line.x1 + s_line.y2 - circle.cy,2)-Math.pow(circle.r,2));
            return D > 0;
        }
        
        //update look of graph stuff
        
        //End of new stuff

        function update_hboxes() {
            if (auto_hbox) {
                var pos = {};
                hbox.attr("transform", function(d) {
                    // calculate barycenter of non-hbox neighbours, then nudge a bit
                    // to the NE.
                    var x=0,y=0,sz=0;
                    for (var i = 0; i < d.nhd.length; ++i) {
                        if (d.nhd[i].t != 3) {
                            sz++;
                            x += d.nhd[i].x;
                            y += d.nhd[i].y;
                        }
                    }

                    offset = 0.25 * scale;

                    if (sz != 0) {
                        x = (x/sz) + offset;
                        y = (y/sz) - offset;

                        while (pos[[x,y]]) {
                            x += offset;
                        }
                        d.x = x;
                        d.y = y;
                        pos[[x,y]] = true;
                    }

                    return "translate("+d.x+","+d.y+")";
                });
            }
        }

        update_hboxes();

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        
        //links for connectivity graph
        clink.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        //Stuff for force directed part
        

        //only coloured nodes are in the simulation
        simulation
          .nodes(graph.nodes.filter(function(d) {return d.t != 0;}))
          .on("tick", ticked);

        simulation.force("link")
          .links(graph.links.filter(function(d) {return ((d.source.t !=0) && (d.target.t != 0));}));

         

        function ticked() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            
            //stuff to keep nodes inside a box
            
            node.attr("transform", function(d) {
                d.x = Math.max(radius, Math.min(width - radius -100, d.x));
                //manualy changed height of box with offset
                d.y = Math.max(radius, Math.min(height - radius -100, d.y));
                return "translate(" + d.x + "," + d.y +")";
             })
        
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }
          
        
        
        
        // EVENTS FOR DRAGGING AND SELECTION

        //flip variable to determine if qubit node conerts to red or green spider
        var comb_red = true;

        node.on("mousedown", function(d) {
                /*if (shiftKey) {
                    d3.select(this).select(":first-child").attr("style", nodeStyle(d.selected = !d.selected));
                    d3.event.stopImmediatePropagation();
                } else if (!d.selected) {
                    node.select(":first-child").attr("style", function(p) { return nodeStyle(p.selected = d === p); });*/
                    
                    //New stuff for when a node is selected
                
                    d.selected = true;
                    
                    console.log(graph.nodes.filter(function(d) {return d.selected;})[0]);
                    
                    simulation.alphaTarget(0).restart();
                    
                //}
            })
            .call(d3.drag().on("drag", function(d) {
                var dx = d3.event.dx;
                var dy = d3.event.dy;
                // node.filter(function(d) { return d.selected; })
                //     .attr("cx", function(d) { return d.x += dx; })
                //     .attr("cy", function(d) { return d.y += dy; });
            
                //added this thing for the force stuff
                
                simulation.alphaTarget(0).restart();
                
                
                
                if (rule_applied == false) {
                
                    node.filter(function(d) { return d.selected; })
                    .attr("transform", function(d) {
                        d.x += dx;
                        d.y += dy;
                        return "translate(" + d.x + "," + d.y +")";
                    });

                    update_hboxes();

                    link.filter(function(d) { return d.source.selected ||
                                            (auto_hbox && d.source.t == 3); })
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; });

                    link.filter(function(d) { return d.target.selected ||
                                            (auto_hbox && d.target.t == 3); })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                // text.filter(function(d) { return d.selected; })
                //     .attr("x", function(d) { return d.x; })
                //     .attr("y", function(d) { return d.y + 0.7 * node_size + 14; });
                
                //New stuff added to check for collison
                
                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                    
                    
                    var connected_same_type_nodes = selected_node.nhd.filter(function(d) {return (selected_node.t == d.t) && (connected_by_type0edge(selected_node,d));});
                
                //apply fusion rule when checks passed
                    var to_fuse = false;
                    var dead_node = {};
                    
                    
                    connected_same_type_nodes.forEach(function(d) {if (collided(d,selected_node)) {
                        to_fuse = true;
                        dead_node = d; 
                    
                    }});
                    
                    
                
                    if (to_fuse == true) {
                        rule_applied = true;
                        console.log(rule_applied);
                        fusion(selected_node,dead_node);
                        to_fuse = false;
                        graph.nodes.forEach(function(d) {d.selected = false;});
                        
                        update();
                        console.log(graph);
                    
                     }

                //implementation of rule that fuses spiders with one edge to qubit nodes that are empty
                var to_recombine = false;
                var recomb_node = {};
                //first check if selected node has one edge and collides with a qnode that is also empty
                if (selected_node.nhd.length == 1) {
                    qnodes.forEach(function(d) {if (collided(d,selected_node) && d.empty == true){
                        to_recombine = true;
                        recomb_node = d;
                    }})
                }

                //now implement recombination
                if (to_recombine == true) {
                    rule_applied = true;
                    selected_node.t = 0;
                    d.name = selected_node.name;
                    d.empty = false;
                    update();
                    to_recombine = false;

                }
                
                }  
            }).on("end", function() {console.log("mouseup");
                graph.nodes.forEach(function(d) {d.selected = false;}); 
                rule_applied = false;}));
            
        //Implementation of slice rule
        
        svg.on("mousedown", function () {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];
            
            //slice.enter();
            
            
            //slice.attr("x1", function(d) { return x; })
                 //.attr("y1", function(d) { return y; })
            slice_nog.x1 = x;
            slice_nog.y1 = y    
        
               
            }).call(d3.drag().on("drag", function(d) {
                var x = d3.event.x;
                var y = d3.event.y;
                
                //slice.attr("x2", function(d) { return x; })
                     //.attr("y2", function(d) { return y; })
                     //.attr("opacity", 1);
                slice_nog.x2 = x;
                slice_nog.y2 = y; 
               
                
            }).on("end", function() {
                
                if (rule_applied == false) {
                //define line object to hold line coordinates
                    //var s_line = {x1: slice.attr("x1"),x2: slice.attr("x2"), y1:slice.attr("y1"), y2:slice.attr("y2")};
                    var s_line = {x1: slice_nog.x1,x2: slice_nog.x2, y1:slice_nog.y1, y2:slice_nog.y2};

                    var to_slice = false;
                    var sliced_node = {};
                
                    graph.nodes.forEach(function(d) {
                    
                    //circle info for node
                        var circle = {cx: d.x, cy: d.y, r: radius};


                    
                        if (in_box(circle, s_line) && cuts_circle && (d.t != 0) && (d.t != 3)) {
                        console.log(d.name);
                        console.log("Apply slice");
                        to_slice = true;
                        sliced_node = d;
                        
                        
                                           
                        }
                
                    
                    });

                    if (to_slice) {
                        update();
                        rule_applied = true;
                        console.log("before split")
                        split(sliced_node, s_line);
                        console.log("after split")
                        to_slice = false;
                        
                        update();
                        console.log(graph);
                        console.log("graphupdated");
                    }   
                
                
                slice.attr("opacity", 0);
            }
             rule_applied = false
            }));
        
        //End of slice rule implementatio

        //Implementation of inserting identities

        //insertion of identities
        // will have variable that flips each time and Id is inserted so that green or red can be inserted
        var ins_red = false; 
        link.on("mousedown", function(d) {
            console.log("A link was clicked it was");
            console.log(d);
            if (ins_red) {
                //red id
                rule_applied = true;
                add_red_id(d);
                update();
                rule_applied = false;
                ins_red = false

            } else {
                //green id
                rule_applied = true;
                add_green_id(d);
                update();
                rule_applied = false;
                ins_red = true
            }
        



        });
        
        //variable to check which colour to insert
        

        // svg.on("dblclick", function(d) {
        //     var x = d3.mouse(this)[0];
        //     var y = d3.mouse(this)[1];

        //     var selection_circle = {x: x, y: y, r: radius};

        //     var to_insid = false;

        //     //insertion of identities is triggered by a selection circle (where you click defines a node sized circle)
        //     //the selection circle then has to intersect a midpoint circle (node sized) at the midpoint of the line to trigger


        //     graph.links.forEach(function(d) {
        //         var link_line = {x1: d.source.x,x2: d.target.x, y1: d.source.y, y2: d.target.y};

        //         var mx = (link_line.x2 + link_line.x1)/2;
        //         var my = (link_line.y2 + link_line.y1)/2;

        //         var link_midcircle = {x: mx, y: my, r: radius};
                
                

        //         if (collided(link_midcircle,selection_circle) && (to_insid == false)) {
                    
                    
        //             to_insid = true;
                    
                    
                    
        //         }
        //     });
                
                
            

        // }).on("click", function(d) {
        //     var x = d3.mouse(this)[0];
        //     var y = d3.mouse(this)[1];

        //     var selection_circle = {x: x, y: y, r: radius};

        //     var to_insid = false;

        //     //insertion of identities is triggered by a selection circle (where you click defines a node sized circle)
        //     //the selection circle then has to intersect a midpoint circle (node sized) at the midpoint of the line to trigger

        //     graph.links.forEach(function(d) {
        //         var link_line = {x1: d.source.x,x2: d.target.x, y1: d.source.y, y2: d.target.y};

        //         var mx = (link_line.x2 + link_line.x1)/2;
        //         var my = (link_line.y2 + link_line.y1)/2;

        //         var link_midcircle = {x: mx, y:my, r: radius};

        //         if (collided(link_midcircle,selection_circle) && (to_insid == false)) {
                    
        //             console.log("Insert green Id");
        //             to_insid = true;
                    
                    
                    
        //         }
        //     });
                
                
            

        //});


        //remova of identities
        //Implementation of colour change rule
        var timer = 0;
        var delay = 200;
        var prevent = false;

        node.on("click", function(d) {
            timer = setTimeout(function() {
                if (!prevent) {
                    d.selected = true;

                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                    //Implementation of removing ids
                    if ((selected_node.t == 1 || selected_node.t == 2) && selected_node.nhd.length == 2) {
                        console.log("remove id");
                        remove_node(selected_node);
                        update();
                        d.selected = false;
        
                    }
        
                    //Implementation of changing qubit to red spider
                    if (selected_node.t == 0) {
                        //set the qubit node to the one specified by comb_red
                        if (comb_red == true) {
                            selected_node.t = 2;
                            comb_red = false;
                        }
                        else if (comb_red == false) {
                            selected_node.t = 1;
                            comb_red = true;
                        }
                        
                        //change connectivity to empty status (used to verify if spider can reconnect to qubit node)
                        qnodes.filter(function(d) {return d.name == selected_node.name}).forEach(function(d){d.empty = true})
                        console.log(qnodes)
                        update();
                        d.selected = false;
        
                    }
                }
                prevent = false;
              }, delay);

        }).on("dblclick", function(d) {
            console.log("complement rule");
            clearTimeout(timer);
            prevent = true;

            d.selected = true;
        
            var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
        
            //chnage colour of node
            if (selected_node.t == 1) {
                selected_node.t = 2;
            }
            else if (selected_node.t == 2) {
                selected_node.t = 1;
            }
            //change connecting link types
            var connected_links = graph.links.filter(function(l) {return single_link(l,d);});
                    
            connected_links.forEach(function(l) {
            if (l.t == 1) {
                l.t = 2;
            }
            else if (l.t == 2) {
                l.t = 1;  
            }
            })
            update();
            
        
        });

        
        
        
        
    })}};
});


