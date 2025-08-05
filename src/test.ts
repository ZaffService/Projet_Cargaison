import { Aerienne } from "./Models/Aerienne"
import { Alimentaire } from "./Models/Alimentaire"
import { Chimique } from "./Models/Chimique"
import { Fragile } from "./Models/Fragile"
import { Incassable } from "./Models/Incassable"
import { Maritime } from "./Models/Maritime"
import { Routiere } from "./Models/Routiere"

console.log("--- Démarrage des tests de gestion de cargaisons ---")

// 1. Créeons  trois cargaisons différentes
const cargaisonAerienne = new Aerienne(500) // 500 km
const cargaisonMaritime = new Maritime(2000) // 2000 km
const cargaisonRoutiere = new Routiere(150) // 150 km

console.log("\n--- Test Cargaison Aérienne ---")
const pA1 = new Alimentaire("Pommes", 100) //libelle, poids
const pC1 = new Chimique("Acide Sulfurique", 50, 4) //libelle, poids, degreToxicite
const pF1 = new Fragile("Vase en Cristal", 10)  //libelle, poids
const pI1 = new Incassable("Barre de Fer", 200)



cargaisonAerienne.ajouterProduit(pA1)
cargaisonAerienne.ajouterProduit(pC1)
cargaisonAerienne.ajouterProduit(pF1)
cargaisonAerienne.ajouterProduit(pI1)

console.log(`Nombre de produits dans la cargaison aérienne: ${cargaisonAerienne.nbProduits()}`)
console.log(`Somme totale de la cargaison aérienne: ${cargaisonAerienne.sommeTotale()} F`)
pA1.info()
pC1.info()
pF1.info()
pI1.info()

console.log("\n--- Test Cargaison Maritime ---")
const pA2 = new Alimentaire("Riz", 500)
const pC2 = new Chimique("Pétrole Brut", 1000, 5)
const pF2 = new Fragile("Miroir Ancien", 10) 
const pI2 = new Incassable("Tuyaux en Acier", 1500)

cargaisonMaritime.ajouterProduit(pA2)
cargaisonMaritime.ajouterProduit(pC2)
cargaisonMaritime.ajouterProduit(pF2) 
cargaisonMaritime.ajouterProduit(pI2)

console.log(`Nombre de produits dans la cargaison maritime: ${cargaisonMaritime.nbProduits()}`)
console.log(`Somme totale de la cargaison maritime: ${cargaisonMaritime.sommeTotale()} F`)
pA2.info()
pC2.info()
pI2.info()

console.log("\n--- Test Cargaison Routière ---")
const pA3 = new Alimentaire("Légumes", 200)
const pC3 = new Chimique("Engrais", 300, 2)
const pF3 = new Fragile("Vaisselle", 20)
const pI3 = new Incassable("Briques", 1000)

cargaisonRoutiere.ajouterProduit(pA3)
cargaisonRoutiere.ajouterProduit(pC3)
cargaisonRoutiere.ajouterProduit(pF3)
cargaisonRoutiere.ajouterProduit(pI3)

console.log(`Nombre de produits dans la cargaison routière: ${cargaisonRoutiere.nbProduits()}`)
console.log(`Somme totale de la cargaison routière: ${cargaisonRoutiere.sommeTotale()} F`)
pA3.info()
pC3.info()
pF3.info()
pI3.info()

console.log("\n--- Test de la capacité maximale (10 produits) ---")
const cargaisonTestPleine = new Routiere(100)
for (let i = 1; i <= 10; i++) {
  cargaisonTestPleine.ajouterProduit(new Alimentaire(`Produit Test ${i}`, 10))
}
// Try to add an 11th product
cargaisonTestPleine.ajouterProduit(new Alimentaire("Produit Trop", 5))
console.log(`Nombre de produits dans la cargaison de test pleine: ${cargaisonTestPleine.nbProduits()}`)
console.log(`Somme totale de la cargaison de test pleine: ${cargaisonTestPleine.sommeTotale()} F`)

console.log("\n--- Fin des tests ---")


