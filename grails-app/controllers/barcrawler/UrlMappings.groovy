package barcrawler

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: 'index')
        "/api-test"(controller: 'test')
        "/place"(controller: 'place')
        "/place/test"(controller: 'place', action: 'test')

        post "/place/get-places"(controller: 'place', action: 'searchPlaces')

        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
