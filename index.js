var log = require('noogger');
var lineReader = require('line-reader');
var supportedFormats = ["GETBIBLE.NET"];

var booknames=
{
    en: [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Kings",
        "2 Kings",
        "1 Chronicles",
        "2 Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalm",
        "Proverbs",
        "Ecclesiastes",
        "Song of Solomon",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel",
        "Amos",
        "Obadiah",
        "Jonah",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Zephaniah",
        "Haggai",
        "Zechariah",
        "Malachi",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Acts",
        "Romans",
        "1 Corinthians",
        "2 Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1 Thessalonians",
        "2 Thessalonians",
        "1 Timothy",
        "2 Timothy",
        "Titus",
        "Philemon",
        "Hebrews",
        "James",
        "1 Peter",
        "2 Peter",
        "1 John",
        "2 John",
        "3 John",
        "Jude",
        "Revelation" 
    ],
    fr : [
        "Genèse",
        "Exode",
        "Lévitique",
        "Nombres",
        "Deutéronome",
        "Josué",
        "Juges",
        "Ruth",
        "1 Samuel",
        "2 Samuel",
        "1 Rois",
        "2 Rois",
        "1 Chroniques",
        "2 Chroniques",
        "Ezra",
        "Néhémie",
        "Esther",
        "Job",
        "Psaumes",
        "Proverbes",
        "Ecclésiaste",
        "Cantique des Cantiques",
        "Ésaïe",
        "Jérémie",
        "Lamentations de Jérémie",
        "Ezekiel",
        "Daniel",
        "Osée",
        "Joel",
        "Amos",
        "Abdias",
        "Jonas",
        "Michéé",
        "Nahum",
        "Habakuk",
        "Sophonie",
        "Aggée",
        "Zacharie",
        "Malachie",
        "Matthieu",
        "Marc",
        "Luc",
        "John",
        "Actes des Apôtres",
        "Romains",
        "1 Corinthiens",
        "2 Corinthiens",
        "Galatians",
        "Ephésiens",
        "Philippiens",
        "Colossiens",
        "1 Thessaloniciens",
        "2 Thessaloniciens",
        "1 Timothée",
        "2 Timothée",
        "Tite",
        "Philémon",
        "Hébreux",
        "Jaques",
        "1 Pierre",
        "2 Pierre",
        "1 Jean",
        "2 Jean",
        "3 Jean",
        "Jude",
        "Apocalypse"
    ]
};


function getLang(str) {  
    switch(str.toLowerCase()) {
        case 'french': return 'fr';
        case 'english': return 'en';
    }
}

exports.parse= function (filename, format, callb)
{
    var count= 0;
    var i;    
    switch(format) {
        case "GETBIBLE.NET":
            var s= filename.split('/').slice(-1)[0];
            s= s.split('.');
            s.splice(-1);
            s= s[0].split('__');
            s.splice(-2);
            var lang= getLang(s[0]);
            var version= s[1].replace('_',' '); 
            lineReader.eachLine(filename, function(line, last) {
                raw= line.split('||');
                var verse= {};
                i= parseInt( raw[0].slice(0,2) );
                verse.testament= raw[0].slice(-1);
                verse.book= booknames[lang][i-1];
                verse.bookIdx=i;
                verse.chapter= raw[1];
                verse.verse= raw[2];
                verse.word= raw[3];   
                verse.version= version;
                verse.lang= lang;

                callb(verse, last);
                
                if(last)  log.info("done!");
        });
        break;
    }
}

exports.getSupportedFormats =  function () {
    return supportedFormats;
}
