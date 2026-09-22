import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   KERALA DISTRICTS
========================================================= */

const districts = [
  "All Districts",
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

/* =========================================================
   DISTRICT COORDINATES
========================================================= */

const districtCoordinates = {
  Thiruvananthapuram: {
    latitude: 8.5241,
    longitude: 76.9366,
  },

  Kollam: {
    latitude: 8.8932,
    longitude: 76.6141,
  },

  Pathanamthitta: {
    latitude: 9.2648,
    longitude: 76.787,
  },

  Alappuzha: {
    latitude: 9.4981,
    longitude: 76.3388,
  },

  Kottayam: {
    latitude: 9.5916,
    longitude: 76.5222,
  },

  Idukki: {
    latitude: 9.9189,
    longitude: 77.1025,
  },

  Ernakulam: {
    latitude: 9.9816,
    longitude: 76.2999,
  },

  Thrissur: {
    latitude: 10.5276,
    longitude: 76.2144,
  },

  Palakkad: {
    latitude: 10.7867,
    longitude: 76.6548,
  },

  Malappuram: {
    latitude: 11.051,
    longitude: 76.0711,
  },

  Kozhikode: {
    latitude: 11.2588,
    longitude: 75.7804,
  },

  Wayanad: {
    latitude: 11.6854,
    longitude: 76.132,
  },

  Kannur: {
    latitude: 11.8745,
    longitude: 75.3704,
  },

  Kasaragod: {
    latitude: 12.4996,
    longitude: 74.9869,
  },
};

/* =========================================================
   WEATHER HELPERS
========================================================= */

const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail",
  };

  return (
    weatherCodes[code] ||
    "Weather information unavailable"
  );
};

const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";

  return "🌤️";
};

const getTravelStatus = (
  rainProbability,
  weatherCode
) => {
  if (weatherCode >= 95) {
    return {
      text: "Rain/Thunderstorm likely",
      color: "bg-red-100 text-red-700",
      icon: "🔴",
    };
  }

  if (rainProbability <= 30) {
    return {
      text: "Good for outdoor travel",
      color: "bg-green-100 text-green-700",
      icon: "🟢",
    };
  }

  if (rainProbability <= 60) {
    return {
      text: "Check weather before travelling",
      color: "bg-yellow-100 text-yellow-700",
      icon: "🟡",
    };
  }

  return {
    text: "Rain likely – plan accordingly",
    color: "bg-red-100 text-red-700",
    icon: "🔴",
  };
};

/* =========================================================
   INITIAL STORIES
========================================================= */

const initialStories = [
  {
    id: 1,
    title: "A Peaceful Morning in Varkala",
    destination: "Varkala",
    district: "Thiruvananthapuram",
    category: "Beach",
    vibe: "Relaxing",
    budget: 2500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGG-ZDRtKeG9fuu9aV3I9Ons--tPgT_Ot8QiPehtsMDsYOopavZ6DLi2Y&s=10",
    author: "Anu",
    rating: 4.8,
    likes: 42,
    description:
      "Varkala is perfect for a peaceful beach escape. The cliffs, sea breeze and sunset make it a beautiful place to relax.",
    tips:
      "Visit the cliff during sunset and carry sunscreen.",
    packing:
      "Sunscreen, sunglasses, water bottle and comfortable clothes.",
    coordinates: {
      latitude: 8.7379,
      longitude: 76.7163,
    },
    comments: [],
  },

  {
    id: 2,
    title: "Misty Days in Munnar",
    destination: "Munnar",
    district: "Idukki",
    category: "Hill Station",
    vibe: "Nature",
    budget: 5000,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/95/2c/a0/tea-gardens.jpg?w=500&h=500&s=1",
    author: "Rahul",
    rating: 4.9,
    likes: 67,
    description:
      "Munnar is surrounded by tea plantations and misty mountains. It is an ideal destination for nature lovers.",
    tips:
      "Start early to enjoy the viewpoints without crowds.",
    packing:
      "Light jacket, shoes, umbrella and camera.",
    coordinates: {
      latitude: 10.0889,
      longitude: 77.0595,
    },
    comments: [],
  },

  {
    id: 3,
    title: "Athirappilly Waterfall Adventure",
    destination: "Athirappilly",
    district: "Thrissur",
    category: "Waterfall",
    vibe: "Adventure",
    budget: 3000,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/07/49/fd/beauty-at-its-bestin.jpg?w=1200&h=1200&s=1",
    author: "Meera",
    rating: 4.7,
    likes: 53,
    description:
      "The magnificent Athirappilly waterfall is one of Kerala's most beautiful natural attractions.",
    tips:
      "Wear comfortable footwear because some paths can be slippery.",
    packing:
      "Raincoat, comfortable shoes and water bottle.",
    coordinates: {
      latitude: 10.2852,
      longitude: 76.5697,
    },
    comments: [],
  },

  {
    id: 4,
    title: "A Relaxing Day at Cherai",
    destination: "Cherai",
    district: "Ernakulam",
    category: "Beach",
    vibe: "Relaxing",
    budget: 2200,
    image:
      "https://www.trawell.in/admin/images/upload/486072149CheraiBeach_Main.jpg",
    author: "Arjun",
    rating: 4.6,
    likes: 35,
    description:
      "Cherai Beach offers a peaceful coastal experience close to Kochi.",
    tips:
      "Visit in the evening for a beautiful sunset.",
    packing:
      "Sunscreen, sunglasses and extra clothes.",
    coordinates: {
      latitude: 10.144,
      longitude: 76.1787,
    },
    comments: [],
  },

  {
    id: 5,
    title: "Exploring Vagamon",
    destination: "Vagamon",
    district: "Idukki",
    category: "Hill Station",
    vibe: "Adventure",
    budget: 3500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1KNwvbW1Z3QR_p1aTi76DHywrhfcMYjivzqiGHOgymxvivtOfsVy_CV4&s=10",
    author: "Niya",
    rating: 4.8,
    likes: 48,
    description:
      "Vagamon is known for green hills, meadows and peaceful surroundings.",
    tips:
      "Try paragliding if you enjoy adventure activities.",
    packing:
      "Jacket, shoes, water bottle and umbrella.",
    coordinates: {
      latitude: 9.6852,
      longitude: 76.906,
    },
    comments: [],
  },

  {
    id: 6,
    title: "Green Escape to Wayanad",
    destination: "Wayanad",
    district: "Wayanad",
    category: "Nature",
    vibe: "Nature",
    budget: 4500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBkIoqnjJCLt6FSQOIerCfqednP34DnHmw8UPIcVhfDv2SJhN8uCYplg&s=10",
    author: "Dev",
    rating: 4.9,
    likes: 71,
    description:
      "Wayanad is filled with forests, waterfalls, caves and beautiful mountain landscapes.",
    tips:
      "Plan enough time to explore the different attractions.",
    packing:
      "Walking shoes, raincoat, snacks and water.",
    coordinates: {
      latitude: 11.6085,
      longitude: 76.0834,
    },
    comments: [],
  },

  {
    id: 7,
    title: "Sunset at Kovalam",
    destination: "Kovalam",
    district: "Thiruvananthapuram",
    category: "Beach",
    vibe: "Relaxing",
    budget: 2800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-lzeHnUsdgwFII0mEc02SnpbjCe1kseNxP7b1NRiQA&s=10",
    author: "Diya",
    rating: 4.7,
    likes: 51,
    description:
      "Kovalam is famous for its beaches, lighthouse and beautiful sunsets.",
    tips:
      "Visit the lighthouse before sunset.",
    packing:
      "Sunscreen, sunglasses and comfortable clothes.",
    coordinates: {
      latitude: 8.4004,
      longitude: 76.9787,
    },
    comments: [],
  },

  {
    id: 8,
    title: "Nature Trails at Thenmala",
    destination: "Thenmala",
    district: "Kollam",
    category: "Nature",
    vibe: "Adventure",
    budget: 2000,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    author: "Kiran",
    rating: 4.6,
    likes: 31,
    description:
      "Thenmala is a wonderful destination for nature walks and outdoor activities.",
    tips:
      "Keep a light raincoat with you.",
    packing:
      "Shoes, water bottle, raincoat and snacks.",
    coordinates: {
      latitude: 8.9547,
      longitude: 77.071,
    },
    comments: [],
  },

  {
    id: 9,
    title: "A Day in Alappuzha",
    destination: "Alappuzha",
    district: "Alappuzha",
    category: "Backwaters",
    vibe: "Relaxing",
    budget: 4000,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    author: "Sona",
    rating: 4.9,
    likes: 62,
    description:
      "Alappuzha is famous for its peaceful backwaters and traditional houseboats.",
    tips:
      "A sunset houseboat ride is worth experiencing.",
    packing:
      "Camera, sunscreen and light clothes.",
    coordinates: {
      latitude: 9.4981,
      longitude: 76.3388,
    },
    comments: [],
  },

  {
    id: 10,
    title: "Hills of Nelliyampathy",
    destination: "Nelliyampathy",
    district: "Palakkad",
    category: "Hill Station",
    vibe: "Nature",
    budget: 3200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCA1qegfsWXAP0ab5F5V95JFH1wznsImOc6trNfZRLL-kqfRv1sSMAcQ&s=10",
    author: "Akhil",
    rating: 4.7,
    likes: 39,
    description:
      "Nelliyampathy offers beautiful mountain views, plantations and peaceful roads.",
    tips:
      "Carry warm clothes because the evenings can be cool.",
    packing:
      "Jacket, shoes, water and camera.",
    coordinates: {
      latitude: 10.5262,
      longitude: 76.6867,
    },
    comments: [],
  },
];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [stories, setStories] =
    useState(initialStories);

  const [selectedStory, setSelectedStory] =
    useState(null);

  const [savedStories, setSavedStories] =
    useState([]);

  const [likedStories, setLikedStories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  /* =====================================================
     LIKE / UNLIKE
  ===================================================== */

  const toggleLike = (id) => {
    const alreadyLiked =
      likedStories.includes(id);

    if (alreadyLiked) {

      setLikedStories((previous) =>
        previous.filter(
          (storyId) => storyId !== id
        )
      );

      setStories((previous) =>
        previous.map((story) =>
          story.id === id
            ? {
                ...story,
                likes: Math.max(
                  0,
                  story.likes - 1
                ),
              }
            : story
        )
      );

      setSelectedStory((previous) =>
        previous &&
        previous.id === id
          ? {
              ...previous,
              likes: Math.max(
                0,
                previous.likes - 1
              ),
            }
          : previous
      );

    } else {

      setLikedStories((previous) => [
        ...previous,
        id,
      ]);

      setStories((previous) =>
        previous.map((story) =>
          story.id === id
            ? {
                ...story,
                likes: story.likes + 1,
              }
            : story
        )
      );

      setSelectedStory((previous) =>
        previous &&
        previous.id === id
          ? {
              ...previous,
              likes: previous.likes + 1,
            }
          : previous
      );
    }
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const toggleSave = (id) => {
    setSavedStories((previous) =>
      previous.includes(id)
        ? previous.filter(
            (storyId) => storyId !== id
          )
        : [...previous, id]
    );
  };

  /* =====================================================
     OPEN STORY
  ===================================================== */

  const openStory = (story) => {
    setSelectedStory(story);
  };

  /* =====================================================
     COMMENTS
  ===================================================== */

  const addComment = (id, comment) => {
    if (!comment.trim()) return;

    setStories((previous) =>
      previous.map((story) =>
        story.id === id
          ? {
              ...story,
              comments: [
                ...story.comments,
                comment,
              ],
            }
          : story
      )
    );

    setSelectedStory((previous) =>
      previous &&
      previous.id === id
        ? {
            ...previous,
            comments: [
              ...previous.comments,
              comment,
            ],
          }
        : previous
    );
  };

  /* =====================================================
     CREATE STORY
  ===================================================== */

  const createStory = (newStory) => {
    const story = {
      ...newStory,
      id: Date.now(),
      author: "You",
      rating: 0,
      likes: 0,
      comments: [],
    };

    setStories((previous) => [
      story,
      ...previous,
    ]);
  };

  /* =====================================================
     DELETE STORY
  ===================================================== */

  const deleteStory = (id) => {
    const storyToDelete =
      stories.find(
        (story) => story.id === id
      );

    if (
      !storyToDelete ||
      storyToDelete.author !== "You"
    ) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) return;

    setStories((previous) =>
      previous.filter(
        (story) => story.id !== id
      )
    );

    setSavedStories((previous) =>
      previous.filter(
        (storyId) => storyId !== id
      )
    );

    setLikedStories((previous) =>
      previous.filter(
        (storyId) => storyId !== id
      )
    );

    setSelectedStory((previous) =>
      previous &&
      previous.id === id
        ? null
        : previous
    );
  };

  return (
    <BrowserRouter base="/Travelounge/">

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 text-gray-800">

        <Navbar />

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={
              <Home/>}
              />
          

          {/* EXPLORE */}

          <Route
            path="/explore"
            element={
              <Explore
                stories={stories}
                search={search}
                setSearch={setSearch}
                openStory={openStory}
                savedStories={savedStories}
                toggleSave={toggleSave}
                likedStories={likedStories}
                toggleLike={toggleLike}
              />
            }
          />

          {/* STORY */}

          <Route
            path="/story"
            element={
              <StoryDetails
                story={selectedStory}
                likedStories={likedStories}
                toggleLike={toggleLike}
                savedStories={savedStories}
                toggleSave={toggleSave}
                addComment={addComment}
              />
            }
          />

          {/* CREATE */}

          <Route
            path="/create"
            element={
              <CreateStory
                createStory={createStory}
              />
            }
          />

          {/* SAVED */}

          <Route
            path="/saved"
            element={
              <SavedStories
                stories={stories}
                savedStories={savedStories}
                openStory={openStory}
              />
            }
          />

          {/* MY STORIES */}

          <Route
            path="/my-stories"
            element={
              <MyStories
                stories={stories}
                openStory={openStory}
                deleteStory={deleteStory}
              />
            }
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 shadow-sm backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <Link
          to="/"
          className="text-2xl font-extrabold text-rose-600"
        >
          TravelLounge 🌴
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold md:flex">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/explore">
            Explore
          </NavLink>

          <NavLink to="/saved">
            Saved
          </NavLink>

          <NavLink to="/my-stories">
            My Stories
          </NavLink>

          <Link
            to="/create"
            className="rounded-full bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
          >
            + Create Story
          </Link>

        </div>

        <div className="md:hidden">

          <Link
            to="/create"
            className="rounded-full bg-rose-600 px-3 py-2 text-sm text-white"
          >
            + Story
          </Link>

        </div>

      </div>

    </nav>
  );
}

function NavLink({
  to,
  children,
}) {
  return (
    <Link
      to={to}
      className="transition hover:text-rose-600"
    >
      {children}
    </Link>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  return (
    <main>

      {/* HERO */}

      <section className="bg-gradient-to-r from-rose-600 to-orange-400 px-6 py-24 text-center text-white">

        <p className="mb-4 text-sm font-bold uppercase tracking-widest">
          Kerala Travel Community 🌴
        </p>

        <h1 className="text-4xl font-extrabold md:text-6xl">
          Discover Kerala
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 md:text-xl">
          Explore beautiful destinations, discover real
          travel experiences and share your own Kerala
          stories with fellow travellers.
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="mt-9 rounded-full bg-white px-8 py-3.5 font-bold text-rose-600 shadow-lg transition hover:scale-105"
        >
          Explore Kerala →
        </button>

      </section>


      {/* ABOUT TRAVELLOUNGE */}

      <section className="mx-auto max-w-6xl px-5 py-16">

        <div className="text-center">

          <p className="font-bold uppercase tracking-widest text-rose-500">
            About TravelLounge
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-800 md:text-4xl">
            Your Kerala Travel Companion
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            TravelLounge brings Kerala travel experiences
            together in one place. Discover destinations,
            check weather conditions, save interesting
            stories and share your own experiences.
          </p>

        </div>


        {/* FEATURES */}

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-4xl">
              🧭
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Explore
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Discover destinations across all 14
              districts of Kerala and find stories
              based on your interests and budget.
            </p>

          </div>


          <div className="rounded-3xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-4xl">
              🌦️
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Check Weather
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Check the current weather conditions
              and rain probability for any Kerala
              district before planning your trip.
            </p>

          </div>


          <div className="rounded-3xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-4xl">
              ✍️
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Share Stories
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Share your own travel experiences,
              useful tips and memories with the
              TravelLounge community.
            </p>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="bg-rose-50 px-5 py-16">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-3xl font-extrabold text-gray-800">
            Plan Your Kerala Trip
          </h2>

          <p className="mt-3 text-gray-500">
            Everything you need in a few simple steps.
          </p>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-xl font-extrabold text-white">
                1
              </div>

              <h3 className="mt-4 font-extrabold">
                Choose a Destination
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Browse destinations and travel stories
                from across Kerala.
              </p>

            </div>


            <div>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-xl font-extrabold text-white">
                2
              </div>

              <h3 className="mt-4 font-extrabold">
                Check the Weather
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Select a district and check its
                current weather conditions.
              </p>

            </div>


            <div>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-xl font-extrabold text-white">
                3
              </div>

              <h3 className="mt-4 font-extrabold">
                Start Exploring
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Find useful experiences, save stories
                and plan your trip.
              </p>

            </div>

          </div>


      

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SEARCH BAR
========================================================= */

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="mx-auto max-w-2xl">

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="🔍 Search destinations, stories..."
        className="w-full rounded-full border border-rose-200 bg-white px-6 py-4 shadow-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
      />

    </div>
  );
}

/* =========================================================
   EXPLORE
========================================================= */

function Explore({
  stories,
  search,
  setSearch,
  openStory,
  savedStories,
  toggleSave,
  likedStories,
  toggleLike,
}) {
  const [district, setDistrict] =
    useState("All Districts");

  const [maxBudget, setMaxBudget] =
    useState("");

  const filteredStories = stories.filter((story) => {
  const matchesSearch =
    story.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    story.destination
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesDistrict =
    district === "All Districts" ||
    story.district === district;

  const matchesBudget =
    maxBudget === "" ||
    story.budget <= Number(maxBudget);

  return (
    matchesSearch &&
    matchesDistrict &&
    matchesBudget
  );
});

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">

      <div className="mb-8">

        <h1 className="text-4xl font-extrabold text-rose-700">
          Explore Kerala
        </h1>

        <p className="mt-2 text-gray-500">
          Find a destination that matches your
          travel mood and budget.
        </p>

      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

<div className="mt-6 grid gap-3 sm:grid-cols-2">

  {/* DISTRICT */}

  <select
    value={district}
    onChange={(e) =>
      setDistrict(e.target.value)
    }
    className="rounded-xl border bg-white px-4 py-3 outline-none"
  >
    {districts.map((item) => (
      <option key={item}>
        {item}
      </option>
    ))}
  </select>


  {/* BUDGET */}

  <div className="relative">

    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
      ₹
    </span>

    <input
      type="number"
      min="0"
      value={maxBudget}
      onChange={(e) =>
        setMaxBudget(e.target.value)
      }
      placeholder="Maximum budget"
      className="w-full rounded-xl border bg-white py-3 pl-8 pr-4 outline-none focus:border-rose-500"
    />

  </div>

</div>

      <div className="mt-4 flex flex-wrap items-center gap-3">

        {maxBudget && (
          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
            💰 Up to ₹
            {Number(
              maxBudget
            ).toLocaleString("en-IN")}
          </span>
        )}

        {maxBudget && (
          <button
            onClick={() =>
              setMaxBudget("")
            }
            className="text-sm font-semibold text-gray-500 underline"
          >
            Clear budget
          </button>
        )}

      </div>

      {/* WEATHER + STORIES */}

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">

        {/* STORIES */}

        <section>

          <p className="text-sm text-gray-500">
            {filteredStories.length} stories found
          </p>

          {filteredStories.length === 0 ? (

            <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow">

              <p className="text-lg font-semibold">
                No stories found 😕
              </p>

              <p className="mt-2 text-gray-500">
                Try changing your search,
                filters or budget.
              </p>

            </div>

          ) : (

            <div className="mt-6 grid gap-6 sm:grid-cols-2">

              {filteredStories.map(
                (story) => (

                  <StoryCard
                    key={story.id}
                    story={story}
                    openStory={openStory}
                    savedStories={
                      savedStories
                    }
                    toggleSave={
                      toggleSave
                    }
                    likedStories={
                      likedStories
                    }
                    toggleLike={
                      toggleLike
                    }
                  />

                )
              )}

            </div>

          )}

        </section>

        {/* WEATHER */}

        <KeralaWeather />

      </div>

    </main>
  );
}

/* =========================================================
   KERALA WEATHER
========================================================= */

function KeralaWeather() {

  const [selectedDistrict, setSelectedDistrict] =
    useState("Ernakulam");

  const [weather, setWeather] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchWeather = async () => {

      const coordinates =
        districtCoordinates[
          selectedDistrict
        ];

      if (!coordinates) return;

      setLoading(true);
      setError("");
      setWeather(null);

      try {

        const apiUrl =
          `https://api.open-meteo.com/v1/forecast?` +
          `latitude=${coordinates.latitude}` +
          `&longitude=${coordinates.longitude}` +
          `&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m` +
          `&hourly=precipitation_probability` +
          `&timezone=auto`;

        const response =
          await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            "Weather request failed"
          );
        }

        const data =
          await response.json();

        setWeather(data);

      } catch (error) {

        console.error(
          "Weather API Error:",
          error
        );

        setError(
          "Weather information could not be loaded."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchWeather();

  }, [selectedDistrict]);

  let rainProbability = 0;

  if (
    weather &&
    weather.hourly &&
    weather.hourly
      .precipitation_probability
  ) {

    rainProbability =
      weather.hourly
        .precipitation_probability[0] ||
      0;

  }

  const travelStatus = weather
    ? getTravelStatus(
        rainProbability,
        weather.current.weather_code
      )
    : null;

  return (
    <aside className="lg:sticky lg:top-24">

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-rose-500 to-orange-400 p-6 text-white">

          <p className="text-sm opacity-90">
            Weather
          </p>

          <h2 className="mt-1 text-2xl font-extrabold">
             District wise Weather
          </h2>

          <p className="mt-1 text-sm opacity-90">
            Check weather for any Kerala district
          </p>

        </div>

        <div className="p-6">

          {/* DISTRICT SELECT */}

          <label className="mb-2 block font-bold">
            Select District
          </label>

          <select
            value={selectedDistrict}
            onChange={(e) =>
              setSelectedDistrict(
                e.target.value
              )
            }
            className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-rose-500"
          >

            {districts
              .slice(1)
              .map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}

          </select>

          {/* LOADING */}

          {loading && (

            <div className="py-10 text-center">

              <div className="animate-pulse text-5xl">
                🌦️
              </div>

              <p className="mt-3 font-semibold">
                Checking weather...
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Getting current weather for{" "}
                {selectedDistrict}
              </p>

            </div>

          )}

          {/* ERROR */}

          {!loading && error && (

            <div className="mt-6 rounded-2xl bg-red-50 p-5 text-center text-red-600">

              <div className="text-3xl">
                ⚠️
              </div>

              <p className="mt-2 font-semibold">
                {error}
              </p>

            </div>

          )}

          {/* WEATHER DATA */}

          {!loading &&
            !error &&
            weather && (

              <div className="mt-6">

                <div className="text-center">

                  <div className="text-6xl">
                    {getWeatherIcon(
                      weather.current
                        .weather_code
                    )}
                  </div>

                  <p className="mt-3 text-4xl font-extrabold">
                    {Math.round(
                      weather.current
                        .temperature_2m
                    )}
                    °C
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {getWeatherDescription(
                      weather.current
                        .weather_code
                    )}
                  </p>

                  <p className="text-sm text-gray-500">
                    📍 {selectedDistrict}, Kerala
                  </p>

                </div>

                {/* WEATHER DETAILS */}

                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-gray-50 p-4">

                    <p className="text-xs text-gray-500">
                      Feels Like
                    </p>

                    <p className="mt-1 font-extrabold">
                      🌡️{" "}
                      {Math.round(
                        weather.current
                          .apparent_temperature
                      )}
                      °C
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">

                    <p className="text-xs text-gray-500">
                      Rain Probability
                    </p>

                    <p className="mt-1 font-extrabold">
                      🌧️{" "}
                      {rainProbability}%
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">

                    <p className="text-xs text-gray-500">
                      Rain
                    </p>

                    <p className="mt-1 font-extrabold">
                      💧{" "}
                      {weather.current.rain}{" "}
                      mm
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">

                    <p className="text-xs text-gray-500">
                      Wind
                    </p>

                    <p className="mt-1 font-extrabold">
                      💨{" "}
                      {Math.round(
                        weather.current
                          .wind_speed_10m
                      )}{" "}
                      km/h
                    </p>

                  </div>

                </div>

                {/* TRAVEL STATUS */}

                {travelStatus && (

                  <div
                    className={`mt-5 rounded-2xl p-4 text-center font-bold ${travelStatus.color}`}
                  >
                    {travelStatus.icon}{" "}
                    {travelStatus.text}
                  </div>

                )}

                <p className="mt-4 text-center text-xs text-gray-400">
                  Weather data fetched from
                  Open-Meteo API
                </p>

              </div>

            )}

        </div>

      </div>

    </aside>
  );
}

/* =========================================================
   STORY CARD
========================================================= */

function StoryCard({
  story,
  openStory,
  savedStories,
  toggleSave,
  likedStories,
  toggleLike,
}) {

  const navigate = useNavigate();

  const isLiked =
    likedStories.includes(
      story.id
    );

  const handleOpen = () => {

    openStory(story);

    navigate("/story");

  };

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <img
        src={story.image}
        alt={story.destination}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
            {story.category}
          </span>

          <button
            onClick={() =>
              toggleSave(story.id)
            }
            className="text-xl transition hover:scale-110"
          >
            {savedStories.includes(
              story.id
            )
              ? "🔖"
              : "🏷️"}
          </button>

        </div>

        <h3 className="mt-4 text-xl font-bold">
          {story.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          📍 {story.destination},{" "}
          {story.district}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
          {story.description}
        </p>

        <div className="mt-4">

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
            💰 ₹
            {Number(
              story.budget
            ).toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-sm">
            ⭐ {story.rating || "New"}
          </span>

          <button
            onClick={() =>
              toggleLike(story.id)
            }
            className={`flex items-center gap-1 text-sm font-semibold transition ${
              isLiked
                ? "text-red-500"
                : "text-gray-700"
            }`}
          >

            <span className="text-2xl leading-none">
              {isLiked
                ? "♥"
                : "♡"}
            </span>

            <span>
              {story.likes}
            </span>

          </button>

        </div>

        <button
          onClick={handleOpen}
          className="mt-5 w-full rounded-full bg-rose-600 py-2.5 font-bold text-white transition hover:bg-rose-700"
        >
          Read Story
        </button>

      </div>

    </article>
  );
}

/* =========================================================
   STORY DETAILS
========================================================= */

function StoryDetails({
  story,
  likedStories,
  toggleLike,
  savedStories,
  toggleSave,
  addComment,
}) {

  const navigate = useNavigate();

  const [comment, setComment] =
    useState("");

  if (!story) {

    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">

        <h2 className="text-2xl font-bold">
          No story selected
        </h2>

        <button
          onClick={() =>
            navigate("/explore")
          }
          className="mt-6 rounded-full bg-rose-600 px-6 py-3 font-bold text-white"
        >
          Explore Stories
        </button>

      </main>
    );
  }

  const isLiked =
    likedStories.includes(
      story.id
    );

  const submitComment = (e) => {

    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    addComment(
      story.id,
      comment
    );

    setComment("");

  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 font-semibold text-rose-600"
      >
        ← Back
      </button>

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

        <img
          src={story.image}
          alt={story.destination}
          className="h-72 w-full object-cover md:h-96"
        />

        <div className="p-6 md:p-10">

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-600">
              {story.category}
            </span>

            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
              {story.vibe}
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-600">
              💰 ₹
              {Number(
                story.budget
              ).toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
            {story.title}
          </h1>

          <p className="mt-2 text-gray-500">
            📍 {story.destination},{" "}
            {story.district}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            {/* LIKE */}

            <button
              onClick={() =>
                toggleLike(
                  story.id
                )
              }
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold ${
                isLiked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-700"
              }`}
            >

              <span className="text-2xl">
                {isLiked
                  ? "♥"
                  : "♡"}
              </span>

              {story.likes}

            </button>

            {/* SAVE */}

            <button
              onClick={() =>
                toggleSave(
                  story.id
                )
              }
              className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700"
            >
              {savedStories.includes(
                story.id
              )
                ? "🔖 Saved"
                : "🏷️ Save"}
            </button>

          </div>

          <p className="mt-8 leading-7 text-gray-700">
            {story.description}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <InfoBox
              title="💡 Travel Tip"
              text={story.tips}
            />

            <InfoBox
              title="🎒 Packing Essentials"
              text={story.packing}
            />

          </div>

          {/* =================================================
              COMMENTS
          ================================================= */}

          <section className="mt-10">

            <h2 className="text-2xl font-extrabold">
              💬 Comments
            </h2>

            <form
              onSubmit={submitComment}
              className="mt-5 flex gap-3"
            >

              <input
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                placeholder="Share your thoughts..."
                className="flex-1 rounded-full border px-5 py-3 outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="rounded-full bg-rose-600 px-5 py-3 font-bold text-white"
              >
                Post
              </button>

            </form>

            <div className="mt-5 space-y-3">

              {story.comments.length ===
              0 ? (

                <p className="text-sm text-gray-500">
                  No comments yet. Be the first
                  to comment!
                </p>

              ) : (

                story.comments.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      💬 {item}
                    </div>

                  )
                )

              )}

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  title,
  text,
}) {
  return (
    <div className="rounded-2xl bg-rose-50 p-5">

      <h3 className="font-extrabold text-rose-700">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   CREATE STORY
========================================================= */

function CreateStory({
  createStory,
}) {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      destination: "",
      district:
        "Thiruvananthapuram",
      category: "Nature",
      vibe: "Relaxing",
      budget: "",
      description: "",
      tips: "",
      packing: "",
      image: "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.destination.trim() ||
      !form.description.trim() ||
      !form.budget
    ) {

      alert(
        "Please fill in the title, destination, budget and description."
      );

      return;
    }

    if (
      Number(form.budget) <= 0
    ) {

      alert(
        "Please enter a valid budget amount."
      );

      return;
    }

    createStory({

      ...form,

      budget: Number(
        form.budget
      ),

      image:
        form.image ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",

      coordinates: {
        latitude: 10.8505,
        longitude: 76.2711,
      },

    });

    alert(
      "Story created successfully! 🎉"
    );

    navigate("/my-stories");
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <h1 className="text-4xl font-extrabold text-rose-700">
        Create Your Story ✍️
      </h1>

      <p className="mt-2 text-gray-500">
        Share your Kerala travel experience
        with others.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-lg md:p-8"
      >

        <Input
          label="Story Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Eg: A beautiful weekend in Munnar"
        />

        <Input
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Eg: Munnar"
        />

        <label className="block">

          <span className="mb-2 block font-bold">
            District
          </span>

          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none"
          >

            {districts
              .slice(1)
              .map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}

          </select>

        </label>

        <div className="grid gap-5 md:grid-cols-2">

          {/* CATEGORY */}

          <label>

            <span className="mb-2 block font-bold">
              Category
            </span>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            >

              <option>
                Beach
              </option>

              <option>
                Hill Station
              </option>

              <option>
                Waterfall
              </option>

              <option>
                Nature
              </option>

              <option>
                Backwaters
              </option>

            </select>

          </label>

          {/* VIBE */}

          <label>

            <span className="mb-2 block font-bold">
              Vibe
            </span>

            <select
              name="vibe"
              value={form.vibe}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            >

              <option>
                Relaxing
              </option>

              <option>
                Nature
              </option>

              <option>
                Adventure
              </option>

            </select>

          </label>

        </div>

        {/* BUDGET */}

        <label className="block">

          <span className="mb-2 block font-bold">
            Estimated Trip Budget
          </span>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
              ₹
            </span>

            <input
              type="number"
              name="budget"
              min="1"
              value={form.budget}
              onChange={handleChange}
              placeholder="Eg: 3000"
              className="w-full rounded-xl border px-4 py-3 pl-9 outline-none focus:border-rose-500"
            />

          </div>

          <p className="mt-1 text-xs text-gray-500">
            Enter an approximate budget for the trip.
          </p>

        </label>

        {/* IMAGE */}

        <Input
          label="Image URL (optional)"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Paste an image URL"
        />

        {/* DESCRIPTION */}

        <label className="block">

          <span className="mb-2 block font-bold">
            Description
          </span>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your experience..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-rose-500"
          />

        </label>

        <Input
          label="Travel Tips"
          name="tips"
          value={form.tips}
          onChange={handleChange}
          placeholder="Any useful tips?"
        />

        <Input
          label="Packing Essentials"
          name="packing"
          value={form.packing}
          onChange={handleChange}
          placeholder="What should travellers carry?"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-rose-600 py-3 font-bold text-white transition hover:bg-rose-700"
        >
          Publish Story 🌴
        </button>

      </form>

    </main>
  );
}

/* =========================================================
   INPUT COMPONENT
========================================================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">

      <span className="mb-2 block font-bold">
        {label}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-rose-500"
      />

    </label>
  );
}

/* =========================================================
   SAVED STORIES
========================================================= */

function SavedStories({
  stories,
  savedStories,
  openStory,
}) {

  const navigate = useNavigate();

  const saved =
    stories.filter((story) =>
      savedStories.includes(
        story.id
      )
    );

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">

      <h1 className="text-4xl font-extrabold text-rose-700">
        Saved Stories 🔖
      </h1>

      {saved.length === 0 ? (

        <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow">

          <p className="text-xl font-bold">
            No saved stories yet.
          </p>

          <button
            onClick={() =>
              navigate("/explore")
            }
            className="mt-5 rounded-full bg-rose-600 px-6 py-3 font-bold text-white"
          >
            Explore Stories
          </button>

        </div>

      ) : (

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {saved.map((story) => (

            <SavedStoryCard
              key={story.id}
              story={story}
              openStory={openStory}
            />

          ))}

        </div>

      )}

    </main>
  );
}

function SavedStoryCard({
  story,
  openStory,
}) {

  const navigate = useNavigate();

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md">

      <img
        src={story.image}
        alt={story.destination}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {story.title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          📍 {story.destination}
        </p>

        <p className="mt-3 font-bold text-green-700">
          💰 ₹
          {Number(
            story.budget
          ).toLocaleString(
            "en-IN"
          )}
        </p>

        <button
          onClick={() => {

            openStory(story);

            navigate("/story");

          }}
          className="mt-5 w-full rounded-full bg-rose-600 py-2.5 font-bold text-white"
        >
          Read Story
        </button>

      </div>

    </article>
  );
}

/* =========================================================
   MY STORIES
========================================================= */

function MyStories({
  stories,
  openStory,
  deleteStory,
}) {

  const navigate = useNavigate();

  const myStories =
    stories.filter(
      (story) =>
        story.author === "You"
    );

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-4xl font-extrabold text-rose-700">
            My Stories ✨
          </h1>

          <p className="mt-2 text-gray-500">
            Manage the stories you have shared.
          </p>

        </div>

        <Link
          to="/create"
          className="rounded-full bg-rose-600 px-5 py-3 font-bold text-white"
        >
          + Create Story
        </Link>

      </div>

      {myStories.length === 0 ? (

        <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow">

          <p className="text-xl font-bold">
            You haven't created any stories yet.
          </p>

          <button
            onClick={() =>
              navigate("/create")
            }
            className="mt-5 rounded-full bg-rose-600 px-6 py-3 font-bold text-white"
          >
            Create Your First Story
          </button>

        </div>

      ) : (

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {myStories.map((story) => (

            <article
              key={story.id}
              className="overflow-hidden rounded-3xl bg-white shadow-md"
            >

              <img
                src={story.image}
                alt={story.destination}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {story.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  📍 {story.destination}
                </p>

                <p className="mt-3 font-bold text-green-700">
                  💰 ₹
                  {Number(
                    story.budget
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <div className="mt-5 flex gap-2">

                  <button
                    onClick={() => {

                      openStory(story);

                      navigate("/story");

                    }}
                    className="flex-1 rounded-full bg-rose-600 px-3 py-2 text-sm font-bold text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      deleteStory(
                        story.id
                      )
                    }
                    className="rounded-full bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 px-5 py-10 text-center text-white">

      <h2 className="text-xl font-extrabold">
        TravelLounge Kerala 🌴
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Discover. Share. Travel.
      </p>

      <p className="mt-5 text-xs text-gray-500">
        © 2026 TravelLounge. Made with React.js.
      </p>

    </footer>
  );
}