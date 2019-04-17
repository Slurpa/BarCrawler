package barcrawler

import org.grails.web.json.*
import grails.converters.JSON
import com.google.maps.*
import com.google.maps.GeoApiContext
import com.google.maps.model.LatLng
import com.google.maps.model.PlacesSearchResult
import com.google.maps.NearbySearchRequest
import com.google.maps.PlacesApi
import grails.util.Holders

class Place {

    static constraints = {

    }

    public static GeoApiContext getGeoContext() {
    	return new GeoApiContext.Builder()
		    .apiKey(Holders.grailsApplication.config.googleMaps.apiKey)
		    .build();
    }

    public static JSONArray ajaxPostSearchNearbyPlaces(LatLng user_location, String search_query) {
        return this.getResultsAsJSON(this.nearbyPlaces(user_location, search_query));
    }

    public static PlacesSearchResult[] nearbyPlaces(LatLng user_location, String search_query) {
        PlacesApi place = new PlacesApi();

        NearbySearchRequest nearby_search = place.nearbySearchQuery(this.getGeoContext(), user_location)
            .keyword(search_query)
            .radius(200);

        return nearby_search.await().results;
    }

    public static JSONArray getResultsAsJSON(PlacesSearchResult[] results) {
        JSONArray results_json = new JSONArray();

        for (PlacesSearchResult place : results) {
            JSONObject place_json = this.makeJSONPlace(place);
            results_json.put(place_json);
        }

        return results_json;
    }

    public static JSONObject makeJSONPlace(PlacesSearchResult place) {
        JSONObject place_json = new JSONObject();

        place_json.put("id", place.placeId);
        place_json.put("name", place.name);
        place_json.put("icon", place.icon);
        place_json.put("rating", place.rating);

        return place_json;
    }
}
