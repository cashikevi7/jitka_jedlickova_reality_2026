import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Stránka nenalezena</h1>
        <p className="text-muted mb-8">
          Omlouváme se, ale požadovaná stránka neexistuje.
        </p>
        <Link
          href="/"
          className="btn-primary cursor-pointer"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}