vcl 4.1;

backend default {
    .host = "backend";
    .port = "3000";
}

sub vcl_recv {
    # Cache GET requests (customize as needed)
    if (req.method == "GET") {
        return (hash);
    }
}

sub vcl_backend_response {
    # Cache for 2 minutes (example)
    set beresp.ttl = 2m;
}

sub vcl_deliver {
    # Add debug headers to responses
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT (Varnish)";
        set resp.http.X-Cache-Hits = obj.hits;
    } else {
        set resp.http.X-Cache = "MISS (Varnish)";
    }
}