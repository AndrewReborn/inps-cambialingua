var ua = navigator.userAgent,
    clickEvent = (ua.match(/iPad/i) || ua.match(/iPhone/i)) ? "touchstart" : "click";

//28-11-2018 Aggiunta controllo posizione aiutaci a migliorare la pagina
// ### 
var HM_nuovoHeader = false;

$(document).ready(function () {
    if (window.location !== window.parent.location) {
        $("#header-navbar").addClass("hidden");
        $("#searchPanel").attr("style", "display: none !important");
        $("#footer").addClass("hidden");
    }
    var aiutaciToChangeBelow = document.getElementsByClassName("conf-piccola-4");
    var aiutaciToChangeRight = document.getElementsByClassName("conf-piccola-5");
    if ($(window).width() > $_viewportBreakpoints.lg) {
        $(aiutaciToChangeBelow).attr('style', 'display: none !important');
        $(aiutaciToChangeRight).attr('style', 'display: block !important; margin-top: 33px;');
    }
    else {
        $(aiutaciToChangeRight).attr('style', 'display: none !important;');
        $(aiutaciToChangeBelow).attr('style', 'display: block !important');
    }

    //24/06/2019 check per verificare se vi Ã¨ presente nuovo header
    var HM_checkNuovoHeader = document.getElementsByClassName("HM_barraRicercaResponsive");
    if (HM_checkNuovoHeader.length > 0) {
        HM_nuovoHeader = true;
        adjustHMenu();
        cambiaAltezzaFooterSocial(false);
        var urlLocation = window.location.pathname.toLowerCase();
        if (urlLocation.indexOf("myinps/") != -1 || urlLocation.indexOf("search122/") != -1) {
            $("a").removeClass("HM_JumboP_active");
        }
    }
});

$(window).resize(adjustHMenu)
// ###

$(window).on("mouseup", function (e) {
    var target = $(e.target);
    //console.log('target:'+target.attr('class'));
    if (!target.parents('.mediaShare').length && !$(target).hasClass("mediaShare") && !$(target).hasClass("icon icon__heart") && !$(target).hasClass("myinps_bookmark-link")) {
        var divs = $(".mediaShare")
        for (var i = 0; i < divs.length; i++) {
            divs[i].setAttribute("style", "display:none");
            $(divs[i]).removeClass("showed");
        }
    }
});

$('#dropdown-menu-utente li').on('touchend', function (e) {
    window.location.href = $(e.target.closest('li')).data('touch');
});

function goLoginPassi(sUrl) {
    window.location = sUrl + "?uri=" + encodeURIComponent(document.URL);
}


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


$(window).load(function () {

    try {
        var JoyRideContent = document.getElementById("joyRideTipContent");
        var JoyRideContentLength = JoyRideContent.children.length; //C1
        var JoyRideContentToRemove = [];
        var InitialJoyRideContent = document.getElementById("InitialJoyRide");

        //C2
        //InitialJoyRideContent.outerHTML = '<ol id="InitialJoyRide" style="display:none;">' + JoyRideContent.innerHTML + '</ol>';
        for (var i = 0; i < JoyRideContentLength; i++) {
            InitialJoyRideContent.appendChild(JoyRideContent.children[i].cloneNode(true));
        }

        for (var i = 0; i < JoyRideContentLength; i++) {
            var li = JoyRideContent.children[i];
            var idItem = $(li).data("id");
            var Item = document.getElementById(idItem);
            var IsVisible = $(Item).is(":visible"); //C3

            if (Item !== null) { //C4
                if (Item.style.height === "0px" || Item.style.width === "0px") {//C5
                    IsVisible = false;
                }
            }

            if (!IsVisible) {
                JoyRideContentToRemove.push(li);
            }
        }

        for (var i = 0; i < JoyRideContentToRemove.length; i++) {
            JoyRideContent.removeChild(JoyRideContentToRemove[i]);
        }

        //C6
        $(JoyRideContent.children[JoyRideContent.children.length - 1]).attr("data-prev-button", "Chiudi");
    }
    catch (err) {
    }
});

var resizeId;
$(window).on("resize", function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(joyrideResize, 500);
});

function joyrideResize() {
    try {
        var InitialJoyRideContent = document.getElementById("InitialJoyRide");
        var JoyRideContentLength = InitialJoyRideContent.children.length;
        var JoyRideContentToAdd = [];

        for (var i = 0; i < JoyRideContentLength; i++) {
            var li = InitialJoyRideContent.children[i];
            var idItem = $(li).data("id");
            var Item = document.getElementById(idItem);
            var IsVisible = $(Item).is(":visible"); //C3

            if (Item !== null) { //A volte puÃ² non esistere
                if (Item.style.height === "0px" || Item.style.width === "0px") {//C5
                    IsVisible = false;
                }
            }

            if (IsVisible) {
                JoyRideContentToAdd.push(li.cloneNode(true));
            }
        }

        var JoyRideContent = document.getElementById("joyRideTipContent");
        JoyRideContentLength = JoyRideContent.children.length;
        for (var i = 0; i < JoyRideContentLength; i++) {
            JoyRideContent.removeChild(JoyRideContent.children[0]);
        }

        for (var i = 0; i < JoyRideContentToAdd.length; i++) {
            JoyRideContent.appendChild(JoyRideContentToAdd[i]);
        }

        //C6
        $(JoyRideContent.children[JoyRideContent.children.length - 1]).attr("data-prev-button", "Chiudi");
    }
    catch (ex) {
        return false;
    }
}

$("#btnJoyride").on("click", function (e) {
    //if (e.ctrlKey) {
    $('#joyRideTipContent').joyride('destroy');
    $('#joyRideTipContent').joyride({
        autoStart: true,
        modal: true,
        expose: true,
        pre_step_callback: joyrideFocus('pre_step_callback'), //C7
        post_step_callback: joyrideChiudiCover('post_step_callback') //C8
    });

    function joyrideFocus(msg) {
        console.log(msg);
        setTimeout(function () { $('#idTastoXJoyRide').focus() }, 500);
    }

    function joyrideChiudiCover(msg) {
        console.log(msg);
        $(".joyride-expose-cover").remove();
    }
});


$("#btnJoyride2").on("click", function (e) {
    //if (e.ctrlKey) {
    $('#joyRideTipContent').joyride('destroy');

    $('#joyRideTipContent').joyride({
        autoStart: true,
        modal: true,
        expose: true,
        pre_step_callback: joyrideFocus('pre_step_callback') //C7
    });

    function joyrideFocus(msg) {
        console.log(msg);
        setTimeout(function () { $('#idTastoXJoyRide').focus() }, 500);
    }

});

// ************** C9


function padLeft(nr, len) {
    var res = "";

    if (nr.toString().length < len) {
        for (var i = 0; i < (len - nr.toString().length); i++) {
            res += "0";
        }

        res += nr;
    }

    return res;
}

function parseDate(input) {
    var parts = input.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function daysLeft(input) {
    if (input === undefined) {
        input = '27/03/2017';
    }

    var inputDate = parseDate(input);
    var today = new Date();

    if (input === padLeft(today.getDate(), 2) + '/' + padLeft(today.getMonth() + 1, 2) + '/' + today.getFullYear()) {
        return 0;
    }

    var timeDiff = Math.abs(inputDate.getTime() - today.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};




//  C10


function OpenCommentOptions(id, type) {

    if ($('#' + id).hasClass("open")) {
        $('#' + id).removeClass("open");
        $('#' + id).slideUp();
        return false;
    }
    else {
        var divsReply = document.getElementsByClassName("comments-reply");
        for (var i = 0; i < divsReply.length; i++) {
            $(divsReply[i]).removeClass("open");
            $(divsReply[i]).slideUp();
        }

        var divsModify = document.getElementsByClassName("comments-modify");
        for (var i = 0; i < divsModify.length; i++) {
            $(divsModify[i]).removeClass("open");
            $(divsModify[i]).slideUp();
        }

        $('#' + id).addClass("open");
        $('#' + id).slideDown();

        return false;
    }
}



//  C11

function commentFormValidator(message, label) {
    if ($('#' + message)[0].value.length === 0) {
        $('#' + label).slideDown();
        return false;
    }
    else {
        $('#' + label).slideUp();
        return true;
    }
}


//  C12

function OpenChild(btn, div, divClass) {
    try {
        var button = document.getElementById(btn);
        var divToChange = document.getElementById(div);

        if ($(button).hasClass("rotate")) {
            button.setAttribute("class", "icon spanButton");
            //divToChange.setAttribute("style", "display:none;");
            $(divToChange).animate({ height: "0" }, 300);

            var nodes = $(divToChange).children().children();
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].children[0].setAttribute("tabindex", "-1");
            }
        }
        else {
            var divs = document.getElementsByClassName(divClass);

            for (var i = 0; i < divs.length; i++) {
                //$(divs[i]).animate({ height: "0" }, 500);
                $(divs[i]).animate({ height: "0" }, 300);
            }

            var btns = document.getElementsByClassName("spanButton");

            for (var i = 0; i < btns.length; i++) {
                btns[i].setAttribute("class", "icon spanButton");
            }

            var nodes = $(divToChange).children().children();
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].children[0].setAttribute("tabindex", "0");
            }

            var curHeight = $(divToChange).height();
            $(divToChange).css('height', 'auto');
            var autoHeight = $(divToChange).height();
            $(divToChange).height(curHeight).animate({ height: autoHeight }, 500);
            button.setAttribute("class", "icon spanButton rotate");
        }

        return false;
    }
    catch (ex) {
        return false;
    }
}

//28-11-2018
function createObject(btn, div, divClass1, divClass2, divClass3) {
    object = {
        button: btn,
        divChange: div,
        class1: divClass1,
        class2: divClass2,
        class3: divClass3
    };
}
//  C12-BIS
//28-11-2018 
function OpenChildNew(btn, div, divClass1, divClass2, divClass3) {
    try {
        flagMenuContestuale = 1;
        createObject(btn, div, divClass1, divClass2, divClass3);
        RipristinaCroci();
        setAriaExpanded();
        var button = document.getElementById(btn);
        var divToChange = document.getElementById(div);
        var aria = $(divToChange).parent();
        $(aria).attr('style', 'height:auto');
        var divChanged = document.getElementsByClassName(divClass2);
        var contexts = document.getElementsByClassName(divClass3);
        var context2 = document.getElementsByClassName('apertoutentetema');
        $(context2).parent().parent().parent().parent().attr('style', 'height:auto;');
        var context_p = $(context2).parent();
        context_p.attr('style', 'height:auto');
        context_p = $(context_p).children()[0];
        $(context_p).attr('style', 'background-color: #f5f5f0; border-left-color: #b2bbbd');
        $(context2).attr('class', 'dropdown-menu pull-right menucontestuale');
        for (var i = 0; i < contexts.length; i++) {
            contexts[i].setAttribute("style", "display:none;");
        }
        $(divChanged).attr('class', 'childMenuARA');

        if ($(button).hasClass("rotate")) {
            $(aria).attr('aria-expanded', 'false');
            button.setAttribute("class", "icon spanButton");
            $(divToChange).animate({ height: "0" }, 300);

            var nodes = $(divToChange).children().children();
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].children[0].setAttribute("tabindex", "-1");
            }
        }
        else {
            $(aria).attr('aria-expanded', 'true');
            var divs = document.getElementsByClassName(divClass1);

            for (var i = 0; i < divs.length; i++) {
                $(divs[i]).animate({ height: "0" }, 300);
            }

            var btns = document.getElementsByClassName("spanButton");

            for (var i = 0; i < btns.length; i++) {
                btns[i].setAttribute("class", "icon spanButton");
            }

            var nodes = $(divToChange).children().children();

            for (var i = 0; i < nodes.length; i++) {
                nodes[i].children[0].setAttribute("tabindex", "0");
            }

            var curHeight = $(divToChange).height();
            $(divToChange).css('height', 'auto');
            var autoHeight = $(divToChange).height();
            $(divToChange).height(curHeight).animate({ height: autoHeight }, 500);
            button.setAttribute("class", "icon spanButton rotate");
            $(divToChange).attr('class', 'childMenuA');
            altezzaMenuContestuale = curHeight + autoHeight;
        }

        return false;
    }
    catch (ex) {
        return false;
    }
}

// C12-ARIA
// 28-11-2018 
function setAriaExpanded() {
    var aria = document.getElementsByClassName('aria1');
    for (var i = 0; i < aria.length; i++) {
        aria[i].setAttribute("aria-expanded", "false");
    }
    aria = document.getElementsByClassName('aria2');
    for (var i = 0; i < aria.length; i++) {
        aria[i].setAttribute("aria-expanded", "false");
    }
}

//28-11-2018 
function setAriaHeightAuto() {
    var aria = document.getElementsByClassName('aria1');
    for (var i = 0; i < aria.length; i++) {
        aria[i].setAttribute("style", "height:auto;");
    }
    aria = document.getElementsByClassName('aria2');
    for (var i = 0; i < aria.length; i++) {
        aria[i].setAttribute("style", "height:auto;");
    }
}

//  C12 - SHOW MENU
//28-11-2018 
var flagMenuContestuale = 0;
var object;

function showMenu(id) {
    try {
        RipristinaCroci();
        var heightPadreFigli = 0;
        var heightFigli = 0;
        var heightMenuContestuale = 0;
        var somma = 0;
        var divToShow = document.getElementById(id);
        var activeLink = $(divToShow).children()[0];
        var menuContestuale = $(divToShow).children()[1];
        var changeSimbolo = document.getElementById('Mobile' + id);
        var contexts = document.getElementsByClassName('menucontestuale');
        for (var i = 0; i < contexts.length; i++) {
            contexts[i].setAttribute("style", "display:none;");
        }
        var aria = document.getElementsByClassName('aria1');
        for (var i = 0; i < aria.length; i++) {
            aria[i].setAttribute("aria-expanded", "false");
        }
        var context2 = document.getElementsByClassName('apertoutentetema');
        var context2padre = $(context2).parent().parent().parent().parent();
        $(context2padre).attr('style', 'height:auto');
        if ($(context2padre).attr('style') == 'height:auto') {
            flagMenuContestuale = 1;
        }
        var context_padre = $(context2).parent();
        context_padre.attr('style', 'height:auto;');
        var context_padrefiglio = $(context_padre).children()[0];
        $(context_padrefiglio).attr('style', 'background-color: #f5f5f0;border-left-color: #b2bbbd;');
        if ($(window).width() > $_viewportBreakpoints.lg) {
            if ($(context2).parent().attr('id') === id) {
                $(context2).attr('class', 'dropdown-menu pull-right menucontestuale');
                $(menuContestuale).attr('style', 'display:none;');
                $(divToShow).attr('aria-expanded', 'false');
                $(divToShow).parent().parent().parent().attr('aria-expanded', 'true');
                //$(menuContestuale).parent().attr('style', 'height:auto;');
                $(divToShow).parent().parent().parent().attr('style', 'height:auto;');
            }
            else {
                $(activeLink).attr('style', 'background-color: #F7F7F7;border-left-color: #5A6772;');
                $(context2).attr('class', 'dropdown-menu pull-right menucontestuale');
                $(menuContestuale).attr('class', 'dropdown-menu pull-right menucontestuale apertoutentetema');
                $(menuContestuale).attr('style', 'display:block;');
                $(divToShow).attr('aria-expanded', 'true');
                $(divToShow).parent().parent().parent().attr('aria-expanded', 'true');
                var height_mc = $(menuContestuale).height();
                var height_m = $(menuContestuale).parent().height();
                $(menuContestuale).parent().attr('style', 'height:auto;');
                $(divToShow).parent().parent().parent().attr('style', 'height:auto;');
            }
        }
        else {
            if ($(context2).parent().attr('id') === id) {
                $(context2).attr('class', 'dropdown-menu pull-right menucontestuale');
                $(menuContestuale).attr('style', 'display:none;');
                $(divToShow).attr('aria-expanded', 'false');
                $(divToShow).parent().parent().parent().attr('aria-expanded', 'true');
                $(menuContestuale).parent().attr('style', 'height:auto;');
                $(divToShow).parent().parent().parent().attr('style', 'height:auto;');
                $(changeSimbolo).attr('class', 'menuMobilePiu');
            }
            else {
                $(activeLink).attr('style', 'background-color: #F7F7F7;border-left-color: #5A6772;');
                $(context2).attr('class', 'dropdown-menu pull-right menucontestuale');
                $(menuContestuale).attr('class', 'dropdown-menu pull-right menucontestuale apertoutentetema');
                $(menuContestuale).attr('style', 'display:block;');
                $(divToShow).attr('aria-expanded', 'true');
                $(divToShow).parent().parent().parent().attr('aria-expanded', 'true');
                if (flagMenuContestuale == 1) {
                    heightPadreFigli = $(divToShow).parent().parent().parent().height();
                    heightMenuContestuale = $(menuContestuale).height();
                    heightFigli = $(menuContestuale).parent().height();
                    $(changeSimbolo).attr('class', 'menuMobileX');
                    somma = heightPadreFigli + heightMenuContestuale - 1;
                    $(divToShow).parent().parent().parent().attr('style', 'height:' + somma + 'px;');
                    somma = heightFigli + heightMenuContestuale - 1;
                    $(menuContestuale).parent().attr('style', 'height:' + somma + 'px;');
                    flagMenuContestuale = 0;
                }
                else if (flagMenuContestuale == 0) {
                    heightPadreFigli = $(divToShow).parent().parent().parent().height();
                    heightMenuContestuale = $(menuContestuale).height();
                    heightFigli = $(menuContestuale).parent().height();
                    $(changeSimbolo).attr('class', 'menuMobileX');
                    $(divToShow).parent().parent().parent().attr('style', 'height:' + heightPadreFigli + 'px;');
                    somma = heightFigli + heightMenuContestuale - 1;
                    $(menuContestuale).parent().attr('style', 'height:' + somma + 'px;');
                }
            }
        }
        $(".article__nav").attr('style', 'height:auto;');
        return false;
    }

    catch (ex) {
        return false;
    }

}

//28-11-2018 
function RipristinaMenuContestuale() {
    try {
        var padre = document.getElementsByClassName('childMenuA');
        var aperto = document.getElementsByClassName('apertoutentetema');
        setAriaHeightAuto();
        if ($(window).width() < $_viewportBreakpoints.lg) {
            if (padre.length > 0) {
                OpenChildNew(object.button, object.divChange, object.class1, object.class2, object.class3);
            }
            $(aperto).attr('style', 'display:none');
            $(aperto).attr('class', 'dropdown-menu pull-right menucontestuale');
            RipristinaCroci();
            flagMenuContestuale = 0;
        }
        return false;
    }
    catch (ex) {
        return false;
    }
}

//28-11-2018 
function RipristinaCroci() {
    var croci = document.getElementsByClassName('menuMobileX');
    for (var i = 0; i < croci.length; i++) {
        croci[i].setAttribute("class", "menuMobilePiu");
    }
}

/*15/11/2018 JS per menu accordion*/
function OpenAccordion(btn, div, divClass) {
    try {
        var button = document.getElementById(btn);
        var cardBody = document.getElementById(div);
        var cardHeader = document.getElementById(divClass);
        var temiccc = document.getElementById("TemiCCC");

        if ($(button).hasClass("rotate")) {
            button.setAttribute("class", "icon spanButton");
            cardHeader.setAttribute("aria-expanded", "false");
            cardHeader.setAttribute("class", "card1-header btn btn-link collapsed");
            cardBody.setAttribute("style", "display:none;");
            cardBody.setAttribute("aria-expanded", "false");
            cardBody.setAttribute("class", " collapse"); //show
            temiccc.setAttribute("style", "padding-top : 5%; padding-left:0em");

        }
        else {
            button.setAttribute("class", "icon spanButton rotate");
            cardHeader.setAttribute("aria-expanded", "true");
            cardHeader.setAttribute("class", "card1-header btn btn-link ");
            cardBody.setAttribute("style", "display:block;");
            cardBody.setAttribute("class", " collapse in"); //show
            cardBody.setAttribute("aria-expanded", "true");
            temiccc.setAttribute("style", "padding-top : 5%; padding-left:0em")
        }

        return false;
    }
    catch (ex) {
        return false;
    }
}

//  C13


function LettersFilter(letter) {
    var Articles = document.getElementsByTagName('article');

    for (var i = 0; i < Articles.length; i++) {
        if (Articles[i].parentNode.hasAttribute('data-query')) {
            if (Articles[i].parentNode.attributes["data-query"].value == letter) {
                if (Articles[i].parentNode.hasAttributes("style")) {
                    Articles[i].parentNode.setAttribute("style", "");
                }
            }
            else {
                if (Articles[i].parentNode.hasAttributes("style")) {
                    Articles[i].parentNode.setAttribute("style", "display:none;");
                }
            }
        }
    }
}

//_____________________________________________________________________


//C14
$(document).mouseup(function (e) {
    var container = $("#foldit");
    var OkButton = e.target;
    var RightClick = e.which == 3;

    if (!container.is(e.target) && OkButton.className != "btn btn-primary pull-right" && !RightClick) {
        container.removeClass("expand");

        var dynamicHide = document.getElementsByClassName("nav navbar-nav hide-nav");
        var divAutoComplete = document.getElementsByClassName("search__autocompleter");

        for (var i = 0; i < dynamicHide.length; i++) {
            if (dynamicHide[i].hasAttributes("style")) {
                dynamicHide[i].setAttribute("style", "");
            }
        }
        for (var i = 0; i < divAutoComplete.length; i++) {
            if (divAutoComplete[i].hasAttributes("style")) {
                divAutoComplete[i].setAttribute("style", "display:none;");
            }
        }
    }
});

function CambiaLingua(slingua) {
    if (window.location.href.indexOf('?') !== -1) {
        var pippo = window.location.href.replace('lang=EN', '').replace('lang=IT', '').replace('lang=ES', '').replace('lang=FR', '').replace('lang=DE', '');
        var pippo = pippo.replace('lang=en', '').replace('lang=it', '').replace('lang=es', '').replace('lang=fr', '').replace('lang=de', '') + '&lang=' + slingua;
        pippo = pippo.replace('&&', '&').replace('default.aspx?&', 'default.aspx?');
        window.location = pippo;
    } else {
        //C15
        window.location = window.location.href + '?lang=' + slingua;
    }

}

function ShowAlertComments() {
    modalAlert('Il tue commento Ã¨ stato registrato correttamente.Grazie');
}

//C16
function OpenExternalWindow(url, title) {
    var leftPosition, topPosition, width, height, img;
    width = (window.screen.width / 2) * 1.7;
    height = (window.screen.height / 2) * 1.7;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);

    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=no,scrollbars=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,location=no,directories=no";
    window.open(url, title, windowFeatures);
}


function ShareSocialNetwork(social, url) {
    var leftPosition, topPosition, width, height, img;
    width = (window.screen.width / 3) * 1.5;
    height = (window.screen.height / 3) * 1.5;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);

    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=no,scrollbars=no,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";

    var urlSplit = url.split('?');
    var urlParams;
    var url;

    if (urlSplit.length > 1) {
        urlParams = "?" + urlSplit[1];
    }
    else {
        urlParams = "";
    }

    if (window.location.origin.indexOf('https') < 0) {
        url = window.location.origin.replace("http", "https");
    }
    else {
        url = window.location.origin;
    }

    url = url + "/nuovoportaleinps/default.aspx" + urlParams;

    switch (social) {
        case "facebook":
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url.split('&tipologia')[0], 'Condividi su Facebook', windowFeatures);
            break;
        case "twitter":
            window.open('https://twitter.com/intent/tweet?hashtags=PortaleINPS,text=' + url.split('&tipologia')[0], 'Condividi su Twitter', windowFeatures);
            break;
        // 03/05/2019 - aggiunta linkedin
        case "googleplus":
            window.open('https://plus.google.com/u/0/share?url=' + url.split('&tipologia')[0], 'Condividi su Google+', windowFeatures);
            break;
        case "linkedin":
            window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + (encodeURIComponent(url.split('&tipologia')[0])), 'Condividi su LinkedIn', windowFeatures);
            break;
        default:
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url.split('&tipologia')[0], 'Condividi su Facebook', windowFeatures);
            social = "facebook";
            break;
    }
    var BaseUri = url.split('?')[0]; // C17
    var UriParams = url.split('?')[1]; //C18

    if ((BaseUri.indexOf('http') < 0)) {
        BaseUri = window.location.origin + window.location.pathname;
    }

    var URI = encodeURIComponent(BaseUri) + encodeURIComponent('?') + encodeURIComponent(UriParams.split('&tipologia')[0]) + '&tipologia' + UriParams.split('&tipologia')[1]; //Url definitiva da loggare

    //-----------------------------------------------------------------
    var CleanedUrl = location.protocol + '//' + location.host;
    var LogUrl = CleanedUrl + '/modelliNuovo/assets/img/icon/share-' + social + '.png?urlCanonico=' + URI;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST", LogUrl, true);
    xmlhttp.send(null);

    var respo = xmlhttp.responseText;
    document.getElementById("socialCallResponse").innerHTML = xmlhttp.responseText;
}



//  C19

function GoToStep2(bStep) {
    var aList = document.getElementsByTagName("a");
    var hfCategs = document.getElementById("hfCategs");
    var hfSubCategs = document.getElementById("hfSubCategs");

    hfCategs.value = hfSubCategs.value = "";

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("link-node  btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hfCategs.value = hfCategs.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
        else if ($(aList[i]).hasClass("btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hfSubCategs.value = hfSubCategs.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    if (hfCategs.value.length <= 1) { // && hfSubCategs.value.length <= 1
        modalAlert('Per avviare la ricerca devi prima aver selezionato almeno una delle categorie di utenza elencate.');
        return;
    }

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);


    hfCategs.value = hfCategs.value.length > 1 ? ";Categs_" + hfCategs.value.substring(0, hfCategs.value.length - 1) : "";
    hfSubCategs.value = hfSubCategs.value.length > 1 ? ";SubCategs_" + hfSubCategs.value.substring(0, hfSubCategs.value.length - 1) : "";

    if (bStep) {
        window.location.href = "Default.aspx?service-finder-action=2&service-finder-value=Age_" + document.getElementsByClassName("slider-handle min-slider-handle round")[0].innerText + hfCategs.value + hfSubCategs.value;
    }
    else {
        window.location.href = "Default.aspx?service-finder-action=4&service-finder-value=Age_" + document.getElementsByClassName("slider-handle min-slider-handle round")[0].innerText + hfCategs.value + hfSubCategs.value;
    }
}

function GoToStep3(bStep) {
    var aList = document.getElementsByTagName("a");
    var hfDrops = document.getElementById("hfDrops");
    var hfOthers = document.getElementById("hfOthers");

    var ddlFigli = document.getElementById("ddlFigli");
    var ddlFamiglia = document.getElementById("ddlFamiglia");
    var ddlFasciaRed = document.getElementById("ddlFasciaRed");
    var txtCAP = document.getElementById("txtCAP");

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);

    hfDrops.value = hfOthers.value = "";
    hfDrops.value = ddlFigli[ddlFigli.options.selectedIndex].value + "," + ddlFamiglia[ddlFamiglia.options.selectedIndex].value + "," + ddlFasciaRed[ddlFasciaRed.options.selectedIndex].value;
    var cityField = (txtCAP.value === "" ? "00000" : txtCAP.value.replace(",", "###").replace('&', '&amp;'));

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hfOthers.value = hfOthers.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    hfOthers.value = hfOthers.value.length > 1 ? ";Others_" + hfOthers.value.substring(0, hfOthers.value.length - 1) : "";

    if (bStep) {
        window.location.href = "Default.aspx?service-finder-action=3&" + window.location.href.split('&')[1] + ";Drops_" + hfDrops.value + hfOthers.value + ";city_" + cityField;
    }
    else {
        window.location.href = "Default.aspx?service-finder-action=4&" + window.location.href.split('&')[1] + ";Drops_" + hfDrops.value + hfOthers.value + ";city_" + cityField;
    }
}

function GoToResults() {
    var aList = document.getElementsByTagName("a");
    var hf = document.getElementById("hf");

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);

    hf.value = "";

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hf.value = hf.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    hf.value = hf.value.length > 1 ? ";Themes_" + hf.value.substring(0, hf.value.length - 1) : "";

    var urlSF4 = "Default.aspx?service-finder-action=4&" + window.location.href.split('&')[1] + hf.value;

    window.location.replace(urlSF4);

}



// C21

function GoToStep2simple(bStep) {
    var aList = document.getElementsByTagName("a");
    var hfCategs = document.getElementById("hfCategs");

    hfCategs.value = "";

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("link-node  btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hfCategs.value = hfCategs.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    if (hfCategs.value.length <= 1) { // && hfSubCategs.value.length <= 1
        modalAlert('Per avviare la ricerca devi prima aver selezionato almeno una delle categorie di utenza elencate.');
        return;
    }

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);

    hfCategs.value = hfCategs.value.length > 1 ? "Categs_" + hfCategs.value.substring(0, hfCategs.value.length - 1) : "";

    var prova = "";
    try {
        if (sSottoCategorieSF != undefined) {
            prova = ";" + sSottoCategorieSF;
        }
    }
    catch (err) { }


    if (bStep) {
        window.location.href = "Default.aspx?sservice-finder-action=2&service-finder-value=" + hfCategs.value + prova   // + hfSubCategs.value;
    }
    else {
        window.location.href = "Default.aspx?service-finder-action=4&service-finder-value=" + hfCategs.value + prova  // + hfSubCategs.value;
    }
}

function GoToStep3simple() {
    var aList = document.getElementsByTagName("a");
    var hfSubCategs = document.getElementById("hfSubCategs");

    hfSubCategs.value = "";

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hfSubCategs.value = hfSubCategs.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);

    //se arrivo dai risultati del service finder devo eliminare la seconda parte del querystring...
    var test = tornaQString("service-finder-value").toString();
    if (test.indexOf(";") > 0) {
        test = test.split(";")[0];
    }

    hfSubCategs.value = hfSubCategs.value.length > 1 ? ";SubCategs_" + hfSubCategs.value.substring(0, hfSubCategs.value.length - 1) : "";
    window.location.href = "Default.aspx?service-finder-action=4&service-finder-value=" + test + hfSubCategs.value + "#helpSFCategorieUtenze";
}
//C22
function tornaQString(chiave) {
    var vars = [], hash;
    var q = document.URL.split('?')[1];
    if (q != undefined) {
        q = q.split('&');
        for (var i = 0; i < q.length; i++) {
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars[chiave];
}

function GoToResultsSimple() {
    var aList = document.getElementsByTagName("a");
    var hf = document.getElementById("hf");

    // C20
    var over = '<div id="overlay">' + '<img id="loading" src="./modelliNuovo/assets/img/loading-icon.gif">' + '</div>';
    $(over).appendTo('body');

    setTimeout(function () {
        $('#overlay').fadeOut('slow');
    }, 3000);

    hf.value = "";

    for (var i = 0; i < aList.length; i++) {
        if ($(aList[i]).hasClass("btn btn-sm btn-default service-finder__form-group__field-list__field service-finder__form-group__field-list__field--active")) {
            if (aList[i].hasAttribute("data-query")) {
                hf.value = hf.value + aList[i].attributes["data-query"].nodeValue + ",";
            }
        }
    }

    hf.value = hf.value.length > 1 ? ";Themes_" + hf.value.substring(0, hf.value.length - 1) : "";

    var urlSF4 = "Default.aspx?service-finder-action=4&" + window.location.href.split('&')[1] + hf.value;

    window.location.replace(urlSF4);

}



//C23

function updateAgeSlider() {
    var slider = document.getElementsByClassName("slider-handle min-slider-handle round");
    if (null != slider) {
        slider[0].innerText = document.getElementsByClassName("tooltip-inner")[0].innerText;
        if (slider[0].innerText === '17') {
            $('.slider-handle').addClass("disabled");
            $('.service-finder__fieldset.service-finder__age p').html("<strong>EtÃ  ininfluente.</strong> Spostare il cursore selezionare la propria etÃ .");
        }
        else {
            $('.slider-handle').removeClass("disabled");
            $('.service-finder__fieldset.service-finder__age p').html("&nbsp;");
        }
    }
}

//C24
function ResizeiFrame() {
    $("iframe").each(function () {
        // $(this).width($(this).closest("div").closest("div").width());
    });
}

//C25

function changeStatusHover(hover, selected, hiddenfieldhover, hiddenfieldselected) {
    var spanHover = $("#" + hover);
    var spanSelected = $("#" + selected);
    var spanHiddenHover = $("#" + hiddenfieldhover);
    var spanHiddenSelected = $("#" + hiddenfieldselected);

    if (!$(spanHiddenHover[0]).hasClass("changed")) {
        spanHover[0].setAttribute("style", spanHiddenSelected[0].value);
        $("#" + hiddenfieldhover).addClass("changed");
    }
    else {
        spanHover[0].setAttribute("style", spanHiddenHover[0].value);
        $("#" + hiddenfieldhover).removeClass("changed");
    }
}



// C26

function setLayoutHomePage() {
    if ($(window).width() > 960) {
        var Strumenti = $("#InEvidenzaLayout")
        if ($("#CategUtenzaList")[0] !== undefined) {
            if ($("#CategUtenzaList")[0].children.length > 6) {
                var ListLength = 0;

                if ($("#CategUtenzaList2")[0] !== undefined) {
                    if ($("#CategUtenzaList")[0].children.length > $("#CategUtenzaList2")[0].children.length) {
                        ListLength = $("#CategUtenzaList")[0].children.length;
                    }
                    else {
                        ListLength = $("#CategUtenzaList2")[0].children.length;
                    }
                }
                else {
                    ListLength = $("#CategUtenzaList")[0].children.length;
                }

                Strumenti[0].style.height = (34 + ((ListLength - 6) * 4)) + "em";
                $("#CategorieUtenzaLayout")[0].style.height = (34 + ((ListLength - 6) * 4)) + "em";
            }
            else {
                if ($("#CategUtenzaList2")[0] !== undefined) {
                    if ($("#CategUtenzaList2")[0].children.length > 6) {
                        ListLength = $("#CategUtenzaList")[0].children.length;

                        Strumenti[0].style.height = (34 + ((ListLength - 6) * 4)) + "em";
                        $("#CategorieUtenzaLayout")[0].style.height = (34 + ((ListLength - 6) * 4)) + "em";
                    }
                }
            }
        }
    }
    else {
        if ($("#InEvidenzaLayout")[0] !== undefined && $("#CategorieUtenzaLayout")[0] !== undefined) {
            $("#InEvidenzaLayout")[0].style.height = "";
            $("#CategorieUtenzaLayout")[0].style.height = "";
        }
    }
}

//_________________________________________________________________________________________

$(document).ready(function () {

    setLayoutHomePage();

    $(".modal").each(function () {
        $(this).on("shown.bs.modal", function () {
            $(this).find("button.close").focus();
        });
    });


    // C27
    $(".people-activity-meta").filter(function () {
        if ($(this).find("ul li").size() == 1) {
            $(this).find(".arrowDown").addClass("one");
        }
        if ($(this).find("ul li").size() == 2) {
            $(this).find(".arrowDown").addClass("two");
        }
    });

    // C28
    $('.modalDim').attr('style', 'max-height:' + (($(window).height() / 5) * 3) + 'px; overflow-y:auto;');


    // C29
    $('#confirm-delete').on('show.bs.modal', function (e) {
        $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
    });


    $('#office-finder-cap').keydown(function (e) {
        if (e.keyCode == 13)
            modalAlert('Questo contenuto sarÃ  disponibile nella versione definitiva del portale.\n\nPuoi cercare questa informazione visitando www.inps.it');
    });


    var cardShocases = [];
    /*C189*/
    function pauseShowcaseSwiper(swi) {
        swi.destroy(false, true);
    }
    function playShowcaseSwiper(swi) {
        try {
            swi.init();
        }
        catch (ex) { }
    }
    /*fine C189*/



    function updateShowcaseSwipers() {
        // C30
        if ($(window).width() >= $_viewportBreakpoints.lg) {
            $('.js-swi-check-abovelg-pause').each(function () {
                /*C188*/
                /*pauseShowcaseSwiper(jQuery.data($(this)[0], "swi"));
                $(this).removeClass("js-swi-check-abovelg-pause").addClass("js-swi-check-belowlg-play");*/
            });

            /* C31 */
            $('.card-showcase .swiper-container').each(function () {
                if ($(this).hasClass("swiper-active")) {

                    if (!jQuery.data($(this)[0], "swi")) {
                        initSwiper($(this));


                        var $swiperPrev = $(this).parent().find(".swiper-button-prev-clone");
                        var $swiperNext = $(this).parent().find(".swiper-button-next-clone");

                        $(this).find(".swiper-button-prev").appendTo($swiperPrev);
                        $(this).find(".swiper-button-next").appendTo($swiperNext);
                    }
                    /*C188*/
                    /*playShowcaseSwiper(jQuery.data($(this)[0], "swi"));
                    $(this).removeClass("js-swi-check-belowlg-play").addClass("js-swi-check-abovelg-pause");*/
                }
            });

        } else {
            $('.js-swi-check-belowlg-play').each(function () {

                if (!jQuery.data($(this)[0], "swi")) {
                    initSwiper($(this));
                }

                playShowcaseSwiper(jQuery.data($(this)[0], "swi"));
                $(this).removeClass("js-swi-check-belowlg-play").addClass("js-swi-check-abovelg-pause");

            });

            /* C31 */
            $('.card-showcase .swiper-container').each(function () {
                if ($(this).hasClass("swiper-active")) {

                    var $swiperPrev = $(this).parent().find(".swiper-button-prev-clone");
                    var $swiperNext = $(this).parent().find(".swiper-button-next-clone");

                    $(this).find(".swiper-button-prev").appendTo($swiperPrev);
                    $(this).find(".swiper-button-next").appendTo($swiperNext);
                }
            });

        }
    }
    function initSwiper(el) {
        var swi = new Swiper(el, {
            pagination: el.find('.card-showcase__navigation'),
            paginationClickable: true,
            nextButton: el.find('.card-showcase__nav-next'),
            prevButton: el.find('.card-showcase__nav-prev'),
            preventClicks: false,
            preventClicksPropagation: false
        });
        /*C188*/
        /*cardShocases.push(swi);
        jQuery.data(el[0], "swi", swi);*/
    }
    $('.card-showcase .swiper-container').each(function () {

        if ($(this).parent().hasClass("card-showcase--standard")) {
            if ($(window).width() >= $_viewportBreakpoints.lg) {
                $(this).addClass("js-swi-check-belowlg-play");

                if ($(this).hasClass("swiper-active")) {
                    $(this).addClass("js-swi-check-belowlg-pause");
                }
            } else {
                initSwiper($(this));
                $(this).addClass("js-swi-check-abovelg-pause");
            }
        }

    });
    $(window).resize(updateShowcaseSwipers);
    updateShowcaseSwipers();

    $('.article__gallery .swiper').each(function () {
        var swi = new Swiper($(this), {
            pagination: $(this).find('.article__gallery__navigation'),
            paginationClickable: true,
            nextButton: $(this).find('.article__gallery__nav-next'),
            prevButton: $(this).find('.article__gallery__nav-prev'),
            preventClicks: false,
            preventClicksPropagation: false
        });
    });


    /*
    * C32
    * ----------------
    * */
    $(".navbar-semantic-users--vertical .swiper-container").each(function () {
        var swiContainer = $(this);
        var swi = new Swiper($(this), {
            /*   preventClicks: false,
            reventClicksPropagation: false*/
            nextButton: $(this).find('.navbar-semantic-users--vertical__next'),
            prevButton: $(this).find('.navbar-semantic-users--vertical__prev'),
            onSlideNextStart: function () {
                $(".navbar-semantic-users--vertical__next", swiContainer).hide();
                $(".navbar-semantic-users--vertical__prev", swiContainer).show();
            },
            onSlidePrevStart: function () {
                $(".navbar-semantic-users--vertical__prev", swiContainer).hide();
                $(".navbar-semantic-users--vertical__next", swiContainer).show();
            },
            preventClicks: false,
            preventClicksPropagation: false
        });
        if ($(this).closest('.navbar-semantic-users--cambia-utente').length > 0) {
            $('.navbar-semantic-users--cambia-utente').on("shown.bs.modal", function () {
                swi.onResize();
            });
        }
    });


    /*
    * C33
    * -------------------------
    * C34
    * */
    $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger').on(clickEvent, function () {
        $(this).toggleClass("navbar-vertical__hamburger--expanded");
        $(this).next("ul").slideToggle("fast");
    })
    function navbarVerticalOnResize() {

        //aggiunte righe altezza automatica
        var divToChange = document.getElementsByClassName("childMenuA");
        $(divToChange).attr('style', 'height: auto;');
        var aiutaciToChange = document.getElementsByClassName("conf-piccola-4");
        var aiutaciToChangeRight = document.getElementsByClassName("conf-piccola-5");
        $(aiutaciToChange).attr('style', 'display: block !important');
        $(aiutaciToChangeRight).attr('style', 'display: none !important');
        RipristinaMenuContestuale();
        if ($(window).width() > $_viewportBreakpoints.lg) {
            $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger + ul').show();
            $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger').removeClass("navbar-vertical__hamburger--expanded");
            $(aiutaciToChange).attr('style', 'display: none !important');
            $(aiutaciToChangeRight).attr('style', 'display: block !important;margin-top:33px');
        }

        //ara aggiunto controllo per filtro alfabetico
        if ($(window).width() > $_viewportBreakpoints_HM.sm) {
            $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger + ul').hide();
            $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger + ul').removeAttr("style");
            $('.navbar-vertical:not(.navbar--toolbox) .navbar-vertical__hamburger').removeClass("navbar-vertical__hamburger--expanded");
        } 
    }
    $(window).resize(navbarVerticalOnResize);

    $('.navbar__node--expandible a, .navbar-vertical .navbar__node--expandible__icon-expanded, .navbar-vertical  .navbar__node--expandible__icon-collapsed').on(clickEvent, function (e) {

        // C35
        if ($(this).attr("href")) {
            if ($(this).attr("href").indexOf("#") == 0) {
                e.stopPropagation();
                e.preventDefault();


                //C36
                if ($(this).parent().hasClass("navbar__node--expandible--expanded")) {


                    //C37
                    $(this).parent().parent().find("li:not(.navbar__node--expandible--expanded) ul").slideUp("fast");
                    $(this).parent().parent().find("li:not(.navbar__node--expandible--expanded)").addClass("navbar__node--expandible--expanded");

                    //C38
                    $(this).next("ul").slideDown("fast");
                    $(this).parent().removeClass("navbar__node--expandible--expanded");

                }
                else {

                    $(this).next("ul").slideToggle("fast");
                    $(this).parent().toggleClass("navbar__node--expandible--expanded");
                }

            }
        } else {
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().next("ul").slideToggle("fast");
            $(this).parent().parent().toggleClass("navbar__node--expandible--expanded");
        }
    });


    /*
    * C39
    * -------------------------
    * */
    if ($('.responsive-filter').length) {
        $("body").append('<div class="responsive-filter__bucket"></div>');
        responsiveFilterUpdateWidth();
    }
    $('.responsive-filter__heading').on(clickEvent, function () {
        $("#" + $(this).attr("data-href")).css("top", $(this).offset().top + 42);
        $("#" + $(this).attr("data-href")).toggle();
        $(this).parent().toggleClass("responsive-filter--expanded");
    });
    function responsiveFilterUpdateWidth() {
        if ($(window).width() > $_viewportBreakpoints.lg) {
            $('.responsive-filter__bucket').children().each(function () {
                $(".responsive-filter__heading[data-href=" + $(this).attr("id") + "]").parent().append($(this));
                $(this).removeAttr("style");
            });
        } else {
            $('.responsive-filter__heading + .responsive-filter__body').each(function () {
                var btn = $(this).prev();
                var target = "#" + btn.attr("data-href");
                $(".responsive-filter__bucket").append($(target));
                $(target).css({ "display": "none" });
            });
        }
    }
    $(window).resize(responsiveFilterUpdateWidth);



    /*
    * C40
    * -------------------------
    * */
    $('#social-stream-tabs a').on(clickEvent, function (e) {
        e.preventDefault();
        $(this).tab('show');
    })

    /* C41
    * -------------------------
    * */
    if ($('.tabcordion').length > 0) { $('.tabcordion').tabcordion(); }


    /**
    * C42
    * --------------------
    */
    if ($('.search__autocompleter').length) {

        $("#foldit").on("keyup", function (e) {
            if (e.keyCode === 13) {
                loading(e);
            }

            //$(input).keydown(function () {
            if ($(this).val().length >= 1) {
                $('.search__autocompleter').show();
                $("body").addClass("search__autocompleter--open");
                toggleSuggestionPanel($(this).val());
            } else {
                $('.search__autocompleter').hide();
                $("body").removeClass("search__autocompleter--open");
            }
        });


        $(document).on(clickEvent, "body.search__autocompleter--open", function (e) {
            var t = $(event.target);
            if (!t.is(".search__autocompleter") && !t.is(".search__input-box")
                && !t.closest(".search__autocompleter").length
                && !t.closest(".search__input-box").length
            ) {
                $(".search__autocompleter").hide();
                $("body").removeClass("search__autocompleter--open");
            }
        });
    }


    // 24/06/2019 - check se vi Ã¨ nuovo header

    $('#foldit').on(clickEvent, function (event) {
        if (!HM_nuovoHeader) {
            $('.hide-nav').hide();
            var toggleClass = $(this).width() === 60 ? "" : "expand";
            $(this).removeClass("expand").addClass(toggleClass);
        }
        $(this).attr("placeholder", "");
        event.stopPropagation();
    });
    setSearchPlaceholder();

    function setSearchPlaceholder() {
        $("#foldit").attr("placeholder", "Cerchi servizi, prestazioni, informazioni? Es. Pensioni");
    }

    // 24/06/2019 - check se vi Ã¨ nuovo header
    // C43
    $('#foldit').focus(function () {
        if (!HM_nuovoHeader) {
            $('.hide-nav').hide();
            $('.hide-nav').css('opacity', '0');
            var toggleClass = $(this).width() === 60 ? "" : "expand";
            $(this).removeClass("expand").addClass(toggleClass);
        }
        $(this).attr("placeholder", "");
    });
    $('#foldit').focusout(function () {
        if (!HM_nuovoHeader) {
            $('.hide-nav').show();
            $('.hide-nav').css('opacity', '1');
            $(this).removeClass("expand");
        }
        $(this).attr("placeholder", "Cerchi servizi, prestazioni, informazioni? Es. Pensioni");
    });
    // fine C43

    function closeSuggestionPanel() {

        $('#foldit').removeClass("expand");
        $('.hide-nav').delay(300).show(0);

        // C44
        $('.search__autocompleter').hide();
        $("body").removeClass("search__autocompleter--open");

        $("input[id=foldit]").val("");
    }

    $('.search-filter__node--more ul a').on(clickEvent, function (e) {
        e.preventDefault();
        var sf = $(this).closest(".search-filter");

        // C45
        var oldLast = sf.find("> ul > li.search-filter__node--visible:not(.search-filter__node--more)").last();
        oldLast.removeClass("search-filter__node--visible");
        $('.search-filter__node--active', sf).removeClass("search-filter__node--active");
        $("#" + $(this).attr("href")).addClass("search-filter__node--visible").addClass("search-filter__node--active");

        // C46
        $(this).parent().removeClass("search-filter__node--visible");
        $(this).closest('.search-filter__node--more').find("a[href=" + oldLast.attr("id") + "]").parent().addClass("search-filter__node--visible");

    });
    $('.search-filter__hamburger').on(clickEvent, function () {
        $(this).toggleClass("search-filter__hamburger--expanded");
        $(this).next("ul").slideToggle("fast");
    })
    function searchFilterOnResize() {
        if ($(window).width() > $_viewportBreakpoints.lg) {
            $('.search-filter__hamburger + ul').show();
            $('.search-filter__hamburger').removeClass("search-filter__hamburger--expanded");
        }
    }
    $(window).resize(searchFilterOnResize);


    $('.article--with-sticky-header').each(function () {
        var stickyHead = $(this).find(".article__header--sticky");
        var article = $(this);
        $(window).scroll(function () {

            /*if ($(window).width() > $_viewportBreakpoints.md && $(window).scrollTop() > article.offset().top + stickyHead.height()) {*/
            if ($(window).width() > 0 && $(window).scrollTop() > article.offset().top + stickyHead.height()) {
                stickyHead.slideDown("fast");
            } else {
                stickyHead.slideUp("fast");
            }
        });
    });
    $('.article--accordionable').each(function () {

        // C47
        var collapsedIcon = $(this).attr("data-accordionCollapsedIcon");
        var expandedIcon = $(this).attr("data-accordionExpandedIcon");
        $($(this).attr("data-accordionTrigger"), $(this)).each(function () {
            $(this).addClass("article__section__heading--expandible-trigger");
            $(this).append(
                '<span class="icon">+</span>'
            );

        });

        // C48
        $($(this).attr("data-accordionTrigger"), $(this)).on(clickEvent, function () {
            $(this).next(".article__section__body").slideToggle("fast");
            $(this).toggleClass("article__section__heading--expandible--expanded");
        });

    });
    // C49
    $('.article__outline').each(function () {

        var article = $(this).closest('.article');
        var articleHead = $(article).find(".article__header");
        var outline = $(this);
        var outlineId = "article__outline--" + Date.now();
        outline.attr("id", outlineId);

        //C50
        $('a', $(this)).on(clickEvent, function (e) {
            e.preventDefault();
            var off = $($(this).attr("href")).offset().top - $('.article__header--sticky', article).height() - 40;
            $('body,html').animate({ scrollTop: off }, 400);
            $('.navbar__node--active', outline).removeClass("navbar__node--active");
            $(this).parent().addClass("navbar__node--active");
        });

        if ($(article).hasClass("article--with-sticky-nav")) {
            $(window).scroll(function () {
                wait(1000);
                if ($(window).scrollTop() > article.offset().top) {
                    outline.addClass("article__nav--sticky--fixed");
                } else if ($(window).scrollBottom() > article.offset().bottom) {
                    outline.addClass("article__nav--sticky--fixed");
                }
                else {
                    outline.removeClass("article__nav--sticky--fixed");
                }
            });
        }

        // C51
        $('body').css("position", "relative");
        $('body').attr("data-spy", "scroll");
        $('body').scrollspy({ //target: "#"+outlineId
        });
    });


    if ($('[data-toggle="tooltip"]').length > 0)
        $('[data-toggle="tooltip"]').tooltip();

    $(window).scroll(function () {
        //C52
        $(".card__metadata .tooltip").fadeOut("fast");
    });


    /**
    * C53
    * ----------
    */
    if ($('.glossary__term').length > 0) {
        $('.glossary__term').tooltip({
            placement: "top",
            template: '<div class="tooltip glossary__term__explaination" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }

    if ($('.glossary__term__finder').length > 0) {
        $(".glossary__term__finder").tooltip({
            placement: "top",
            template: '<div class="tooltip glossary__explaination__finder left-15" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="left:-15px"></div></div>'
        });
    }
    if ($('.action-report').length > 0) {
        $(".action-report").tooltip({
            placement: "top",
            template: '<div class="tooltip myinps_bookmark-tooltip-content" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }


    /* C54 */

    try {
        if ($('.myinps_bookmark-link').length > 0) {
            $('.myinps_bookmark-link').tooltip({
                placement: "top",
                template: '<div class="tooltip myinps_bookmark-tooltip-content" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
        }
    } catch (ex) { }

    /*  C55 */
    if ($('#logofooter').length > 0) {
        $('#logofooter').tooltip({
            placement: "top",
            template: '<div class="tooltip myinps_bookmark-tooltip-content" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }







    $('.service-finder__form-group__field-list--none a').each(function (index) {
        $(this).addClass("btn").addClass("btn-xs").addClass("btn-default").addClass("service-finder__form-group__field-list__field");
        $(this).on(clickEvent, function (e) {
            e.preventDefault();
            $(this).toggleClass("service-finder__form-group__field-list__field--active");
            if ($(this).hasClass("service-finder__form-group__field-list__field--active")) {
                $(this).closest(".service-finder__form-group__field-list--none")
                    .siblings().find(".service-finder__form-group__field-list__field").each(function () {
                        $(this).removeClass("service-finder__form-group__field-list__field--active");
                        $(this).children("i").removeClass("fa-checksquare-o");
                        $(this).children("i").addClass("fa-square-o");
                    });
            }
        });
    });

    $('.service-finder__form-group__field-list a').each(function (index) {
        $(this).addClass("btn").addClass("btn-sm").addClass("btn-default").addClass("service-finder__form-group__field-list__field");
        $(this).children("i").addClass("fa");


        var step = $(this).closest(".service-finder__step");
        if (step.attr("data-step") == 1) $(this).children("i").addClass("fa-suitcase");
        if (step.attr("data-step") == 2) $(this).children("i").addClass("fa-square-o");
        if (step.attr("data-step") == 3) $(this).children("i").addClass("fa-tags");


        $(this).on(clickEvent, function (e) {
            e.preventDefault();

            $(this).closest(".service-finder__form-group__field-list")
                .siblings(".service-finder__form-group__field-list--none")
                .find("a").removeClass("service-finder__form-group__field-list__field--active")

            $(this).toggleClass("service-finder__form-group__field-list__field--active");
            if ($(this).hasClass("service-finder__form-group__field-list__field--active")) {
                $(this).children("i").removeClass("fa-square-o");
                $(this).children("i").addClass("fa-check-square-o");
            } else {
                $(this).children("i").removeClass("fa-checksquare-o");
                $(this).children("i").addClass("fa-square-o");
            }
            if ($(this).hasClass("service-finder__form-group__field-list__field--active")) {
                if ($(this).children().hasClass("fa-tags")) {

                    $(this).children("i").removeClass("fa-check-square-o");
                    $(this).children("i").addClass("fa-tags");
                    $(this).children("i").removeClass("fa-square-o");
                }
            }
            if ($(this).hasClass("service-finder__form-group__field-list__field")) {
                if ($(this).children().hasClass("fa-tags")) {
                    $(this).children("i").removeClass("fa-square-o");
                }
            }
        });
    });
    $('.service-finder__form-group .semantic-user').not(".disabled-cat").on(clickEvent, function (e) {
        if (!$(this).hasClass("disabled")) {
            $(this).children().children().children().toggleClass("active");
        }
    });


    $('.navbar__node__url-fix > .navbar__navbar-nav > li').each(function (index) {
        if (index == 0) {
            $(this).find("ul li a").each(function () {
                $(this).attr("href", $(this).attr("href") + "&area__sub__nav=sem.nav.orientamento");
            });
        } else if (index == 1) {
            $(this).find("ul li a").each(function () {
                $(this).attr("href", $(this).attr("href") + "&area__sub__nav=sem.nav.servizio");
            });
        } else if (index == 2) {
            $(this).find("ul li a").each(function () {
                $(this).attr("href", $(this).attr("href") + "&area__sub__nav=sem.nav.approfondimento");
            });
        }
    });


    var loading = function (e) {
        e.preventDefault();

        var trigger = $(this).attr("data-trigger");

        if (trigger && trigger.toLowerCase() === "service-finder") {
            if ($("#hfQueryParam").length && !$("#hfQueryParam").val().length) {
                //alert("hfQueryParam");
                modalAlert("Per avviare la ricerca devi prima aver selezionato almeno una delle categorie di utenza elencate.");
                return;
            }
        } else if (trigger && trigger.toLowerCase() === "direct-selection") {
            $("input[id=foldit]").val($(this).text());
        }
        else {
            var inlist = false;

            $(".search__autocompleter .dropdown-menu li").each(function () {
                if ($("input[id=foldit]").val().toUpperCase() === $(this).text().toUpperCase()) {
                    inlist = true;
                }
            });

            if (!inlist) {
                modalAlert("Stai navigando in un prototipo, Ã¨ possibile utilizzare la funzionalitÃ  di ricerca solo con uno dei termini suggeriti:\n- Pensioni\n- Disoccupazione\n- Sostegno \n- MaternitÃ  ");
                return;
            }
        }

        // C20
        var over = '<div id="overlay">' +
            '<img id="loading" src="../assets/img/loading-icon.gif">' +
            //$(this).attr("data-loading-text") + // C56
            // C57
            // C58
            '</div>';
        $(over).appendTo('body');

        setTimeout(function () {
            $('#overlay').fadeOut('slow');
        }, 3000);

        var url = $(this).attr("data-href");

        if (url == undefined || !url.length) {
            url = $("#btnFoldit").attr("data-href");
        }
        if ($("form").length) {
            if ($("form").find("input[name=q]").val() + "" != "") {
                url += "?q=" + $("form").find("input[name=q]").val();
            }
        }
        setTimeout(function () {
            var qstr = getSearchParams ? getSearchParams() : "";
            location.href = url + qstr; // "service-finder__result.php";
        }, 3000);


        // C59
        $(document).keyup(function (e) {
            if (e.which === 27) {
                $('#overlay').remove();
            }
        });
    };

    /**************************************************
    * C60
    **************************************************/
    var toggleSuggestionPanel = function (searchTerm) {
        var avialbeSearchTerms = [];
        var containsTerm = false;
        $(".search__autocompleter .dropdown-menu li").each(function () {
            avialbeSearchTerms.push($(this).text());
        });

        for (var i = 0, len = avialbeSearchTerms.length; i < len; i++) {
            if (searchTerm && searchTerm.length >= 3 && avialbeSearchTerms[i].toLowerCase().startsWith(searchTerm.toLowerCase())) {
                containsTerm = true;
                break;
            }
        }

        if (containsTerm) {
            $(".search__autocompleter .selectable-search-items").hide();
            $(".search__autocompleter .default-suggestions-panel").show();

            inlineSearch(searchTerm);
        } else {
            $(".search__autocompleter .selectable-search-items").show();
            $(".search__autocompleter .default-suggestions-panel").hide();
        }
    }

    /**
    * C61
    */
    var inlineSearch = function (searchTerm) {
        $.ajax({
            type: "POST",
            url: "search.aspx/InlineSearch",
            data: '{keyword:"' + searchTerm + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            if (data && data.d && data.d.length) {
                var results = JSON.parse(data.d);
                var closeButtonTemplate = '<button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">Ã—</span></button>';
                var defaultContentHtml = '<div class="col-md-4 col-md-offset-4 all-results"><button type="button" class="btn btn-primary loading-btn-inline" data-href="../template/search.aspx" data-loading-text="Stiamo ottimizzando la tua ricerca">Tutti i risultati</button></div>';
                var articleTemplate =
                    '<article class="card card--xs--format-xs card--md--format-xs {articleClass} ">' +
                    '<a href="../template/prestazioni-e-servizi__foglia.aspx?area=in.spot-search&p={Key}" class="card__link">' +
                    '    <div class="card__media">' +
                    '        <img class="media-object" src="{ImageUrl}" alt="" />' +
                    '    </div>' +
                    '    <!-- card__media -->' +
                    '    <div class="card__information">' +
                    '        <div class="thumb-image">' +
                    '            <img alt="" src="{ImageUrl}">' +
                    '        </div>' +
                    '        <div class="card__identity card__identity--">' +
                    '            <span class="card__identity__icon">' +
                    '                <i class="{arcleIconClass}"></i>' +
                    '            </span>' +
                    '            <span class="card__identity__label">{Tipo}</span>' +
                    '            <span class="card__identity__date">07/07/2016</span>' +
                    '        </div>' +
                    '        <header class="card__header">' +
                    '            <h2 class="card__heading">{Titolo}</h2>' +
                    '        </header>' +
                    '        <div class="card__content">' +
                    '            {Riassunto}' +
                    '        </div>' +
                    '    </div>' +
                    '</a>' +
                    '<div class="card__metadata">' +
                    '    <div class="people-activity-meta">' +
                    '        <ul>' +
                    '            <li class=""><a href="#" onclick="modalAlert(\'Questo elemento sarÃ  disponibile al lancio del nuovo portale INPS. Attualmente stai navigando su un prototipo. \n\n Puoi trovare questa informazione su www.inps.it\');"><i class="icon icon-icon__comment"></i>12</a></li>' +
                    '            <li class=""><a href="#" onclick="modalAlert(\'Questo elemento sarÃ  disponibile al lancio del nuovo portale INPS. Attualmente stai navigando su un prototipo. \n\n Puoi trovare questa informazione su www.inps.it\');"><i class="icon icon__heart"></i>5</a></li>' +
                    '            <li class=""><a href="#" onclick="modalAlert(\'Questo elemento sarÃ  disponibile al lancio del nuovo portale INPS. Attualmente stai navigando su un prototipo. \n\n Puoi trovare questa informazione su www.inps.it\');"><i class="icon icon__share"></i>4320</a></li>' +
                    '        </ul>' +
                    '    </div>' +
                    '</div>' +
                    '</article>';
                var notizieTemplate = '<div class="col-md-12 col-lg-4"><div class="hot-contents"><h2 class="hot-contents__heading"><i class="fa fa-newspaper-o"></i>Notizie</h2>{item}</div></div>';
                var serviziTemplate = '<div class="col-md-6 col-lg-4 md-hide"><div class="hot-contents"><h2 class="hot-contents__heading"><i class="fa fa-inbox"></i>Prestazioni e servizi</h2>{item}</div></div>';
                var orientamentoTemplate = '<div class="col-md-6 col-lg-4 md-hide"><div class="hot-contents"><h2 class="hot-contents__heading"><i class="fa fa-compass"></i>Per orientarsi</h2>{item}</div></div>';


                var notizie = results.Notizie;
                var servizi = results.Servizi;
                var orientamento = results.Orientamento;
                var html;

                // C62
                $(".default-suggestions-panel").empty().append($(defaultContentHtml));

                // C63
                html = "";
                for (var i = 0; i < orientamento.length; i++) {
                    html += articleTemplate.replaceAll("{Key}", orientamento[i].Key).replaceAll("{ImageUrl}", orientamento[i].ImageUrl).replaceAll("{Tipo}", orientamento[i].Tipo).replaceAll("{Titolo}", orientamento[i].Titolo).replaceAll("{Riassunto}", "Customitio lorem ipsum...").replaceAll("{arcleIconClass}", "fa fa-compass").replaceAll("{articleClass}", "card__identity--orientamento");
                }
                $(".default-suggestions-panel").prepend($(orientamentoTemplate.replaceAll("{item}", html)));

                // C64
                html = "";
                for (var i = 0; i < servizi.length; i++) {
                    html += articleTemplate.replaceAll("{Key}", servizi[i].Key).replaceAll("{ImageUrl}", servizi[i].ImageUrl).replaceAll("{Tipo}", servizi[i].Tipo).replaceAll("{Titolo}", servizi[i].Titolo).replaceAll("{Riassunto}", "Customitio lorem ipsum...").replaceAll("{arcleIconClass}", "fa fa-inbox").replaceAll("{articleClass}", "card__identity--servizio");
                }
                $(".default-suggestions-panel").prepend($(serviziTemplate.replaceAll("{item}", html)));

                // C65
                html = "";
                for (var i = 0; i < notizie.length; i++) {
                    html += articleTemplate.replaceAll("{Key}", notizie[i].Key).replaceAll("{ImageUrl}", notizie[i].ImageUrl).replaceAll("{Tipo}", notizie[i].Tipo).replaceAll("{Titolo}", notizie[i].Titolo).replaceAll("{Riassunto}", "Customitio lorem ipsum...").replaceAll("{arcleIconClass}", "fa fa-newspaper-o").replaceAll("{articleClass}", "");
                }
                $(".default-suggestions-panel").prepend($(notizieTemplate.replaceAll("{item}", html)));

                // C66
                $(".default-suggestions-panel").prepend($(closeButtonTemplate));

                $(".loading-btn-inline").off().on(clickEvent, loading);

                $(".search__autocompleter .close").on(clickEvent, function () {
                    closeSuggestionPanel();
                });
            }
        }).fail(function (data) {
            modalAlert(JSON.stringify(data));
        });
    };


    $("div[data-step] a[data-query]").on(clickEvent, function (e) {
        e.preventDefault();
        var hfValue = [];


        $("div[data-step] a[data-query].service-finder__form-group__field-list__field--active").each(function () {
            //alert("push value data-query");
            hfValue.push($(this).attr("data-query").trim());
        });

        $("#hfQueryParam").val(hfValue.toString());

    });
    function getSearchParams() {
        if (!$("#hfQueryParam").length) {
            return "";
        }

        var params = $("#hfQueryParam").val().split(",");
        var qstring = "";

        for (var i = 0, len = params.length; i < len; i++) {
            qstring += params[i].trim() === "" ? "" : params[i].trim() + "=1&";
        }

        return qstring ? "?" + qstring : "";
    }


    // C69
    // C70
    var closeOpenedHamburgerHandler = function (event) {
        var clickover = $(event.target);
        var opened = $(".navbar-collapse").hasClass("in");
        var isInner = clickover.parents(".navbar-collapse").hasClass("in");
        if (opened === true && !isInner && !clickover.hasClass("navbar-toggle")) {
            // C71
            //$("button.navbar-toggle").click();
        }
    };
    var bodyEle = $("body").get(0);
    if (bodyEle.addEventListener) {
        bodyEle.addEventListener("click", closeOpenedHamburgerHandler, true);
    } else if (bodyEle.attachEvent) {
        document.attachEvent("onclick", closeOpenedHamburgerHandler);
    }



    /**
    * C73
    */
    $("body").on(clickEvent, "a.disabled,a.disabled-alt", function (e) {
        // C74
        // C75
        if ($(this).attr('class').indexOf('ioscheck') > 0
            && (ua.match(/iPad/i) || ua.match(/iPhone/i))) {
            modalAlert("Questo elemento sarÃ  disponibile al lancio del nuovo portale INPS. Attualmente stai navigando su un prototipo. \n\n Puoi trovare questa informazione su www.inps.it");
            return false;
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).attr('href') == '#mc') { MC(); }
    });

    function MC() {
        modalAlert('Stai navigando un prototipo. \nPotrai accedere a questo elemento al lancio del nuovo portale INPS');
    }

    /**
    * C76
    */
    $("body").on(clickEvent, "a[data-keys]", function (e) {
        e.preventDefault();

        var keys = $(this).attr("data-keys").split("|");

        $("[data-key]").addClass("hidden");

        for (var i = 0, len = keys.length; i < len; i++) {
            $("[data-key]").each(function () {
                var key = $(this).attr("data-key");

                if (key.toLowerCase() === keys[i].toLowerCase()) {
                    $(this).removeClass("hidden");
                }
            });
        }
    });

    /*
    * C77
    */

    // C78
    // 03/05/2019 - disattivazione commenti
    if (window.location.href.toLowerCase().indexOf('&comments=true') !== -1) {
        if (document.getElementById("comments") == null) {
            window.scrollTo(0, 0)
        }
        else {
            history.scrollRestoration = 'manual';
            window.scrollTo(0, $('#comments').offset().top);

            // C79
            window.location.hash = ''; // C80
            window.location.hash = '#commentscontainer';
        }

    }


    footerAccordation()

    $(window).resize(function () {
        footerAccordation();
    });

    $("body").prepend($("#app"));

    function footerAccordation() {


        /**
        * C81
        
        if ($(window).width() < 672) {*/

        if ($(window).width() < 656) {

            $(".accordation ul").hide();
            $(".accordation span").text("+");

            // 02/08/2019 - inserimento controllo larghezza per evitare accordion in desktop
            $(".accordation a").unbind(clickEvent).on(clickEvent, function (f) {
                if ($(window).width() < 656) {
                    if ($(this).next().is(':visible')) {
                        $(this).find('span').text("+");
                        $(this).find('span').removeClass("rotate");
                        $(this).next().slideUp();
                    } else {
                        $(this).find('span').text("+");
                        $(this).find('span').addClass("rotate");
                        $(this).next().slideDown();
                    }
                }
            })
        } else {
            $(".accordation ul").show();
        }



    }



    setImageFit();
    $(window).resize(function () {
        waitForFinalEvent(function () {
            setImageFit();
        }, 50, "timerImageResizer");
    });

    /**
    * C83
    */
    if ($(".article__nav[data-spy]").length) {
        var offsetTop = $(".navbar-inverse").height() + $(".header-global").height() + $(".layout__header").height() + 16; // risoluzione menu spalla sx
        //console.log("somma:" + $(".navbar-inverse").height() + "+" + $(".header-global").height() + "+" + $(".layout__header").height() + "+ 16 =" + offsetTop);
        $(".article__nav").affix({
            offset: {
                //top: $(".article__nav").offset().top,
                top: offsetTop, // C84
                bottom: $("footer").outerHeight(true) + 40
            }
        });
    }
});

function setImageFit() {
    $(".card__media img").each(function () {
        $(this).removeClass("large-image");

        var imageWidth = $(this).width();
        var parentWidth = $(this).parent().width();

        if (imageWidth <= parentWidth) {
            $(this).addClass("large-image");
        } else {
            $(this).removeClass("large-image");
        }
    });
}

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            // C85
            uniqueId = "timersv0001";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

if (typeof String.prototype.startsWith != "function") {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}

if (typeof String.prototype.endsWith != "function") {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) === str;
    };
}

if (typeof String.prototype.replaceAll != "function") {
    String.prototype.replaceAll = function (find, replace) {
        var replaceString = this;
        var regex = new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g');

        return replaceString.replace(regex, replace);
    }
}

if (typeof Array.prototype.remove != "function") {
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }
};


function modalAlert(messagge, title) {
    if (!title || !title.length) {
        title = "Informazioni";
    }

    var diag = BootstrapDialog.show({
        id: "customAlert",
        title: title,
        message: messagge,
        animate: false,
        cssClass: "custom-alert",
        buttons: [
            {
                label: "OK",
                cssClass: "btn-primary pull-right",
                action: function (dialog) {
                    dialog.close();
                }
            }
        ]
    });

    $("body").prepend(diag.getModal());
}


var collapseNavSelector = $('[data-toggle="collapse-nav"]'),
    collapseNavStickyClass = 'sticky';


function collapseNavGetData(target) {
    // C91
    var collapseNavTarget = target.data('target') || null;
    collapseNavTarget = $(collapseNavTarget);

    // C92
    if (collapseNavTarget.size() === 0) {
        return false;
    }
    collapseNavTarget.addClass('collapse-nav-target').addClass('dropdown');
    if (target.find(target.data('target')).size() > 0) {
        collapseNavTarget.addClass('sticky');
    }

    // C93
    var collapseNavItems = 'li';
    var collapseNavItemsNoSticky = target.find('> ' + collapseNavItems).not('.' + collapseNavStickyClass);
    collapseNavItems = target.find('> ' + collapseNavItems);

    // C94
    //var collapseNavParent = target.data('parent') || '.navbar';
    var collapseNavParent = target.data('parent');
    collapseNavParent = target.parents(collapseNavParent);

    // C95
    // C96
    var collapseNavWidthOffset = target.data('width-offset');

    var data = {
        collapseNav: target, // C97
        collapseNavParent: collapseNavParent,
        collapseNavTarget: collapseNavTarget, // C98
        collapseNavTargetMenu: collapseNavTarget.find('.dropdown-menu'),
        collapseNavItems: collapseNavItems, // C99
        collapseNavItemsNoSticky: collapseNavItemsNoSticky, // C100
        collapseNavItemsSticky: target.find('> ' + '.' + collapseNavStickyClass), // C101
        collapseNavCollapseWidth: target.data('collapse-width') || 200, // C102
        collapseNavWidthOffset: collapseNavWidthOffset || 0, // C103
        collapseNavWidth: 0 // C104
    };

    return data;
}

// C105
// C106
// =========================
function collapseNavGetWidth(data) {
    var collapseNavParentWidth = data.collapseNavParent.width(),
        collapseNavWidth = 0, // C107
        collapseNavParentMargins = {
            'left': parseInt(data.collapseNavParent.css('margin-left')),
            'right': parseInt(data.collapseNavParent.css('margin-right'))
        },
        collapseNavOutterSpace = {
            'margin-left': parseInt(data.collapseNav.css('margin-left')),
            'margin-right': parseInt(data.collapseNav.css('margin-right')),
            'padding-left': parseInt(data.collapseNav.css('padding-left')),
            'padding-right': parseInt(data.collapseNav.css('padding-right'))
        };

    // C108
    if (collapseNavParentMargins.left < 0 || collapseNavParentMargins.right < 0) {
        collapseNavParentWidth = data.collapseNavParent.outerWidth(true);
    }

    // C109
    $.each(collapseNavOutterSpace, function (a, v) {
        collapseNavParentWidth -= v;
    });

    // C110
    if (collapseNavParentWidth > 0) {
        collapseNavWidth = collapseNavParentWidth;

        // C111
        if (data.collapseNavParent.find(data.collapseNavWidthOffset).size() > 0) {
            // C112
            data.collapseNavParent.find(data.collapseNavWidthOffset).each(function () {
                collapseNavWidth -= $(this).outerWidth(true);
            });
        }
        else {
            // C113
            collapseNavWidth -= data.collapseNavWidthOffset;
        }

        // C114
        data.collapseNavItemsSticky.each(function () {
            collapseNavWidth -= $(this).outerWidth(true);
        });

        if (collapseNavWidth <= 0 || collapseNavWidth <= data.collapseNavCollapseWidth) {
            collapseNavWidth = 0;
        }
    }
    return collapseNavWidth;
}

// C115
// =========================
function collapseNavResize(data) {
    var collapseItemsWidth = 0;

    /* C116 */
    //console.log(data.collapseNav.attr("id"));
    var objectID = data.collapseNav.attr("id");
    if (objectID === "menu-main") {
        var dimContenitore = $(".navbar--primary").width();
        var dimMenuRight = $(".navbar-right").width();

        $("#menu-main").width(770); // C117

        var dimMenuLeft = $("#menu-main").width();
        var dimPanino = 0; //$("more-menu-main").width();


        if (dimContenitore - dimMenuRight - dimMenuLeft < 0) {
            dimPanino = 40;
        }

        var dimDisponibile = dimContenitore - dimMenuRight - dimPanino;

        data.collapseNavWidth = dimDisponibile;
    }
    /* fine C116 */

    // C120
    if (data.collapseNavWidth > 0) {
        data.collapseNavItemsNoSticky.each(function () {
            var collapseNavItem = $(this),
                collapseNavItemId = '.' + collapseNavItem.data('collapse-item-id');
            collapseItemsWidth += collapseNavItem.outerWidth(true) + 3; // C121

            if (data.collapseNavWidth < collapseItemsWidth) {
                data.collapseNav.find(collapseNavItemId).addClass('collapse-item-hidden');
                data.collapseNavTargetMenu.find(collapseNavItemId).removeClass('collapse-item-hidden');
            }
            else {
                data.collapseNav.find(collapseNavItemId).removeClass('collapse-item-hidden');
                data.collapseNavTargetMenu.find(collapseNavItemId).addClass('collapse-item-hidden');
            }
        });
    }
    else {
        // C122
        data.collapseNavItemsNoSticky.addClass('collapse-item-hidden');
        data.collapseNavTargetMenu.find('.collapse-item').removeClass('collapse-item-hidden');
        data.collapseNav.width('auto');
    }

    // C123
    var visibleItems = data.collapseNavTargetMenu.find('.collapse-item').filter(function () {
        return $(this).css('display') !== 'none';
    }).size();

    if (visibleItems > 0) {
        data.collapseNavTarget.show();

        $("#more-menu-main .dropdown-toggle").css("display", "block").addClass("visible"); // C125
        $("#more-menu-main").css("display", "inline-block").addClass("visible"); // C125
        //alert('aggiungo auto');
        $("#menu-main").width("auto");
    }
    else {
        //data.collapseNavTarget.css("display", "none !important");
        data.collapseNavTarget.hide();
        // C124
        $("#more-menu-main .dropdown-toggle").css("display", "none").removeClass("visible");
    }

}

// C126
// =========================
function collapseNavTrigger(setup) {
    if (!$(".article__meta__tag ul > li").length) {
        $(".article__meta__tag").parents(".article__meta__cluster").remove();
    }

    var openArticleSection;
    collapseNavSelector.each(function () {
        var collapseNav = $(this),
            collapseNavData = collapseNavGetData(collapseNav);

        if (collapseNavData === false) {
            // C127
            return false;
        }

        // C128
        // ---------------------------
        if (setup === true) {
            // C129
            if (collapseNavData.collapseNavTarget.find('[data-toggle="dropdown"]').size() === 0) {
                $('<a href="#" class="dropdown-toggle" data-toggle="dropdown">More <span class="caret"></span></a>').appendTo(collapseNavData.collapseNavTarget);
            }
            if (collapseNavData.collapseNavTarget.find('.dropdown-menu').size() === 0) {
                collapseNavData.collapseNavTargetMenu = $('<ul class="dropdown-menu"></ul>');
                collapseNavData.collapseNavTargetMenu.appendTo(collapseNavData.collapseNavTarget);
            }

            // C130
            collapseNavData.collapseNavItems.each(function (i) {
                var collapseItem = $(this);
                collapseItem.addClass('collapse-item');

                if (!collapseItem.hasClass(collapseNavStickyClass)) {
                    // C131
                    collapseItem.data('collapse-item-id', 'collapse-item-' + i).addClass('collapse-item-' + i);
                    collapseItem.clone().appendTo(collapseNavData.collapseNavTargetMenu);
                }
            });

            collapseNavData.collapseNav.addClass('collapse-nav');
        }


        collapseNavData.collapseNavWidth = $("#menu-main").width();

        // C133
        // ---------------------------
        collapseNavResize(collapseNavData);

        // C134
        if (typeof (setNodeContentSubnav) !== "undefined") {
            setNodeContentSubnav();
        }

        /**
        * C135
        */
        $(".navbar-vertical.article__nav.article__outline .navbar__node > a").each(function () {
            var self = $(this);
            self.on(clickEvent, function () {
                var ref = $(this).attr("href");

                openArticleSection(ref);
            });
        });


    });
    openArticleSection = function (targetSelector) {
        var $section = $(targetSelector);
        var $navRef = $(".article__nav a[href='#" + targetSelector + "']");

        if ($section.hasClass("article__section__heading--expandible--expanded")) {
            return;
        }

        $(".article__nav li").removeClass("active");
        $navRef.parent("li").addClass("active");

        $section.next(".article__section__body").slideToggle("fast");
        $section.toggleClass("article__section__heading--expandible--expanded");
    };
}

// C136
// =========================
$(document).ready(function () {
    collapseNavTrigger(true);

    // C137
    $(window).on('resize', function () {
        collapseNavTrigger(false);

        // C138 
        $('.modalDim').attr('style', 'max-height:' + (($(window).height() / 5) * 3.5) + 'px;  overflow-y:auto;');

        // C139
        setLayoutHomePage();

        // C140
        ResizeiFrame();



    });



    if (typeof (securityCheckStatus) !== 'undefined' && securityCheckStatus == 2) {
        $("#spanMessage").text(securityCheckMessage);
        $("#divMessageAiutaMigliorarePagina").show();
        $('#modal-feedback').modal('show');
    }

});

function validateFeedbackForm(f) {
    var boolRadio = false;
    var valore_chiaro = document.getElementById("chiaro").value;
    var valore_completo = document.getElementById("completo").value;
    var valore_aggiornato = document.getElementById("aggiornato").value;
    var valore_facile = document.getElementById("facile").value;
    var security_code = document.getElementById("securitycheck").value;
    var bSecurityFilled = false;
    var completato = true;

    for (var i = 0; i < f.elements['trovato'].length; i++) {
        boolRadio = boolRadio || f.elements['trovato'][i].checked;
    }

    if (!boolRadio) {
        $(".radio-inline").addClass("errore");
    }

    else {
        $(".radio-inline").removeClass("errore");
    }

    if (valore_chiaro < 1) {
        $("#rating_chiaro").addClass("errore");
    }

    else {
        $("#rating_chiaro").removeClass("errore");
    }

    if (valore_completo < 1) {
        $("#rating_completo").addClass("errore");
    }

    else {
        $("#rating_completo").removeClass("errore");
    }

    if (valore_aggiornato < 1) {
        $("#rating_aggiornato").addClass("errore");
    }

    else {
        $("#rating_aggiornato").removeClass("errore");
    }

    if (valore_facile < 1) {
        $("#rating_facile").addClass("errore");
    }

    else {
        $("#rating_facile").removeClass("errore");
    }


    if (security_code.length == 0) {
        $("#securitycheck").css("border", "1px solid red");
    }
    else {
        bSecurityFilled = true;
        $("#securitycheck").css("border", "1px solid #999");
    }

    if (!boolRadio || !bSecurityFilled || valore_chiaro < 1 || valore_completo < 1 || valore_aggiornato < 1 || valore_facile < 1) {
        completato = false;
        $("#divMessageAiutaMigliorarePagina").show();
        $("#trovato1").focus();
        //alert("Inserisci tutti i campi obbligatori");
        return false;
    }

    if (!completato) {
        $("#feedback_body").addClass("invisible");
        /*$("#feedback_messaggio").removeClass("invisible");*/
        document.getElementById('btnFeedback').innerHTML = "Chiudi";
        document.getElementById("btnFeedback").setAttribute("onClick", "javascript: return true;");
        return false;
    }
}

function ShowServizi() {
    $("#btnTuttiServizi").addClass("invisible");
    $("#paginationdiv").removeClass("invisible");
}


function tuttiallegati() {

    var matchingElements = [];
    var allAnchor = document.getElementsByTagName("a");
    for (var i = 0, n = allAnchor.length; i < n; i++) {
        if (allAnchor[i].getAttribute("data-all-allegati") !== null) {
            matchingElements.push(allAnchor[i]);
        }
    }


    for (var i = 0, n = matchingElements.length; i < n; i++) {
        matchingElements[i].setAttribute("style", "display:block");
    }

    $("#cmdAllAttach").hide();
    return matchingElements;
}

function tutticorrelati() {

    var matchingElements = [];
    var allAnchor = document.getElementsByTagName("a");
    for (var i = 0, n = allAnchor.length; i < n; i++) {
        if (allAnchor[i].getAttribute("data-all-correlati") !== null) {
            matchingElements.push(allAnchor[i]);
        }
    }


    for (var i = 0, n = matchingElements.length; i < n; i++) {
        matchingElements[i].setAttribute("style", "display:block");
    }

    $("#cmdAllRelated").hide();
    return matchingElements;
}


// C146
var allLinksDisabled = false;
function DisableAllLinks() {
    return;
    $('a').css("background-color", "yellow");
    $('a').on('click', function (e) {
        if (allLinksDisabled) {
            e.preventDefault();
            return false;
        }
        allLinksDisabled = true;
    });

}


// C147
$("[data-toggle='collapse'].navbar-global__button").click(function () {
    var idTargetClick = $(this).attr("data-target");
    $("[data-toggle='collapse'].navbar-global__button").filter(function () {
        // C148
        var idTarget = $(this).attr("data-target");
        var idMenu = $(this).attr("id");
        //alert(idTarget);
        // C149
        if (idTarget != idTargetClick) {
            if ($(idTarget).hasClass("in")) {
                $(idTarget).collapse("hide");
            };
        }
    });

});

// C150
function CentraModaliSmall(sNomeModale) {

    $("#modal-" + sNomeModale + " .modal-dialog").height($(window).height() * 0.6);
    $("#modal-" + sNomeModale + " .modal-body").attr("style", "height: " + ($(window).height() * 0.6 - 50) + "px; overflow:hidden;");

    // C153
    $("#modal-" + sNomeModale + " .modal-dialog").width($(window).width() * 0.7);
}

function VerificaCap(sCap) {
    if (isNaN(sCap)) {
        modalAlert("Inserire un valore numerico nella campo CAP.", "Attenzione")
        return false;
    }
    return true;
}

// C154 
function RemoveURLParameter(startURI, parameterToRemove) {
    var returnURI;
    var splittedURI = startURI.split("?");
    if (splittedURI.length > 0) {
        var hostPart = splittedURI[0];
        var queryPart = splittedURI[1];

        var querySplitted = queryPart.split('&');

        for (var i = 0; i < querySplitted.length; i++) {
            if (querySplitted[i].split("=")[0] == parameterToRemove) {
                querySplitted.splice(i, 1);
            }
        }
        returnURI = hostPart + "?" + querySplitted.join("&");
        returnURI = returnURI.replace("&&", "&");
    }

    return returnURI;
}

// C155
function setodpath(selection) {
    var sp = selection.split(',');
    var el = document.getElementsByName('odpath')[0];
    var cur = el.value;
    if (cur.length > 0) { cur += '|' }
    cur += sp[0] + ',' + sp[1];
    el.value = cur;
    document.getElementsByName('odpathfrm')[0].submit();
}

function unsetodpath(selection) {
    var el = document.getElementsByName('odpath')[0];
    var remove = document.getElementsByName('odpathremove')[0];
    var cur = el.value;
    cur = cur.replace(selection, '');
    cur = cur.replace('||', '|');
    if (cur.startsWith('|')) { cur = cur.substring(1, cur.length) }
    if (cur.endsWith('|')) { cur = cur.substring(0, cur.length - 1) }
    el.value = cur;
    remove.value = selection;
    document.getElementsByName('odpathfrm')[0].submit();
}
// fine C155


/* ************ C156  ************ */
function chiudiGlossario() {
    $('[data-toggle="popover"]').popover('hide');
};


function nascondiTxtPreferitiGlossario(id) {
    $(id + "-aggiungi-text-rollover").hide();
    $(id + "-testo").css("opacity", "1");
};

function mostraTxtPreferitiGlossario(id) {
    // C157
    if (!$(id + "-share").hasClass("hide")) {
        $(id + "-share").addClass("hide");
        $(id + "-testo").css("opacity", "1");
    }

    $(id + "-aggiungi-text-rollover").show();
    $(id + "-testo").css("opacity", "0");



};

function condividiGlossario(parola, id) {
    // C158
    $(id + "-aggiungi-text-rollover").hide();

    if ($(id + "-share").hasClass("hide")) {
        // C159
        $(id + "-share").removeClass("hide");
        $(id + "-testo").css("opacity", "0");

    } else {

        $(id + "-share").addClass("hide");
        $(id + "-testo").css("opacity", "1");
    }
    function aggiungiGlossario(parola, id) {
        if ($(id + "-aggiungi").find("i").hasClass("fa-heart-o")) {
            $(id + "-aggiungi").find("i").removeClass("fa-heart-o").addClass("fa-heart");
            $(id + '-aggiungi-text p').text("Termine aggiunto nel tuo glossario.").show().delay(1000).fadeOut('fast');
            /* C160 */
        } else {

            $(id + "-aggiungi").find("i").removeClass("fa-heart").addClass("fa-heart-o");
            $(id + '-aggiungi-text p').text("Termine rimosso dal tuo glossario.").show().delay(1000).fadeOut('fast');
            /* C160 */
        }
    };


};





// C161
function SaveServiceToWPMI(ServiceID) {

    $.ajax({
        type: "GET",
        url: "rest/SaveServiziUsatiDiRecente.aspx?ServiceID=" + ServiceID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        error: function () {
            // alert("Error");
        },
        success: function (msg) {
        }
    });
}

// C162
$(function () {
    /* C163 */
    // C164
    $("#navbar-global-menu #menu-main li:last-child a").focus(function () {
        $("#navbar-global-menu li.dropdown-language").removeClass("open");
    });
    // C165
    $("#navbar-global-menu ul.navbar-right > li:nth-child(2) > a").focus(function () {
        $("#navbar-global-menu li.dropdown-language").removeClass("open");
    });
});

/* C166 */
$('#modal-service.in .swiper-wrapper .swiper-slide:last-child li:last-child a').blur(function () {
    var $pass = true;
    $('body').on('keyup', function (e) {
        if (e.which == 9 && e.shiftKey == false && $pass == true) {
            $(".modal.in .close").focus();
            $pass = false;
            console.log("Cambia profilo utente - Vado alla chiusura della modale");
        };
    });
});

$('#modal-service.in .close').blur(function () {
    var $pass = true;
    $('body').on('keyup', function (e) {
        if (e.which == 9 && e.shiftKey == true && $pass == true) {
            $('.modal.in .swiper-wrapper .swiper-slide:last-child li:last-child a').focus();
            $pass = false;
            console.log("Cambia profilo utente - Vado all'ultimo elemento dell'elenco");
        };
    });
});


/* C167 */
$('#modal-serviceTema.in ul li:last-child a').blur(function () {
    var $pass = true;
    $('body').on('keyup', function (e) {
        if (e.which == 9 && e.shiftKey == false && $pass == true) {
            $("#modal-serviceTema.in .close").focus();
            $pass = false;
            console.log("Cambia tema - Vado alla chiusura della modale");
        };
    });
});

$('#modal-serviceTema.in .close').blur(function () {
    var $pass = true;
    $('body').on('keyup', function (e) {
        if (e.which == 9 && e.shiftKey == true && $pass == true) {
            $('#modal-serviceTema.in  ul li:last-child a').focus();
            $pass = false;
            console.log("Cambia tema - Vado all'ultimo elemento dell'elenco");
        };
    });
});


// C168
//__________________________________________________________________________________________
//$(function () {
//    $(".navbar__node a").each(function () {
//        $(this).click(function () {
//            if (!$($(this)[0].parentNode.parentNode).hasClass('collapse-nav') && !$($(this)[0].parentNode.parentNode).hasClass('dropdown-menu')) {
//                if ($(this)[0] !== document.activeElement) {
//                    return false;
//                } 
//            }
//        });
//    });

//    $("span").each(function () {
//        $(this).keyup(function (event) {
//            if (event.keyCode == 13) {
//                $(this).click();
//            }
//        });
//    });
//});


//__________________________________________________________________________________________


// C169
//________________________________________________________________________________________________________

$(function () {

    // C170
    $(".people-activity-meta .favorites a").click(function () {
        $(this).parent().parent().parent().parent().find(".mediaShare .mediaContent a").focus();
    });

    // C171
    $(".people-activity-meta .share a").click(function () {
        $(this).parent().parent().parent().parent().find(".mediaShare .mediaContent .share-buttons a:first-child").focus();
    });

    // C172
    $(".people-activity-meta .comments a").focus(function () {
        if ($(this).parent().parent().parent().parent().find(".mediaShare").hasClass("showed")) {
            $(this).parent().parent().parent().parent().find(".mediaShare").removeClass("showed").hide();
        }
    });
    // C173
    $("a.card__link").focus(function () {
        if ($(this).parent().find(".mediaShare").hasClass("showed")) {
            $(this).parent().find(".mediaShare").removeClass("showed").hide();
        }
    });
});

//________________________________________________________________________________________________________


//C174
function CentraModali(sNomeModale) {
    // C175
    $("#modal-" + sNomeModale + " .modal-dialog").height($(window).height() * 0.8);
    $("#modal-" + sNomeModale + " .modal-body").attr("style", "height: " + ($(window).height() * 0.8 - 50) + "px; overflow:hidden;");

    // C176
    $("#modal-" + sNomeModale + " .modal-dialog").width($(window).width() * 0.9);
}

function shareSocial(social, url) {
    alert('FunzionalitÃ  non disponibile al momento');
}

//C177
function ShowdivShare(id) {
    var divShare = document.getElementById(id);

    if (!$(divShare).hasClass("showed")) {
        $(divShare).show();
        $(divShare).addClass("showed");

        var itemList = document.getElementsByClassName("showed");

        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].id != divShare.id) {
                $(itemList[i]).hide();
                $(itemList[i]).removeClass("showed");
            }
        }
    }
}

//C178 
$("#modal-iframeCambiaProfilo").on('shown.bs.modal', function () {

    $("#modal-iframeCambiaProfilo .modal-body").height($("#modal-iframeCambiaProfilo .modal-dialog").height() + 200);

});

//C179
$(window).resize(function () {
    $("#modal-iframeCambiaProfilo .modal-body").height($("#modal-iframeCambiaProfilo .modal-dialog").height() + 200);

});

//C180
$(document).ready(function () {
    if ($(".dropdown-menu").length > 0) {
        $(".dropdown-menu")[0].setAttribute("style", "padding-left:15px");
    }
});

//C181
//_______________________________________________________________________________________________________________________
var uri;
var uriCambiaProfilo;
var uriSF;
var uriCambiaPin;
var uriConvertiPin;
var uriCambiaAnagrafica;
var uriCambiaContatti;
var uriSediINPS;

$("#modal-iframe").on('shown.bs.modal', function () {
    CentraModali("iframe");

});

$(document).ready(function () {
    uri = $('#aModal').attr('data-uri');
    uriLogOut = $('#log-out').attr('data-uri');
    uriSF = $('#salva-sf').attr('data-uri');
    uriCambiaProfilo = $('#cambia-profilo').attr('data-uri');
    uriCambiaPin = $('#cmdModificaPin').attr('data-uri');
    uriConvertiPin = $('#cmdConvertiPin').attr('data-uri');
    uriCambiaAnagrafica = $('#cmdModificaAnagrafica').attr('data-uri');
    uriCambiaContatti = $('#cmdModificaContatti').attr('data-uri');
    uriSediINPS = $('#cmdSediINPS').attr('data-uri');


    $('#modal-iframe').on('show.bs.modal', function (event) {
        $('#iframePassi').attr('src', 'Iframe_login.aspx');
    });
    $('#modal-iframe').on('hidden.bs.modal', function (event) {
        window.location = RemoveURLParameter(window.location.href, "accessoinps");
    });

    $('#modal-iframeLogout').on('show.bs.modal', function (event) {
        CentraModaliSmall("iframeLogout");
        $('#iframepassiLogout').attr('src', 'Iframe_logout.aspx');
    });

    $('#modal-feedback').on('show.bs.modal', function (event) {
        $('#testoFeedback').val("");
    });


    $('#modal-iframeCambiaProfilo').on('show.bs.modal', function (event) {
        $('#iframeCambiaProfilo').attr('src', 'IframeCambiaProfilo.aspx');
    });


    $('#modal-iframeCambiaPin').on('show.bs.modal', function (event) {
        $('#iframeCambiaPin').attr('src', uriCambiaPin);
    });

    $('#modal-iframeConvertiPin').on('show.bs.modal', function (event) {
        $('#iframeConvertiPin').attr('src', uriConvertiPin);
    });

    $('#modal-iframeCambiaAnagrafica').on('show.bs.modal', function (event) {
        $('#iframeCambiaAnagrafica').attr('src', uriCambiaAnagrafica);
    });

    $('#modal-iframeCambiaContatti').on('show.bs.modal', function (event) {
        $('#iframeCambiaContatti').attr('src', uriCambiaContatti);
    });

    $('#modal-iframeSediINPS').on('show.bs.modal', function (event) {
        var targetElement = event.relatedTarget;
        var targetUri = $(targetElement).attr('data-uri');
        if (targetUri != undefined && targetUri.length > 0) {
            $('#iframeSediINPS').attr('src', targetUri);
        }
        else {
            $('#iframeSediINPS').attr('src', uriSediINPS);
        }
    });

    // C183
    $('#modal-iframeCambiaProfilo, #modal-iframeLogout, #modal-iframeCambiaPin, #modal-iframeConvertiPin, #modal-iframeCambiaAnagrafica, #modal-iframeCambiaContatti').on('hidden.bs.modal', function () {
        window.location.reload();
    });

    // C184
    $('#modal-iframeSediINPS').on('hidden.bs.modal', function () {
        $('#iframeSediINPS').attr('src', "IframeLoader.htm");
    });

    $('#modal-avvisi').on('show.bs.modal', function (event) {

        var idAvviso = event.relatedTarget.id.substr(event.relatedTarget.id.lastIndexOf('-') + 1, event.relatedTarget.id.length);

        var titleAvviso = event.relatedTarget.attributes["data-title"].nodeValue;
        var testoAvviso = event.relatedTarget.attributes["data-text"].nodeValue;

        $('#h3TitleAvviso').text(titleAvviso);
        $('#bodyAvviso').text(testoAvviso);
    });

});


function DoLink() {
    if (uri.length == 0) {
        window.location = uriSF;
    }
    else {
        top.location = uri;
    }
}

function DoLinkCambiaProfilo() {
    window.location = uriCambiaProfilo;
}

//C185

$(document).ready(function () {
    if (!$.isEmptyObject($.fn.ratingcontrol)) {
        $('.ratingcontrol-target').ratingcontrol(
            {
                click: function (score, evt) {
                    $("#" + this.id.replace("gruppo-", "")).val(score);
                }
            });

        if (typeof (valRatingChiaro) != "undefined") {
            $('#chiaro').val(valRatingChiaro);
            $('#gruppo-chiaro').ratingcontrol('score', valRatingChiaro);
        }

        if (typeof (valRatingCompleto) != "undefined") {
            $('#completo').val(valRatingCompleto);
            $('#gruppo-completo').ratingcontrol('score', valRatingCompleto);
        }

        if (typeof (valRatingAggiornato) != "undefined") {
            $('#aggiornato').val(valRatingAggiornato);
            $('#gruppo-aggiornato').ratingcontrol('score', valRatingAggiornato);
        }

        if (typeof (valRatingFacile) != "undefined") {
            $('#facile').val(valRatingFacile);
            $('#gruppo-facile').ratingcontrol('score', valRatingFacile);
        }

        $("#trovato1").prop("checked", false);
        $("#trovato2").prop("checked", false);
        $("#trovato3").prop("checked", false);

        if (typeof (valTrovato) != "undefined") {
            if (valTrovato == 1) {
                $("#trovato1").prop("checked", true);
            } else if (valTrovato == 2) {
                $("#trovato2").prop("checked", true);
            } else if (valTrovato == 3) {
                $("#trovato3").prop("checked", true);
            }
        }

        if (typeof (valTestoFeedback) != "undefined") {
            valTestoFeedback = valTestoFeedback.replace(/\&#39;/mg, "'")
            valTestoFeedback = valTestoFeedback.replace(/\&#34;/mg, '"')
            $('#testoFeedback').val(valTestoFeedback);
        }

    }
});


$("#modal-iframe").on('shown.bs.modal', function () {
    $("#modal-iframe .modal-body").height($("#modal-iframe .modal-dialog").height() - 155);
});

$(window).resize(function () {
    $("#modal-iframe .modal-body").height($("#modal-iframe .modal-dialog").height() - 155);

});

$("#modal-iframeCambiaProfilo").on('shown.bs.modal', function () {

    $("#modal-iframeCambiaProfilo .modal-body").height($("#modal-iframeCambiaProfilo .modal-dialog").height() + 200);

});

$(window).resize(function () {
    $("#modal-iframeCambiaProfilo .modal-body").height($("#modal-iframeCambiaProfilo .modal-dialog").height() + 200);

});




var $sliderBtnNext = $(".custom-swiper .navbar-semantic-users--vertical__next");
var $sliderBtnPrev = $(".custom-swiper .navbar-semantic-users--vertical__prev");
var $slide1 = $(".custom-swiper .swiper-wrapper .swiper-slide:first-child");
var $slide2 = $(".custom-swiper .swiper-wrapper .swiper-slide:last-child");


$sliderBtnNext.click(function () {
    showNextSlide();
});
$sliderBtnPrev.click(function () {
    showPreviousSlide();
});


$(window).resize(function () {
    if ($slide2.hasClass("swiper-slide-active")) {

        //ricarcolo della posizione
        var $spostamento = $slide1.parent().width();
        $slide1.css("transform", "translate3d(-" + $spostamento + "px, 0px, 0px)");
        $slide2.css("transform", "translate3d(-" + $spostamento + "px, 0px, 0px)");
    }
});

function showNextSlide() {

    var $spostamento = $slide1.parent().width();

    //Disattivo l'effetto di transizione
    $slide1.css("transition-duration", "100ms");
    $slide2.css("transition-duration", "100ms");

    //Movimento e aggiunto/rimozione classe attiva

    $slide1.css("transform", "translate3d(-" + $spostamento + "px, 0px, 0px)").removeClass("swiper-slide-active");

    $slide2.css("transform", "translate3d(-" + $spostamento + "px, 0px, 0px)").addClass("swiper-slide-active");

    $("#slider-btn-1").fadeOut(function () {
        $("#slider-btn-2").fadeIn();
        //Disattivo l'effetto di transizione
        $slide1.css("transition-duration", "0ms");
        $slide2.css("transition-duration", "0ms");
    });
}

function showPreviousSlide() {
    //Attivo l'effetto di transizione
    $slide1.css("transition-duration", "100ms");
    $slide2.css("transition-duration", "100ms");

    //Movimento e aggiunto/rimozione classe attiva
    $slide1.css("transform", "translate3d(0px, 0px, 0px)").addClass("swiper-slide-active");
    $slide2.css("transform", "translate3d(0px, 0px, 0px)").removeClass("swiper-slide-active");

    $("#slider-btn-2").fadeOut(function () {
        $("#slider-btn-1").fadeIn();
        //Disattivo l'effetto di transizione
        $slide1.css("transition-duration", "0ms");
        $slide2.css("transition-duration", "0ms");
    });
}

$(function () {
    $('.skiplink a').on({
        'focus': function () {
            $('.skiplink').removeClass('sr-only').addClass('skiplink--focused');
        },
        'blur': function () {
            $('.skiplink').addClass('sr-only').removeClass('skiplink--focused');
        }
    });
});

$(function () {
    if ($("div").hasClass("MD-noimage-grid")) {
        if ($(window).width() < 960) {
            $('#btnJoyride').each(function () {
                $(this)[0].setAttribute('style', 'display:none !important;');
            });
            $('#btnJoyride2').each(function () {
                $(this)[0].setAttribute('style', 'display:block !important;');
            });

        }
        else {
            $('#btnJoyride').each(function () {
                $(this)[0].setAttribute('style', 'display:block;');
            });
            $('#btnJoyride2').each(function () {
                $(this)[0].setAttribute('style', 'display:block;');
            });
        }		
    }
    else {
        if ($(window).width() <= 960) {
            $('#btnJoyride').each(function () {
                $(this)[0].setAttribute('style', 'display:none !important;');
            });
            $('#btnJoyride2').each(function () {
                $(this)[0].setAttribute('style', 'display:none !important;');
            });
        }
        else {
            $('#btnJoyride').each(function () {
                $(this)[0].setAttribute('style', 'display:block;');
            });
            $('#btnJoyride2').each(function () {
                $(this)[0].setAttribute('style', 'display:block;');
            });
        }
    }
    
});

$(window).resize(function () {
    if ($("div").hasClass("MD-noimage-grid")){
	if ($(window).width() < 960) {
        $('#btnJoyride').each(function () {
            $(this)[0].setAttribute('style', 'display:none !important;');
        });
        $('#btnJoyride2').each(function () {
            $(this)[0].setAttribute('style', 'display:block !important;');
        });
		
    }
    else {
        $('#btnJoyride').each(function () {
            $(this)[0].setAttribute('style', 'display:block;');
        });
        $('#btnJoyride2').each(function () {
            $(this)[0].setAttribute('style', 'display:block;');
        });
    }		
} 

else{
	if ($(window).width() < 960) {
        $('#btnJoyride').each(function () {
            $(this)[0].setAttribute('style', 'display:none !important;');
        });
        $('#btnJoyride2').each(function () {
            $(this)[0].setAttribute('style', 'display:none !important;');
        });
    }
    else {
        $('#btnJoyride').each(function () {
            $(this)[0].setAttribute('style', 'display:block;');
        });
        $('#btnJoyride2').each(function () {
            $(this)[0].setAttribute('style', 'display:block;');
        });
    }
}

});

function scriviCookie(nomeCookie, valoreCookie, durataCookie) {
    var scadenza = new Date();
    var adesso = new Date();
    scadenza.setTime(adesso.getTime() + (parseInt(durataCookie) * 3600000));
    document.cookie = nomeCookie + '=' + encodeURIComponent(valoreCookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}

function leggiCookie(nomeCookie) {
    if (document.cookie.length > 0) {
        var inizio = document.cookie.indexOf(nomeCookie + "=");
        if (inizio != -1) {
            inizio = inizio + nomeCookie.length + 1;
            var fine = document.cookie.indexOf(";", inizio);
            if (fine == -1) fine = document.cookie.length;
            return unescape(document.cookie.substring(inizio, fine));
        } else {
            return "";
        }
    }
    return "";
}

$(".moduli-home .carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
        var xMove = event.originalEvent.touches[0].pageX;
        if (Math.floor(xClick - xMove) > 5) {
            $(".carousel").carousel('next');
        }
        else if (Math.floor(xClick - xMove) < -5) {
            $(".carousel").carousel('prev');
        }
        $(this).find("a").attr("data-toggle", "false");
    });
    $(".moduli-home .carousel").on("touchend", function () {
        $(this).off("touchmove");
        $(this).find("a").attr("data-toggle", "modal");
    });
});

$('article.card a').on('touchend', function () {
    $(this).click();
});

function goToContext(id) {
    if ($('#' + id).find('select').length > 0) {
        $('#' + id).find('select').first().focus();
        return;
    }
    if ($('#' + id).find('a').length > 0 && !(window.location.href.toLowerCase().indexOf('imenu') > 0)) {
        $('#' + id).find('a').first().focus();
    }
    else {
        window.location.href = window.location.href.split('#')[0] + '#' + id;
    }
}

function goToTopPage() {
    $('body,html').animate({ scrollTop: 0 }, 400);
}


$("#vistaGriglia").click(function () {
    if (!$(".index-search-results").hasClass("grid-listing")) {
        $("#vistaGriglia").addClass("active");
        $(".index-search-results:not(.not-changeable)").fadeOut("fast", function () {
            if ($(".index-search-results").hasClass("vertical-listing")) {
                $(".index-search-results").removeClass("vertical-listing");
            }
            $("#vistaElenco").removeClass("active");
            if ($(".btn.btn-primary.download").html() === "<em class='fa fa-arrow-circle-o-right'></em>Accedi al servizio") {
                $(this).html("<em class='fa fa-arrow-circle-o-right'></em>Accedi");
            }
            $(this).addClass("grid-listing").fadeIn().css("display", "block");
            scriviCookie("sElencoMobile", "griglia", 1);
            scriviCookie("sElenco", "griglia", 1);
            /* alert(leggiCookie("sElenco"));*/
        });
    };
});


$("#vistaElenco").click(function () {
    if (!$(".index-search-results").hasClass("vertical-listing")) {
        $("#vistaElenco").addClass("active");
        $(".index-search-results:not(.not-changeable)").fadeOut("fast", function () {
            if ($(".index-search-results").hasClass("grid-listing")) {
                $(".index-search-results").removeClass("grid-listing");
            }
            $("#vistaGriglia").removeClass("active");
            if ($(".btn.btn-primary.download").html() === "<em class='fa fa-arrow-circle-o-right'></em>Accedi") {
                $(this).html("<em class='fa fa-arrow-circle-o-right'></em>Accedi al servizio");
            }
            $(this).addClass("vertical-listing").fadeIn().css("display", "block");
            scriviCookie("sElencoMobile", "lista", 1);
            scriviCookie("sElenco", "lista", 1)
            /* alert(leggiCookie("sElenco"));*/
        });
    };
});



/* Gestione Menu Tab Home Page */

//Homepage Temi e Utenti
$(function () {
    try {
        var windowWidth = $(window).width();
        //alert(windowWidth);
        if (windowWidth > 768) {
            $(".home-tabs .labels .single-label:first-child").addClass("active");
            $(".home-tabs > div:nth-child(2)").addClass("active");
            $(".home-tabs .labels").addClass("active");
        }
        checkTemi();
        checkUtenti();
    }
    catch (ex) { }
});
$(window).resize(function () {
    try {
        checkTemi();
        checkUtenti();
        var windowWidth = $(window).width();
        if (windowWidth > 768) {
            console.log("utenti visibili");
            if (!$(".home-tabs-container").hasClass("active")) {
                $(".home-tabs .labels .single-label:first-child").addClass("active");
                $(".home-tabs > div:nth-child(2)").addClass("active");
                $(".home-tabs .labels").addClass("active");
            }
        }
    }
    catch (ex) { }
});
//Homepage Temi e Utenti - gestione dei tab
$(".home-tabs .single-label").click(function () {
    if (!($(".home-tabs .labels.active").length)) {
        $(this).addClass("active");
        var $child = $(this).attr("data-child");
        $("#" + $child).addClass("active");
        $(".home-tabs .labels").addClass("active");
    } else {
        if (!$(this).hasClass("active")) {
            $(".home-tabs .single-label.active").removeClass("active");
            $(this).addClass("active");
            var $child = $(this).attr("data-child");
            $(".home-tabs .home-tabs-container.active").fadeOut(100, function () {
                $(".home-tabs .home-tabs-container.active").removeClass("active");
                $("#" + $child).fadeIn(100, function () {
                    $("#" + $child).addClass("active");
                    /*checkTemi();*/
                    /*checkUtenti();*/
                });
            });
        };
    };
});
//Homepage Temi e Utenti - gestione dei link nei temi
var $currentSlideThemes = 1;
var $nextSlideThemes = 2;
var $lastSlideThemes = $("#temi-container .list-wrapper").length;
$("#temi-container .navigation a").attr("title", "Visualizza altri temi (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");
$("#temi-container .navigation a span").text("Visualizza altri (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");

$("#temi-container .navigation a").click(function () {
    var $child = $(this).attr("data-child");
    $currentSlideThemes++;
    $nextSlideThemes++;
    if ($nextSlideThemes > $lastSlideThemes) $nextSlideThemes = 1;
    if ($currentSlideThemes > $lastSlideThemes) $currentSlideThemes = 1;
    var $slideName = "temi-lista-" + $nextSlideThemes;
    $(this).attr("data-child", $slideName);
    $(this).attr("title", "Visualizza altri temi (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");
    $(this).find("span").text("Visualizza altri (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");

    //C186
    /*$("#temi-container .list-wrapper.active").fadeOut(100, function () {
    $("#temi-container .list-wrapper.active").removeClass("active");
    $("#" + $child).fadeIn(100, function () {
    $("#" + $child).addClass("active");
    });
    });*/
    //C186 fine

    //C187
    var fixWidth = $("#temi-container .list-wrapper.active").width();
    $("#temi-container .list-wrapper.active").css("width", fixWidth).animate({ marginLeft: -fixWidth }, 300, function () {
        $(this).hide().css({ marginLeft: "0", width: "100%" }).removeClass("active");
        $("#" + $child).css({ marginLeft: fixWidth, width: fixWidth }).show().animate({ marginLeft: "0" }, 300, function () {
            $("#" + $child).addClass("active").css("width", "100%");
        });
    });
    //C187 fine
});

//Homepage Temi e Utenti - gestione dei link negli utenti
var $currentSlideThemesUtenti = 1;
var $nextSlideThemesUtenti = 2;
var $lastSlideThemesUtenti = $("#utenti-container .list-wrapper").length;
$("#utenti-container .navigation a").attr("title", "Visualizza altri utenti (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");
$("#utenti-container .navigation a span").text("Visualizza altri (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");

$("#utenti-container .navigation a").click(function () {
    var $child = $(this).attr("data-child");
    $currentSlideThemesUtenti++;
    $nextSlideThemesUtenti++;
    if ($nextSlideThemesUtenti > $lastSlideThemesUtenti) $nextSlideThemesUtenti = 1;
    if ($currentSlideThemesUtenti > $lastSlideThemesUtenti) $currentSlideThemesUtenti = 1;
    var $slideName = "utenti-lista-" + $nextSlideThemesUtenti;
    $(this).attr("data-child", $slideName);
    $(this).attr("title", "Visualizza altri utenti (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");
    $(this).find("span").text("Visualizza altri (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");

    //C186
    /*$("#utenti-container .list-wrapper.active").fadeOut(100, function () {
    $("#utenti-container .list-wrapper.active").removeClass("active");
    $("#" + $child).fadeIn(100, function () {
    $("#" + $child).addClass("active");
    });
    });*/
    //C186 fine

    //C187
    var fixWidth = $("#utenti-container .list-wrapper.active").width();
    $("#utenti-container .list-wrapper.active").css("width", fixWidth).animate({ marginLeft: -fixWidth }, 300, function () {
        $(this).hide().css({ marginLeft: "0", width: "100%" }).removeClass("active");
        $("#" + $child).css({ marginLeft: fixWidth, width: fixWidth }).show().animate({ marginLeft: "0" }, 300, function () {
            $("#" + $child).addClass("active").css("width", "100%");
        });
    });
    //C187 fine
});

//Homepage Temi e Utenti - gestione del caso temi
function checkTemi() {
    //Caso smartphone - gli elenchi di temi vengono uniti
    var windowWidth = $(window).width();
    if (windowWidth < 655) {
        $("#temi-container .list-wrapper").addClass("active").show();

    }
    //Caso non smartphone - gli elenchi di temi vengono divisi
    if (windowWidth >= 655) {
        $("#temi-container .list-wrapper").removeClass("active").hide();
        $("#temi-container #temi-lista-1").addClass("active").show();
        $("#temi-container .navigation a").attr("data-child", "temi-lista-2");

        $currentSlideThemes = 1;
        $nextSlideThemes = 2;
        $("#temi-container .navigation a").attr("title", "Visualizza altri temi (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");
        $("#temi-container .navigation a span").text("Visualizza altri (" + $currentSlideThemes + "/" + $lastSlideThemes + ")");
    }
};

//Homepage Temi e Utenti - gestione del caso utenti
function checkUtenti() {
    //Caso smartphone - gli elenchi di utenti vengono uniti
    var windowWidth = $(window).width();
    if (windowWidth < 655) {
        $("#utenti-container .list-wrapper").addClass("active").show();

    }
    //Caso non smartphone - gli elenchi di utenti vengono divisi
    if (windowWidth >= 655) {
        $("#utenti-container .list-wrapper").removeClass("active").hide();
        $("#utenti-container #utenti-lista-1").addClass("active").show();
        $("#utenti-container .navigation a").attr("data-child", "utenti-lista-2");

        $currentSlideThemesUtenti = 1;
        $nextSlideThemesUtenti = 2;
        $("#utenti-container .navigation a").attr("title", "Visualizza altri utenti (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");
        $("#utenti-container .navigation a span").text("Visualizza altri (" + $currentSlideThemesUtenti + "/" + $lastSlideThemesUtenti + ")");
    }
};
/* FINE - Gestione Menu Tab Home Page */

/* Aggiungo ontouchend per levarli da markup (W3C) */

$("#btnJoyride .wide-button__label").on("touchend", function (e) {
    //if (e.ctrlKey) {
    // debugger;
    $("#btnJoyride").click();
});


$("#btnJoyride2 .wide-button__label").on("touchend", function (e) {
    //if (e.ctrlKey) {
    //  debugger;
    $("#btnJoyride2").click();
});

$("#btnAiutaciaMigliorareSchede .wide-button__label").on("touchend", function (e) {
    //if (e.ctrlKey) {
    //debugger;
    $("#btnAiutaciaMigliorareSchede").click();
});

/* FINE Aggiungo ontouchend del joyride */

/* Bottone disabilitato step 1 service finder */
$(document).ready(function () {
    $("a.link-node.btn.btn-sm.btn-default.service-finder__form-group__field-list__field").on("click", function () {
        var ActiveButtons = $("a.link-node.btn.btn-sm.btn-default.service-finder__form-group__field-list__field.service-finder__form-group__field-list__field--active").length;
        var goToStep2Buttons = $("a.btn.btn.btn-primary.service-finder__trigger--step.service-finder__trigger--step2");

        if (ActiveButtons > 0) {
            goToStep2Buttons.removeClass("disabled");
            $("#null-search")[0].style.display = "none";
        }
        else {
            goToStep2Buttons.addClass("disabled");
            $("#null-search")[0].style.display = "block";
        }
    });

    $("a.link-node.btn.btn-sm.btn-default.service-finder__form-group__field-list__field").on("touchend", function () {
        var ActiveButtons = $("a.link-node.btn.btn-sm.btn-default.service-finder__form-group__field-list__field.service-finder__form-group__field-list__field--active").length;
        var goToStep2Buttons = $("a.btn.btn.btn-primary.service-finder__trigger--step.service-finder__trigger--step2");

        if (ActiveButtons > 0) {
            goToStep2Buttons.removeClass("disabled");
            $("#null-search")[0].style.display = "none";
        }
        else {
            goToStep2Buttons.addClass("disabled");
            $("#null-search")[0].style.display = "block";
        }
    });
});

/* Bottone disabilitato step 1 service finder */

$('#ModalServiceRedirecter').focus(function () {
    $('#service-list').find('ul li a').focus();
});

// C174
$(function () {
    /* C175 */
    // C176
    $("#navbar-global-menu ul.navbar-right #helpContatti > a").focus(function () {
        $("#navbar-global-menu li.dropdown-social").removeClass("open");
    });
    // C177
    $("a.link-node--servizio").focus(function () {
        $("#navbar-global-menu li.dropdown-social").removeClass("open");
    });
});

$(".my-inps .carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
        var xMove = event.originalEvent.touches[0].pageX;
        if (Math.floor(xClick - xMove) > 5) {
            $(".carousel").carousel('next');
        }
        else if (Math.floor(xClick - xMove) < -5) {
            $(".carousel").carousel('prev');
        }
        $(this).find("a").each(function () { // funzione per ogni a nel carousel
            var myHref = $(this).attr("href"); //viene copiato l'URL dall'attributo href
            $(this).attr("data-href", myHref); //incollato nell'attributo data-href creato 
            $(this).attr("href", "javascript:void(0)"); //dato un valore nullo all'href
        });
    });
    $(".my-inps .carousel").on("touchend", function (event) {
        $(this).off("touchmove");
        $(this).find("a").each(function () { // funzione per ogni a nel carousel
            var myHref = $(this).attr("data-href"); //viene copiato l'URL dall'attributo data-href
            $(this).attr("href", myHref); //incollato nell'href
            $(this).removeAttr("data-href"); //rimosso l'attributo data-href
        });
    });
});

$(document).ready(function () {
    try {
        if ($(window).width() <= 960) {
            $('.card__heading').each(function () {
                if ($(this)[0].innerText.length >= 72) {
                    $(this)[0].innerText = $(this)[0].innerText.substring(0, 47) + '...';
                }
            });
        }
    }
    catch (ex) {
    }
});

$(window).resize(function () {
    try {
        if ($(window).width() <= 960) {
            $('.card__heading').each(function () {
                if ($(this)[0].innerText.length >= 72) {
                    $(this)[0].innerText = $(this)[0].innerText.substring(0, 47) + '...';
                }
            });
        }
    }
    catch (ex) {
    }
});

function govideomodale(PathVideo) {
    caricaVideo("player-video-article-default", PathVideo, "");
    $('#modal-video').modal();

    $('#modal-video').on('hidden.bs.modal', function () {
        $('#player-video-article-default video')[0].pause();
    });
}



//zona chatbot
function getOrarioTraslatoItaliano() {
    var d = new Date();
    var localoffset = -(d.getTimezoneOffset() / 60);
    var destoffset = 2;
    var offset = destoffset - localoffset;
    d = new Date(new Date().getTime() + offset * 3600 * 1000);
    return (d.getHours() * 100 + d.getMinutes());
}

function controllaOrarioChatbot() {
    var Adesso = getOrarioTraslatoItaliano();
    if (orarioApertura < orarioChiusura) {
        if (orarioApertura < Adesso && Adesso < orarioChiusura)
            return (true);
    }
    else {
        if (orarioApertura > Adesso || Adesso < orarioChiusura)
            return (true);
    }
    return false
}

function waitfor(test, expectedValue, msec, count, source, callback) {
    while (test() !== expectedValue) {
        count++;
        setTimeout(function () {
            waitfor(test, expectedValue, msec, count, source, callback);
        }, msec);
        return;
    }
    callback();
}

function loadChatBot() {
    if (!document.getElementById('___eabPluginWeb')) {
        var s = document.createElement('script');
        s.id = '___eabPluginWeb';
        s.type = 'text/javascript';
        s.setAttribute('DEFER', 'DEFER');
        s.src = sUrlPluginChatbot;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
}

function _ChatBotIsReady() {
    return (typeof eabShowWindow === 'function' && typeof eabShowIcon === 'function' && document.getElementById('EABseparatorCookie') != null);
}

function _showIcons() {
    //setTimeout(function () { eabShowIcon(true) }, 500);
}

//fine zona chatbot

// aggiunta chiudi search spotlight funzioni nuovo header 27/06/2019
var $_viewportBreakpoints_HM = {
    "sm": "670",
    "md": "768",
    "lg": "960"
};


var HM_btn_Mobile = document.getElementById('navbar-global-menu');

document.getElementById("navbar-global-menu-btn").onclick = function () {
    if (HM_nuovoHeader) { hideSearchPanel() }
};

var nav = document.getElementById("header-navbar");

function HM_nascondiSuggerimenti() {
    var search = document.getElementById("search-spotlight");
    $(search).addClass("hidden");
}

function HM_nascondiMenuMobile() {
    $(HM_btn_Mobile).attr("style", "display:none");
    $(HM_btn_Mobile).attr("aria-expanded", "false");
    if (window.location === window.parent.location) {
        document.getElementById('searchPanel').style.display = 'block';
    }
    document.getElementById('socialSpan').style.display = 'none';
    document.getElementById('times-bars').classList.remove('fa-times');
    document.getElementById('times-bars').classList.add('fa-bars');
    document.getElementById('navbar-global-menu-btn').classList.add('HM_mobNavHead');
    document.getElementById('navbar-global-menu-btn').classList.remove('HM_navbg');
    $("body").css("overflow-y", "scroll");
    $("#header-navbar").css("overflow-x", "hidden");
    $("#header-navbar").css("overflow-y", "hidden");
    if (document.getElementById('wi_testatina') != null) {
        document.getElementById('wi_testatina').classList.remove('hidden');
    }
    if (document.getElementById('wi_content') != null) {
        document.getElementById('wi_content').classList.remove('hidden');
    }
    HM_btn_Mobile.classList.remove('open-overlay');
    $("section").removeClass("hidden");
    $("article").removeClass("hidden");
    $("footer").attr("style", "visibility:visible");
    nav.setAttribute("style", "height: auto");
}

function HM_mostraMenuMobile() {
    document.getElementById('searchPanel').style.display = 'none';
    $(HM_btn_Mobile).attr("aria-expanded", "true");
    document.getElementById('socialSpan').style.display = 'block';
    document.getElementById('times-bars').classList.remove('fa-bars');
    document.getElementById('times-bars').classList.add('fa-times');
    document.getElementById('navbar-global-menu-btn').classList.remove('HM_mobNavHead');
    document.getElementById('navbar-global-menu-btn').classList.add('HM_navbg');
    $("body").css("overflow-y", "hidden");
    $("#header-navbar").css("overflow-x", "hidden");
    $("#header-navbar").css("overflow-y", "scroll");
    if (document.getElementById('wi_testatina') != null) {
        document.getElementById('wi_testatina').classList.add('hidden');
    }
    if (document.getElementById('wi_content') != null) {
        document.getElementById('wi_content').classList.add('hidden');
    }
   
    HM_btn_Mobile.classList.remove('close-overlay');
    HM_btn_Mobile.classList.add('open-overlay');
    $(HM_btn_Mobile).attr("style", "display:block");
    $("section").addClass("hidden");
    $("article").addClass("hidden");
    $("footer").attr("style", "visibility:hidden");
    nav.setAttribute("style", "height: 100%");
    $('#mobile-menu-user').collapse("hide");
    cambiaAltezzaFooterSocial(false);
}

$("#mobile-menu-user-trigger").on(clickEvent, function () {
    if (HM_nuovoHeader) {
        HM_nascondiMenuMobile();
    }
})


function cambiaAltezzaFooterSocial(isddlAperto) {
    var tileLI = 36;
    var topbarMobile = 59;
    var itemFigliddl;
    var altezzaSocial = 50;
    var heightMobile = (window.innerHeight);
    var numeroItemMobile = document.getElementsByClassName("HM_itemLI").length;
    numeroItemMobile = (numeroItemMobile * tileLI) + topbarMobile;
    if (!($(isddlAperto).hasClass("open") || (!isddlAperto))) {
        var padreDD = $(isddlAperto).children();
        padreDD = padreDD[1];
        itemFigliddl = padreDD.childElementCount * 32;
        numeroItemMobile = numeroItemMobile + itemFigliddl + altezzaSocial;
    }
    var stileFooterSocial = document.getElementById("socialSpan");
    if (numeroItemMobile > heightMobile) {
        stileFooterSocial.style.bottom = 'auto';
    }
    else {
        stileFooterSocial.style.bottom = '0';
    }
}

function hideSearchPanel() {
    if (HM_btn_Mobile.getAttribute("style") !== 'display:block') {
        HM_mostraMenuMobile();
        cambiaAltezzaFooterSocial(false);
        $(".dropdown-menu")[0].setAttribute("style", "padding-left:0");
    }
    else {
        HM_nascondiMenuMobile();
    }
}


function adjustHMenu() {
    if (HM_nuovoHeader) {
        if ($(window).width() < $_viewportBreakpoints_HM.sm) {
            cambiaAltezzaFooterSocial(false);
        }
        else {
            HM_nascondiMenuMobile();
        }
    }
}

// aggiunta correttiva per dropodown utente myinps

$(".HM_allineaEntraINPS > li.user-logged.dropdown.header-global__personal-card > div").on({
    mouseenter: function () {
        if (!$("#search-spotlight").hasClass("hidden")) {
            $("#searchPanel").css("z-index", 1011)
            $(".HM_navbarJumbo").css("opacity", 0)
        }
    },
    mouseleave: function () {
        if (!$("#search-spotlight").hasClass("hidden")) {
            $("#searchPanel").css("z-index", 103)
            $(".HM_navbarJumbo").css("opacity", 1)
        }
    }
});

var HM_linkCliccato;

function HM_higlight(li) {

    HM_linkCliccato = li;
    if (HM_redirectURL) {
        var li_figlio = $(li).children()[0];
        var itemActive = $(".HM_JumboP_active");
        if ($(li_figlio).hasClass("HM_JumboP_active")) {
            itemActive.removeClass("HM_notLightenhed");
        }
        else {
            if ($(itemActive).hasClass("HM_notLightenhed") && $(li).hasClass("selectedPadre") && $(li).hasClass("open")) {
                itemActive.removeClass("HM_notLightenhed");
                $("li").removeClass("selectedPadre");
                $(li).addClass("selectedPadre");
            }
            else {
                itemActive.addClass("HM_notLightenhed");
                $("li").removeClass("selectedPadre");
                $(li).addClass("selectedPadre");
            }

        };
    }
    else {
        return false;
    }
}

var HM_redirectURL = true;


window.addEventListener('click', function (e) {
    if (document.getElementById('navbar') != null && document.getElementById('navbar').contains(e.target)) {
        //nothing
        $(".HM_JumboP_active").removeClass("HM_notLightenhed");
    } else {
        $(".HM_JumboP_active").removeClass("HM_notLightenhed");
    }
});

$("a.HM_checkLink").click(function () {
    HM_redirectURL = false;
    $(".HM_JumboP_active").removeClass("HM_JumboP_active");
    var x = $(HM_linkCliccato).children()[0];
    if (x == undefined) {
        $(this).addClass("HM_JumboP_active");
    }
    else {
        $(x).addClass("HM_JumboP_active");
    }
});


$(window).resize(adjustSlider);

function adjustSlider() {
    var slider = document.getElementsByClassName("swiper-wrapper");
    var $slider3 = $(".swiper-wrapper");
    slider = slider.length;
    if ($(window).width() >= $_viewportBreakpoints_HM.sm) {
        if (slider == 1) {
            $slider3.addClass("HM_adjustSlider");
        }
    }
    else {
        $slider3.removeClass("HM_adjustSlider");
    }
}
