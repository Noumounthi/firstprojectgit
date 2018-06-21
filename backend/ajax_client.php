<?php

function connect(){
require_once('../connexion/connect.php');
return new PDO('mysql:host='.$hostname_conn.';dbname='.$database_conn,$username_conn,$password_conn, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"));
}
// *** Validate request to login to this site.
/*
if (!isset($_SESSION)) {
    session_start();git commit
    
  }
*/
$pdo = connect();

$sql = "SELECT 
c.ID_CLIENT,c.NOM,c.PRENOM,c.TEL,c.ADRESSE,c.CE_BOUTIQUE, f.CE_CLIENT,f.MONTANT_FACT,cmp.CE_CLIENT, cmp.MONTANT_COMPTE,cmp.MONTANT_RETRAIT, achat.CE_CLIENT FROM client WHERE USER_LOGIN='$login' AND USER_PASS='$pass' ";
$query = $pdo->prepare($sql);
$query->bindParam(':keyword', $keyword, PDO::PARAM_STR);
$query->execute();
if($query){
$list = $query->fetchAll();
foreach ($list as $rs) {
       $varID = $rs['USER_ID'];
       $prenom=$rs['USER_PRENOM'];
       $nom=$rs['USER_NOM'];
       $tel=$rs['USER_TEL'];
       $email=$rs['USER_EMAIL'];
       $adresse=$rs['USER_ADRESSE'];
       $commerce=$rs['USER_COMMERCE'];
       $login = $rs['USER_LOGIN'];
       $pass=md5($rs['USER_PASS']);
       $ce_profil=$rs['CE_USER'];

       $loginStrGroup = "";    
       
   echo   $varID."*".$prenom."*".$nom."*".$tel."*".$adresse."*".$email."*".$commerce."*".$login."*".$pass;
}
}
else
{
  echo 0;
 
}
?>