import PhotoDashboard from "./photos-dashboard";

export default function Photos() {
    return (
        <div className="p-6 text-black rounded-lg">
          <h1 className="text-xl font-bold mb-4">Dashboard de Fotos</h1>
            <PhotoDashboard />
        </div>
    )
}