import WeatherComponent from "@/components/WeatherComponent";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-100">
      <WeatherComponent/>
    </div>
  );
}
