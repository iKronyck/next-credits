import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-teal-400 p-4">
      <div className="container mx-auto">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">Home</h1>
        </Link>
      </div>
    </header>
  );
}
