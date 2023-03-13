import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://react-http-58244-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      console.log(["Response status"], response.status);

      console.log(["Is response ok?"], response.ok);
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again");
      }

      const data = await response.json();

      let loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: data[key].id,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setError(error.message);
      setErrorStatus(true);
      console.log(["Error"], error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  let content = null;

  switch (true) {
    case errorStatus:
      content = <p className={classes.error}>{error}</p>;
      break;
    case isLoading:
      content = <p>Meals are loading, please wait...</p>;
      break;
    case !isLoading && meals.length === 0:
      content = <p>There are no meals :C</p>;
      break;
    default:
      content = null;
      break;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <section className={classes.content}>{content}</section>
      </Card>
    </section>
  );
};

export default AvailableMeals;
