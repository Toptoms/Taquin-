jQuery(document).ready(function () {
    //------------- contient le tableau dans l'ordre--------//
    var Ttab = []
    //--------------contient le tableau degeneré a l'instant T---------------------//
    var Dtab = []


    var Ctab = prompt("nombre de colonne")
    var Ltab = prompt("nombre de ligne")
    var tablength = Ltab * Ctab

    var Vpiece = "V"
    var Vbox
    //----------------indique si j'utilise random ou non --------------------//
    var MorR = 0


    ////////////////////////////////////////////////// genere le tableau reussi //////////////////////////////////////////////////////////////////
    function truetab() {
        Ttab = []
        for (var i = 0; i < tablength - 1; i++) {
            Ttab.push(i + 1)
            console.log(Ttab)
        }
        Ttab.push(Vpiece)
        Vbox = Ttab.indexOf('V')
        Dtab = Ttab.slice()
    }

    ////////////////////////////////////////////////////////// representation du tableau /////////////////////////////////////////////////////////////////
    // for (var i = 1; i < tablength + 1; i++) {
    //     console.log(i, tab[i - 1])
    // }

    ////////////////////////////////////////////////////////// nombre aleatoire parametrable /////////////////////////////////////////////////////////
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    //////////////////////// RECUPERE la position de V RENVOIE le nombres de coups et les coups possibles par rapport a la position de V //////////////////////
    function choiceshoot(tab) {
        let box = tab.indexOf('V')
        V = box + 1
        VC = Math.ceil(V / Ltab)
        VL = V % Ctab
        //console.log('resultat de la position de V/Ltab:' + VC, 'resultat de la position de V%Ctab:' + VL)
        var tabshot = []
        right = +1
        up = +Ctab
        left = -1
        down = -Ctab

        if (VL != 0) {
            tabshot.push(right)
        }

        if (VL != 1) {
            tabshot.push(left)
        }

        if (VC != 1) {
            tabshot.push(down)
        }

        if (VC != Ctab) {
            tabshot.push(up)
        }

        return tabshot
    }

    ////////////////////////////// RECUPERE le nombre et les coups possibles RENVOIE nouvelle position de V ///////////////////////////////
    function shoot(tabshot, tab) {
        let box = tab.indexOf('V')
        if (MorR == 0) {
            newVbox = box + tabshot[getRandomInt(tabshot.length)]
        } else {
            newVbox = box + tabshot
        }
        return newVbox
    }

    /////////////////////////////// RECUPERE nouvelle position de V RENVOIE un nouveau tableau Dtab avec V a sa nouvelle position /////////////////////////
    function swapV(newVbox, tab) {
        let box = tab.indexOf('V')
        //////////////////// valeur de la futur ancienne position /////////////////////
        oldvaluenewposition = tab[newVbox]
        //console.log('valeur futur ancienne position: ' + oldvaluenewposition)
        tab.splice(newVbox, 1, Vpiece)
        tab.splice(box, 1, oldvaluenewposition)
        return tab
    }

    /////////////////////////////////////// RENVOIE un tableau destructuré ///////////////////////////////////////////////////
    function generatetab() {
        MorR = 0
        var level = prompt("rentre un level")
        Dtab = Ttab.slice()
        for (var i = 0; i < level; i++) {
            console.log('------------------------mouvement de deconstruction:---------------------------' + (i + 1))
            console.log('Ttab: ' + Ttab)
            console.log('position de V: ' + (Vbox + 1))
            let resultchoiceshoot = choiceshoot(Dtab)
            console.log('coups possibles: ' + resultchoiceshoot)
            let resultshoot = shoot(resultchoiceshoot, Dtab)
            console.log('nouvelle position de v: ' + (resultshoot + 1))
            Dtab = swapV(resultshoot, Dtab)
            console.log('Ttab: ' + Ttab)
            console.log(Dtab)
            tabfront(Dtab)
        }
        tabfront(Dtab)
    }
    //////////////////////////////// fonction test de resolution de profondeur  /////////////////////////////////////////
    function isWinning(tab) {
        for (var i = Ttab.length; i > 0; i--) {
            if (Ttab[i] !== tab[i]) {
                return false
            }
        }
        return true
    }



    ///////////////////////////////////////////////// resolution par profondeur //////////////////////////////////////////////////////////
    function deepsolution(etat, p, m) {
        MorR = 1

        if (p > m) {

            return false
        }
        if (isWinning(etat.slice())) {
            return true
        }

        let couppossible = choiceshoot(etat.slice())
        for (var i = 0; i < couppossible.length; i++) {
            //////////////////////// avancer ////////////////////
            let resultatcoup = shoot(couppossible[i], etat.slice())
            let tempEtab = swapV(resultatcoup, etat.slice())
            console.log(couppossible+'-------------------')
            console.log(resultatcoup)
            console.log(tempEtab)
            // var current = etab.indexOf('V');
            // var tempEtab = etab;
            // var temp = etab[couppossible[i] + current];
            // tempEtab[current] = temp;
            // tempEtab[couppossible[i] + current] = 'V';

            tabfront(tempEtab);
            if (deepsolution(tempEtab, p + 1, m)) {
                return true;
            }
        }
        return false
    }


    ///////////////////////////////////////////////// generer le tableau en front //////////////////////////////////////////////
    function tabfront(tableau) {
        $('table').empty()
        var v = 0
        for (var j = 0; j < Ltab; j++) {
            $('table').append('<tr' + j + ' class="row"> </tr>')
            for (var i = 0; i < Ctab; i++) {
                if (tableau[v] == 'V') {
                    $('tr' + j).append('<td class="Vcase">' + tableau[v] + ' </td>')
                    v++
                } else {
                    $('tr' + j).append('<td>' + tableau[v] + ' </td>')
                    v++
                }
            }
        }
    }

    ///////////////////////////////////////////////////lancement  de la partie ////////////////////////////////////////////
    truetab()
    tabfront(Dtab)
    $(".melange").click(function () { generatetab() })



    $(".solution").click(function () { const bla = Dtab; if (deepsolution(bla, 0, 16)) { alert('win') } else { deepsolution(alert('pas de solution')) } })
});


// function deepsolution() {
//     MorR = 1
//     //--------------profondeur de recherche maximum---------------//
//     let Mdeep = 5
//     //--------------profondeur à l'instant T ---------------//
//     let Nmoove
//     /////////////////////si nombre de coup est egale a la limite imposé ///////////////////////////
//     if (Nmoove == Mdeep || Mtab[Mtab.length] == -1) {
//         ////////////////////////////////// V revient un coup en arriere et supprime le dernier deplacement de Mtab //////////////////////////////////
//         Vbox = Dtab.indexOf('V') + Mtab[Mtab.length];
//         Mtab.pop()
//         Nmoove--
//     }
//     ////////////// joue coup disponible /////////////////
//     let resultchoiceshoot = choiceshoot(Vbox)

//     let resultshoot = shoot(resultchoiceshoot, Stab[Stab.length])

//     Stab.splice(Stab.length, 1, Stab[Stab.length] - 1)
//     Nmoove++
//     //////////////////// met -1 au nombre de coup disponible /////////////////////
//     if (Stab[Stab.length] = 0) {
//         Stab.pop
//     } else {

//     }
//     swapV(resultshoot)


// function deepsolution(tab, p) {
//     MorR = 1

//     if (isWinning()) {
//         return true
//     }
//     tabfront()
//     if (p == m) {
//         return false
//     }
//     console.log("p:---------------------------" + p)
//     console.log("Vbox:" + (Vbox + 1))
//     box=Vbox
//     var couppossible = choiceshoot(box)
//     for (var i = 0; i < couppossible.length; i++) {
//         //////////////////////// avancer ////////////////////
//         if (couppossible[i] + oldshoot == 0) {
//             i++
//         }
//         let resultatcoup = shoot(couppossible[i])
//         etab = swapV(resultatcoup, tab)
//         console.log(" deplacement de:" + couppossible[i])
//         oldshoot = couppossible[i]

//         if (deepsolution(etab, p + 1)) {
//             return true;
//         }
//     }
//     tabfront()
//     return false

// }

// }
