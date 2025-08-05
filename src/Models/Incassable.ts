import { Materiel } from "./Materiel"

export class Incassable extends Materiel {
  constructor(libelle: string, poids: number) {
    super(libelle, poids)
  }

  public info(): void {
    console.log(`--- Produit Matériel (Incassable) ---`)
    console.log(`Libellé: ${this.getLibelle()}`)
    console.log(`Poids: ${this.getPoids()} kg`)
  }
}
