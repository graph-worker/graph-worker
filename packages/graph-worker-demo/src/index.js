if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./sw.js")
      .then(function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}

fetch("/test")
  .then(resp => resp.text())
  .then(text => console.log(text));

fetch("/demo?a=1")
  .then(resp => resp.text())
  .then(text => console.log(text));
