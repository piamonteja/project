export default function HomePage() {
    return (
    <div className="space-y-4 p-8">
      <p className="text-foreground">Foreground text</p>
      <p className="text-primary">Primary text</p>
      <p className="text-red-500">Red text</p>
      <div className="bg-primary text-primary-foreground rounded-md p-4">
        Primary background
      </div>
    </div>
    );
}