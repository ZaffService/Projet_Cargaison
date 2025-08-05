import { Produit } from "./Produit"

export class Alimentaire extends Produit {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }

  public info(): void {
    console.log(`--- Produit Alimentaire ---`)
    console.log(`Libellé: ${this.getLibelle()}`)
    console.log(`Poids: ${this.getPoids()} kg`)
  }
}
