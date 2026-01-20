# NTMDB - Movie Database App

A modern movie discovery application built with Next.js, featuring real-time movie data from The Movie Database (TMDB).

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Animations**: Motion
- **Icons**: Lucide React
- **API**: TMDB API (tmdb-ts)
- **Theme**: next-themes (dark/light mode)

## Features

- 🎬 Browse popular movies with detailed information
- 🖼️ High-quality movie posters and backdrops
- 🌟 Movie ratings and reviews
- 📱 Responsive design for all devices
- 🌙 Dark/light theme toggle
- ⚡ Server-side rendering and static generation
- 🎭 Smooth animations and transitions

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ntmdb
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file and add your TMDB API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── movie/[id]/     # Individual movie pages
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Shadcn/ui components
│   └── *.tsx          # Custom components
├── lib/               # Utility libraries
│   ├── server-actions.ts  # Server actions
│   ├── tmdb.ts       # TMDB API client
│   └── utils.ts      # Helper functions
└── assets/            # Static assets
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_TMDB_API_KEY` | Your TMDB API key from [themoviedb.org](https://www.themoviedb.org/) | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).