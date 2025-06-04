#Importer le module Active Directory
Import-Module ActiveDirectory

#Donner les droits "Replicate Directory Changes"
$user = "rome.local\toto"
$domainDN = (Get-ADDomain).DistinguishedName

#Obtenir l'ACL actuelle du domaine
$acl = Get-Acl "AD:$domainDN"

#Créer la nouvelle règle d'accès pour la réplication
$identity = [System.Security.Principal.NTAccount]$user
$adRights = [System.DirectoryServices.ActiveDirectoryRights]::ExtendedRight
$type = [System.Security.AccessControl.AccessControlType]::Allow
$inheritanceType = [System.DirectoryServices.ActiveDirectorySecurityInheritance]::All
$objectType = [System.Guid]"1131f6aa-9c07-11d1-f79f-00c04fc2dcd2" # Replicate Directory Changes

#Ajouter la règle à l'ACL
$accessRule = New-Object System.DirectoryServices.ActiveDirectoryAccessRule($identity, $adRights, $type, $objectType, $inheritanceType)
$acl.SetAccessRule($accessRule)

#Appliquer les modifications
Set-Acl "AD:$domainDN" $acl
