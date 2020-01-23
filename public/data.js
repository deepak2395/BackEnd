document.getElementById("45").addEventListener("click", function () {
  console.time('hi')
  for (var i = 0; i < 2000; i++) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/req');

    xhr.responseType = 'json';

    xhr.send();

    // the response is {"message": "Hello, world!"}
    xhr.onload = function () {
      let responseObj = xhr.response;
      console.log(responseObj.message); // Hello, world!
    };
  }
  console.timeEnd('hi')
});