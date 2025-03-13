// Feedback can be in both Dutch or English

'use strict';
const prompt = require('prompt-sync')()
const cakeRecipes = require("./cake-recipes.json");

// Your functions here

const getUniqueAuthors = (recipes) => {
  let authors = [];

  recipes.forEach(recipe => {
    if (recipe.Author && authors.includes(recipe.Author) === false) {
      authors = [...authors, recipe.Author];
    }
  });
  return authors;
};

// console.log(getUniqueAuthors(cakeRecipes));

const getRecipeName = (recipe) => {
  if (recipe.length === 0) {
    console.log("No recipes found");
  } else {
    recipe.forEach(({ Name }) => {
      console.log(Name);
    });
  }
};

// getRecipeName(cakeRecipes);

const getRecipeByAuthor = (recipes, author) => {
  const filteredRecipeByAuthor = recipes.filter(recipe => recipe.Author === author);
  filteredRecipeByAuthor.map(recipe => console.log(`Author: ${recipe.Author} Recipe: ${recipe.Name}`));
};


// getRecipeByAuthor(cakeRecipes, "Mary Cadogan");

// I did a bit to much for this one, but it seems to work better, as I doesn't need to include the whole sentence. Just a portion of it. Let me know if I need to change it.
const getRecipeByIngredient = (recipes, ingredient) => {
  const filteredRecipeByIngredient = recipes.filter(recipe => recipe.Ingredients.some(ingredient => ingredient.toLowerCase().includes(ingredient.toLowerCase()))
  );
  filteredRecipeByIngredient.forEach(recipe =>
    console.log(`${recipe.Name}`)
  );
};

// getRecipeByIngredient(cakeRecipes, "cinnamon");

const getRecipeByName = (recipes, name) => {
  const filteredRecipeByName = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
  if (filteredRecipeByName) {
    console.log(filteredRecipeByName.Name);
  } else {
    return "No recipes found";
  }
};

getRecipeByName(cakeRecipes, "christmas");

//Deel 1 reduce
const getRecipeAllIngredients = (recipes) => {
  return recipes.reduce((accumalator, recipe) => [...accumalator, ...recipe.Ingredients], []);
}
//console.log(getRecipeAllIngredients(cakeRecipes));

//Deel 2 reduce
const getIngredientsByRecipe = (recipes, name) => {
  const filteredRecipeByName = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
  if (filteredRecipeByName) {
    return filteredRecipeByName.Ingredients.reduce((accumalator, ingredients) => {
      accumalator.push(ingredients);
      return accumalator;
    }, []);
  } else {
    return `No recipe was found.`;
  };
}

// console.log(getIngredientsByRecipe(cakeRecipes, "Christmas"));

const addToGroceryList = (recipes, name) => {
  const filteredRecipeByName = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
  if (filteredRecipeByName) {
    groceryList.push(...filteredRecipeByName.Ingredients);
    return filteredRecipeByName;
  }
};

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;
let groceryList = [];
do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getUniqueAuthors(cakeRecipes));
      break;
    case 2:
      const askUserForAuthor = prompt("What's the name of the author? ");
      getRecipeByAuthor(cakeRecipes, askUserForAuthor);
      break;
    case 3:
      const askUserForIngredient = prompt("What's the ingredient? ");
      getRecipeByIngredient(cakeRecipes, askUserForIngredient);
      break;
    case 4:
      let selectedRecipe = null;
      let askUserForRecipeName;
      while (selectedRecipe === null) {
        askUserForRecipeName = prompt("What's the name of the recipe? ");
        selectedRecipe = getRecipeByName(cakeRecipes, askUserForRecipeName);
        if (selectedRecipe === null) {
          console.log(selectedRecipe);
        }
      }

      let i = false;
      while (i === false) {
        let saveToGroceryList = prompt("Would you like to save the recipe to your grocery list? (Y or N): ").toLowerCase();
        if (saveToGroceryList === "y") {
          addToGroceryList(cakeRecipes, askUserForRecipeName);
          i = true;
        } else if (saveToGroceryList === "n") {
          i = true;
        } else if (saveToGroceryList !== "y" && saveToGroceryList !== "n") {
          console.log(`Invalid answer`);
        }
      }
      console.log(groceryList);

      break;
    case 5:
      console.log(groceryList);
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);