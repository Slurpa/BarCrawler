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

        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
