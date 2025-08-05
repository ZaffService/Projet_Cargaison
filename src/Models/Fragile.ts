import { Materiel } from "./Materiel"

export class Fragile extends Materiel {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }

  public info(): void {
    console.log(`--- Produit Matériel (Fragile) ---`)
    console.log(`Libellé: ${this.getLibelle()}`)
    console.log(`Poids: ${this.getPoids()} kg`)
  }
}