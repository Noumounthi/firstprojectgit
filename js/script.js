//Ajax des données
//Le filtre de la table
//************************load fonction for hearder loading easily */
function loadheader()
{
	console.log("Load was performed 000.");
	$("#headerload").load("header.html", function() {
		console.log("Load was performed.");
	  });

	
}
function loadheader1()
{
	console.log("Load was performed 000.");
	$("#headerload1").load("header2.html", function() {
		console.log("Load was performed.");
	  });

	
}



//seache function article***********************************************
function myFunction() {
    // Declare variables
    var input, filter, ul, li,div1,div2,div3,div4,div5,div6,div7;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("list_prod");
    li = ul.getElementsByTagName('LI');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
		div1 = li[i].getElementsByTagName("DIV")[1];
		div2 = li[i].getElementsByTagName("DIV")[2];
		div3 = li[i].getElementsByTagName("DIV")[3];
		div4 = li[i].getElementsByTagName("DIV")[4];
		div5 = li[i].getElementsByTagName("DIV")[5];
		div6 = li[i].getElementsByTagName("DIV")[6];
		div7 = li[i].getElementsByTagName("DIV")[7];
        if (div1.innerHTML.toUpperCase().indexOf(filter) > -1 || div2.innerHTML.toUpperCase().indexOf(filter) > -1 || div3.innerHTML.toUpperCase().indexOf(filter) > -1 || div4.innerHTML.toUpperCase().indexOf(filter) > -1 || div5.innerHTML.toUpperCase().indexOf(filter) > -1 || div6.innerHTML.toUpperCase().indexOf(filter) > -1 || div7.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}

/****************************Pour la connexion ******************************************************************************************************/
function ajaxConnect() {

console.log("Passe dans connect 0");
var min_length = 3; // min caracters to display the autocomplete
var login = $('#Email1').val();
var pass = $('#Password1').val();
console.log("Passe dans connect 1" +login+" "+pass);

if(navigator.onLine == true) {
if (login.length >= min_length && pass.length >= min_length) {
	console.log("Passe dans connect 2" +login+" "+pass);
$.ajax({
url: 'http://localhost/workspace/boostrapApp/AdminApp/backend/ajax_connect_user.php',
type: 'GET',
data: {login:login, pass:pass},
success:function(data){
	if(data==0)
	
	{
		$('#alertConnect').html("Login ou mot de passe incorrecte");
	}
	else{
	console.log("Passe dans connect" +data);
	userStoreInfo(data);
	location.href = "index.html";
}
	//getUserInfo();
}
}); 

} else {

	$('#alertConnect').html("Veuillez remplir les champs requis");
}
} else
{
	console.log("le train de connexion");
}
}
// Ajoutes des produits en temps que utilisateurs

/****************************Ajouter produits******************************************************************************************************/
function ajaxAddProduct() {
	var libelleP = $('#libelleP').val();
	var descP = $('#descP').val();
	var prixP = $('#prixP').val();
	var dateP = $('#dateP').val();
	//************************************************************ */

	var userID=localStorage.getItem("userID");
	$.ajax({
	url: 'https://genius-family.net/jayandoo_api/ajax_add_product.php',
	headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
	type: 'POST',
	data: {userID:userID,libelleP:libelleP, descP:descP,prixP:prixP,dateP:dateP},
	success:function(data){
		listProducUser();
		$('#alert').html(data);
		$('#libelleP').val("");
		$('#descP').val("");
		$('#prixP').val("");
		$('#dateP').val("");
	}}); 
	
	
	}
	//Add product with image 
	function addNewProdImage()
	{
		
		$("form#data").submit(function(event){
 
			//disable the default form submission
			event.preventDefault();
		   
			//grab all form data  
			var formData = new FormData($(this)[0]);
		   
			$.ajax({
			  url: 'http://localhost/workspace/REST_API/product/create.php',
		      type: 'POST',
			  data: formData,
			  async: false,
			  cache: false,
			  contentType: false,
			  processData: false,
			  success: function (returndata) {
				listProducUser();
		$('#alert').html(returndata);
		$('#libelleP').val("");
		$('#descP').val("");
		$('#prixP').val("");
		$('#dateP').val("");
			  }
			});
		   
			return false;
		  });
			
	}

	//********************************shop list */
	function shoplistlocal() {
		console.log("dans les shoplist");
		$.ajax({
		url: 'http://localhost/workspace/REST_API/product/read.php',
		type: 'GET',
		dataType:'json',
		success:function(data){
			//generateDynamicTable(data.records);
			console.log("Dans les success des shoplist");
			generateDynamicList(data.records);
			//return(data);
			console.log("LES RESULTS ********************"+data.records);			//console.log("les data********** "+data);
		}}); 
		//numProductUser(userID);
		
		}
	function shoplist() {
		console.log("le log shoplist");
		var userID=localStorage.getItem("userID");
		$.ajax({
		url: 'https://genius-family.net/jayandoo_api/shoplist.php',
		type: 'GET',
		data: {userID:userID},
		success:function(data){
			$('#list_prod').html(data);
			//console.log("les data********** "+data);
		}}); 
		numProductUser(userID);
		
		}
//********************************************Liste porduct */
function listProducUser() {
	
	var userID=localStorage.getItem("userID");
	console.log("Dans la liste des produit du user" +userID);
	numProductUser(userID);
	$.ajax({
	url: 'https://genius-family.net/jayandoo_api/list_product.php',
	type: 'GET',
	data: {userID:userID},
	success:function(data){
		$('#alertProdTD').html(data);
		
	}}); 
	
	
	}
	// User product count
	function numProductUser(iduser) {
		console.log("mes user "+iduser);
		$.ajax({
		url: 'https://genius-family.net/jayandoo_api/num_product.php',
		type: 'GET',
		data: {iduser:iduser},
		success:function(data){
			//$('#alertProdTD').html(data);
			
			$('#user_prod_count').html(data);
			$('#user_prod_count_shop').html(data);
			$('#num_prod_user1').html(data);
		}}); 
		
		
		}
	//*********************************************Sup de produit */
	function supProducUser(idproduit) {
		$.ajax({
		url: 'https://genius-family.net/jayandoo_api/sup_product.php',
		headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
		type: 'POST',
		data: {idproduit:idproduit},
		success:function(data){
			//$('#alertProdTD').html(data);
			$('#alert').html(data);
			listProducUser();
		}}); 
		
		
		}
	//*****************************************Editer produit */

	function editproduit(idproduit)
	{
		$('#submitConnect').hide();
		$('#editConnect').show();
		$('#labelAddMod').html("Editer la publication");
		
		$.ajax({
			url: 'https://genius-family.net/jayandoo_api/edit_produit.php',
			headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
			type: 'POST',
			data: {idproduit:idproduit},
			success:function(data){
				//$('#alertProdTD').html(data);
				console.log("DATA DE IEDIT "+data);
				
				var arrayDonnee=data.split("*");
				//alert(arrayDonnee[0]);
				var IDP = $('#IDP').val(arrayDonnee[0]);
				var libelleP = $('#libelleP').val(arrayDonnee[1]);
				var descP = $('#descP').val(arrayDonnee[2]);
				var prixP = $('#prixP').val(arrayDonnee[3]);
				var dateP = $('#dateP').val(arrayDonnee[4]);
				//listProducUser();
			}}); 
		
	}
	//edit fonction produit

	function ajaxEditProduct()
	{
		
		var IDP = $('#IDP').val();
				var libelleP = $('#libelleP').val();
				var descP = $('#descP').val();
				var prixP = $('#prixP').val();
				var dateP = $('#dateP').val();
		$.ajax({
			url: 'https://genius-family.net/jayandoo_api/update_produit.php',
			headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
			type: 'POST',
			data: {idproduit:IDP,descP:descP,libelleP:libelleP,prixP:prixP,dateP:dateP},
			success:function(data){
				$('#alert').html(data);
				//$('#labelAddMod').html("Nouvelle publication");
				listProducUser();
				$('#libelleP').val("");
				$('#descP').val("");
				$('#prixP').val("");
				$('#dateP').val("");
				$('#submitConnect').show();
		$('#editConnect').hide();
			}}); 	
	}
//*****************************************Create new account
function ajaxCreateAccount() {
	var min_length = 0; // min caracters to display the autocomplete
	
	var prenom = $('#prenom').val();
	var nom = $('#nom').val();
	var telephone = $('#telephone').val();
	var email = $('#email').val();
	var adresse = $('#adresse').val();
	var login = $('#login').val();
	var pass = $('#pass').val();
	var commerce = $('#commerce').val();
	
	if (login.length >= min_length && pass.length >= min_length) {
	
	$.ajax({
	url: 'https://genius-family.net/jayandoo_api/ajax_create_account.php',
	headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
	type: 'POST',
	data: {login:login, pass:pass,prenom:prenom, nom:nom,email:email,tel:telephone,adresse:adresse,commerce:commerce},
	success:function(data){
		$('#popup-signup').hide();
		$('#account').show();
		$('#account').html("Compte crée");
	}}); 
	
	} else {
	
		alert("Aucune données à afficher");
	
	}
	
	}

	//Store  user info 
function userStoreInfo(userdata)
{
    //get user data from data array
	var dataArray=userdata.split("*");
	//get data from array
	userID=dataArray[0];

	userPrenom=dataArray[1];
	userNom=dataArray[2];

	userTel=dataArray[3];
	userAdresse=dataArray[4];
	userEmail=dataArray[5];

	userCommerce=dataArray[6];
	userLogin=dataArray[7];
	userPass=dataArray[8];
	
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		// Store
		localStorage.setItem("userID", userID);
		localStorage.setItem("userPrenom", userPrenom);
		
		localStorage.setItem("userNom", userNom);
		localStorage.setItem("userTel", userTel);
		localStorage.setItem("userEmail", userEmail);
		localStorage.setItem("userAdresse", userAdresse);
		localStorage.setItem("userLogin", userLogin);
		localStorage.setItem("userPass", userPass);
		localStorage.setItem("userCommerce", userCommerce);
		// Retrieve
		 //document.getElementById("resultUser").innerHTML = localStorage.getItem("userCommerce");
	} else {
		// Sorry! No Web Storage support..
	}
}
//Delete user info when he disconnected to his account
function userDeleteInfo()
{
//delete info
console.log("*******************Delete user info *****************");
        localStorage.removeItem("userID");
		localStorage.removeItem("userPrenom");
		localStorage.removeItem("userNom");
		localStorage.removeItem("userTel");
		localStorage.removeItem("userEmail");
		localStorage.removeItem("userAdresse");
		localStorage.removeItem("userLogin");
		localStorage.removeItem("userPass");
		localStorage.removeItem("userCommerce");
} 

//user profile edit
 function userProfileOpen()
 {
$('#loginprofil').val(localStorage.getItem("userLogin"));
$('#prenomprofil').val(localStorage.getItem("userPrenom"));
$('#nomprofil').val(localStorage.getItem("userNom"));
$('#adresseprofil').val(localStorage.getItem("userAdresse"));
$('#telephoneprofil').val(localStorage.getItem("userTel"));
$('#emailprofil').val(localStorage.getItem("userEmail"));
$('#commerceprofil').val(localStorage.getItem("userCommerce"));
 } 

 //user profil submit

 //user profile edit
 function userProfileSubmit()
 {
var iduser=localStorage.getItem("userID");
var loginprofil=$('#loginprofil').val();
var passprofil1=$('#passprofil1').val();
var passprofil2=$('#passprofil2').val();
var prenomprofil=$('#prenomprofil').val();
var nomprofil=$('#nomprofil').val();
var adresseprofil=$('#adresseprofil').val();
var telephoneprofil=$('#telephoneprofil').val();
var emailprofil=$('#emailprofil').val();
var commerceprofil=$('#commerceprofil').val();

if (passprofil1==passprofil2)
{
	$.ajax({
		url:'https://genius-family.net/jayandoo_api/edit_profil.php',
		headers: { 'Access-Control-Allow-Origin': '*' },
       crossDomain: true,
		type:'POST',
		data: {iduser:iduser,loginprofil:loginprofil, passprofil1:passprofil1,prenomprofil:prenomprofil, nomprofil:nomprofil,emailprofil:emailprofil,telephoneprofil:telephoneprofil,adresseprofil:adresseprofil,commerceprofil:commerceprofil},
		success:function(data){
			console.log(data);
			$('#profilEditUser').html("Modification effectuée avec succés ");
			userStoreInfo(data);
		}}); 
}
else{
alert("Les mots de passes ne sont pas identiques. Reessayer");
}

 } 

//if the user is connected
function isConnected()
{
	if (typeof(Storage) !== "undefined") {
		//
		if(localStorage.getItem("userCommerce") !== null)
		{
console.log("*********************is connected****************************"+localStorage.getItem("userCommerce"));
console.log("*********************is user One ****************************"+localStorage.getItem("userCommerce"));
getUserInfo();
$('#lienConnect1').hide();
$('#lienConnect2').hide();
$('#menuConnect').show();
$('#popupConnect').hide();
listProducUser();
var userID=localStorage.getItem("userID");
document.getElementById("IDP").value=localStorage.getItem("userID");
numProductUser(userID);
}
		else
		{
			console.log("***********************is not connected*****************");
		}
	}
	else
	{
		console.log("storage not compatible*****************");
		
	}
}
//User disconnect delette data and hide open some windows and hide others
function disconnect()
{
	userDeleteInfo();
	location.href = "login.html";
	
	console.log("**********User disconnected *****************");
}

function getUserInfo()
{
	console.log("Les infos de la personne *****************");
	//document.getElementById('prenometnomUser').innerHTML=localStorage.getItem("userPrenom")+" "+localStorage.getItem("userNom");
	document.getElementById('commerceUser').innerHTML=localStorage.getItem("userCommerce");	

}

//Gérérate table from json*****************************************
function generateDynamicTable(lesdata){
	var noOfContacts = lesdata.length;
	console.log("LES LOGS**************"+noOfContacts);
	if(noOfContacts>0){
		
		// CREATE DYNAMIC TABLE.
		var table = document.createElement("table");
		table.style.width = '100%';
		table.setAttribute('border', '1');
		table.setAttribute('cellspacing', '10');
		table.setAttribute('cellpadding', '10');
		
		// retrieve column header ('Name', 'Email', and 'Mobile')

		var col = []; // define an empty array
		for (var i = 0; i < noOfContacts; i++) {
			console.log("Dans la boucle for **************"+noOfContacts);
			for (var key in lesdata[i]) {
				if (col.indexOf(key) === -1) {
					col.push(key);
				}
			}
		}
		
		// CREATE TABLE HEAD .
		var tHead = document.createElement("thead");	
			
		
		// CREATE ROW FOR TABLE HEAD .
		var hRow = document.createElement("tr");
		// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < col.length; i++) {
				var th = document.createElement("th");
				th.innerHTML = col[i];
				hRow.appendChild(th);
		}
		tHead.appendChild(hRow);
		table.appendChild(tHead);
		
		// CREATE TABLE BODY .
		var tBody = document.createElement("tbody");	
		
		// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
		for (var i = 0; i < noOfContacts; i++) {
		
				var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
				
				
				for (var j = 0; j < col.length; j++) {
					var td = document.createElement("td");
					td.innerHTML = lesdata[i][col[j]];
					bRow.appendChild(td);
				}
				var td = document.createElement("td");

					td.innerHTML = "<span style='color:white; background-color:green'><img src='images/icons/green/cart.png'  /></span>";
				bRow.appendChild(td);
				tBody.appendChild(bRow)

		}
		table.appendChild(tBody);	
		
		
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
		var divContainer = document.getElementById("myContacts");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);
		console.log("table created");
	}	
}

//*****************************************Li table  */

function generateDynamicList(lesdata){
	var noOfContacts = lesdata.length;
	var col = []; // define an empty array
	for (var i = 0; i < noOfContacts; i++) {
		for (var key in lesdata[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

	if(noOfContacts>0){
		
		for (var i = 0; i < noOfContacts; i++) {
			var node = document.createElement("LI"); 
		
			for (var j = 0; j < col.length; j++) {
								// Create a <li> node
								var divid = document.createElement("DIV"); 
								divid.style.padding = "20px";
								 if(j==3 || j==1 )
								{
									divid.setAttribute("style", "font-weight:bold; font-size:1em;color:green");
									var textnode = document.createTextNode(lesdata[i][col[j]]);         // Create a text node
									divid.appendChild(textnode); 
								}

								else if(j==0)
								{
									var image=document.createElement("IMG"); 
									image.src = "http://localhost/workspace/REST_API/product/"+lesdata[i][col[j]];
									divid.appendChild(image); 

								}
								else
								{
									divid.setAttribute("style", "font-size:1em;color:black");
									var textnode = document.createTextNode(lesdata[i][col[j]]);         // Create a text node
									divid.appendChild(textnode); 
								}
								
								 
			
			node.appendChild(divid); 
			document.getElementById("list_prod").appendChild(node); 
								
			}}}	
}