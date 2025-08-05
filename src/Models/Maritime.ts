import { Alimentaire } from "./Alimentaire";
import { Cargaison } from "./Cargaison";
import { Fragile } from "./Fragile";
import { Materiel } from "./Materiel";
import { Chimique } from "./Chimique";
import type { Produit } from "./Produit";

export class Maritime extends Cargaison{
     private readonly FRAIS_BASE: number = 5000 // Frais de base pour une cargaison maritime

  constructor(distance: number) {
    super(distance)
  }


  protected estProduitCompatible(produit: Produit): boolean {
    // Les produits fragiles ne sont PAS autorisés dans les cargaisons maritimes
    if (produit instanceof Fragile) {
      return false
    }
    return true 
  }

  public calculerFrais(produit: Produit): number {
    const distance = this.getDistance()
    const poids = produit.getPoids()
    let fraisProduit = 0

    if (produit instanceof Alimentaire) {
      fraisProduit = poids * distance * 90 
    } else if (produit instanceof Chimique) {
      // 500 F/Kg pour chaque degré de toxicité + 10 000 F pour l'entretien
      const degreToxicite = (produit as Chimique).getDegreToxicite()
      fraisProduit = poids * 500 * degreToxicite + 10000
    } else if (produit instanceof Materiel) {
      fraisProduit = poids * distance * 400 
    }

    return this.FRAIS_BASE + fraisProduit
  }

}