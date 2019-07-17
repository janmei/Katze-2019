KATZE ist ein CMS zum zentralen Ansteuern von verschiedenen Displays und Medien auf Veranstaltungen. Es wird ein lokaler Server gestartet, über welchen verschiedene Slides angezeigt werden können - immer mit dem Content der gerade relevant ist. Entwickelt wurde es im Rahmen der Interactive Future Exhibition 2019.

Einige Features sind:

- Nahtlose Übergänge zwischen Vorträgen und Pausenfolien
- Endlos Loops für Informationsdisplays mit verschiedenen Content Typen (Zeitpläne, aktuelle Vorträge, Sponsoren etc)
- Animierte 2D und 3D Grafiken auf den Slides
- Zentral gesteuerte Countdowns
- Einbindung von Musik zu bestimmten Events
- Eintragen und Verwalten von Inhalten über eigene Templates (die mit Permalinks verschickt werden können)

# Installation

### Clone this repository

    cd Zielordner
    git clone https://github.com/janmei/Katze-2019.git
    cd Katze-2019

### Dependencies installieren

    cd app/katze
    yarn install

# Development Usage

### Mongo Datenbank starten:

    cd mongo
    yarn start

### Node Server starten:

    cd app/katze 
    node app

### React App starten:

    cd app/katze
    yarn start

## Admin Panel öffen

[http://localhost:3000](http://localhost:3000/)

## Slides öffnen

Alle angelegten Slides im Admin Panel sind sofort unter [http://localhost:3000](http://localhost:3000/)/slide/name aufrufbar.

## Mehr Informationen

Siehe Wiki.