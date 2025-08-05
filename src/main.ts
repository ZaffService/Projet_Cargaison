import { Aerienne } from './Models/Aerienne'
import { Maritime } from './Models/Maritime'
import { Routiere } from './Models/Routiere'
import { Alimentaire } from './Models/Alimentaire'
import { Chimique } from './Models/Chimique'
import { Fragile } from './Models/Fragile'
import { Incassable } from './Models/Incassable'
import type { Cargaison } from './Models/Cargaison'
import type { Produit } from './Models/Produit'

// État global de l'application
let cargaisonActuelle: Cargaison | null = null

// Éléments du DOM
const cargaisonForm = document.getElementById('cargaison-form') as HTMLFormElement
const produitForm = document.getElementById('produit-form') as HTMLFormElement
const produitSection = document.getElementById('produit-section') as HTMLElement
const cargaisonDisplay = document.getElementById('cargaison-display') as HTMLElement
const transportTypeSelect = document.getElementById('transport-type') as HTMLSelectElement
const distanceInput = document.getElementById('distance') as HTMLInputElement
const produitTypeSelect = document.getElementById('produit-type') as HTMLSelectElement
const libelleInput = document.getElementById('libelle') as HTMLInputElement
const poidsInput = document.getElementById('poids') as HTMLInputElement
const toxiciteInput = document.getElementById('toxicite') as HTMLInputElement
const toxiciteGroup = document.getElementById('toxicite-group') as HTMLElement
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement
const notificationsContainer = document.getElementById('notifications') as HTMLElement

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners()
    showNotification('Application chargée avec succès !', 'success')
})

function initializeEventListeners(): void {
    // Formulaire de création de cargaison
    cargaisonForm.addEventListener('submit', handleCargaisonCreation)
    
    // Formulaire d'ajout de produit
    produitForm.addEventListener('submit', handleProduitAjout)
    
    // Changement de type de produit (pour afficher/masquer toxicité)
    produitTypeSelect.addEventListener('change', handleProduitTypeChange)
    
    // Bouton reset
    resetBtn.addEventListener('click', resetApplication)
}

function handleCargaisonCreation(event: Event): void {
    event.preventDefault()
    
    const transportType = transportTypeSelect.value
    const distance = parseInt(distanceInput.value)
    
    if (!transportType || !distance) {
        showNotification('Veuillez remplir tous les champs', 'error')
        return
    }
    
    try {
        // Création de la cargaison selon le type
        switch (transportType) {
            case 'aerienne':
                cargaisonActuelle = new Aerienne(distance)
                break
            case 'maritime':
                cargaisonActuelle = new Maritime(distance)
                break
            case 'routiere':
                cargaisonActuelle = new Routiere(distance)
                break
            default:
                throw new Error('Type de transport invalide')
        }
        
        // Mise à jour de l'interface
        produitSection.style.display = 'block'
        cargaisonDisplay.style.display = 'block'
        updateCargaisonDisplay()
        
        showNotification(`Cargaison ${transportType} créée avec succès !`, 'success')
        
        // Désactiver le formulaire de création
        cargaisonForm.style.opacity = '0.6'
        cargaisonForm.style.pointerEvents = 'none'
        
    } catch (error) {
        showNotification(`Erreur lors de la création : ${error}`, 'error')
    }
}

function handleProduitAjout(event: Event): void {
    event.preventDefault()
    
    if (!cargaisonActuelle) {
        showNotification('Veuillez d\'abord créer une cargaison', 'error')
        return
    }
    
    const produitType = produitTypeSelect.value
    const libelle = libelleInput.value.trim()
    const poids = parseFloat(poidsInput.value)
    const toxicite = parseInt(toxiciteInput.value)
    
    if (!produitType || !libelle || !poids) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error')
        return
    }
    
    try {
        let produit: Produit
        
        // Création du produit selon le type
        switch (produitType) {
            case 'alimentaire':
                produit = new Alimentaire(libelle, poids)
                break
            case 'chimique':
                if (!toxicite) {
                    showNotification('Le degré de toxicité est obligatoire pour les produits chimiques', 'error')
                    return
                }
                produit = new Chimique(libelle, poids, toxicite)
                break
            case 'fragile':
                produit = new Fragile(libelle, poids)
                break
            case 'incassable':
                produit = new Incassable(libelle, poids)
                break
            default:
                throw new Error('Type de produit invalide')
        }
        
        // Tentative d'ajout à la cargaison
        const nombreProduitsBefore = cargaisonActuelle.nbProduits()
        cargaisonActuelle.ajouterProduit(produit)
        const nombreProduitsAfter = cargaisonActuelle.nbProduits()
        
        if (nombreProduitsAfter > nombreProduitsBefore) {
            // Produit ajouté avec succès
            showNotification(`Produit "${libelle}" ajouté avec succès !`, 'success')
            updateCargaisonDisplay()
            resetProduitForm()
        } else {
            // Produit rejeté (incompatible ou cargaison pleine)
            showNotification(`Impossible d'ajouter le produit "${libelle}"`, 'warning')
        }
        
    } catch (error) {
        showNotification(`Erreur lors de l'ajout : ${error}`, 'error')
    }
}

function handleProduitTypeChange(): void {
    const produitType = produitTypeSelect.value
    
    // Afficher/masquer le champ toxicité selon le type de produit
    if (produitType === 'chimique') {
        toxiciteGroup.style.display = 'block'
        toxiciteInput.required = true
    } else {
        toxiciteGroup.style.display = 'none'
        toxiciteInput.required = false
        toxiciteInput.value = ''
    }
}

function updateCargaisonDisplay(): void {
    if (!cargaisonActuelle) return
    
    const cargaisonInfo = document.getElementById('cargaison-info') as HTMLElement
    const produitsListContainer = document.getElementById('produits-list') as HTMLElement
    const totalFraisContainer = document.getElementById('total-frais') as HTMLElement
    
    // Informations de la cargaison
    const transportType = cargaisonActuelle.constructor.name
    const distance = cargaisonActuelle.getDistance()
    const nbProduits = cargaisonActuelle.nbProduits()
    
    cargaisonInfo.innerHTML = `
        <h3>🚛 ${transportType}</h3>
        <p><strong>Distance :</strong> ${distance} km</p>
        <p><strong>Produits :</strong> ${nbProduits}/10</p>
    `
    
    // Liste des produits
    const produits = cargaisonActuelle.getProduits()
    produitsListContainer.innerHTML = ''
    
    produits.forEach((produit, index) => {
        const frais = cargaisonActuelle!.calculerFrais(produit)
        const produitElement = document.createElement('div')
        produitElement.className = 'produit-item'
        
        let typeIcon = '📦'
        let typeText = 'Produit'
        let extraInfo = ''
        
        // Déterminer le type et les infos supplémentaires
        if (produit instanceof Alimentaire) {
            typeIcon = '🍎'
            typeText = 'Alimentaire'
        } else if (produit instanceof Chimique) {
            typeIcon = '⚗️'
            typeText = 'Chimique'
            extraInfo = `<p><strong>Toxicité :</strong> ${(produit as Chimique).getDegreToxicite()}/10</p>`
        } else if (produit instanceof Fragile) {
            typeIcon = '📱'
            typeText = 'Matériel Fragile'
        } else if (produit instanceof Incassable) {
            typeIcon = '🔧'
            typeText = 'Matériel Incassable'
        }
        
        produitElement.innerHTML = `
            <h4>${typeIcon} ${produit.getLibelle()}</h4>
            <p><strong>Type :</strong> ${typeText}</p>
            <p><strong>Poids :</strong> ${produit.getPoids()} kg</p>
            ${extraInfo}
            <p class="produit-frais"><strong>Frais :</strong> ${frais.toLocaleString()} F</p>
        `
        
        produitsListContainer.appendChild(produitElement)
    })
    
    // Total des frais
    const totalFrais = cargaisonActuelle.sommeTotale()
    totalFraisContainer.innerHTML = `
        <h3>💰 Total des frais : ${totalFrais.toLocaleString()} F</h3>
    `
}

function resetProduitForm(): void {
    produitForm.reset()
    toxiciteGroup.style.display = 'none'
    toxiciteInput.required = false
}

function resetApplication(): void {
    // Réinitialiser l'état
    cargaisonActuelle = null
    
    // Réinitialiser les formulaires
    cargaisonForm.reset()
    resetProduitForm()
    
    // Masquer les sections
    produitSection.style.display = 'none'
    cargaisonDisplay.style.display = 'none'
    
    // Réactiver le formulaire de création
    cargaisonForm.style.opacity = '1'
    cargaisonForm.style.pointerEvents = 'auto'
    
    showNotification('Application réinitialisée', 'success')
}

function showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    const notification = document.createElement('div')
    notification.className = `notification ${type}`
    notification.textContent = message
    
    notificationsContainer.appendChild(notification)
    
    // Supprimer la notification après 4 secondes
    setTimeout(() => {
        notification.remove()
    }, 4000)
}

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    showNotification(`Erreur inattendue : ${event.message}`, 'error')
})

// Export pour les tests (optionnel)
export { cargaisonActuelle, showNotification }