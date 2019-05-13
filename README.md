# Application de rencontre 

## Lancement

Pour lancer les containers docker, il faut exécuter la commande suivante:
``` bash
docker-compose up -d --build
```

## Connexion au container
``` bash
docker exec -it {container_name} bash
```
Exemple:
``` bash
docker exec -it react-film-app bash
```
