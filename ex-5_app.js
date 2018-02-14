const express = require('express');
const app = express();

let fs = require("fs");
app.use(express.static('public'));


// Création lien modulaire
app.get('/formulaire', (req, res) => {
	console.log(__dirname);
	res.sendFile( __dirname + "/public/html/" + "04_form.html" );
})
// Création lien modulaire
app.get('/', (req, res) => {
 	console.log('accueil')
 	res.end('<h1>Accueil</h1> <a href="http://127.0.0.1:8081/formulaire">formulaire</a> <a href="http://localhost:8081/membre">membre</a>')
})


app.get('/membre', (req, res) => {
 // Preparer l'output en format JSON
	//console.log('la route /traiter_get')
// on utilise l'objet req.query pour récupérer les données GET
	fs.readFile('membre.json', "utf8", (err, data) => {
		if (err) throw err;
		
		let obj = JSON.parse("["+data+"]");
		res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
		res.write('<!DOCTYPE "html"><html><body>');
		
			for(let item in obj){
				res.write("<table>");
				for(let item2 in obj[item]){
					res.write("<tr><td>"+item2+"</td><td>"+ obj[item][item2] +"</td></tr>");
				}
				res.write("</table> <br>");
			}
		
		res.write('</body></html>');
		res.end('<a href="http://127.0.0.1:8081/formulaire">formulaire</a>');
	});

})


app.get('/traiter_get', function (req, res) {
/*// Preparer l'output en format JSON*/console.log('la route /traiter_get')
// on utilise l'objet req.query pour récupérer les données GET
	
	reponse = {
		nom:req.query.nom,
		telephone:req.query.telephone,
		courriel:req.query.courriel
	};//console.log(reponse);
	
 	

 	fs.appendFile('membre.json', ","+ JSON.stringify(reponse), function (err) {
 		if (err) throw err; console.log('Sauvegardé');
	});
	res.end('<h1>Accueil</h1> <a href="http://127.0.0.1:8081/formulaire">formulaire</a> <a href="http://localhost:8081/membre">membre</a>');
})




let server = app.listen(8081, () => {
	let host = server.address().address;
	let port = server.address().port;
 	console.log("Exemple l'application écoute sur http://%s:%s", host, port)
})