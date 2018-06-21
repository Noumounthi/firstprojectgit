<?php
ob_start();
session_start();
    
	if (isset($_SESSION['MM_Username']))
	{
	    $vmatricule = $_SESSION['MM_Username'];
		$vIdAgent = $_SESSION['S_IdAgent'];
		$varProfil = $_SESSION['S_Profil'];
		$varPrenom = $_SESSION['S_Prenom'];
		$varNom = $_SESSION['S_Nom'];
		$varCodeServicel = $_SESSION['S_Service'];
		$varNomService = $_SESSION['S_nomService'];
		$varCodeProfil = $_SESSION['S_Profil'];
		$varNomProfil = $_SESSION['S_nomProfil'];
		
		
		$videleve = $_SESSION['S_IdEleve'];
		$vprenomCLIENT = $_SESSION['S_PreNOMCLIENT'];
		$vnomCLIENT = $_SESSION['S_NomCLIENT'];
	
    }
	else
	{
		header("Location: ../index.php");
	}	
?>
