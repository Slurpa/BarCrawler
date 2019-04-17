package barcrawler

import org.grails.web.json.*
import grails.converters.JSON
import com.google.maps.model.LatLng

class PlaceController {

    def index() {
    	render(view: '/place/index');
    }

    def test() {
        JSONObject request = request.JSON;
        LatLng test_latlong = new LatLng(42.428673, -71.074904);

        render Place.ajaxPostSearchNearbyPlaces(test_latlong, "food");
    }

    def searchPlaces() {
        JSONObject request = request.JSON;
        LatLng test_latlong = new LatLng(42.428673, -71.074904); 

        render Place.ajaxPostSearchNearbyPlaces(test_latlong, "food") as JSON;
    }
}
