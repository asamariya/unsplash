const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");

const apiKey =
  "c7575ba5219bc16dc1f7157fd62fb192226d60625f96a1bc6b44f52e35e80693";

const searchUrl = `https://api.unsplash.com/search/photos?per_page=24&query=blue`;

const searchUnsplash = async term => {
  let response = await fetch(searchUrl, {
    headers: {
      Authorization: `Client-ID ${apiKey}`
    }
  });
  let data = await response.json();
  console.log(data);
};

// When we submit the form, get the info from input
formTag.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm);
});
