package barcrawler

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

    public static PlacesSearchResult[] ajaxPostSearchNearbyPlaces(LatLng user_location, String search_query) {
        PlacesApi place = new PlacesApi();

        NearbySearchRequest nearby_search = place.nearbySearchQuery(this.getGeoContext(), user_location)
            .keyword(search_query)
            .radius(200);

        return nearby_search.await().results;
    }
}
