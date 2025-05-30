vcl 4.1;

backend default {
    .host = "backend";  # Matches your Docker Compose service name
    .port = "3000";     # Node.js app port
}

# Cache API responses (adjust rules as needed)
sub vcl_recv {
    # Cache GET requests for 2 minutes (example)
    if (req.method == "GET" && req.url ~ "^/api/") {
        return (hash);
    }
}

sub vcl_backend_response {
    # Set TTL (cache duration) for responses
    if (bereq.url ~ "^/api/") {
        set beresp.ttl = 2m;  # Cache for 2 minutes
    }
}