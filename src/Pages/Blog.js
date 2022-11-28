import React from "react";

const Blog = () => {
  return (
    <div>
      <div className="min-h-screen mx-10">
        <h2 className="text-4xl mt-3">
          What are the different ways to manage a state in a react application?
        </h2>
        <p className="text-xl mb-10">
          In React apps, there are at least seven ways to handle the state. Let
          us briefly explore a few of them in this part. 1.URL, 2.WEb storage,
          3. Local State, 4. Lifted State. It is recommended to avoid storing
          such information in the app's state to avoid the URL. The second
          option is to store the state in the browser via web storage. This is
          useful when we want to persist state between reloads and reboots.
          Examples include cookies, local storage, and IndexedDB. These are
          native browser technologies.
        </p>
        <h2 className="text-4xl">How does prototypical inheritance work?</h2>
        <p className="text-xl mb-10">
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object. getPrototypeOf and Object.
        </p>
        <h2 className="text-4xl">
          What is a unit text? Why should we write unit tests?
        </h2>
        <p className="text-xl mb-10">
          The main objective of unit testing is to isolate written code to test
          and determine if it works as intended. Unit testing is an important
          step in the development process, because if done correctly, it can
          help detect early flaws in code which may be more difficult to find in
          later testing stages.
        </p>
        <h2 className="text-4xl">React vs Angular vs Vue?</h2>
        <p className="text-xl mb-10">
          Vue provides higher customizability and hence is easier to learn than
          Angular or React. Further, Vue has an overlap with Angular and React
          with respect to their functionality like the use of components. Hence,
          the transition to Vue from either of the two is an easy option.
        </p>
      </div>
    </div>
  );
};

export default Blog;
