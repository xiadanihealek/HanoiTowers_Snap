


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function hanoi() {
    var snap = Snap(1212, 912);

    /**
     * Se obtiene el valor del input 1 y se castea
     */
    n_1 = document.getElementById("1").value;
    n_1 = parseInt(n_1);
    var s = 0;
    /**
     * 9
     * Se definen las 3 torres
     */
    var tower1 = snap.rect(140, 50, 10, 240, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});
    var tower1_base = snap.rect(20, 280, 240, 10, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});

    var tower2 = snap.rect(540, 50, 10, 240, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});
    var tower2_base = snap.rect(420, 280, 240, 10, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});

    var tower3 = snap.rect(940, 50, 10, 240, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});
    var tower3_base = snap.rect(820, 280, 240, 10, 0, 0).attr({stroke: '#398daa', 'strokeWidth': 2, fill: '#398daa', 'opacity': 1});
    var colors = ['#9c5ccb', '#7f5bca', '#6159c8', '#586cc7', '#bd4e62', '#b5485b', '#a74758', '#9a4655'];

    /**
     * 
     * 3 pilas
     */
    var pila1 = new Stack();
    var pila2 = new Stack();
    var pila3 = new Stack();



    var name = new Array();
    for (i = n_1 - 1; i >= 0; i--) {
        name[i] = snap.rect(40 + (i * 10), 250 - (i * 25), 200 - (i * 20), 20, 20, 20).attr({stroke: colors[i], 'strokeWidth': 5, fill: colors[i], 'opacity': 1, 'id': i});
        name[i].id = i;
        //console.log(name[i]);
    }

    for (i = 0; i < n_1; i++) {
        pila1.add(name[i]);
    }
    console.log(pila1.size());

    /*var r0 = snap.rect(110,75,60,20,20,20).attr({ stroke: '#9c5ccb', 'strokeWidth': 5, fill: '#9c5ccb', 'opacity': 1 });
     var r1 = snap.rect(100,100,80,20,20,20).attr({ stroke: '#7f5bca', 'strokeWidth': 5, fill: '#7f5bca', 'opacity': 1 });
     var r2 = snap.rect(90,125,100,20,20,20).attr({ stroke: '#6159c8', 'strokeWidth': 5, fill: '#6159c8', 'opacity':1 });
     var r3 = snap.rect(80,150,120,20,20,20).attr({ stroke: '#586cc7', 'strokeWidth': 5, fill: '#586cc7', 'opacity': 1 });
     var r4 = snap.rect(70,175,140,20,20,20).attr({ stroke: '#bd4e62', 'strokeWidth': 5, fill: '#bd4e62', 'opacity': 1 });
     var r5 = snap.rect(60,200,160,20,20,20).attr({ stroke: '#b5485b', 'strokeWidth': 5, fill: '#b5485b', 'opacity': 1 });
     var r6 = snap.rect(50,225,180,20,20,20).attr({ stroke: '#a74758', 'strokeWidth': 5, fill: '#a74758', 'opacity':1 });
     var r7 = snap.rect(40,250,200,20,20,20).attr({ stroke: '#9a4655', 'strokeWidth': 5, fill: '#9a4655', 'opacity': 1 });
     
     */

    var move = function (dx, dy) {

        this.attr({
            transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
        });
    }


    var start = function (x) {

        this.data('origTransform', this.transform().local);
        //console.log(x);
        if (x > 350 && x < 730) {
            pila2.pop();
            s = 2;
        } else if (x < 350) {
            pila1.pop();
            s = 1;
        } else if (x > 730) {
            pila3.pop();
            s = 3;
        }
    }


    var stop = function (x, y, dx, dy) {

        for (i = n_1 - 1; i >= 0; i--)
            name[i].undrag();

        if (x.screenX > 350 && x.screenX < 730) {

            if (pila2.hasElements()) {
                x_int1s = parseInt(pila2.getTopElement().id);
                x_int2s = parseInt(this.id);

                if (x_int1s > x_int2s) {
                    if (s == 1) {

                        this.attr({transform: "t0,0s"});
                        var size1 = pila1.size();
                        pila1.add(this);
                        this.attr({y: 250 - (size1 * 25)});


                    } else if (s == 2) {
                        this.attr({transform: "t405,0s"});
                        var size2 = pila2.size();
                        pila2.add(this);
                        this.attr({y: 250 - (size2 * 25)});


                    } else if (s == 3) {
                        this.attr({transform: "t805,0s"});
                        var size3 = pila3.size();
                        pila3.add(this);
                        this.attr({y: 250 - (size3 * 25)});
                    }

                } else {
                    this.attr({transform: "t405,0s"});
                    var size2 = pila2.size();
                    pila2.add(this);
                    this.attr({y: 250 - (size2 * 25)});
                }

            } else {

                this.attr({transform: "t405,0s"});
                var size2 = pila2.size();
                pila2.add(this);
                this.attr({y: 250 - (size2 * 25)});
            }
        } else if (x.screenX < 350) {

            if (pila1.hasElements()) {
                x_int1s = parseInt(pila1.getTopElement().id);
                x_int2s = parseInt(this.id);
                console.log("abajo " + x_int1s + " arriba" + x_int2s);

                if (x_int1s > x_int2s) {
                    if (s == 1) {

                        this.attr({transform: "t0,0s"});
                        var size1 = pila1.size();
                        pila1.add(this);
                        this.attr({y: 250 - (size1 * 25)});


                    } else if (s == 2) {
                        this.attr({transform: "t405,0s"});
                        var size2 = pila2.size();
                        pila2.add(this);
                        this.attr({y: 250 - (size2 * 25)});


                    } else if (s == 3) {
                        this.attr({transform: "t805,0s"});
                        var size3 = pila3.size();
                        pila3.add(this);
                        this.attr({y: 250 - (size3 * 25)});
                    }

                } else {
                    this.attr({transform: "t0,0s"});
                    var size1 = pila1.size();
                    pila1.add(this);
                    this.attr({y: 250 - (size1 * 25)});
                }

            } else {

                this.attr({transform: "t0,0s"});
                var size1 = pila1.size();
                pila1.add(this);
                this.attr({y: 250 - (size1 * 25)});
            }
        } else if (x.screenX > 730) {

            if (pila3.hasElements()) {
                x_int1s = parseInt(pila3.getTopElement().id);
                x_int2s = parseInt(this.id);
                console.log("abajo " + x_int1s + " arriba" + x_int2s);

                if (x_int1s > x_int2s) {
                    if (s == 1) {

                        this.attr({transform: "t0,0s"});
                        var size1 = pila1.size();
                        pila1.add(this);
                        this.attr({y: 250 - (size1 * 25)});


                    } else if (s == 2) {
                        this.attr({transform: "t405,0s"});
                        var size2 = pila2.size();
                        pila2.add(this);
                        this.attr({y: 250 - (size2 * 25)});


                    } else if (s == 3) {
                        this.attr({transform: "t805,0s"});
                        var size3 = pila3.size();
                        pila3.add(this);
                        this.attr({y: 250 - (size3 * 25)});
                    }

                } else {
                    this.attr({transform: "t805,0s"});
                    var size3 = pila3.size();
                    pila3.add(this);
                    this.attr({y: 250 - (size3 * 25)});
                }

            } else {

                this.attr({transform: "t805,0s"});
                var size3 = pila3.size();
                pila3.add(this);
                this.attr({y: 250 - (size3 * 25)});
            }
        }

        //Adding dragable atributes to the elements on top
        if (pila1.hasElements())
            pila1.getTopElement().drag(move, start, stop);
        if (pila2.hasElements())
            pila2.getTopElement().drag(move, start, stop);
        if (pila3.hasElements())
            pila3.getTopElement().drag(move, start, stop);


        //  console.log(this);
        // console.log(pila1.size());
        /* console.log(pila2.size());
         console.log(pila3.size());
         console.log('finished dragging');*/

        if (pila3.size() == n_1) 
            console.log("GANASTE");
        
    }

    /* for (i = n_1-1; i >=0; i--) { 
     name[i].drag(move,start,stop);
     }*/
    name[n_1 - 1].drag(move, start, stop);
//console.log(i);

}

   