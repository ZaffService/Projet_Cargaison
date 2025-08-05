import type { Produit } from "./Produit"

export abstract class Cargaison{
    private distance : number
    private produits : Produit[]
    private readonly MAX_PRODUITS: number = 10
    private readonly MIN_PRODUITS: number = 1


    constructor(distance : number){
        this.distance = distance
        this.produits = []
    }


    public getDistance(): number {
        return this.distance
    }

    public getProduits(): Produit[] {
        return this.produits
    }

    public setDistance(distance: number): void {
        this.distance = distance
    }

    public ajouterProduit(produit : Produit) : void{
        if (this.produits.length >= this.MAX_PRODUITS ) {
            console.log(`La cargaison est pleine. Impossible d'ajouter ce produit `)
            return
        }

        if (!this.estProduitCompatible(produit)) {
            console.log(`Le produit n'est pas compatible avec ce type de cargaison.`)
            return
        }

        this.produits.push(produit)
        console.log(`Produit "${produit.getLibelle()}" ajouté à la cargaison. Montant actuel: ${this.sommeTotale()} F`)
    }


    public nbProduits() : number{
      return this.produits.length
    }

    public sommeTotale() : number{
        let totalFrais = 0
        for (const produit of this.produits) {
            totalFrais += this.calculerFrais(produit)
        }
        return totalFrais
    }

    protected abstract estProduitCompatible(produit: Produit): boolean
    public abstract calculerFrais(produit: Produit): number
}