<div align="center">
  <h1>🌟 Smart Docs 🌟 - Your Research Paper Generation Tool </h1>
</div>


<div align="center">
  <img src="https://play-lh.googleusercontent.com/0SGLm0XREiam1GkErO-oXEi5LoyUExVIgfn30alJ82y0UwewSkSO6uxFq0oPmavV0Oo=w526-h296-rw" alt="Screenshot-2023-09-05-205414" border="0">
</div>

# Contexte général du projet
Le contexte général de ce projet est centré sur la création d'un outil basé sur le traitement automatique du langage naturel (NLP) pour aider les chercheurs et les auteurs à rédiger des articles scientifiques de manière plus efficace et précise. L'objectif est de simplifier le processus de rédaction tout en garantissant la qualité et la cohérence des articles scientifiques. 

# FastAPI

Le choix de FastAPI offre plusieurs avantages pour le développement d'applications Web, en particulier dans le contexte des API RESTful et des microservices. Voici quelques-uns des avantages clés de FastAPI :

1. Haute performance : FastAPI est conçu pour être extrêmement rapide. Il est basé sur des opérations asynchrones, ce qui lui permet de gérer efficacement de nombreuses requêtes simultanées sans sacrifier les performances.

2. Typage fort : FastAPI utilise des annotations de type Python pour définir les entrées et les sorties de vos API. Cela garantit une validation statique des données, ce qui réduit les erreurs de codage et facilite la documentation automatique de l'API.

3. Automatisation de la documentation : FastAPI génère automatiquement une documentation interactive pour votre API en utilisant les informations des annotations de type. Cela simplifie la création et la maintenance de la documentation de l'API.


# Besoins Fonctionnels 
- Génération Automatique d'Articles Scientifiques :Permettre aux utilisateurs de spécifier le sujet de recherche pour générer automatiquement l'introduction, la conclusion et l'abstract de l'article en fonction des paramètres spécifiés.
- Chatbot sur le NLP et la Science des Données :Intégrer un chatbot capable de répondre aux questions des utilisateurs sur le NLP et la science des données.
- Reformulation:Intégrer un module de reformulation pour aider les utilisateurs à améliorer la clarté et la concision de leur écriture.
- Recommandation : Mettre en place un système de recommandation de contenu lié pour suggérer des ressources pertinentes aux utilisateurs.

# Besoins Non Fonctionnels

- Qualité du Contenu Généré :Assurer que le contenu généré est de haute qualité, précis et conforme aux normes scientifiques

- Performance :Assurer une réponse rapide du site web et du chatbot pour une expérience utilisateur fluide.
- Formation du Modèle de Langage : S'assurer que le modèle de langage utilisé pour la génération est correctement formé sur des données spécifiques au domaine de la science des données et du NLP.
- Disponibilité :Garantir une disponibilité élevée du service web et du chatbot pour éviter les interruptions de service.

- Interface Utilisateur Conviviale :Concevoir une interface utilisateur conviviale et intuitive pour faciliter la navigation et l'utilisation de la plateforme.

- Scalabilité : Prévoir la possibilité de faire évoluer la plateforme pour gérer un nombre croissant d'utilisateurs et de demandes.



#### Conception UML

Voici la conception UML de notre application
*4.1* Diagramme de cas d'utilisation  | *4.2* Diagramme de classe 
:------------:|:---------------:
![Imgur](https://i.ibb.co/MZmkcy5/img1.png)  |  ![Imgur](https://i.ibb.co/mtSrpvM/UML-Class-Diagram-Example-Car.png) 

# Mode d’emploi
Pour démarrer cette partie front-end( à noter il faut démarrer la partie backend en premier , pour consommer les APIS backend avec Axios) , suivez les étapes suivantes :
1.	Téléchargez le projet sur votre ordinateur
2.	Ouvrez-le dans votre éditeur de code (VScode par exemple)
3.	Tapez sur le terminal les commandes de lignes suivantes : npm start 
4.	Naviguez vou vers : http://localhost:8080/

# Aperçu
Home  |  Sign-Up
:-------------:|:----------------:
![Imgur](https://i.ibb.co/LdQBFsw/Screenshot-2023-09-02-122544.png)  |  ![Imgur](https://i.ibb.co/VJYsz5d/Screenshot-2023-09-02-122712.png)

 Sigh_In |   Options
:-------------:|:----------------:
![Imgur](https://i.ibb.co/TH5HMsQ/Screenshot-2023-09-02-122755.png)  |  ![Imgur](https://i.ibb.co/Wn1kxX0/Screenshot-2023-09-02-122909.png)  

 Add Article |    Choose title
:-------------:|:----------------:
![Imgur](https://i.ibb.co/WyNPMHz/Screenshot-2023-09-02-123057.png)  |  ![Imgur](https://i.ibb.co/cgB60pP/Screenshot-2023-09-02-123320.png)  

 Form Validation |   Common sentences
:-------------:|:----------------:
![Imgur](https://i.ibb.co/TWtXWGz/Screenshot-2023-09-02-123416.png)  |  ![Imgur](https://i.ibb.co/kD4GhmZ/Screenshot-2023-09-02-123510.png)  

 Abstract generation |   Generated Abstract
:-------------:|:----------------:
![Imgur](https://i.ibb.co/Fm5D5kV/Screenshot-2023-09-02-123632.png)  |  ![Imgur](https://i.ibb.co/jZwLxgn/Screenshot-2023-09-02-123658.png)  


 Custom Text Selection |   Translate the selected text
:-------------:|:----------------:
![Imgur](https://i.ibb.co/Bz2DGdc/Screenshot-2023-09-02-123826.png)  |  ![Imgur](https://i.ibb.co/NCgmSMF/Screenshot-2023-09-02-123845.png)  
 Text Selection |   Text Paraphrasing
:-------------:|:----------------:
![Imgur](https://i.ibb.co/BrLrphd/Screenshot-2023-09-02-124435.png)  |  ![Imgur](https://i.ibb.co/GHQy5N1/Screenshot-2023-09-02-124636.png)  
 Text Summarization |   Related Articles
:-------------:|:----------------:
![Imgur](https://i.ibb.co/BGWSCwT/Screenshot-2023-09-02-124730.png)  |  ![Imgur](https://i.ibb.co/YdpdR6V/Screenshot-2023-09-02-125825.png)  




Generated Introduction |   Generated Sections
:-------------:|:----------------:
![Imgur](https://i.ibb.co/Ctvj2q7/Screenshot-2023-09-02-130141.png)  |  ![Imgur](https://i.ibb.co/PWHW9Yz/Screenshot-2023-09-02-130256.png)  
 Add Section |   Chatbot
:-------------:|:----------------:
![Imgur](https://i.ibb.co/WpSLZJg/Screenshot-2023-09-02-140450.png)  |  ![Imgur](https://i.ibb.co/mSdmRDy/Screenshot-2023-09-02-140610.png)  
conversation example |   Autogenerated Research Paper
:-------------:|:----------------:
![Imgur](https://i.ibb.co/1ZRPJcF/Screenshot-2023-09-02-140756.png)  |  ![Imgur](https://i.ibb.co/3c1yt8d/Screenshot-2023-09-02-141603.png)  

 Cover Page |   Research Paper
:-------------:|:----------------:
![Imgur](https://i.ibb.co/d5htPzf/Screenshot-2023-09-02-141646.png)  |  ![Imgur](https://i.ibb.co/pbGMhbr/Screenshot-2023-09-02-141706.png)  

- [Ahmed Laaziz] (mailto:laazizahmed72@gmail.com) - [LinkedIn]([your-linkedin-profile-link](https://www.linkedin.com/in/ahmed-laaziz-4b2168218/))

---

<div align="center">⭐ Don't forget to star this repository if you find it helpful! ⭐</div>
