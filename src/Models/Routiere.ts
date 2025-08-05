import { Alimentaire } from "./Alimentaire"
import { Cargaison } from "./Cargaison"
import { Chimique } from "./Chimique"
import { Materiel } from "./Materiel"
import type { Produit } from "./Produit"

export class Routiere extends Cargaison {
  constructor(distance: number) {
    super(distance)
  }

  protected estProduitCompatible(produit: Produit): boolean {
    // Les produits chimiques NE sont PAS autorisés pour la cargaison routière 
    if (produit instanceof Chimique) {
      return false
    }
    return true 
  }

  public calculerFrais(produit: Produit): number {
    const distance = this.getDistance()
    const poids = produit.getPoids()

    if (produit instanceof Alimentaire) {
      return poids * distance * 100 
    } else if (produit instanceof Materiel) {
      return poids * distance * 200 
    }
    return 0
  }
}
