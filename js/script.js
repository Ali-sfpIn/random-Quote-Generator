"use strict";
// SELECTION
const container = document.querySelector(".container");
const btnCategory = document.querySelector(".btn-category");
const dropDownMenu = document.querySelector(".dropdown-menu");
const btnGenerate = document.querySelector(".btn-generate");
const quoteText = document.querySelector(".quote");
const author = document.querySelector(".author");
const loading = document.querySelector(".loading");
// STATE VARIABLE
let category;
// FETCHING
const quoteCatcher = async function (category) {
  try {
    const req = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        headers: {
          "X-Api-Key": "eAfeBWEwKKQTyp9hDvfllw==mU7uXNxA4zMlckqD",
        },
      }
    );
    if (!req.ok)
      throw Error(
        "sorry!, there is a problem with finding the quote, please try again later"
      );
    const res = await req.json();
    return await res;
  } catch (err) {
    errorHandler(err.message);
  }
};

// FUNCTIONS
const quoteSetter = function (quote) {
  quoteText.textContent = quote[0].quote;
  author.textContent = quote[0].author;
};

const errorHandler = function (err) {
  quoteText.textContent = err;
  author.textContent = "server!";
};
// EVENT HANDLERS
dropDownMenu.addEventListener("click", function (e) {
  category = btnCategory.textContent = e.target.textContent;
});

btnGenerate.addEventListener("click", async function () {
  if (!category) return;
  quoteText.innerHTML = author.innerHTML = "";
  loading.classList.toggle("d-none");
  const quote = await quoteCatcher(category);
  if (!quote[0]) return;
  loading.classList.toggle("d-none");
  quoteSetter(quote);
});
