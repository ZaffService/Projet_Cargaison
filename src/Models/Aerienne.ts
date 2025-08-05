import { Alimentaire } from "./Alimentaire"
import { Cargaison } from "./Cargaison"
import { Chimique } from "./Chimique"
import { Materiel } from "./Materiel"
import type { Produit } from "./Produit"

export class Aerienne extends Cargaison {
  constructor(distance: number) {
    super(distance)
  }

  protected estProduitCompatible(produit: Produit): boolean {
    // Les produits chimiques NE sont PAS autorisés pour les cargaisons aériennes 
    if (produit instanceof Chimique) {
      return false
    }
    return true 
  }

  public calculerFrais(produit: Produit): number {
    const distance = this.getDistance()
    const poids = produit.getPoids()

    if (produit instanceof Alimentaire) {
      return poids * distance * 300 
    } else if (produit instanceof Materiel) {
      return poids * 1000 
    }
   
    return 0
  }
}