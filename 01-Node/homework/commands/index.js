let fs = require ('fs') ;
let request = require ('request') ; 

module.exports = {
    echo: function (args, print) { 
        print(args.join(' ')) ; },
    date: function (args, print) { 
        print(date()) ; },
    ls: function (args, print) {
        fs.readdir ('.', function (err, files) {
            if (err) throw err ; 
            print(files.join('/n')) ; })}, 
    pwd: function (args,print) { 
        print( process.cwd()) ; },
    cat: function (args, print) { 
        fs.readFile(args[0], 'utf-8', function (err, data) {
            if (err) throw err ; 
            print(data) ; })},
    head: function (args,print) {
        fs.readFile (args[0], 'utf-8', function (err,data) {
            if (err) throw err ; 
            let lines = 10 ; 
            if (args[1]) lines = args[1] ;
            print(data.split('/n').splice(0,args[1]).join('/n')) ; })},
    tail: function (args, print) { 
        fs.readFile (args[0], 'utf-8', function(err,data) {
            if (err) throw err 
        print(data.split('/n').splice(-args[1]).join('/n')) ; })},
    curl: function (args, print) { 
        request(args[0], function (err, data) {
            if (err) throw err ; 
            print(data.body) ;
        })
    }    
   
}