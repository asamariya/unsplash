const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("section.results");

const apiKey =
  "c7575ba5219bc16dc1f7157fd62fb192226d60625f96a1bc6b44f52e35e80693";

const searchUrl = `https://api.unsplash.com/search/photos?per_page=24&query=`;

const searchUnsplash = async term => {
  let response = await fetch(searchUrl + term, {
    headers: {
      Authorization: `Client-ID ${apiKey}`
    }
  });
  let data = await response.json();

  //format unsplash's results to suit our needs
  return data.results.map(result => {
    return {
      imageSrc: result.urls.regular,
      description: result.description || "Untitled",
      author: result.user.name,
      width: result.width,
      height: result.height,
      backgroundColor: (result.color || "#eee") + "33",
      imagePageSrc: result.links.html
    };
  });
};

// Add results to the page
const addResults = results => {
  resultsTag.innerHTML = "";
  results.forEach(result => {
    resultsTag.insertAdjacentHTML(
      "beforeend",
      `      
        <a href="${result.imagePageSrc}" class="single-result" target=_blank>
          <div class="image" style="background-color: ${result.backgroundColor}">
            <img src="${result.imageSrc}">
          </div>
          <h2>${result.description}</h2>
          <p>By ${result.author} &mdash; ${result.width} x ${result.height}</p>
        </a>  
      `
    );
  });
};

// When we submit the form, get the info from input
formTag.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm).then(results => {
    addResults(results);
  });
});
