# TaskMate

TaskMate is a productivity and task management application built with Next.js and MongoDB.

## Features

- User authentication
- Activity logging
- Task management (To Do, In Progress, Done)
- User profile page
- Responsive UI with Tailwind CSS

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   - Create a `.env.local` file in the root directory.
   - Add your MongoDB connection string: "mongodb://localhost:27017/TaskMate"
     ```
     MONGODB_URI_PRODUCTION=your_mongodb_connection_string
     ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/pages/` - Next.js pages (routes)
- `src/components/` - React components
- `src/lib/` - Library code (e.g., `mongodb.js`)
- `src/styles/` - Global and component styles

## Database

MongoDB is used for data storage. The connection logic is in `src/lib/mongodb.js`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

## License

MIT
