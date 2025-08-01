# Movie Search App

A dynamic and feature-rich Movie Search App built with **React** and styled using **Tailwind CSS**. This app utilizes the **TMDb API** to fetch and display movie and TV show data, and integrates **Redux** for state management, including a watchlist feature.

## Live Demo
[Project Live Link](https://cine-pick.vercel.app/)

## Features

### Core Features
- **Trending Content**: View trending movies and TV shows over the period of day or week.
- **Category-based Content**: Explore movies and TV shows categorized as:
  - Popular
  - Top Rated
  - Upcoming
  - Now Playing
- **Search with Debounce**: Quickly search for movies and TV shows using a search modal with a debounce feature to optimize API calls.
- **Details Page**: View detailed information about a specific movie or TV show, including:
  - Overview, Genre, Rating ring, Trailer
  - Cast details
  - Similar or recommended content suggestions
- **Carousel**: A visually appealing carousel on the home page showcasing trending content.
- **Loader**: A loading indicator is shown while fetching content to keep the user informed about data fetching.
- **Reusable Components**: All UI components like movie/tv show cards are built in a reusable manner to maintain consistency and reduce code duplication.
- **Responsive Design**: Fully responsive across devices, ensuring a great user experience on mobile, tablet, and desktop.

### Watchlist Feature
- Add any movie or TV show to a watchlist.
- The watchlist is stored locally using the browser's **local storage**, ensuring data persistence.

### Country-Based Content
- Automatically fetch and display movie and TV content based on the user's country.
- Country information is determined using the **IPAPI** service.

### State Management
- **Redux** is used for state management, enabling seamless addition and removal of items in the watchlist and efficient data handling across components.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **API Integration**: TMDb API, IPAPI
- **API Handling**: Axios, TanStack Query
- **State Management**: Redux
- **Storage**: Local Storage
- **Build Tool**: Vite
- **Deployment**: Vercel

## Installation

### Prerequisites
- Node.js installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/iankitkd/MovieSearchApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MovieSearchApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_ACCESS_TOKEN=your_tmdb_access_token
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```


## License
This project is licensed under the MIT License. See the LICENSE file for details.

---