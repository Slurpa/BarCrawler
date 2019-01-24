package barcrawler

class PlaceController {

    def index() {
        render grailsApplication.config.googleMaps.apiKey;
    }
}
