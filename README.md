# xarala_transactions_01

Ce projet permet de gérer des transactions financières avec une interface utilisateur pour afficher, ajouter, modifier, et supprimer des transactions. Il comprend également un backend qui gère les données et un frontend pour interagir avec ces données.

## Fonctionnalités

### Interface utilisateur
- **Liste des transactions** : Affichage d'une liste des transactions avec les colonnes suivantes : Description, Type, Montant, Date.
- **Ajouter une transaction** : Formulaire permettant d'ajouter une nouvelle transaction.
- **Modifier une transaction** : Bouton permettant de modifier une transaction existante.
- **Supprimer une transaction** : Bouton permettant de supprimer une transaction existante.
- **Affichage du solde total** : Calcul et affichage du solde total en fonction des revenus et des dépenses.

### Requêtes API
- Utilisation d'**axios** pour interagir avec l'API backend pour récupérer, ajouter, modifier et supprimer les transactions.

### Gestion d'état
- Utilisation de **useState** et **useEffect** dans React pour gérer les états et effectuer les appels API nécessaires pour afficher les données.

### Design
- Le frontend utilise **Material-UI** et **TailwindCSS**.


## Backend (Java)

### Prérequis
- **Java 17** ou une version supérieure.
- **Maven** pour la gestion des dépendances.

### Installation et démarrage
1. Clonez le répertoire backend :
   ```bash
   git clone https://github.com/imyya/xarala_transactions.git
