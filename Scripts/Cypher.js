/// <reference path="~/Scripts/knockout-2.2.1.js" />
/// <reference path="~/Scripts/jquery-1.9.1.js" />
$(document).ready(function () {
    function CypherVM() {
        var self = this;
        this.caesarShift = ko.observable(13);
        this.text = ko.observable();
        this.sha256 = ko.computed(function () {
            return CryptoJS.SHA256(self.text());
        });
        this.caesar = ko.computed(function () {
            if (!self.text()) {
                return "";
            }
            var shift = self.caesarShift();
            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
            var shifted = letters.slice(shift%26).concat(letters.slice(0, shift%26));
            var result = [];
            $.each(self.text().split(""), function (i, char) {
                var makeLower = true;
                if (char == char.toUpperCase()) {
                    makeLower = false;
                }
                var index = letters.indexOf(char.toUpperCase());
                if (index != -1) {
                    result.push(makeLower? shifted[index].toLowerCase() : shifted[index]);
                } else {
                    result.push(char);
                }
            });
            return result.join("");
        }, null, { deferEvaluation: true });
        
    };

    window.vm = new CypherVM();
    ko.applyBindings(vm);

    $("#mainText").on("keydown", function (event) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        var element;
        console.log(event.keyCode);
        if (letter >= "a" && letter <= "z" && !event.keyIdentifier) {
            element = $("#" + letter);
        } else if (event.keyCode >= 48 && event.keyCode <= 57) {
            element = $("#num" + letter);
        }
        else {
            switch (event.keyCode) {
                case 186: element = $("#semicolon"); break;
                case 187: element = $("#equals"); break;
                case 188: element = $("#comma"); break;
                case 189: element = $("#dash"); break;
                case 190: element = $("#period"); break;
                case 191: element = $("#slash"); break;
                case 192: element = $("#tilde"); break;
                case 219: element = $("#leftBracket"); break;
                case 220: element = $("#backslash"); break;
                case 221: element = $("#rightBracket"); break;
                case 222: element = $("#quote"); break;
            }
        }
        element.css({ "position": "relative", top: "4px" });
    });
    $("#mainText").on("keyup", function (event) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        var element;
        console.log(event.keyCode);
        if (letter >= "a" && letter <= "z" && !event.keyIdentifier) {
            element = $("#" + letter);
        } else if (event.keyCode >= 48 && event.keyCode <= 57) {
            element = $("#num" + letter);
        }
        else {
            switch (event.keyCode) {
                case 192: element = $("#tilde"); break;
                case 188: element = $("#comma"); break;
                case 189: element = $("#dash"); break;
                case 187: element = $("#equals"); break;
                case 189: element = $("#dash"); break;
                case 219: element = $("#leftBracket"); break;
                case 221: element = $("#rightBracket"); break;
                case 222: element = $("#quote"); break;
                case 220: element = $("#backslash"); break;
                case 186: element = $("#semicolon"); break;
                case 190: element = $("#period"); break;
                case 191: element = $("#slash"); break;
            }
        }
        element.css({ "position": "initial"});
    });
});