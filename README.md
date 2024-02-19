## README for Next.js Twitter Clone

This project is a Twitter clone built using Next.js, Supabase, and TypeScript. It is based on the Egghead tutorial "Build a Twitter Clone with the Next.js App Router and Supabase" ([https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb](https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb)).

### Characteristics

The following improvements have been made to the original tutorial:

* **Optimizations:** The project has been optimized for performance, including code splitting, image optimization, and caching.
* **Architecture:** The code has been refactored to improve readability, maintainability, and testability.
* **Supabase:** The project uses Supabase features such as policies, functions, triggers, and the SQL editor.
* **Next.js:** The project uses experimental Next.js features such as `experimental_useOptimistic`.

### Learnings

The following are some of the key learnings from this project:

* How to use Supabase to build a real-time application.
* How to use Next.js to build a performant and SEO-friendly application.
* How to use TypeScript to improve the type safety and readability of code.
* How to use the Supabase CLI.
* How to use PostgreSQL to manage data in a relational database.

### Known Issues

The following are some of the known issues with this project:

* The `experimental_useOptimistic` feature is unstable in Next 14.
* The project is not optimized for mobile devices.


### Getting Started

To get started with this project, you will need the following:

* Node.js
* Yarn or NPM

Once you have the prerequisites installed, you can clone the project repository and install the dependencies:

```
git clone https://github.com/your-username/nextjs-twitter-clone.git
cd nextjs-twitter-clone
npm install
```

Then, you can start the development server:

```
npm dev
```

The application will be available at http://localhost:3000.


### License

This project is licensed under the MIT License.

### Additional Information

* This project was created as part of the onboarding process for the company where I started working 🚀.
* This trigger automatically adds new users to the 'public' role after they sign up, providing necessary permissions.

    CREATE TRIGGER add_user_to_public_column
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION add_new_user();


