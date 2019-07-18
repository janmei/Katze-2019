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

---

# Transitions, Timer, Timetables: Zwischenfolien erstellen und bei Live-Events nutzen

KATZE eignet sich hervorragend, um professionelle Animationen zwischen Talks zu zeigen. 

## Vorbereitung

Die Visuals werden können über jeden Browser abgerufen werden. Es empfiehlt sich vorher eine Displaygröße festzulegen (außer die Animationen werden auch Responsive in Unity angelegt). Bei Talks hat sich bewährt, eine Streamingsoftware wie [OBS](https://obsproject.com/) zu verwenden. So können sehr leicht zwischen Speakerfolien und Zwischenfolien gewechselt werden. Bei der Art der Übergänge ist nur die eigene Kreativität die Grenze.

## Animationen mit Unity erstellen

Als erstes müssen die Visuals der Zwischenfolien erstellt werden. Wir benutzten dafür Unity. Eine Sample Scene der letzten Interactive Future Exhibition befindet sich im Ordner *unity*. 
Neben Camera und Directional Light befinden sich zwei GameObjects in der Szene: "KATZE" und "VISUALS". KATZE sind drei weitere Controller untergeordner, welche den Kern der Anwendung bilden. 

### Communicator
Der Communicator ist für die Kommunikation zwischen Admin Panel und Unity Scene verantwortlich. Alle Funktionen die über das Web-Interface aufgerufen werden müssen sich in dem Communicator.cs Script befinden.

**ChangeText()**
```cs
public string ChangeText(string input)
```
ChangeText() wird genutzt um den Text auf den Slides zu ändern. Es können vier Parameter mitgegeben werden, welche in einem String zusammengefasst werden und mit einem | unterteilt werden.
```cs
// Setzt die Überschrift auf "Willkommen", die Subline auf "Gleich geht es los!", den Timer auf 20 Sekunden und den Modus auf "Teams".
ChangeText("Willkommen!|Gleich geht es los!|20000|Teams")
```

**StartTransitionsToSlides()**
```cs
public void StartTransitionToSlides()
```
Wird aufgerufen wenn der zugehörige Button im Web Interface gedrückt wird. In dieser Funktion können Transitions zwischen Browser und Speakerfolie getriggert werden.
```cs
// Beispiel: Overlay GameObject aktivieren, oder zurücksetzten.
if (!overlay.activeSelf)
{
    overlay.SetActive(true);
} else
{
    overlay.GetComponent<Animator>().SetTrigger("BackToSlide");
    Invoke("disableOverlay", 10);
}
```

### Animation Controller
Im AnimationController Script werden alle Objekte vom Typ *Animator* gesammelt.

### Countdown Controller
Der Countdown Controller ist für die Verwaltung von Countdowns verantwortlich. So können Timer angegeben werden, wann zum Beispiel der nächste Talk beginnt, oder eine Pause vorbei ist.

**SetCountdown()**
```cs
public void SetCountdown(int ms)
```
Wird von Communicator.cs aufgerufen um einen Countdown zu starten. Dauer wird in Millisekunden mitgegeben.

**EndCountdown()**
```cs
public void EndCountdown()
```
Beendet den aktuellen Countdown.

## Unity Workflow

### Visuals erstellen
Als erster Schritt sollten die Visuals an das Veranstaltungs Design angepasst werden. Eventuell gibt es Key Visuals die animiert werden können? Grafiken von Flyern, Poster oder Social Media mit Partikel Effekten untermalen? Alle Anpassungen sollten im GameObject *VISUALS* vorgenommen werden. Zwei verschiedene Text Objekte können angelegt werden, die Schriftarten und das Layout angepasst werden.

Für eine Mischung aus 2D Layout und 3D Animation müssen verschiedene Canvases genutzt werden. Im *Main Canvas* können alle Elemente die sich im Vordergrund befinden eingefügt werden. Es muss bei **Rendermode** auf **Screen Space - Overlay** gesetzt werden.

Hintergrund 2D Elemente, welche sich eventuell sogar hinter 3D Objekten befinden sollen, können im *Background Canvas* angelegt werden. Dieser sollte sich immer im **Screen Space - Camera** Rendermode befinden. Mit der *Planedistance* kann die Ebene eingestellt werden.

### Visuals animieren
Jetzt müssen die Visuals animiert werden. Dafür gibt es zwei Wege: Über *Scripte* welche sich direkt an den jeweiligen GameObjects befinden, oder über Unitys *Animationclips*. Je nach Anwendungsfall haben beide Wege ihren Vorteil. Es ist meistens jedoch einfacher, schneller und leichter zu kontrollieren wenn man *Animations* nutzt.

**Beispiel: Transition anlegen und animieren**
Wie soll die Transition animiert werden? Wir wollen einen Overlay, welcher sich über das gesamte Visual legt, etwas anzeigt und sich dann nach oben raus bewegt. Nach der Transition sollen direkt die Speakerfolien angezeigt werden.
Für einen nahtlosen Übergang sollte das Overlay eine grüne Fläche beinhalten, welche später in OBS mit *Chroma Key* ausgeschnitten werden kann.

**Animation anlegen**
1. Animation Fenster öffnen (*Window > Animation > Animation*).
2. Zu animierendes GameObject auswählen
3. Im Animation Fenster *Create* auswählen.
4. Den Animationclip benennen und abspeichern.

**Keyframes anlegen**
Jetzt kann das GameObject animiert werden. Dafür entweder den roten *Record Button* im Animation Fenster auswählen und das Object in der Scene frei verschieben, oder einzelne Keyframes anlegen.

**Animation triggern**
Wenn die Animation fertig gestaltet ist, muss sie nur noch über den Code aufgerufen werden können. Weil sie sich nicht immer Loopen soll, kann im Inspector wenn der Clip ausgewählt wird *Loop Time* ausgeschaltet werden.
Bei einem Overlay bietet es sich an, das GameObject erst auf *Inactive* zu stellen, und bei dem Auswählen des Buttons im Web Interface dann auf *Active* zu ändern. Die Animation wird direkt abgespielt.
Dafür kann im *Communicator* die *StartTransitionToSlides()* Funktion geändert werden. Wie in der Sample Scene könnte der Code zum aktivieren so aussehen:
```cs
// Beispiel: Overlay GameObject aktivieren, oder zurücksetzten.
if (!overlay.activeSelf)
{
    overlay.SetActive(true);
} else
{
    overlay.GetComponent<Animator>().SetTrigger("BackToSlide");
    Invoke("disableOverlay", 10);
}
```

### Unity Project builden
Wenn die Visuals so animiert wurden wie gewünscht kann das Project gebuildet werden. 
1. *Build Settings* aufrufen (*File > Build Settings*).
2. Scene hinzufügen (*Add Open Scenes*)
3. WebGL als Platform auswählen. (*Eventuell muss WebGL erst noch heruntergeladen werden*)
4. *Build*

### Ins Frontend einfügen
In dem Ordner in dem gebuildet wurde sollten sich jetzt mehrere Dateien befinden:
```
Name.data.unityweb
Name.json
Name.wasm.code.unityweb
Name.wasm.framework.unityweb
UnityLoader.js
```
*Wenn nicht alle Dateien vorhanden sind kann es ein Problem beim Builden gegeben haben. Dann einfach nochmal versuchen.*

Der gesamte Ordner muss nun an die passende Stelle im Frontend kopiert werden.

    cd app/katze/public/Animation

Alle alten Dateien im *Animation* Ordner löschen und mit den neuen austauschen.

Wenn das gesamte System nun neugestartet wird, sollte die neue Unity Scene im Browser aufrufbar sein.

## Live Workflow
Angenommen, die Visuals sind alle auf dem neusten Stand. Animationen sind eingefügt, die Datenbank gefüllt und die lokalen Server gestartet. Wie kann KATZE jetzt in einer Live Situation genutzt werden.

### OBS einrichten
[OBS](https://obsproject.com/) herunterladen. Zwei neue Sources einrichten: Browser & Video Capture Device. In der Browser Source öffnen wir unser lokales KATZE Frontend (*http://localhost:3000/slide/name*) und legen die größe auf 1920x1080 fest. Die Animation sollte direkt starten. Als zweite Source gibt es das Video Capture Device. Hier wird ein externes Device benötigt, welches die Speakerfolien vom Speakerrechner über HDMI abfängt und via USB in den PC auf dem OBS läuft weitergibt (zum Beispiel *Elgato HD60S* oder ähnliches).
Damit die Übergänge funktionieren, kann bei *Browser* ein Filter angewandt werden: *Color Key*. Dieser wird auf die gleiche Farbe wie beim Overlay gelegt (z.B. Grün) und die *Smoothness* und *Similarity* so angepasst, dass es zu keinem Bildfehler kommt.

### Web Interface
Zuerst wird das Interface über http://localhost:3000/ aufgerufen. Es gibt verschiedene Räume. Wenn ein neuer angelegt wurde, muss dieser dann auch im Browser aufgeruft werden. Über *Templates* können verschiedene Content Presets ausgewählt werden. Wenn eine Transition gestartet werden soll, kann der *Start Transition* oder *End Transition* Button gedrückt werden.